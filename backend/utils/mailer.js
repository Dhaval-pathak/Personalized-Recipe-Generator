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
      from: '"MealMaker" <dhavalpathak14@gmail.com>',
      to: user.email,
      subject: 'Your Delicious Recipe Suggestion: ' + recipe.title,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #e67e22; text-align: center;">🍲 New Recipe Suggestion: ${recipe.title} 🍲</h2>
        <p>Hi ${user.email},</p>
        <p>We’ve prepared a new recipe for you, and it’s packed with flavors! Check it out below:</p>

        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h3 style="color: #e74c3c;">${recipe.title}</h3>
          <p><strong>Summary:</strong> ${recipe.summary}</p>

          <h4 style="color: #2ecc71;">🛒 Ingredients:</h4>
          <ul style="padding-left: 20px;">
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>

          <h4 style="color: #3498db;">👩‍🍳 Steps to Prepare:</h4>
          <ol style="padding-left: 20px;">
            ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
          </ol>

          <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
          <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        </div>

        <p style="text-align: center;">Enjoy your cooking! 🍽️</p>
        <p style="text-align: center; color: #7f8c8d; font-size: 12px;">MealMaker - Bringing Delicious Recipes to Your Inbox</p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return { message: 'Recipe generated and email sent!', recipe };
  } catch (error) {
    console.error('Error sending email:', error);
  }
}



async function sendWelcomeEmail(user) {
  try {
    const transporter = mailConfig();

    const mailOptions = {
      from: '"MealMaker" <dhavalpathak14@gmail.com>',
      to: user.email,
      subject: '🎉 Welcome to MealMaker! Let’s Get Cooking 🍽️',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
          <h1 style="color: #2c3e50; font-size: 28px; text-align: center;">Welcome to MealMaker, ${user.email}!</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #555; text-align: center;">We’re thrilled to have you join us on this culinary journey! 🎉</p>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h2 style="color: #e67e22; font-size: 20px;">Here's What You Can Do:</h2>
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;">
                <strong>🍲 Generate Personalized Recipes:</strong> Tailor your meals to your taste and dietary preferences.
              </li>
              <li style="margin-bottom: 10px;">
                <strong>❤️ Save Your Favorites:</strong> Keep all your favorite recipes in one place for easy access.
              </li>
              <li>
                <strong>🔔 Get Notified:</strong> Receive updates on new and exciting recipes just for you!
              </li>
            </ul>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #555; text-align: center; margin-top: 30px;">Ready to explore? Let’s get cooking! 🍳</p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://example.com/start-cooking" style="background-color: #e67e22; color: white; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 4px;">Start Cooking</a>
          </div>

          <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">
            Cheers,<br>The MealMaker Team
          </p>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;" />

          <p style="font-size: 12px; color: #999; text-align: center;">
            You’re receiving this email because you signed up for MealMaker. If you didn’t expect this email, please let us know.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}


module.exports = {
  sendRecipeEmail, sendWelcomeEmail
};
