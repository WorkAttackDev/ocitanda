import { compose } from "compose-middleware";
import passport from "passport";
export const get = compose([
  passport.authenticate("google", {
    scope: ["openid", "email", "profile"],
  }),
]);
