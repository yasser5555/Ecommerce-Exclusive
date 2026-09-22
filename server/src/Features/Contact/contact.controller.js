const {
  sendContactMessage,
} = require("./contact.service");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    await sendContactMessage({
      name,
      email,
      subject,
      message,
    });
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    throw new Error(`Error t Contact.controller ${error}`);
  }
};

module.exports = {
  createContactMessage,
};