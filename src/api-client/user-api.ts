import { IUser, ListParams, ListResponse, RegisterPayload } from "@/models";
import axiosClient from "./axios-client";

export const userApi = {
  getAll(params?: ListParams): Promise<ListResponse<IUser>> {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
  getById(id: string | number): Promise<IUser> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  search(keyword: any): Promise<IUser> {
    const url = `/users/search?keyword=${keyword}`;
    return axiosClient.get(url);
  },
  suggestUser(params?: ListParams): Promise<ListResponse<IUser>> {
    const url = "/users/suggest_user";
    return axiosClient.get(url, { params });
  },
  create(payload: RegisterPayload): Promise<any> {
    return axiosClient.post("/users", payload);
  },
  update(payload: Partial<IUser>): Promise<IUser> {
    const url = `/users`;
    return axiosClient.put(url, payload);
  },
  updateRole(payload: Partial<IUser>): Promise<IUser> {
    const url = `/users/update_role/${payload._id}`;
    return axiosClient.put(url, payload);
  },
  remove(id: string | number): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
  removeMany(ids: string[]): Promise<any> {
    const url = `/users`;
    return axiosClient.delete(url, { data: ids });
  },
  // follow
  follow(id: string | number): Promise<any> {
    const url = `/users/follow/${id}`;
    return axiosClient.put(url);
  },
  unFollow(id: string | number): Promise<any> {
    const url = `/users/unfollow/${id}`;
    return axiosClient.put(url);
  },
  // friend
  friend(id: string | number): Promise<any> {
    const url = `/users/friend/${id}`;
    return axiosClient.post(url);
  },
  acceptFriend(id: string | number): Promise<any> {
    const url = `/users/friend/${id}`;
    return axiosClient.put(url);
  },
  unFriend(id: string | number): Promise<any> {
    const url = `/users/friend/${id}`;
    return axiosClient.delete(url);
  },
};
