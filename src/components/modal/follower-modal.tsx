import { useUser } from "@/hooks";
import { IUser } from "@/models";
import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";

export interface FollowerModalProps {
  show: boolean;
  setShow: Function;
  loading: boolean;
  userFollower: IUser[];
}

export function FollowerModal({
  show,
  setShow,
  loading,
  userFollower,
}: FollowerModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const { mutateUser } = useUser(id);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Người theo dõi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="following-modal">
          {userFollower?.length === 0 && (
            <h4 className="text-center mt-2 mb-2">Không có ai cả</h4>
          )}
          {loading ? (
            <span>loading...</span>
          ) : (
            userFollower?.map((user: IUser) => (
              <div
                className="friend-box mb-2"
                key={user?._id}
                onClick={async () => {
                  await mutateUser();
                  router.push(`/profile/${user?._id}`);
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
