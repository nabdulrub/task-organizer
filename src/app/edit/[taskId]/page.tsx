import TaskCreation from "@/components/TaskCreation";
import { prisma } from "@/lib/db";
import { Task } from "@prisma/client";
import React from "react";

type Props = {
  params: {
    taskId: string;
  };
};

const TaskEditPage = async ({ params: { taskId } }: Props) => {
  const taskParam = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      title: true,
      description: true,
      priority: true,
      id: true,
    },
  });

  return (
    <div className="absolute top-[450px] left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2">
      <TaskCreation EditMode taskParam={taskParam} />
    </div>
  );
};

export default TaskEditPage;
