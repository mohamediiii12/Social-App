
export interface LoginUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}
export interface LoginSuccess {
  success: boolean;
  message: string;
  data: LoginData;
}
    
export interface LoginData {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: LoginUser;
}

export interface LoginError {
  success: boolean;
  message: string;
  errors: string;
}
export interface LoginBody {
  email: string;
  password: string;
}


export type LoginResponse = LoginSuccess | LoginError;