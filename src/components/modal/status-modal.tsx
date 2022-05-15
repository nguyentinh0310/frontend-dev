import { postApi } from "@/api-client/post-api";
import { closeStatus, useAppDispatch, useAppSelector } from "@/app";
import { useAuth } from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { ImgPost } from "@/models";
import { imageUpload } from "@/utils";
import dynamic from "next/dynamic";
import React, { FormEvent, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Icons } from "../common";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export function StatusModal() {
  const dispatch = useAppDispatch();
  const { showModal, postEdit } = useAppSelector((state) => state.statusModal);

  const [content, setContent] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [show, setShow] = useState(false);

  const { limit } = useAppSelector((state) => state.posts);

  const { auth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);

  const { mutatePost } = usePost(postEdit?._id);
  const { mutatePostUser } = usePostUser(auth?._id);
  const isEdit = Boolean(postEdit?._id);

  const handleClose = () => {
    setContent("");
    dispatch(closeStatus());
  };

  const handleChangeImages = (e: any) => {
    const files = [...e.target.files];
    let err = "";
    let newImages: any = [];

    files.forEach((file: any) => {
      if (!file) return (err = "File không tồn tại");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "Kích thước hình ảnh/video lớn nhất là 1mb.");
      }
    });
    console.log("images", newImages);
    if (err) toast.error(err);
    setImages([...images, ...newImages]);
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

  const deleteImages = (img: any) => {
    URL.revokeObjectURL(img);
    const newArr = [...images];
    newArr.splice(img, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShow(false);
    if (!content) {
      setLoading(false);
      dispatch(closeStatus());
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
        dispatch(closeStatus());
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
        dispatch(closeStatus());
        toast.success("Tạo bài viết thành công");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Lỗi 400");
    }
  };

  const imageShow = (src: any) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };

  const videoShow = (src: any) => {
    console.log(src);
    return <video controls src={src} className="img-thumbnail" />;
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
          <div className="modal-top" onClick={() => setShow(false)}>
            <MDEditor value={content} onChange={setContent} />
          </div>

          <div className="show-images">
            {images?.map((img: any, index: any) => (
              <div key={index} id="file_img">
                {img?.url ? (
                  <>
                    {img?.type?.match(/video/i)
                      ? videoShow(img?.url)
                      : imageShow(img?.url)}
                  </>
                ) : (
                  <>
                    {img?.type?.match(/video/i)
                      ? videoShow(URL.createObjectURL(img))
                      : imageShow(URL.createObjectURL(img))}
                  </>
                )}

                <span onClick={() => deleteImages(img)}>&times;</span>
              </div>
            ))}
          </div>
          <div className="input-images mt-2 mb-2">
            <Icons
              setContent={setContent}
              content={content}
              show={show}
              setShow={setShow}
            />

            <div className="file-upload" onChange={handleChangeImages}>
              <i className="fas fa-image" />
              <input
                type="file"
                name="images"
                id="file"
                multiple
                accept="image/*,video/*"
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
