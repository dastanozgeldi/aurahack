"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "./use-modal";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/multi-select";
import { SelectHackathon, SelectProfile } from "@/db/schema";

export function JoinModal({
  profile,
  hackathon,
}: {
  profile: SelectProfile;
  hackathon: SelectHackathon;
}) {
  const { loading, open, setOpen, onSubmit } = useModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={profile.teamId ? true : false}
          className="mt-3 w-full"
        >
          {profile.teamId ? (
            <>already joined</>
          ) : (
            <>
              join <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{hackathon.name}</DialogTitle>
          <DialogDescription>{hackathon.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="teamName">give a name for your team</Label>
            <Input id="teamName" name="teamName" autoComplete="off" />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="members">add teammates</Label>
            <MultiSelect />
          </div>

          <DialogFooter className="mt-3 sm:justify-end">
            <Button disabled={loading}>
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
