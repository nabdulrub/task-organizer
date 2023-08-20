import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { newTaskSchema, taskIdSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to create a task." },
        {
          status: 401,
        }
      );
    }

    console.log("Before creating the task");

    const body = await req.json();
    const { title, description, completed, priority } =
      newTaskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        completed: completed,
        priority: priority,
        userId: session.user.id,
      },
    });

    console.log("Task record created:", task);
  } catch (error) {
    console.error("Error creating a task:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    }
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        {
          error: "You must be logged in to delete a task.",
        },
        {
          status: 401,
        }
      );
    }

    let body = await req.json();
    const { id } = await taskIdSchema.parse(body);
    console.log(id);

    console.log("Before deleting task!");

    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    console.log("Task record deleted:", task);
  } catch (error) {
    console.log("Task Delete Function Error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        {
          error: "You must be logged in to update a task.",
        },
        {
          status: 401,
        }
      );
    }

    let body = await req.json();
    const { id } = await taskIdSchema.parse(body);
    console.log(id);

    console.log("Before updating task!");

    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });

    console.log("Task record deleted:", task);
  } catch (error) {
    console.log("Task Delete Function Error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }
  }
}
