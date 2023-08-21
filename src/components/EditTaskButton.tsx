import React from "react";
import { Button } from "./ui/button";
import { AiOutlineEdit } from "react-icons/ai";

type Props = {};

const EditTaskButton = (props: Props) => {
  return (
    <>
      <Button
        className="absolute top-0 right-0 rounded-tl-none rounded-br-none"
        variant={"secondary"}
      >
        <AiOutlineEdit size={20} />
      </Button>
    </>
  );
};

export default EditTaskButton;
