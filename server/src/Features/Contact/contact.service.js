const sendEmail = require("../../shared/utils/sendEmail");

const sendContactMessage = async ({ name, email, subject, message }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>New Contact Message</title>
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
                      New Contact Message
                    </h2>

                    <p
                      style="
                        color:#555;
                        line-height:1.8;
                      "
                    >
                      You have received a new message through
                      the Exclusive contact form.
                    </p>

                    <!-- User Information -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        background:#fafafa;
                        border-radius:8px;
                        margin:25px 0;
                      "
                    >
                      <tr>
                        <td style="padding:15px 20px;">
                          <strong style="color:#222;">Name</strong>
                        </td>

                        <td
                          style="
                            padding:15px 20px;
                            color:#555;
                          "
                        >
                          ${name}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:15px 20px;">
                          <strong style="color:#222;">Email</strong>
                        </td>

                        <td
                          style="
                            padding:15px 20px;
                            color:#555;
                          "
                        >
                          ${email}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:15px 20px;">
                          <strong style="color:#222;">Subject</strong>
                        </td>

                        <td
                          style="
                            padding:15px 20px;
                            color:#555;
                          "
                        >
                          ${subject}
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <h3
                      style="
                        color:#222;
                        margin-bottom:10px;
                      "
                    >
                      Message
                    </h3>

                    <div
                      style="
                        background:#f9f9f9;
                        border-left:4px solid #DB4444;
                        padding:20px;
                        border-radius:6px;
                        color:#555;
                        line-height:1.8;
                        white-space:pre-line;
                      "
                    >
                      ${message}
                    </div>

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
                        line-height:1.6;
                      "
                    >
                      This email was automatically generated from
                      the Exclusive contact form.
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
  `;

  await sendEmail(process.env.EMAIL_USER, subject, html);
};

module.exports = {
  sendContactMessage,
};
