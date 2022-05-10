import React from "react";

export  function NotifyModal() {
  return (
    <div className="dropdown-notify">
      <div className="dropdown">
        <div className="dropdown-title">
          <h4>Thông báo</h4>
          <a>Hiển thị tất cả</a>
        </div>
        <div className="menu row">
          <a className="menu-item ">
            <span className="col-lg-3 col-sm-5 avatar-item">A</span>

            <span className="col-lg-10 col-sm-10 text">
            I Love You I Love You I Love You I Love You I Love You
            </span>
          </a>
        </div>
        <div className="dropdown-footer">
          <span>Đã đọc</span>
        </div>
      </div>
    </div>
  );
}
