import ConsoleLogBtn from "@/components/ConsoleLogBtn";
import TaskCard from "@/components/TaskCard";
import CompletedTasks from "@/components/dashboard/CompletedTasks";
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
      <CompletedTasks take={50} ShowAllTasks userId={session.user.id} />
    </div>
  );
};

export default AllCompletedTasks;
