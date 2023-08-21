"use client";

import React from "react";

type Props = {
  data: any;
};

const ConsoleLogBtn = ({ data }: Props) => {
  const handleClick = (data: any) => {
    console.log(data);
  };
  return (
    <button
      onClick={() => {
        handleClick(data);
      }}
    >
      Log Data
    </button>
  );
};

export default ConsoleLogBtn;
