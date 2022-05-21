import { IConversation, ListParams, ListResponse } from "@/models";
import axiosClient from "./axios-client";

export const conversationsApi = {
  getAll(params: ListParams): Promise<ListResponse<IConversation>> {
    const url = "/conversations";
    return axiosClient.get(url, { params });
  },
  remove(id: string): Promise<any> {
    const url = `/conversations/${id}`;
    return axiosClient.delete(url);
  },
  isRead(id: string): Promise<any> {
    const url = `/conversations/isRead/${id}`;
    return axiosClient.put(url);
  },
  isUnReadConv(id: string): Promise<any> {
    const url = `/conversations/isUnRead/${id}`;
    return axiosClient.put(url);
  },
};
