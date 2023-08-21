import HighPriority from "@/components/dashboard/HighPriorityTasks";
import React from "react";

type Props = {};

const AllHighPriorityTasks = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <HighPriority take={50} ShowAllTasks />
    </div>
  );
};

export default AllHighPriorityTasks;
