import ConsoleLogBtn from "@/components/ConsoleLogBtn";
import TaskCard from "@/components/TaskCard";
import TaskSection from "@/components/dashboard/TaskSection";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AllCompletedTasks = async (props: Props) => {
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
        taskStatus="completed"
        completed={true}
        priority="BOTH"
      />
    </div>
  );
};

export default AllCompletedTasks;
