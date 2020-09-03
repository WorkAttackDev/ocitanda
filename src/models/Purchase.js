import { api } from "../api";

const Purchase = ({
  id = 0,
  purchase_date = new Date(),
  quantity = 0,
  consumer_id = 0,
  code = "",
  paid = false,
  delivered = false,
  products = [],
}) => ({
  purchase_date,
  code,
  paid,
  quantity,
  consumer_id,
  id,
  delivered,
  products,
});

const fromPurchaseProduct = (_p) => {
  const purchaseProductId = _p.id;
  delete _p.id;
  const img = api + _p.product.image_url;
  delete _p.product.image_url;

  return {
    ..._p.product,
    purchaseProductId,
    img,
    count: _p.count,
  };
};

export const purchasefromAPI = (data) =>
  Purchase({
    code: data.code,
    consumer_id: data.consumer_id,
    delivered: data.delivered,
    id: data.id,

    paid: data.paid,
    products: data.products.map(fromPurchaseProduct),
    purchase_date: data.purchase_date,
    quantity: data.quantity,
  });

export default Purchase;
