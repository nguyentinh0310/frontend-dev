import * as React from "react";
import { EducatioModal } from "../modal";

export interface EditFormProfileProps {}

export function EditFormProfile(props: EditFormProfileProps) {
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
        <EducatioModal />
      </div>
      {/* <div className="list-education mb-3">
        <div className="item">
          <span className="name-school">Trường đại học thủy lợi</span>
          <span className="year">2018-2020</span>
          <button className="btn btn-outline-danger">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div> */}
      <div className="mb-2 experience">
        <label>
          <i className="fa-solid fa-medal"></i> Kinh nghiệm
        </label>
        <button className="btn btn-edit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="social">
        <label>
          <i className="fa-solid fa-earth-asia"></i> Mạng xã hội khác
        </label>
        <button className="btn btn-edit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  );
}
