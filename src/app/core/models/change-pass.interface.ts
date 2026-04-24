
export interface passBody {
  password: string;
  newPassword: string;
}

 export interface ChangePassResponseError {
  success: boolean;
  message: string;
  errors: string;
}
export interface ChangePassResponseSuccess {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  token: string;
  tokenType: string;
  expiresIn: string;
}
export type ChangePassResponse = ChangePassResponseError | ChangePassResponseSuccess;