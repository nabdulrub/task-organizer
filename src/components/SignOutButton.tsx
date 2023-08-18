"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type Props = {};

const SignOutButton = (props: Props) => {
  return (
    <Button
      onClick={() => {
        signOut().catch(console.error);
      }}
      variant="destructive"
      className="whitespace-nowrap"
    >
      Sign Out
      <LogOut className="ml-2 w-4 h-4" />
    </Button>
  );
};

export default SignOutButton;
