const ConsumerLocation = ({
  id = 0,
  consumer_id = 0,
  neighborhood = "",
  street = "",
  house = "",
  extra_phone = "",
  details = "Sem detalhes adicionais",
  deleted = false,
}) => ({
  id,
  consumer_id,
  neighborhood,
  street,
  house,
  extra_phone,
  details,
  deleted
});

export const fromApiToConsumerLocationList = (datas = []) =>
  datas.map((_cl) => ConsumerLocation(_cl));

export default ConsumerLocation;
