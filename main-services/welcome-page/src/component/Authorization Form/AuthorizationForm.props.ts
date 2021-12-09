import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface AuthorizationFormProps extends
  DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
    >{
  form: 'CreateAccount' | 'signIn' | 'RecoveryPassword'
}
