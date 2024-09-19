"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function WinChancePage() {
  // const [files, setFiles] = useState<File[]>([]);
  // const handleFileUpload = (files: File[]) => {
  //   setFiles(files);
  //   console.log(files);
  // };

  return (
    <>
      <div>
        <Label htmlFor="teams-count">how many teams are there?</Label>
        <Input id="teams-count" name="teams-count" type="number" />
      </div>
      <div>
        <Label htmlFor="photo">Upload a photo</Label>
        <Input id="photo" name="photo" type="file" />
      </div>
    </>
  );
}
