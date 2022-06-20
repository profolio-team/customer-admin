/*
  Name: CompanyInfo
  Path: companies/${companyName}/config/CompanyInfo/
  Example: companies/epam/config/CompanyInfo/
  This is main information about specific company
*/
export interface CompanyInfo {
  name: string;
  email: string;
  logoUrl: string;
  about: string;
  phone: string;
  template: string;
}

/*
  Name: CompanyVerification
  Path: companyVerification/{companyName}/
  Example: companyVerification/epam/
  When user have registered company.
  After sign up. We have to create record in this document
  hash: is uniq string which will used for send by email and confirm company

  Using this record we are able to start setup company structure
*/
export interface CompanyVerification {
  confirmCompanyHash: string;
  isVerified: boolean;
}

export interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  linkedInUrl: string;
  about: string;
  phone: string;
}

/*
  Name: UserInfo
  Path: companies/${companyName}/users/{uid}/
  Example: companies/epam/users/JAS2FEk2VmNRv1tNTMVXPRZ0lcI2/
  Full info about user in company
*/

export interface UserInfo extends UserPersonalInfo {
  job: string;
  grade: string;
  location: string;
  role: string;
  isActive: boolean;
  departmentID?: string;
}

/*
  Name: UserInvitationData
  Path: userInvite/${randomDocId}/
  Example: userInvite/xvlSZASbSYFxTNEHrash/

  This collection is place where we store information about invites.
  For example we want to invite user with email: abc@epan.com for epam company
  We have to create record in this collection with uniq hash
  And send this hash to email.
  Hash is need for verify email
*/
export interface UserInvitationData {
  domain: string;
  inviteUserHash: string;
  userInfo: UserInfo;
}

/*
  Name: ResetUserPassword
  Path: userResetPassword/${randomDocId}/
  Example: userResetPassword/TTDF7HtZM2sIjXS6S0kW/

  This collection is the place where we store information about request for reset password.
  If user forgot their password, their can call cloud function
  Cloud function have to create this record with uniq hash
  Hash is need for verify email
*/
export interface ResetUserPassword {
  email: string;
  resetPasswordUserHash: string;
}

export interface DepartmentInfo {
  name: string;
  headID?: string;
}
