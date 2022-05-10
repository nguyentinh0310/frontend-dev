import { postApi } from "@/api-client/post-api";
import { closeStatus, useAppDispatch, useAppSelector } from "@/app";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { ImgPost } from "@/models";
import { checkImage, imageUpload } from "@/utils";
import React, { FormEvent, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export function StatusModal() {
  const dispacth = useAppDispatch();
  const { showModal, postEdit } = useAppSelector((state) => state.statusModal);

  const [content, setContent] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>([]);

  const { limit } = useAppSelector((state) => state.posts);

  const { auth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);

  const { mutatePost } = usePost(postEdit?._id);
  const { mutatePostUser } = usePostUser(auth?._id);
  const isEdit = Boolean(postEdit?._id);

  const handleClose = () => {
    setContent("");
    dispacth(closeStatus());
  };

  useEffect(() => {
    if (postEdit) {
      setContent(postEdit?.content);
      setImages(postEdit?.images);
    } else {
      setContent("");
      setImages([]);
    }
  }, [postEdit]);

  const handleChangeImages = (e: any) => {
    const files = [...e.target.files];
    let newImages: any[] = [];

    files.forEach((file: any) => {
      checkImage(file);
      return newImages.push(file);
    });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (img: any) => {
    URL.revokeObjectURL(img);
    const newArr = [...images];
    newArr.splice(img, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!content) {
      setLoading(false);
      dispacth(closeStatus());
      return;
    }

    try {
      let media: any = [];
      if (isEdit) {
        // Edit Post
        if (images) {
          const imgNewUrl: any = images.filter((img: ImgPost) => !img.url);
          const imgOldUrl: any = images.filter((img: ImgPost) => img.url);

          if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

          await postApi.update(postEdit?._id, {
            content,
            images: [...imgOldUrl, ...media],
          });
        } else {
          await postApi.update(postEdit?._id, { content });
        }

        await mutatePosts();
        await mutatePostsFl();
        await mutatePost();
        await mutatePostUser();
        setContent("");
        setImages([]);
        dispacth(closeStatus());
        toast.success("Cập nhật bài viết thành công");
      } else {
        // Create Post
        if (images) {
          media = await imageUpload(images);
          await postApi.create({ content, images: media });
        } else {
          await postApi.create({ content });
        }
        await mutatePosts();
        await mutatePostsFl();
        await mutatePostUser();
        setContent("");
        setImages([]);
        dispacth(closeStatus());
        toast.success("Tạo bài viết thành công");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Lỗi 400");
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Cập nhật bài viết" : "Tạo bài viết"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="modal-status-post">
          <div className="modal-top">
            <MDEditor value={content} onChange={setContent} />
          </div>
          <div className="show-images">
            {images?.map((img: any, index: any) => (
              <div key={index} id="file_img">
                <img
                  src={img?.url ? img?.url : URL.createObjectURL(img)}
                  alt="images"
                />
                <span onClick={() => deleteImages(img)}>&times;</span>
              </div>
            ))}
          </div>
          <div className="input-images mt-2 mb-2">
            <div className="file-upload" onChange={handleChangeImages}>
              <i className="fas fa-image" />
              <input
                type="file"
                name="images"
                id="file"
                multiple
                accept="image/*"
              />
            </div>
          </div>
          <div className="footer-modal">
            <button
              type="submit"
              className="btn btn-create-post"
              disabled={loading ? true : false}
            >
              {isEdit ? "Cập nhật" : "Đăng"}&nbsp;
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}