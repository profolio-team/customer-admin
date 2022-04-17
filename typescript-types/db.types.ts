export interface UserInfo extends User {
  linkedInUrl: string;
  about: string;
  phone: string;
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
export interface DepartmentInfo {
  users?: any;
  name: string;
  head: string;
}
export interface AdminUserInfo extends User {
  location: string;
  role: string;
  job: string;
  grade: string;
  departmentID: string;
  project: string;
  isActive: boolean;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface fullUserInfo extends User, AdminUserInfo, UserInfo {}
