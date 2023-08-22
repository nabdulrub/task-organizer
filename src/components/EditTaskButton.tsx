import React from "react";
import { Button } from "./ui/button";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

type Props = {
  taskId: string;
};

const EditTaskButton = ({ taskId }: Props) => {
  const { push } = useRouter();

  const handleParams = (taskId: string) => {
    push(`/edit/${taskId}`);
  };

  return (
    <>
      <Button
        className="absolute top-0 right-0 rounded-tl-none rounded-br-none"
        variant={"secondary"}
        onClick={() => {
          handleParams(taskId);
        }}
      >
        <AiOutlineEdit size={20} />
      </Button>
    </>
  );
};

export default EditTaskButton;
