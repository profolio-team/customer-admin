export interface testDataTypeWithAllTypes {
  stringExample: string;
  booleanExample: boolean;
  numberExample: number;
  arrayExample: string[];
  nullExample: null;
  objectExample: Record<string, string>;
}

export interface User {
  fullName: string;
  photoURL: string | null;
  username: string;
  email: string;
}

export interface UserInfo {
  firstName?: string;
  lastName?: string;
  phone?: string;
  about?: string;
}
