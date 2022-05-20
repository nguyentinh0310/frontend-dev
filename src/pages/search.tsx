import { useSearchUser } from "@/hooks";
import { IUser } from "@/models";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { userSearch, isLoading } = useSearchUser(search);

  const onClickGoBack = () => {
    router.back();
  };

  const handleChangeSearch = debounce((text: string) => {
    setSearch(text);
  }, 300);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onClickToProfile = (user: IUser) => {
    router.push(`/profile/${user._id}`);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="not-support">
            <span>Không hỗ trợ</span>
          </div>
        </div>
      </div>
      <div className="search-page">
        <div className="search-header">
          <div className="icon-back" onClick={onClickGoBack}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-search"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeSearch(e.target.value.toLowerCase())
              }
              placeholder="&#128269; Tìm kiếm..."
            />
          </form>
        </div>
        <div className="search-body">
          <ul>
            {isLoading ? (
              <span>loadding...</span>
            ) : (
              userSearch?.map((user: IUser) => (
                <li key={user._id} onClick={() => onClickToProfile(user)}>
                  <span className="icon-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <span className="avatar">
                    <img src={user.avatar} alt="avatar" />
                  </span>
                  <span className="title-name">{user.fullname}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
