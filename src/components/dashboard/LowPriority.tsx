import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";
import { FcMediumPriority } from "react-icons/fc";
import { Button } from "../ui/button";
import ViewAllButton from "../ViewAllButton";

type Props = {
  userId?: string;
  take?: number;
  ShowAllTasks: boolean;
};

const LowPriority = async ({ userId, take, ShowAllTasks }: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      priority: "LOW",
      completed: false,
    },
    take: take ? take : 4,
  });

  return (
    <div className="flex flex-col gap-2 w-fit overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold capitalize">Low Priority</h1>
          <FcMediumPriority size={25} />
        </div>
        <div>
          {!ShowAllTasks ? (
            <ViewAllButton
              taskStatus="lowpriority"
              buttonText="All Low Priority"
            />
          ) : null}
        </div>
      </div>
      <div
        className={`${
          ShowAllTasks
            ? `grid sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden`
            : `flex gap-4 items-start overflow-hidden`
        }`}
      >
        {task.map((task, index) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            taskId={task.id}
            ShowAllTasks={ShowAllTasks}
            isEdited={task.isEdited}
          />
        ))}
      </div>
    </div>
  );
};

export default LowPriority;
