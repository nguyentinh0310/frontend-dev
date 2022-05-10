import React, { Fragment } from "react";

export function MessageDisplay() {
  return (
    <Fragment>
      <div className="chat-title">
        <span className="avatar">
          <img
            src="https://cdn-acpnj.nitrocdn.com/SDkrhncnWeetGsYGlzwaPnbfptfOeIKk/assets/static/optimized/rev-00d8738/wp-content/uploads/2017/11/10-Patrick-I-Love-You-Gif.gif"
            alt=""
          />
        </span>
      </div>

      <div className="chat-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
        explicabo ipsam commodi! Voluptate magnam, quia ullam sequi
        reprehenderit odit amet labore, beatae iure quod ea asperiores. Maxime
        quisquam reiciendis sit?
      </div>
      <div className="chat-time">April 2022</div>
    </Fragment>
  );
}
