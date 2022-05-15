import { profileApi } from "@/api-client/profile-api";
import { useProfile } from "@/hooks";
import { IEducation, IExperience } from "@/models";
import moment from "moment";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
import { EducationModal, ExperienceModal, SocailModal } from "../modal";

export function EditFormProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { profile, mutateProfile } = useProfile(id);

  const handleDeleteEduction = async (eduction: IEducation) => {
    console.log(eduction);
    try {
      await profileApi.deleteEducation(eduction?._id);
      await mutateProfile();
      toast.success("Xóa học vấn thành công");
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  const handleDeleteExperience = async (experience: IExperience) => {
    try {
      await profileApi.deleteExperience(experience?._id);
      await mutateProfile();
      toast.success("Xóa kinh nghiệm thành công");
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };


  return (
    <>
      <div className="mb-2 address">
        <label>
          <i className="fa-solid fa-location-dot"></i> Địa chỉ
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Thành phố Hà Nội"
        />
      </div>
      <div className="mb-2 bio">
        <label>Bio</label>
        <input
          type="text"
          className="form-control"
          placeholder="Mô tả tiểu sử"
        />
      </div>
      <div className="mb-2 skills">
        <label>
          <i className="fa-solid fa-atom"></i> Kỹ năng
        </label>
        <input type="text" className="form-control" placeholder="Kỹ năng" />
      </div>
      <div className="mb-2 education">
        <label>
          <i className="fa-solid fa-graduation-cap"></i> Học vấn
        </label>
        <EducationModal />
      </div>
      {profile && profile?.educations.length > 0 && (
        <div className="list-education mb-3">
          {profile?.educations.map((eduction: IEducation) => (
            <div className="item" key={eduction?._id}>
              <span className="name-school">{eduction?.school}</span>
              <span className="year">
                {moment(eduction?.from).format("DD/MM/YYYY")} -&nbsp;
                {moment(eduction?.to).format("DD/MM/YYYY")}
              </span>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDeleteEduction(eduction)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mb-2 experience">
        <label>
          <i className="fa-solid fa-medal"></i> Kinh nghiệm
        </label>
        <ExperienceModal />
      </div>
      {profile?.experiences.length > 0 && (
        <div className="list-education mb-3">
          {profile?.experiences.map((experience: IExperience) => (
            <div className="item" key={experience?._id}>
              <span className="name-school">{experience?.title}</span>
              <span className="name-company">{experience?.company}</span>
              <span className="year">
                {moment(experience?.from).format("DD/MM/YYYY")} -&nbsp; 
                {moment(experience?.to).format("DD/MM/YYYY")}
              </span>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDeleteExperience(experience)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="social">
        <label>
          <i className="fa-solid fa-earth-asia"></i> Mạng xã hội khác
        </label>
        <SocailModal/>
      </div>
    </>
  );
}
