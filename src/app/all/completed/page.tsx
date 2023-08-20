import TaskCard from "@/components/TaskCard";
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

  const task = await prisma.task.findMany({
    where: {
      id: session.user.id,
    },
  });

  return <pre>{JSON.stringify(task, null, 4)}</pre>;
};

export default AllCompletedTasks;
