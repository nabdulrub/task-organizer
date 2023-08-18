import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  title: string;
  description: string;
  completed: boolean;
  priority: "LOW" | "HIGH";
};

const TaskCard = ({ title, description, completed, priority }: Props) => {
  var name = "";

  return (
    <Card className="max-w-[329px]">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle>{title}</CardTitle>
          <span
            className={`w-3 h-3 rounded-full ${
              priority === "HIGH"
                ? "bg-red-700"
                : priority === "LOW"
                ? "bg-yellow-600"
                : "bg-green-700"
            }`}
          ></span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <Button
          className="hover:bg-red-500 hover:text-white"
          variant={"secondary"}
        >
          Delete
        </Button>
        {!completed ? (
          <Button className="hover:bg-green-500 hover:text-black">
            Mark Done
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
