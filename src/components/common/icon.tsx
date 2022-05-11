import React, { useRef, useState } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";

export interface IconsProps {
  setContent: Function;
  content: string;
  show: boolean
  setShow: Function
}

export function Icons({ setContent, content,setShow, show }: IconsProps) {
  const reactions = [
    '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
    '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
    '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
  ];


  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}
    style={{
      cursor: "pointer"
    }}>
      <span className="icon" onClick={handleClick}
        style={{opacity: 0.8}}
      >😘</span>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body>
          <div className="reactions">
          {reactions.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

