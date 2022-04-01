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

export interface UserInfoDB {
  firstName?: string;
  lastName?: string;
  linkedInUrl?: string;
  about?: string;
  phone?: string;
}
