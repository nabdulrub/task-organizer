import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";
import { FcLowPriority } from "react-icons/fc";
import { Button } from "../ui/button";

type Props = {
  userId: string;
};

const CompletedTasks = async ({ userId }: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      completed: true,
    },
    take: 4,
  });
  return (
    <div className="flex flex-col gap-2 w-fit">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold capitalize">Completed</h1>
          <FcLowPriority size={25} />
        </div>
        <div>
          <Button
            variant={"secondary"}
            className="hover:bg-slate-800 hover:text-white"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-start overflow-hidden">
        {task.map((task, index) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            taskId={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedTasks;
