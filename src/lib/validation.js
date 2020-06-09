import isEmpty from "validator/lib/isEmpty";
import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";

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
