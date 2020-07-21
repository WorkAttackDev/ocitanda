export default ({
  id = 0,
  name = "",
  desc = "",
  price = 0,
  qty = 0,
  producer = "",
  img = "",
  deletedAt = null,
}) => ({
  id,
  name,
  desc,
  price,
  qty,
  producer,
  img,
  deletedAt,
});
