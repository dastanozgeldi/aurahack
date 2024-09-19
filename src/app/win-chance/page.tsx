"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function WinChancePage() {
  const [grindset, setGrindset] = useState<number | null>(null);
  const [hustle, setHustle] = useState<number | null>(null);
  const [network, setNetwork] = useState<number | null>(null);
  const [skillset, setSkillset] = useState<number | null>(null);
  const [overall, setOverall] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>(
    "Analyzing your intelligence...",
  );
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);

  const loadingTexts = [
    "Analyzing your intelligence...",
    "Calculating grindset power...",
    "Evaluating hustle potential...",
    "Maximizing your network value...",
    "Optimizing your skillset...",
  ];

  const handleClick = () => {
    setLoading(true);
    setProgress(0);
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < loadingTexts.length) {
        setLoadingText(loadingTexts[currentStep]);
      }

      setProgress((prev) => prev + 20);
      currentStep++;

      if (currentStep === loadingTexts.length) {
        clearInterval(interval);
        finishLoading();
      }
    }, 1000);
  };

  const finishLoading = () => {
    setTimeout(() => {
      const randomGrindset = (Math.random() * 100).toFixed(2);
      const randomHustle = (Math.random() * 100).toFixed(2);
      const randomNetwork = (Math.random() * 100).toFixed(2);
      const randomSkillset = (Math.random() * 100).toFixed(2);

      const grindsetValue = Number(randomGrindset);
      const hustleValue = Number(randomHustle);
      const networkValue = Number(randomNetwork);
      const skillsetValue = Number(randomSkillset);

      const overallValue = (
        (grindsetValue + hustleValue + networkValue + skillsetValue) /
        4
      ).toFixed(2);

      setGrindset(grindsetValue);
      setHustle(hustleValue);
      setNetwork(networkValue);
      setSkillset(skillsetValue);
      setOverall(Number(overallValue));

      setLoading(false);
      setProgress(0);
    }, 500);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileUploaded(!!file);
  };

  return (
    <div className="my-6">
      <h1 className="mb-5 text-center text-2xl font-bold">
        Hackathon Success Potential
      </h1>
      <div className="mb-3 grid w-full items-center gap-1.5">
        <Label htmlFor="teams-count">how many teams are competing?</Label>
        <Input id="teams-count" name="teams-count" type="number" />
      </div>

      <div className="mb-3 grid w-full items-center gap-1.5">
        <Label htmlFor="photo">upload your photo</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <Button onClick={handleClick} disabled={!fileUploaded}>
        Max Your Potential
      </Button>

      {loading ? (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p style={{ fontSize: "18px" }}>{loadingText}</p>
          <Progress value={progress} />
        </div>
      ) : (
        overall !== null && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "18px" }}>
              Grindset Efficiency: <strong>{grindset}</strong>%
            </p>
            <p style={{ fontSize: "18px" }}>
              Hustle Power: <strong>{hustle}</strong>%
            </p>
            <p style={{ fontSize: "18px" }}>
              Network Potential: <strong>{network}</strong>%
            </p>
            <p style={{ fontSize: "18px" }}>
              Skillset Maxing: <strong>{skillset}</strong>%
            </p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Overall Hackathon Winning Potential: <strong>{overall}</strong>%
            </p>
          </div>
        )
      )}
    </div>
  );
}
