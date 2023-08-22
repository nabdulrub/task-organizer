import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { newTaskSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { z } from "zod";

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
    const { id, title, description, priority } = await newTaskSchema.parse(
      body
    );

    console.log("Before updating task!");

    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        priority: priority,
        isEdited: true,
      },
    });

    console.log("Task record deleted:", task);
  } catch (error) {
    console.log("Task Update Error", error);
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
