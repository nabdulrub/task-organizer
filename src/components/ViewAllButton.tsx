"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

type Props = {
  taskStatus?: string;
  buttonText?: string;
};

const ViewAllButton = ({ taskStatus, buttonText }: Props) => {
  const { push } = useRouter();
  return (
    <Button
      variant={"secondary"}
      className="hover:bg-slate-800 hover:text-white"
      onClick={() => {
        push(taskStatus ? `/all/${taskStatus}` : `/`);
      }}
    >
      {buttonText ? buttonText : "View All"}
      <GalleryVerticalEnd size={20} strokeWidth={2.5} className="ml-2" />
    </Button>
  );
};

export default ViewAllButton;
