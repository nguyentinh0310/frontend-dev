import { profileApi } from "@/api-client/profile-api";
import { useProfile } from "@/hooks";
import { IEducation, IExperience } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { InputField, SelectField } from "../common";
import { EducationModal, ExperienceModal } from "../modal";
import dataCity from "./data.json";

export function EditFormProfile() {
  const schema = yup.object().shape({
    location: yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
    bio: yup.string().required("Bio không để trống"),
    skills: yup.string().required("Kỹ năng không để trống"),
  });
  const router = useRouter();
  const { id } = router.query;

  const { profile, mutateProfile } = useProfile(id);
  const isEdit = Boolean(profile?._id);
  const initState = isEdit
    ? {
        location: profile?.location,
        bio: profile?.bio,
        skills: profile?.skills,
      }
    : {
        location: "",
        bio: "",
        skills: "",
      };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initState,
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: any) => {
    try {
      console.log(values);
      await profileApi.create(values);
      await mutateProfile();
      toast.success("Tạo trang cá nhân thành công!");
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

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
    <Form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="needs-validation"
      noValidate
    >
      <div className="mb-2 address">
        <label>
          <i className="fa-solid fa-location-dot"></i> Địa chỉ
        </label>
        {Array.isArray(dataCity) && dataCity.length > 0 && (
          <SelectField name="location" control={control} options={dataCity} />
        )}
      </div>
      <div className="mb-2 bio">
        <label>Bio</label>
        <InputField name="bio" control={control} placeholder="" />
      </div>
      <div className="mb-2 skills">
        <label>
          <i className="fa-solid fa-atom"></i> Kỹ năng
        </label>
        <InputField name="skills" control={control} placeholder="" />
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
      {/* <div className="social">
        <label>
          <i className="fa-solid fa-earth-asia"></i> Mạng xã hội khác
        </label>
        <SocailModal/>
      </div> */}
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-updated"
          disabled={isSubmitting}
        >
          Xác nhận&nbsp;
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
        </button>
      </div>
    </Form>
  );
}
