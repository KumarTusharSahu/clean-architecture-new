import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../Frameworks/Mongodb/Database";

// Google strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1048534823626-2b2lo4ua7qg1bsrejpti52n652ea3ibh.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        let user = await User.findOne({ googleId: profile.id });
        console.log(user);
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value || null,
          });
        }
        
        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
      }
    }
  )
);

// Serialize user to maintain session
passport.serializeUser((id, done) => {
  done(null, id); // Ensure user is of type IUser
});
// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error during user deserialization:", error);
    done(error, null);
  }
});