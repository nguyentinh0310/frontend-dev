import { Header, Menu } from "@/components";
import React, { Fragment } from "react";

export default function MenuPage() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="not-support-menu">
            <span>Không hỗ trợ</span>
          </div>
        </div>
      </div>
      <Header />
      <Menu />
    </Fragment>
  );
}
