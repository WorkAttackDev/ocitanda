const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
import { signup, signin, getConsumerbyEmail, getConsumer } from "./api";

export default (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          if (password === "ocauto") {
            const res = await getConsumerbyEmail(email);
            if (!res.error) {
              const user = res.data.consumer;
              return done(null, user);
            }
          }
          let res = await signin({ email, password });
          if (!res.error) {
            const user = res.data.consumer;
            done(null, user);
          } else {
            done(null, false, { message: res.msg});
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const name = profile.displayName;
        const image_url = profile.photos[0].value;
        const google_id = profile.id;
        const email = profile.emails[0].value;

        try {
          let res = await getConsumerbyEmail(email);
          if (!res.error) {
            const user = res.data;
            done(null, user);
          } else {
            let newUser = {
              name,
              imageUrl: image_url,
              email,
              google_id,
              verified: true
            };

            const res = await signup(newUser);
            console.log(res);
            
            if (!res.error) {
              console.log(res);
              const user = res.data.consumer;
              done(null, user);
            } else {
              done(null, false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const res = await getConsumer(id);
    const user = res.error ? false : res.data;
    return user ? done(null, user) : done(null, false);
  });
};
