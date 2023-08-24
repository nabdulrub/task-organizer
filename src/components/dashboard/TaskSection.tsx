import React from "react";
import TaskCard from "../TaskCard";
import { prisma } from "@/lib/db";
import {
  FcLowPriority,
  FcHighPriority,
  FcMediumPriority,
} from "react-icons/fc";
import ViewAllButton from "../ViewAllButton";
import NewTaskButton from "../NewTaskButton";

type Props = {
  userId?: string;
  take?: number;
  completed: boolean;
  priority: "LOW" | "HIGH" | "BOTH";
  taskStatus: "completed" | "lowpriority" | "highpriority";
  ShowAllTasks: boolean;
};

const TaskSection = async ({
  userId,
  take,
  ShowAllTasks,
  completed,
  priority,
  taskStatus,
}: Props) => {
  const task = await prisma.task.findMany({
    where: {
      userId,
      priority: priority === "BOTH" ? { in: ["HIGH", "LOW"] } : priority,
      completed: completed,
    },
    take: take ? take : 4,
  });

  const checkTitle =
    taskStatus === "completed"
      ? "Completed"
      : taskStatus === "highpriority"
      ? "High Priority"
      : taskStatus === "lowpriority"
      ? "Low Priority"
      : "Tasks";

  const checkTitleIcon =
    taskStatus === "completed" ? (
      <FcLowPriority size={25} />
    ) : taskStatus === "highpriority" ? (
      <FcHighPriority size={25} />
    ) : taskStatus === "lowpriority" ? (
      <FcMediumPriority size={25} />
    ) : (
      <FcLowPriority size={25} />
    );

  const checkButtonText =
    taskStatus === "completed"
      ? "All Completed"
      : taskStatus === "highpriority"
      ? "All High Priority"
      : taskStatus === "lowpriority"
      ? "All Low Priority"
      : "All Tasks";

  console.log(task);

  return (
    <div className="flex flex-col gap-2 w-fit overflow-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold capitalize">{checkTitle}</h1>
          {checkTitleIcon}
        </div>
        {!ShowAllTasks ? (
          <div>
            <ViewAllButton
              taskStatus={taskStatus}
              buttonText={checkButtonText}
            />
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
        {task.length === 0 ? (
          <div className="flex flex-col gap-4">
            <h1>No current tasks here</h1>
            <NewTaskButton />
          </div>
        ) : (
          task.map((task, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default TaskSection;
