import { IProfile } from "@/models";
import { capitalizeFirstLetter } from "@/utils";
import React from "react";

export interface ProfileIntroProps {
  profile: IProfile;
}

export function ProfileIntro({ profile }: ProfileIntroProps) {
  return (
    <div className="pofile-info">
      <h4>Giới thiệu</h4>
      {profile?.bio && <div className="profile-bio pb-2">{profile?.bio}</div>}
      <div className="info">
        {profile?.location && (
          <p className="address mt-2">
            <i className="fa-solid fa-location-dot"></i> Địa chỉ:&nbsp;
            <span className="description">{profile?.location}</span>
          </p>
        )}
        {profile?.educations[0] && (
          <p className="education">
            <i className="fa-solid fa-graduation-cap"></i> Học vấn:&nbsp;
            <span className="description">
              {profile?.educations[0]?.school}
            </span>
          </p>
        )}
        {profile?.experiences[0] && (
          <p className="experience">
            <i className="fa-solid fa-medal"></i> Kinh nghiệm:&nbsp;
            <span className="description">
              {profile?.experiences[0]?.title}
            </span>
          </p>
        )}
        {profile?.skills.length > 0 && (
          <p className="skills">
            <i className="fa-solid fa-atom"></i> Kỹ năng:&nbsp;
            {profile?.skills.map((skill: string) => (
              <span className="description" key={skill}>
                {capitalizeFirstLetter(skill)}&nbsp;
              </span>
            ))}
          </p>
        )}
        {profile?.socail && (
          <p className="socail">
            <i className="fa-solid fa-earth-asia"></i> Mạng xã hội khác:&nbsp;
            <span className="description">
              {Object.values(profile?.socail).map((sc: string) => (
                <a href={`${sc}`} key={sc} className="mr-1" target="_blank">
                  {sc} &nbsp;
                </a>
              ))}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
