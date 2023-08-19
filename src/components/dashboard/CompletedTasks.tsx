import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";

type Props = {
  userId: string;
};

const CompletedTasks = async ({ userId }: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      completed: true,
    },
  });
  return (
    <div className="w-fit">
      <h1>Completed Taks</h1>
      <div className="flex gap-4 items-start overflow-hidden">
        {task.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedTasks;
