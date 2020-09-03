const PurchaseLocation = ({
  id = 0,
  purchase_id = 0,
  neighborhood = "",
  street = "",
  house = "",
  extra_phone = "",
  details = "Sem detalhes adicionais",
}) => ({
  id,
  purchase_id,
  neighborhood,
  street,
  house,
  extra_phone,
  details,
});

export default PurchaseLocation;
