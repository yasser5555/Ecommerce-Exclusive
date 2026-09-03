const bcrypt = require("bcryptjs");
const authRepository = require("./auth.repository");
const generateToken = require("../../shared/utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../../shared/utils/sendEmail");

// Register
const register = async (data) => {
  var error = null
  try {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      error ="Email already exists";
      return error
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userId = await authRepository.createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      phone_number: data.phone_number,
      email: data.email,
      password: hashedPassword,
    });

    // Generate JWT containing user data
    const token = generateToken(userId);

    // Return token and user data
    return {
      token,
      user: await authRepository.findUserById(userId),
    };
  } catch (error) {
    const Error = {};
    Error.error = `error at auth.service in Register ${error}`;
    return Error;
  }
};

// Login
const login = async (email, password) => {
  try {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User Not Found");
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new Error("Wrong Password");
    // }
    const token = generateToken(user.id);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  } catch (error) {
    const Error = {};
    Error.error = `error at auth.service in Login ${error}`;
    return Error;
  }
};

// Forget Password
const forgotPassword = async (email) => {
  try {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
    await authRepository.saveResetToken(user.id, token, expiresAt);
    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;
    await sendEmail(
      user.email,
      "Reset Your Exclusive Password",
      `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Password Reset</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            font-family:Arial, Helvetica, sans-serif;
            background:#f5f5f5;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="padding:40px 0;"
          >
            <tr>
              <td align="center">

                <table
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background:#ffffff;
                    border-radius:12px;
                    overflow:hidden;
                    box-shadow:0 4px 12px rgba(0,0,0,0.08);
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td
                      style="
                        background:#DB4444;
                        padding:30px;
                        text-align:center;
                      "
                    >
                      <h1
                        style="
                          margin:0;
                          color:white;
                          font-size:28px;
                        "
                      >
                        Exclusive
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:40px;">

                      <h2
                        style="
                          margin-top:0;
                          color:#222;
                        "
                      >
                        Password Reset Request
                      </h2>

                      <p
                        style="
                          color:#555;
                          line-height:1.8;
                        "
                      >
                        Hello ${user.name},
                      </p>

                      <p
                        style="
                          color:#555;
                          line-height:1.8;
                        "
                      >
                        We received a request to reset your password
                        for your Exclusive account.
                      </p>

                      <p
                        style="
                          color:#555;
                          line-height:1.8;
                        "
                      >
                        Click the button below to create a new password.
                        This link will expire in <strong>15 minutes</strong>.
                      </p>

                      <div style="text-align:center; margin:40px 0;">
                        <a
                          href="${resetLink}"
                          style="
                            background:#DB4444;
                            color:#ffffff;
                            text-decoration:none;
                            padding:16px 36px;
                            border-radius:8px;
                            display:inline-block;
                            font-size:16px;
                            font-weight:600;
                            letter-spacing:0.5px;
                            font-family:Arial,sans-serif;
                            box-shadow:0 4px 12px rgba(219,68,68,.3);
                          "
                        >
                          🔐 Reset Password
                        </a>
                      </div>

                      <p
                        style="
                          color:#555;
                          line-height:1.8;
                        "
                      >
                        If you didn't request this password reset,
                        you can safely ignore this email.
                      </p>

                      <hr
                        style="
                          border:none;
                          border-top:1px solid #eee;
                          margin:30px 0;
                        "
                      />

                      <p
                        style="
                          color:#999;
                          font-size:12px;
                          word-break:break-all;
                        "
                      >
                        If the button doesn't work, copy and paste
                        the following link into your browser:
                        <br/>
                        ${resetLink}
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      style="
                        background:#fafafa;
                        text-align:center;
                        padding:20px;
                        color:#999;
                        font-size:12px;
                      "
                    >
                      © ${new Date().getFullYear()} Exclusive.
                      All rights reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    );
  } catch (error) {
    const Error = {};
    Error.error = `error at auth.service in Forgot Password ${error}`;
    return Error;
  }
};

// Reset Password
const resetPassword = async (token, newPassword) => {
  try {
    const resetToken = await authRepository.findResetToken(token);

    if (!resetToken) {
      throw new Error("Invalid token");
    }

    if (new Date(resetToken.expires_at) < new Date()) {
      throw new Error("Token expired");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await authRepository.updatePassword(
      resetToken.user_id,
      hashedPassword
    );
  } catch (error) {
    const Error = {};
    Error.error = `error at auth.service in Reset Password ${error}`;
    return Error;
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};