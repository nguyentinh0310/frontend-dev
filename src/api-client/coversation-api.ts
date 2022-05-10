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
};
