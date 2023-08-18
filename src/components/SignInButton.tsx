"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  variant?: "outline" | "secondary";
  includeGoogle?: boolean;
  className?: string;
};

const SignInButton = ({ text, variant, includeGoogle, className }: Props) => {
  return (
    <Button
      onClick={() => {
        signIn("google").catch(console.error);
      }}
      variant={variant}
      className={cn(className, "py-5 px-4")}
    >
      {includeGoogle ? <FcGoogle className="mr-3" size={24} /> : null}
      {text}
    </Button>
  );
};

export default SignInButton;
