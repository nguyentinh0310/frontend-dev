import { IComment, IPost } from "@/models";
import React, { useEffect, useState } from "react";
import { CommentCard } from "./comment-card";

export interface CommentDisplayProps {
  comment: IComment;
  post: IPost;
  replyCm?: any;
}

export function CommentDisplay({
  comment,
  post,
  replyCm,
}: CommentDisplayProps) {
  const [showRep, setShowRep] = useState<any>([]);
  const [next, setNext] = useState(1);

  // xét thuộc tính slice cho reply comment => xử lý show, hide 
  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment-display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="display-reply">
          {showRep?.map(
            (item: IComment) =>
              item?.reply && (
                <CommentCard
                  comment={item}
                  key={item?._id}
                  post={post}
                  commentId={comment._id}
                ></CommentCard>
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              style={{ cursor: "pointer", color: "crimson" }}
              onClick={() => setNext(next + 10)}
            >
              Hiển thị thêm...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                style={{ cursor: "pointer", color: "crimson" }}
                onClick={() => setNext(1)}
              >
                Ẩn bớt
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
}
