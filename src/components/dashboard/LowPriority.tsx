import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";

type Props = {
  userId: string;
};

const LowPriority = async ({ userId }: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      priority: "LOW",
    },
  });

  return (
    <div>
      <h1>High Priority</h1>
      <div className="flex flex-nowrap overflow-x-auto space-x-4 scrollbar-hide">
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

export default LowPriority;
