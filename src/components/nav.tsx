import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { CommandMenu } from "./command-menu";

export const Nav = () => (
  <nav className="flex items-center justify-between">
    <Link href="/">
      <h1 className="text-2xl font-extrabold sm:text-3xl">aurahack.</h1>
    </Link>

    <div className="flex items-center gap-3">
      <SignedOut>
        <SignInButton>
          <Button>sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link href="/profiles">profile</Link>
        <UserButton />
      </SignedIn>

      <CommandMenu />
    </div>
  </nav>
);
