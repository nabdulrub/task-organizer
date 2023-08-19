import TaskCard from "@/components/TaskCard";
import HighPriority from "@/components/dashboard/HighPriorityTasks";
import LowPriority from "@/components/dashboard/LowPriority";
import CompletedTasks from "@/components/dashboard/CompletedTasks";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="grid gap-4 items-end justify-center overflow-x-auto mx-auto mt-10 w-full">
      <div>
        <HighPriority userId={session.user.id} />
      </div>
      <div>
        <LowPriority userId={session.user.id} />
      </div>
      <div>
        <CompletedTasks userId={session.user.id} />
      </div>
    </div>
  );
};

export default page;
