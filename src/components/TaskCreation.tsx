"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form, FormField } from "./ui/form";

type Props = {};

const TaskCreation = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Task</CardTitle>
        <CardDescription>
          Create a new task by filling out the form below
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Form>
          <form>
            <FormField></FormField>
          </form>
        </Form> */}
      </CardContent>
    </Card>
  );
};

export default TaskCreation;
