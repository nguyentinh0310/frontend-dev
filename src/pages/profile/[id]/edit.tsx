import { EditFormProfile, MainLayout, Seo, UserEditForm } from "@/components";
import { useAuth, useNotify } from "@/hooks";
import { NextPageWithLayout } from "@/models";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const EditProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useAuth();
  const { notifies } = useNotify();

  return (
    <Fragment>
      <Seo
        data={{
          title: `${
            notifies?.totalRows > 0 ? `(${notifies?.totalRows})` : ""
          } Chỉnh sửa cá nhân`,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      {auth?._id === id && (
        <div className="edit-profile-page">
          <UserEditForm />
          <hr />
          <div className="edit-production">
            <h4>Chỉnh sửa giới thiệu</h4>
            <EditFormProfile />
          </div>
        </div>
      )}
    </Fragment>
  );
};
EditProfilePage.Layout = MainLayout;

export default EditProfilePage;
