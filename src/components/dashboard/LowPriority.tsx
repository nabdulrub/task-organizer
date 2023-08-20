import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";
import { FcMediumPriority } from "react-icons/fc";
import { Button } from "../ui/button";

type Props = {
  userId: string;
};

const LowPriority = async ({ userId }: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      priority: "LOW",
      completed: false,
    },
    take: 4,
  });

  return (
    <div className="flex flex-col gap-2 w-fit mb-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold capitalize">Low Priority</h1>
          <FcMediumPriority size={25} />
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
      <div className="flex flex-nowrap overflow-x-auto space-x-4 scrollbar-hide">
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

export default LowPriority;
