"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, newTaskSchema } from "@/lib/type";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ListPlus, Save } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";

type Props = {
  EditMode?: boolean;
  taskParam: any;
};

const TaskCreation = ({ EditMode, taskParam }: Props) => {
  const router = useRouter();

  const {
    reset,
    formState: { errors, isLoading },
  } = useForm();

  const form = useForm<TaskSchema>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      id: taskParam?.id ? taskParam?.id : "",
      title: taskParam?.title ? taskParam?.title : "",
      description: taskParam?.description ? taskParam?.description : "",
      priority: taskParam?.priority ? taskParam?.priority : "LOW",
      completed: false,
    },
  });

  const onSubmit = async (data: TaskSchema) => {
    try {
      const response = await axios.post("/api/task", data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }

    router.push("/");
    reset();
    router.refresh();
  };

  const onUpdate = async (data: TaskSchema) => {
    try {
      const response = await axios.put("/api/edit", data, {
        headers: { "Content-Type": "applicaton/json" },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error editing task:", error);
    }

    router.push("/");
    reset();
    router.refresh();
  };

  return (
    <div className="max-h-[500px]">
      <Card className="max-w-[800px] w-[90vw] min-w-[300px]">
        <CardHeader>
          <CardTitle>{EditMode ? "Edit Task" : "Add New Task"}</CardTitle>
          <CardDescription>
            {EditMode
              ? "Edit the task below by changing the fields"
              : "Create a new task by filling out this task form!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(EditMode ? onUpdate : onSubmit)}
              className="space-y-8 flex flex-col"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{EditMode ? "Edit" : null} Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. buy groceries" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of the task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {EditMode ? "Edit" : null} Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex. go to costco and buy milk, rice, etc."
                        {...field}
                        className="h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>
                      This is where you are more include more information about
                      the task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-12 items-end">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 items-start w-1/2">
                      <FormLabel>{EditMode ? "Edit" : null} Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue className="" placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="flex gap-2" value="HIGH">
                            High
                          </SelectItem>
                          <SelectItem value="LOW">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How important is this?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 items-start w-1/2">
                      <div className="flex flex-row-reverse gap-2 items-center">
                        <FormLabel>
                          {EditMode ? "Edit" : null} Complete?
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>Is this already done?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="self-end" disabled={isLoading}>
                {EditMode ? "Save Changes" : "Add Task"}
                <Save size={18} strokeWidth={2.5} className="ml-2" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCreation;
