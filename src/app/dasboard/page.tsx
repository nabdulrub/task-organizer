import TaskCard from "@/components/TaskCard";
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
    <div>
      <TaskCard
        title={"Buy Groceries"}
        description="Pick up milk, eggs, bread, and vegetables from the store."
      />
    </div>
  );
};

export default page;
