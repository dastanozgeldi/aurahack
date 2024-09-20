"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useGenerate } from "./use-generate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  const { loading, link, onSubmit } = useGenerate();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Generate presentation</CardTitle>
        <CardDescription>
          All you need is a github repository, we will do the rest using powers
          of AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="mt-3">
          <div className="mt-3 grid w-full gap-1.5">
            <Label htmlFor="githubUrl">link to your github repository</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/dastanozgeldi/boribay"
              autoComplete="off"
              required
            />
          </div>

          <div className="mt-3 grid w-full gap-1.5">
            <Label htmlFor="timeLimit">how much time to present?</Label>
            <Input
              id="timeLimit"
              name="timeLimit"
              placeholder="5 mins"
              autoComplete="off"
              required
            />
          </div>

          <div className="mt-3 grid w-full gap-1.5">
            <Label htmlFor="theme">Theme</Label>
            <Select name="theme">
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-3" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Submit
          </Button>
        </form>

        {link && (
          <p className="mt-3 flex items-center justify-end gap-3 text-center">
            the presentation is ready!
            <Link href={link} download>
              <Button variant="outline">download</Button>
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
