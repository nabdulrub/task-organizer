import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import NewTaskButton from "./NewTaskButton";
import UserAccountNav from "./UserAccountNav";
import { redirect } from "next/navigation";
import NavTitle from "./NavTitle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  if (session?.user) {
  }

  const handleTitle = () => {
    redirect("/");
  };

  return (
    <div className="relative top-0 bg-white dark:bg-gray-950 h-fit py-4 w-full">
      <div className="flex items-center justify-between h-full gap-2 mx-auto max-w-[90rem]">
        <NavTitle />
        <div className="flex flex-col gap-4 items-center justify-center md:flex-row">
          {!session?.user ? (
            <SignInButton text="Sign In" includeGoogle />
          ) : (
            <>
              <NewTaskButton />
              <UserAccountNav user={session?.user} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
