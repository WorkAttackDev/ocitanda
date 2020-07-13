import { compose } from "compose-middleware";
import passport from "passport";

export const post = compose([
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login/error",
  }),
]);
