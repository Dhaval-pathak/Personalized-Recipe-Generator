const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config(); 

function setupGoogleStrategy() {
  try {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,   // Load from env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Load from env
      callbackURL: "/auth/google/callback"  // Your redirect URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { email: profile.emails[0].value } });

        if (!user) {
            user = await prisma.user.create({
              data: {
                email: profile.emails[0].value,
                name: profile.displayName,
                oauthProvider: "google",
              },
            });
          }
          

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }));

    console.log("Google OAuth configured successfully");
  } catch (error) {
    console.error("Error configuring Google OAuth:", error.message);
    // Gracefully handle the error so that the rest of the app works
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = setupGoogleStrategy;
