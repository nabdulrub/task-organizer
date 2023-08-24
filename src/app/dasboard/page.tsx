import TaskCard from "@/components/TaskCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import { Separator } from "../../components/ui/separator";
import TaskSection from "@/components/dashboard/TaskSection";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="grid gap-3 items-center overflow-auto mt-10 2xl:px-[11vw] md:px-0">
      <TaskSection
        ShowAllTasks={false}
        taskStatus="highpriority"
        userId={session.user.id}
        completed={false}
        priority="HIGH"
      />
      <Separator />
      <TaskSection
        ShowAllTasks={false}
        taskStatus="lowpriority"
        userId={session.user.id}
        completed={false}
        priority="LOW"
      />
      <Separator />
      <TaskSection
        ShowAllTasks={false}
        taskStatus="completed"
        userId={session.user.id}
        completed={true}
        priority="BOTH"
      />
    </div>
  );
};

export default page;
