import React from "react";

export interface SuggestFiendProps {}

export function SuggestFiend() {
  return (
    <div className="suggest-friend">
      <h3>Gợi ý bạn bè</h3>
      <div className="row">
        <div className="col-lg-4 col-sm-6 friend-col">
          <div className="friend-box">
            <span className="avatar">
              <img
                src="https://cdn-acpnj.nitrocdn.com/SDkrhncnWeetGsYGlzwaPnbfptfOeIKk/assets/static/optimized/rev-00d8738/wp-content/uploads/2017/11/10-Patrick-I-Love-You-Gif.gif"
                alt=""
              />
            </span>
            <span className="name">Nguyen Tinh</span>
            <button className="btn btn-unfollow">Theo dõi</button>
          </div>
        </div>
      </div>
    </div>
  );
}
