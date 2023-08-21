"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { AiOutlineEdit } from "react-icons/ai";
import EditTaskButton from "./EditTaskButton";

type Props = {
  title: string;
  description: string;
  completed?: boolean;
  priority?: "LOW" | "HIGH";
  ShowAllTasks?: boolean;
  taskId: string;
};

const TaskCard = ({
  title,
  description,
  completed,
  priority,
  taskId,
  ShowAllTasks,
}: Props) => {
  const router = useRouter();

  const checkCardStatus = completed
    ? "bg-green-600"
    : priority === "HIGH"
    ? "bg-red-700"
    : priority === "LOW"
    ? "bg-yellow-600"
    : null;

  const handleDelete = async (taskId: string) => {
    console.log(taskId);
    fetch("/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
      }),
    });
    router.push("/");
    router.refresh();
  };

  const handleComplete = async (taskId: string) => {
    console.log(taskId);
    fetch("/api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
      }),
    });
    router.push("/");
    router.refresh();
  };
  return (
    <Card
      className={`${
        ShowAllTasks
          ? "w-full md:min-w-[250px] md:max-w-[329px]"
          : "w-[270px] md:w-[329px]"
      } min-h-[172px] relative`}
    >
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle>{title}</CardTitle>
          <span className={`w-3 h-3 rounded-full ${checkCardStatus}`}></span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <EditTaskButton />
        <Dialog>
          <DialogTrigger>
            <Button
              className="hover:bg-red-500 hover:text-white"
              variant={"secondary"}
            >
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the task:{" "}
              <span className="text-black border-b-2 border-black font-semibold text-[1rem]">
                {title}
              </span>
            </DialogDescription>
            <Button
              className="bg-red-500 text-white w-20 self-end hover:bg-red-600"
              variant={"secondary"}
              onClick={() => {
                handleDelete(taskId);
              }}
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
        {!completed ? (
          <Button
            className="hover:bg-green-500 hover:text-black"
            onClick={() => {
              handleComplete(taskId);
            }}
          >
            Mark Done
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
