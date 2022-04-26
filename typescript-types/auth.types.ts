/*
  Custom user claims
  This information stored in user's token

  domains: List of companies where user involve
  Example: ['epam', 'yandex']
*/
export interface AuthCustomClaims {
  domains: string[];
}
