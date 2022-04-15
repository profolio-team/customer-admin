import { Timestamp } from "@firebase/firestore-types";
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

export interface UserRoles {
  isAdmin?: boolean;
  isOwner?: boolean;
}

export interface CompanyVerification {
  confirmCompanyHash: string;
  isVerified: boolean;
  createdAt: Timestamp;
}

export interface UserInvite extends UserRoles {
  domain: string;
  email: string;
  confirmUserHash: string;
  createdAt: Timestamp;
}
