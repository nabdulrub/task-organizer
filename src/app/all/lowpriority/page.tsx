import LowPriority from "@/components/dashboard/LowPriority";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AllLowPriorityTasks = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <LowPriority take={50} ShowAllTasks userId={session.user.id} />
    </div>
  );
};

export default AllLowPriorityTasks;
