export const FORM_VALIDATORS = {
  PASSWORD: {
    REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    ERROR_MESSAGE: "Password or confirmation is incorrect",
  },
  LATERS_ONLY: {
    REGEXP: /^[a-zA-Z]+$/g,
    ERROR_MESSAGE: `The field shall contain only letters`,
  },
  REQUIRED: {
    ERROR_MESSAGE: `Password or confirmation is incorrect`,
  },
};

export const VALIDATORS = {
  PASSWORD: {
    required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
    minLength: {
      value: 6,
      message: "Minimum Required length is 6",
    },
    maxLength: {
      value: 20,
      message: "Maximum Required length is 20",
    },
  },
  EMAIL: {
    required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
    pattern: {
      value: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
      message: `The valid email shall contain “@“ and “.” symbols`,
    },
  },
};
