import {
  EducationPayload,
  ExperiencePayload,
  IProfile,
  ListParams,
  ListResponse,
  ProfilePayload,
} from "@/models";
import axiosClient from "./axios-client";

export const profileApi = {
  getAll(params: ListParams): Promise<ListResponse<IProfile>> {
    const url = "/profile";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<IProfile> {
    const url = `/profile/${id}`;
    return axiosClient.get(url);
  },
  getCurrentProfile(): Promise<Partial<IProfile>> {
    const url = `/profile/me`;
    return axiosClient.get(url);
  },
  create(payload: Partial<ProfilePayload>): Promise<IProfile> {
    const url = "/profile";
    return axiosClient.post(url, payload);
  },
  remove(id: string): Promise<any> {
    const url = `/profile/${id}`;
    return axiosClient.delete(url);
  },
  // experience
  createExperience(payload: Partial<ExperiencePayload>): Promise<IProfile> {
    const url = "/profile/experience";
    return axiosClient.put(url, payload);
  },
  deleteExperience(id: string): Promise<any> {
    const url = `/profile/experience/${id}`;
    return axiosClient.put(url);
  },
  //education
  createEducation(payload: Partial<EducationPayload>): Promise<IProfile> {
    const url = "/profile/education";
    return axiosClient.put(url, payload);
  },
  deleteEducation(id: string): Promise<any> {
    const url = `/profile/education/${id}`;
    return axiosClient.put(url);
  },
};
