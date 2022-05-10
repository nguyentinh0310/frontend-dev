import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface ProfileMenuProps {}

export function ProfileMenu() {
  const router = useRouter();
  const { id } = router.query;
  const ROUTE_LIST = [
    {
      label: "Bài viết",
      path: `/profile/${id}`,
    },
    {
      label: "Ảnh/Video",
      path: `/profile/${id}/media`,
    },
    {
      label: "Đã lưu",
      path: `/profile/${id}/saved`,
    },
  ];

  return (
    <div className="profile-menu mb-2">
      <ul className="menu">
        {ROUTE_LIST.map((route: any) => (
          <Link key={route.path} href={route.path} scroll={false} passHref>
            <li className={clsx({ active: router.pathname === route.path })}>
              <span>{route.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
