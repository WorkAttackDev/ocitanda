export function get(req, res, next) {
  req.logout();
  res.redirect("/");
}
