import TaskSection from "@/components/dashboard/TaskSection";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AllHighPriorityTasks = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <TaskSection
        take={50}
        ShowAllTasks
        userId={session.user.id}
        taskStatus="highpriority"
        completed={false}
        priority="HIGH"
      />
    </div>
  );
};

export default AllHighPriorityTasks;
