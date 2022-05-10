import { IComment, IPost } from "@/models";
import React, { useEffect, useState } from "react";
import { CommentDisplay } from "./comment-display";

export interface ListCommentProps {
  post: IPost;
}

export function ListComment({ post }: ListCommentProps) {
  const [comment, setComment] = useState<any>([]);
  const [showComment, setShowComment] = useState<any>([]);
  const [replyComments, setReplyComments] = useState<any>([]);
  const [next, setNext] = useState(2);

  // lọc comment không lấy reply --> hiển thị
  useEffect(() => {
    const newCm: IComment[] = post?.comments.filter(
      (comment: IComment) => !comment?.reply
    );
    setComment(newCm);
    setShowComment(newCm.slice(newCm.length - next));
  }, [post?.comments, next]);

  // lọc comment reply --> hiển thị
  useEffect(() => {
    const newRep = post?.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post?.comments]);


  return (
    <div className="list-comment">
      {showComment?.map((comment: IComment) => (
        <CommentDisplay
          comment={comment}
          post={post}
          key={comment?._id}
          replyCm={replyComments.filter(
            (item: IComment) => item?.reply === comment?._id
          )}
        />
      ))}

      {comment.length - next > 0 ? (
        <div className="readMore" onClick={() => setNext(next + 5)}>
          Hiển thị thêm...
        </div>
      ) : (
        comment.length > 2 && (
          <div className="readMore" onClick={() => setNext(2)}>
            Ẩn bớt
          </div>
        )
      )}
    </div>
  );
}
