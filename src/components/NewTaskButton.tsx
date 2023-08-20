"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const NewTaskButton = (props: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/new");
      }}
      className="whitespace-nowrap"
    >
      New Task
    </Button>
  );
};

export default NewTaskButton;
