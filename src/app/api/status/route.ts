import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { taskIdSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        {
          error: "You must be logged in to GET a task.",
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

    const task = await prisma.task.findMany({
      where: {
        id,
        completed: true,
      },
      take: 4,
    });

    return task;
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
