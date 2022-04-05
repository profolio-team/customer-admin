export const FORM_VALIDATORS = {
  LATERS_ONLY: {
    REGEXP: /^[a-zA-Z]+$/g,
    ERROR_MESSAGE: `The field shall contain only letters`,
  },
  REQUIRED: {
    ERROR_MESSAGE: `This is required`,
  },
  EMAIL: {
    REGEXP: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
    ERROR_MESSAGE: `The valid email shall contain “@“ and “.” symbols`,
  },
};
