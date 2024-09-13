const nodemailer = require("nodemailer");
require("dotenv").config();

const mailConfig = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });
}

async function sendRecipeEmail(user, recipe) {
  try {
    const transporter = mailConfig();

    const mailOptions = {
      from: '"RecipeApp" <dhavalpathak14@gmail.com>',
      to: user.email,
      subject: 'New Recipe Suggestion',
      text: `Hi ${user.email}, we have a new recipe suggestion for you: ${recipe.title}`,
      html: `<p>Hi ${user.email}, we have a new recipe suggestion for you: <strong>${recipe.title}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return { message: 'Recipe generated and email sent!', recipe };
  } catch (error) {
    console.error('Error sending email:', error);
    // throw new Error('An error occurred while sending the email');
  }
}


async function sendWelcomeEmail(user) {
  try {
    const transporter = mailConfig();

    const mailOptions = {
      from: '"RecipeApp" <dhavalpathak14@gmail.com>',
      to: user.email,
      subject: 'Welcome to RecipeApp!',
      html: `
        <h1>Welcome to RecipeApp, ${user.email}!</h1>
        <p>We’re so excited to have you onboard! 🎉</p>
        <p>Here's what you can do with RecipeApp:</p>
        <ul>
          <li>Generate personalized recipes based on your preferences.</li>
          <li>Save your favorite recipes for easy access.</li>
          <li>Get notified about new and exciting recipes tailored just for you!</li>
        </ul>
        <p>Let’s get cooking! 🍳</p>
        <p>Cheers,<br>The RecipeApp Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // throw new Error('An error occurred while sending the welcome email');
  }
}


// Export the function
module.exports = {
  sendRecipeEmail, sendWelcomeEmail
};
