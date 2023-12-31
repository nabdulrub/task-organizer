import TaskCreation from "@/components/TaskCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const NewTask = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="absolute top-[450px] left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2">
      <TaskCreation EditMode={false} />
    </div>
  );
};

export default NewTask;
