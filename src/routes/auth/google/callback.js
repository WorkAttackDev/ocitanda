import { compose } from "compose-middleware";
import passport from "passport";
export const get = compose([
  passport.authenticate("google", {
    failureRedirect: "/login/error",
  }),
  (req, res) => {
    res.redirect("/");
  },
]);
