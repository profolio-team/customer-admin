export interface UserInfo {
  firstName: string;
  lastName: string;
  linkedInUrl: string;
  about: string;
  phone: string;
  email: string;
}

export interface CompanyInfo {
  name: string;
  email: string;
  logoUrl: string;
  about: string;
  phone: string;
  template: string;
}

export interface CustomClaims {
  domain: string;
  isAdmin?: boolean;
  isOwner?: boolean;
}
