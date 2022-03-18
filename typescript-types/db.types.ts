export interface testDataTypeWithAllTypes {
  stringExample: string;
  booleanExample: boolean;
  numberExample: number;
  arrayExample: string[];
  nullExample: null;
  objectExample: Record<string, string>;
}

export interface UserInfoDB {
  firstName?: string;
  lastName?: string;
  linkedInUrl?: string;
  about?: string;
  phone?: string;
}
