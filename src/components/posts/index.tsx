import { ImgPost, IPost } from "@/models";
import DOMPurify from "dompurify";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { PostModal, ShareModal } from "../modal";
import { CommentInput } from "./comment/comment-input";
import { ListComment } from "./comment/list-comment";
import { LikePost } from "./like-post";
import { SavePost } from "./saved-post";

export interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  const router = useRouter();

  const [readMore, setReadMore] = useState(false);
  const [show, setShow] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const safeContent = DOMPurify.sanitize(post?.content);

  const onClickToProfile = () => {
    router.push(`/profile/${post?.user?._id}`);
  };

  return (
    <div className="post">
      <div className="post-top">
        <div className="avatar">
          <img src={post?.user?.avatar} alt="" onClick={onClickToProfile} />
        </div>
        <div className="post-info">
          <p className="name" onClick={onClickToProfile}>
            {post?.user?.fullname}
          </p>
          <span className="time"> {moment(post?.createdAt).fromNow()}</span>
        </div>
        <span className="post-menu">
          <i className="fas fa-ellipsis-h" onClick={() => setShow(!show)}></i>
          {show && <PostModal post={post} setShow={setShow} />}
        </span>
      </div>

      <div className="post-content" onClick={() => setShow(false)}>
        <ReactMarkdown>
          {post?.content.length < 100
            ? post?.content
            : readMore
            ? post?.content + " "
            : post?.content.slice(0, 100) + "... "}
        </ReactMarkdown>

        {post?.content.length > 100 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? "Ẩn bớt" : "Xem thêm"}
          </span>
        )}

        {post?.images.length > 0 && post?.images.length > 1 ? (
          <Carousel fade>
            {post?.images?.map((img: ImgPost) => (
              <Carousel.Item key={img?.public_id}>
                <img src={img?.url} className="d-block w-100" alt={img?.url} />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            src={post?.images[0]?.url}
            className="d-block w-100"
            alt={post?.images[0]?.url}
          />
        )}
      </div>

      <div className="post-thumb" onClick={() => setShow(false)}>
        <div className="action">
          <LikePost post={post} />
        </div>
        <div className="action">
          <i
            className="far fa-comment"
            onClick={() => router.push(`/posts/${post?._id}`)}
          ></i>
        </div>
        <div className="action" onClick={() => setIsShare(!isShare)}>
          <i className="fa-regular fa-paper-plane"></i>
        </div>
        {isShare && (
          <ShareModal
            url={`https://it-network-api.herokuapp.com/posts/${post?._id}`}
          />
        )}
        <div className="action">
          <SavePost post={post} />
        </div>
      </div>
      <div className="post-count">
        <p className="like-count">{post?.likes.length} thích</p>
        <p className="comment-count">{post?.comments.length} bình luận</p>
      </div>

      <ListComment post={post} />
      <CommentInput post={post} />
    </div>
  );
}
