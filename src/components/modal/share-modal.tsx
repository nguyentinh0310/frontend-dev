import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export interface ShareModalProps {
  url: any;
}

export function ShareModal({ url }: ShareModalProps) {
  return (
    <div className="d-flex px-1">
      <FacebookShareButton url={url} style={{ marginRight: "10px" }}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>
    </div>
  );
}
