export const currecy = (value = 0)=> value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');