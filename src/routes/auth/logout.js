export async function get(req, res, next) {
  await req.logout();
  res.redirect("/login");
}
