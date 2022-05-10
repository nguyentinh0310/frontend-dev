import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

export interface SearchHeaderProps {
  onSubmit: (value: string) => void;
}

export function SearchHeader({ onSubmit }: SearchHeaderProps) {
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

  return (
    <form
      onSubmit={(e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={search}
        onChange={handleChangeSearch}
      />
    </form>
  );
}
