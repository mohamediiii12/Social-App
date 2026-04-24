export interface RegisterUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}
export interface RegisterSuccess {
  success: boolean;
  message: string;
  data: Data;
}
export interface RegisterError {
  success: boolean;
  message: string;
  error: string;
}

export interface Data {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: RegisterUser;
}
export interface RegisterBody {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  rePassword: string;
}
export type RegisterResponse = RegisterSuccess | RegisterError;
