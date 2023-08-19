"use client";

import { redirect, useRouter } from "next/navigation";
import React from "react";

type Props = {};

const NavTitle = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <h2
        className="text-2xl md:text-3xl font-semibold cursor-pointer hover:font-bold transition-all duration-200"
        onClick={() => {
          router.push("/");
        }}
      >
        Task Organizer
      </h2>
      <p className="text-sm md:text-base">
        Organize all your daily todos using priority and a great dasboard!
      </p>
    </div>
  );
};

export default NavTitle;
