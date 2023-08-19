import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { newTaskSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
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
    console.error("Error:", error);
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
