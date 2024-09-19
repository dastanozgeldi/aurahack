import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export const Nav = () => (
  <nav className="flex items-center justify-between">
    <Link href="/">
      <h1 className="text-2xl font-extrabold sm:text-3xl">aurahack.</h1>
    </Link>

    <div className="flex items-center gap-3 sm:gap-6">
      <Link
        className={cn(
          buttonVariants({ variant: "link" }),
          "px-0 text-base sm:text-lg"
        )}
        href="/win-chance"
      >
        win chance
      </Link>
    </div>
  </nav>
);
