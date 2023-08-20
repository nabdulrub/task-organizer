import TaskCard from "@/components/TaskCard";
import HighPriority from "@/components/dashboard/HighPriorityTasks";
import LowPriority from "@/components/dashboard/LowPriority";
import CompletedTasks from "@/components/dashboard/CompletedTasks";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import { Separator } from "../../components/ui/separator";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="grid gap-3 items-center overflow-x-auto mt-10 2xl:px-[11vw] md:px-0">
      <HighPriority userId={session.user.id} />
      <LowPriority userId={session.user.id} />
      <Separator />
      <CompletedTasks userId={session.user.id} />
    </div>
  );
};

export default page;
