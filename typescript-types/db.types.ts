export interface testDataTypeWithAllTypes {
  stringExample: string;
  booleanExample: boolean;
  numberExample: number;
  arrayExample: string[];
  nullExample: null;
  objectExample: Record<string, string>;
}

export interface CompanyVerificationDB {
  // email is key
  domain: string;
  isVerified: boolean;
}

export interface IUserInfoDB {
  firstName?: string;
  lastName?: string;
  linkedInUrl?: string;
  about?: string;
  phone?: string;
}

export interface ICompanyInfoDB {
  name?: string;
  email?: string;
  logoUrl?: string;
  about?: string;
  phone?: string;
  template?: string;
}
