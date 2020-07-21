import { vNotEmpty, vIsNumeric } from "../lib/validation";
//   validated: (value) =>
const Input = (
    label = "",
    name = "",
    validators = [],
    value,
    disabled = true,
    type = "text",
) => ({ type, label, name, validators, value, disabled });

const SelectDropDown = (label = "", items)=> {items, label}

export const ProductForm = [
  Input("Nome", "name", [vNotEmpty], (name = "") => name),
  Input("Preço", "price", [vIsNumeric], (price = 0) => price, "number"),
  Input("Quantidade", "qty", [vIsNumeric], (qty = 0) => qty, "number"),
  Input("Descrição", "desc", [vNotEmpty], (desc = "") => desc, "area"),
  Input("Nome", "name", [vIsNumeric], (name = "") => name),
  SelectDropDown("Categorias", (ctgs)=> ctgs),
  SelectDropDown("Produtores", (prods)=> prods),
];
