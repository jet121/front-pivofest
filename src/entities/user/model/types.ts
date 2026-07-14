export interface User {
  auth_key: string;
  user_id: number;
  fullname: string;
  email: string;
  msisdn: string;
}

export interface UserState {
  user: User | null;
}
