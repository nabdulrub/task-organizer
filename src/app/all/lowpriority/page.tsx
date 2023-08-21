import LowPriority from "@/components/dashboard/LowPriority";
import React from "react";

type Props = {};

const AllLowPriorityTasks = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <LowPriority take={50} ShowAllTasks />
    </div>
  );
};

export default AllLowPriorityTasks;
