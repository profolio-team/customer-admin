export const VALIDATION_HELPER_ONLY_LATTER = "The valid last name shall contain only letters";
export const VALIDATION_REGEXP_ONLY_LATTER = /^[a-zA-Z]+$/g;
export const VALIDATION_HELPER_THIS_IS_REQUIRED = "This is required";
const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
export const VALIDATION_EMAIL = regex;
export const VALIDATION_EMAIL_MESSAGE = "The valid email shall contain “@“ and “.” symbols";
