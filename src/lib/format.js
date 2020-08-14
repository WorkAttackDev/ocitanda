const add0 = (num = 0) => (num < 10 ? "0" + num : num);

export const currecy = (value = 0) =>
  value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

export const date = (d, out = true) => {
  const date = new Date(d);

  return out
    ? `${add0(date.getDate())}-${add0(
        date.getMonth() + 1
      )}-${date.getFullYear()}`
    : `${date.getFullYear()}-${add0(date.getMonth() + 1)}-${add0(
        date.getDate()
      )}`;
};
