import React from "react";

export function RightPanel() {
  return (
    <div className="right-panel">
      <div className="friends-section">
        <div className="suggest-user">
          <h4>Gợi ý</h4>
        </div>

        <div className="list-online">
          <h4>Bạn bè</h4>
          <a className="friend row" href="#">
            <span className="avatar">
              <img
                src="https://cdn-acpnj.nitrocdn.com/SDkrhncnWeetGsYGlzwaPnbfptfOeIKk/assets/static/optimized/rev-00d8738/wp-content/uploads/2017/11/10-Patrick-I-Love-You-Gif.gif"
                alt=""
              />
            </span>
            <p className="name col-9">Henry Mosely</p>
          </a>
        </div>
      </div>
    </div>
  );
}
