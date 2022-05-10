import { MainLayout } from "@/components";
import { NextPageWithLayout } from "@/models";
import React from "react";

const SettingPage: NextPageWithLayout = () => {
  return (
    <section className="setting-page">
      <form className="change-password">
        <h4>Đổi mật khẩu:</h4>
        <div className="mb-2 row">
          <label className="col-lg-3 col-sm-12 col-form-label">Mật khẩu:</label>
          <div className="col-lg-9 col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="******"
            />
          </div>
        </div>
        <div className="mb-2 row">
          <label className="col-lg-3 col-sm-12 col-form-label">
            Nhập lại mật khẩu:
          </label>
          <div className="col-lg-9 col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="******"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-pass">
            Xác nhận
          </button>
        </div>
      </form>

      <div className="dark-mode">
        <h4>Chế độ màn hình:</h4>
        <div className="btn-toggle-bg">
          <input type="checkbox" className="checkbox" id="theme" />
          <label className="label" htmlFor="theme">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <div className="ball"></div>
          </label>
        </div>
      </div>
    </section>
  );
};
SettingPage.Layout = MainLayout;

export default SettingPage;
