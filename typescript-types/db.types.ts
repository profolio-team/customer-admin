export interface CompanyInfo {
  name: string;
  email: string;
  logoUrl: string;
  about: string;
  phone: string;
  template: string;
}

export interface CompanyVerification {
  confirmCompanyHash: string;
  isVerified: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  linkedInUrl: string;
  about: string;
  phone: string;
  email: string;
}

export interface UserRoles {
  isAdmin: boolean;
  isOwner: boolean;
}
export interface UserInvite extends UserRoles {
  domain: string;
  email: string;
  inviteUserHash: string;
}

export interface ResetUserPassword {
  email: string;
  resetPasswordUserHash: string;
}
