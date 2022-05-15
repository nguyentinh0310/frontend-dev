import { useConversations, useSearchUser } from "@/hooks";
import { IConversation, IUser } from "@/models";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Conversation } from "./conversation";
import { SearchConversation } from "./search";

export function LeftSide() {
  const router = useRouter();
  const [conversationsList, setConnversationsList] = useState<any>([]);
  const [keyword, setKeyword] = useState("");

  const { userSearch, isLoading } = useSearchUser(keyword);
  const { conversations } = useConversations();

  useEffect(() => {
    if (conversations) {
      setConnversationsList(conversations?.data);
    }
  }, [conversations]);

  const onFilterSearch = (value: string) => {
    setKeyword(value);
  };

  const clickToMessage = (user: IUser) => {
    setKeyword("");
    return router.push(`/message/${user?._id}`);
  };

  return (
    <Fragment>
      <SearchConversation onSubmit={onFilterSearch} setKeyword={setKeyword} />

      <div className="message-chat-list">
        <ul>
          {userSearch?.length !== 0 ? (
            <>
              {userSearch?.map((user: IUser) => (
                <li key={user?._id} onClick={() => clickToMessage(user)}>
                  <a href="#">
                    <span className="avatar">
                      <img src={user?.avatar} alt="" />
                    </span>
                    <div className="content">
                      <span className="name">{user?.fullname}</span>
                    </div>
                    <i className="fas fa-circle"></i>
                  </a>
                </li>
              ))}
            </>
          ) : (
            <>
              {conversationsList?.map((conv: IConversation) => (
                <Conversation key={conv?._id} conv={conv} />
              ))}
            </>
          )}
        </ul>
      </div>
    </Fragment>
  );
}
