"use client";

import { Command } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const groups = [
    {
      name: "Compete",
      links: [
        { name: "Hackathons", href: "/hackathons" },
        { name: "Generate a presentation", href: "/generate" },
        {name: "Organize hackathons", href: "/organize"}
      ],
    },
    {
      name: "Fun",
      links: [{ name: "Calculate your winning chances", href: "/win-chance" }],
    },
  ];

  return (
    <>
      <Button variant="outline" className="px-3" onClick={() => setOpen(true)}>
        <Command className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group.name} heading={group.name}>
              {group.links.map((link) => (
                <CommandItem
                  key={link.name}
                  onSelect={() => {
                    router.push(link.href);
                    setOpen(false);
                  }}
                >
                  {link.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
