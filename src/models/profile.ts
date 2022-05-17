export interface IProfile {
  _id: string;
  user: string;
  location: string;
  skills: string[];
  bio: string;
  experiences: IExperience[];
  educations: IEducation[];
  socail: ISocial;
}

export interface ProfilePayload {
  location: string;
  bio?: string;
  skills?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  github?: string;
}

export interface IExperience {
  _id: string;
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}
export interface IEducation {
  _id: string;
  school: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface ISocial extends Record<string, string> {
  twitter: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  github: string;
}

export interface ExperiencePayload {
  title: string;
  company: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface EducationPayload {
  school: string;
  fieldofstudy?: string;
  from: Date;
  to: Date;
  current?: boolean;
  description?: string;
}
