import { commentApi } from "@/api-client/comment-api";
import { useAppSelector } from "@/app";
import { CommentModal } from "@/components/modal";
import { useAuth } from "@/hooks";
import { usePost, usePosts, usePostsFollow, usePostUser } from "@/hooks/use-post";
import { IComment, IPost } from "@/models";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CommentInput } from "./comment-input";
import { LikeComment } from "./like-comment";
import ReactMarkdown from "react-markdown";

export interface CommentCardProps {
  children?: any;
  comment: IComment;
  post: IPost;
  commentId: any;
}

export function CommentCard({
  children,
  comment,
  post,
  commentId,
}: CommentCardProps) {
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [onReply, setOnReply] = useState(false);
  const [content, setContent] = useState("");
  const [userReply, setUserReply] = useState({});

  const { limit } = useAppSelector((state) => state.posts);

  const { auth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(post?._id);
  const { mutatePostUser } = usePostUser(post?.user?._id);

  // assign value to state content
  useEffect(() => {
    setContent(comment?.content);
  }, [comment]);

  // update comment
  const handleUpdate = async () => {
    if (!content) return;
    try {
      if (comment?.content !== content) {
        await commentApi.update(comment?._id, { content });
        await mutatePosts();
        await mutatePostsFl()
        await mutatePost();
        await mutatePostUser();
      }
      setOnEdit(false);
    } catch (error) {
      toast.error("Lỗi 404");
    }
  };

  // reply comment
  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setUserReply({ ...comment, commentId });
    setOnReply(true);
    setShow(false);
  };

  return (
    <div
      className="comment-card"
      style={{
        opacity: comment?._id ? 1 : 0.5,
        pointerEvents: comment?._id ? "inherit" : "none",
      }}
    >
      <a className="info" href={`/profile/${comment?.user?._id}`}>
        <span className="avatar">
          <img src={comment?.user?.avatar} alt="avatar-comment" />
        </span>
        &nbsp;
        <span className="name">{comment?.user?.fullname}</span>
      </a>
      <div className="comment-content">
        <div className="flex-fill" onClick={() => setShow(false)}>
          {onEdit ? (
            <>
              <textarea
                rows={5}
                value={content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setContent(e.target.value)
                }
              />
            </>
          ) : (
            <>
              {/* kiểm tra tag khác với chính mình hiển thị */}
              {comment?.tag && comment?.tag?._id !== comment?.user?._id && (
                <a
                  href={`/profile/${comment?.tag?._id}`}
                  style={{
                    color: "#009efd",
                  }}
                >
                  @{comment?.tag?.fullname}&nbsp;
                </a>
              )}

              <span className="content">
                <ReactMarkdown>
                  {content.length < 100
                    ? content
                    : readMore
                    ? content + " "
                    : content.slice(0, 100) + "... "}
                </ReactMarkdown>
              </span>

              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Ẩn bớt" : "Xem thêm"}
                </span>
              )}
            </>
          )}

          <div className="comment-reply">
            <small className="time">
              {moment(comment?.createdAt).fromNow()}
            </small>
            <small className="like-count">{comment?.likes.length} thích</small>
            {onEdit ? (
              <>
                <small className="update" onClick={handleUpdate}>
                  cập nhật
                </small>
                <small className="cancel" onClick={() => setOnEdit(false)}>
                  hủy
                </small>
              </>
            ) : (
              <small className="reply" onClick={handleReply}>
                {onReply ? "hủy" : "trả lời"}
              </small>
            )}
          </div>
        </div>
        <div className="comment-thumb">
          {/* check điều kiện chỉ có chủ post và user hiện tại => thao tác xóa hoặc sửa */}
          {(post?.user?._id === auth?._id ||
            comment?.user?._id === auth?._id) && (
            <i
              className="fa-solid fa-ellipsis-vertical"
              onClick={() => setShow(!show)}
            ></i>
          )}

          <LikeComment comment={comment} setShow={setShow} post={post} />
          {show && (
            <CommentModal
              setOnEdit={setOnEdit}
              setShow={setShow}
              comment={comment}
              post={post}
            />
          )}
        </div>
      </div>

      {onReply && (
        <CommentInput post={post} userReply={userReply} setOnReply={setOnReply}>
          <a
            href={`/profile/${comment?.user?._id}`}
            style={{ color: "#009efd" }}
          >
            @{comment?.user?.fullname}:
          </a>
        </CommentInput>
      )}

      {children}
    </div>
  );
}
