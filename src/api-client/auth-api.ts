import {
  ForgotPasswordPayload,
  IUser,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  TokenData
} from "@/models";
import axiosClient from "./axios-client";

export const authApi = {
  register(payload: RegisterPayload): Promise<any> {
    return axiosClient.post("/auth/register", payload);
  },
  activeAccount(activation_token: any) {
    return axiosClient.post("/auth/active", activation_token);
  },
  login(payload: LoginPayload): Promise<TokenData> {
    return axiosClient.post("/auth/login", payload);
  },
  logout() {
    return axiosClient.post("/auth/logout");
  },
  getCurrentLogginUser(): Promise<IUser> {
    return axiosClient.get("/auth");
  },
  forgotPassword(payload: ForgotPasswordPayload) {
    return axiosClient.post("/auth/forgot-password", payload);
  },
  resetPassword(payload: ResetPasswordPayload, token: any): Promise<any> {
    return axiosClient.post("/auth/reset-password", payload, token);
  },
  refreshToken(payload: string): Promise<TokenData> {
    return axiosClient.post("/auth/refresh-token", payload);
  },
};
