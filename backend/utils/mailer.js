// mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();
async function sendRecipeEmail(user, recipe) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"RecipeApp" <dhavalpathak14@gmail.com>',
      to: user.email, // Sending email to the user
      subject: 'New Recipe Suggestion',
      text: `Hi ${user.email}, we have a new recipe suggestion for you: ${recipe.title}`,
      html: `<p>Hi ${user.email}, we have a new recipe suggestion for you: <strong>${recipe.title}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return { message: 'Recipe generated and email sent!', recipe };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('An error occurred while sending the email');
  }
}


// Export the function
module.exports = {
  sendRecipeEmail,
};
