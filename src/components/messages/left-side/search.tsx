import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

export interface SearchConversationProps {
  onSubmit: (value: string) => void;
  setKeyword: Function;
}

export function SearchConversation({
  onSubmit,
  setKeyword,
}: SearchConversationProps) {
  const [search, setSearch] = useState("");
  const typingTimeoutRef = useRef<any>(null);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSubmit?.(e.target.value);
    }, 300);
  };
  const handleClose = () => {
    setSearch("");
    setKeyword("");
  };
  return (
    <form
      className="message-header"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="&#128269; Tìm kiếm..."
        value={search}
        onChange={handleChangeSearch}
      />
      <div
        className="close-search"
        onClick={handleClose}
        style={{ opacity: search ? 1 : 0 }}
      >
        &times;
      </div>
    </form>
  );
}
