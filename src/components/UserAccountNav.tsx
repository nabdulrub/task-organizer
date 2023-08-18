import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserProfile from "./UserProfile";
import { User } from "next-auth";
import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { User2 } from "lucide-react";

type Props = {
  user: Pick<User, "image" | "name" | "email">;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <Image
            src={user.image as string}
            height={100}
            width={100}
            alt="Profile Image"
          />
          <AvatarFallback>
            <User2 size={40} strokeWidth={1.5} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{user.name}</DropdownMenuItem>
        <DropdownMenuItem>{user.email}</DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
