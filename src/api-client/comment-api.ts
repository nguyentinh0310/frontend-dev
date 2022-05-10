import { CommentPayload, IComment } from "@/models";
import axiosClient from "./axios-client";

export const commentApi = {
  create(payload: CommentPayload): Promise<IComment> {
    const url = "/comment";
    return axiosClient.post(url, payload);
  },
  update(id: any, payload: CommentPayload): Promise<IComment> {
    const url = `/comment/${id}`;
    return axiosClient.put(url, payload);
  },
  remove(id: string): Promise<any> {
    const url = `/comment/${id}`;
    return axiosClient.delete(url);
  },
  likeComment(id: string): Promise<any> {
    const url = `/comment/${id}/like`;
    return axiosClient.put(url);
  },
  unlikedComment(id: string): Promise<any> {
    const url = `/comment/${id}/unlike`;
    return axiosClient.put(url);
  },
};
