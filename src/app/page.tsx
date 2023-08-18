import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Demo from "../../public/Demo.png";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/dasboard");
  }

  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
      <Card>
        <CardHeader>
          <CardTitle>Task Organizer</CardTitle>
          <CardDescription>
            Organize all yours tasks in one simple daskboard!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Image src={Demo} width={600} alt="Demo Image" />
          </div>
          <SignInButton text="Sign In w/ Google" includeGoogle />
        </CardContent>
      </Card>
    </div>
  );
}
