import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";
import { FcLowPriority } from "react-icons/fc";
import ViewAllButton from "../ViewAllButton";

type Props = {
  userId?: string;
  take?: number;
  ShowAllTasks: boolean;
};

const CompletedTasks = async ({ userId, take, ShowAllTasks }: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      completed: true,
    },
    take: take ? take : 4,
  });

  return (
    <div className="flex flex-col gap-2 w-fit overflow-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold capitalize">Completed</h1>
          <FcLowPriority size={25} />
        </div>
        {!ShowAllTasks ? (
          <div>
            <ViewAllButton taskStatus="completed" buttonText="All Completed" />
          </div>
        ) : null}
      </div>

      <div
        className={`${
          ShowAllTasks
            ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-hidden`
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

export default CompletedTasks;
