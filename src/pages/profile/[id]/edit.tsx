import { EditFormProfile, MainLayout, UserEditForm } from "@/components";
import { useAuth } from "@/hooks";
import { NextPageWithLayout } from "@/models";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const EditProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useAuth();
  // if (auth?._id !== id) {
  //   router.back();
  // }

  return (
    <Fragment>
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
