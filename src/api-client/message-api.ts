import { IMessage, ListParams, ListResponse, MessagePayload } from "@/models";
import axiosClient from "./axios-client";

export const messagesApi = {
  getAll(params: ListParams, id: string): Promise<ListResponse<IMessage>> {
    const url = `/messages/${id}`;
    return axiosClient.get(url, { params });
  },
  create(payload: MessagePayload): Promise<IMessage> {
    const url = "/messages";
    return axiosClient.post(url, payload);
  },
  remove(id: string): Promise<any> {
    const url = `/messages/${id}`;
    return axiosClient.delete(url);
  },
};
