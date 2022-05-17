import { userApi } from "@/api-client";
import { useAuth } from "@/hooks";
import { capitalizeFirstLetter, checkImage, imageUpload } from "@/utils";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function UserEditForm() {
  const { auth, mutateAuth } = useAuth();
  const isEdit = Boolean(auth?._id);
  const initState = isEdit
    ? {
        fullname: auth?.fullname,
        gender: auth?.gender,
      }
    : {
        fullname: "",
        gender: "",
      };
  const [userData, setUserData] = useState(initState);
  const { fullname, gender } = userData;
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);

  const changeAvatar = (e: any) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) toast.error(err);
    setAvatar(file);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let media: any;
      if (avatar) {
        media = await imageUpload([avatar]);
        await userApi.update({
          ...userData,
          fullname: capitalizeFirstLetter(fullname),
          avatar: media[0].url,
        });
        mutateAuth();
      } else {
        await userApi.update({
          ...userData,
          fullname: capitalizeFirstLetter(fullname),
        });
        mutateAuth();
      }
      setLoading(false);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      setLoading(false);
      toast.error("Cập nhật thất bại!");
    }
  };

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  return (
    <form onSubmit={handleSubmit}>
      <h4>Cập nhật cá nhân</h4>
      <div className="info-avatar">
        <span className="avatar">
          <img src={avatar ? URL.createObjectURL(avatar) : auth?.avatar} />
        </span>
        <span className="upload">
          <i className="fas fa-camera"></i>
          <p>Thay đổi</p>
          <input
            type="file"
            name="file"
            id="file-up"
            accept="image/*"
            onChange={changeAvatar}
          />
        </span>
      </div>
      <div className="fullname">
        <label>Họ Tên:</label>
        <input
          type="type"
          name="fullname"
          value={fullname}
          onChange={handleOnChange}
        />
        <small className="text-danger text-count">
          {auth?.fullname.length}/25
        </small>
      </div>

      <div className="gender">
        <label className="form-label">Giới tính:</label>
        &nbsp;
        <div className="select">
          <select
            name="gender"
            id="gender"
            value={gender}
            className="form-select"
            onChange={handleOnChange}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-updated"
          disabled={loading ? true : false}
        >
          Cập nhật&nbsp;
          {loading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
        </button>
      </div>
    </form>
  );
}
