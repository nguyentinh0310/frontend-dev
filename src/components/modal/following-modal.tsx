import { useUser } from "@/hooks";
import { IUser } from "@/models";
import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";

export interface FollowingModalProps {
  show: boolean;
  setShow: Function;
  loading: boolean;
  userFollowing: IUser[];
}

export function FollowingModal({
  show,
  setShow,
  loading,
  userFollowing,
}: FollowingModalProps) {
  const router = useRouter();
  const handleClose = () => setShow(false);
  const { id } = router.query;
  const { mutateUser } = useUser(id);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đang theo dõi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="following-modal">
          {userFollowing?.length === 0 && (
            <h4 className="text-center mt-2 mb-2">Không có ai cả</h4>
          )}

          {loading ? (
            <span>loading...</span>
          ) : (
            userFollowing?.map((user: IUser) => (
              <div
                className="friend-box mb-2"
                key={user?._id}
                onClick={async () => {
                  router.push(`/profile/${user?._id}`);
                  await mutateUser();
                  setShow(false);
                }}
              >
                <span className="avatar">
                  <img src={user?.avatar} alt={user?.avatar} />
                </span>
                <span className="name">{user?.fullname}</span>
              </div>
            ))
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
