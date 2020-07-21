import isEmpty from "validator/lib/isEmpty";
import isAlpha from "validator/lib/isAlpha";
import isNumeric from "validator/lib/isNumeric";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

export const vEmail = {
  errorMsg: "Email inválido!",
  validator: (email) => isEmail(email),
};
export const vNotEmpty = {
  errorMsg: "Campo de texto vázio!",
  validator: (text) => !isEmpty(text),
};

export const vAlpha = {
  errorMsg: "Digite somente letras!",
  validator: (text) => isAlpha(text),
};

export const vIsNumeric = {
  errorMsg: "Digite somente números!",
  validator: (text) => isNumeric(text),
};

export const vLength = (min = 1) => ({
  errorMsg: "Digite no minimo " + min + " caractéres",
  validator: (text) => isLength(text, { min }),
});
