/*
    Custom user claims
    This information stored in user's token
    Limit: Whole size of claims is 1000 bytes
*/
export interface AuthCustomClaims {
  /* 
   List of domain where user involve
   Example: ['epam', 'yandex']
  */
  domains: string[];
}
