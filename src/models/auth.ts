export interface RegisterPayload {
  fullname: string;
  account: string;
  password: string;
  gender: "male" | "female";
}
export interface LoginPayload {
  account: string;
  password: string;
}

export interface ForgotPasswordPayload {
  account: string;
}
export interface ResetPasswordPayload {
  password: string;
}
