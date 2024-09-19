"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function WinChancePage() {
  const [grindset, setGrindset] = useState<number | null>(null);
  const [hustle, setHustle] = useState<number | null>(null);
  const [network, setNetwork] = useState<number | null>(null);
  const [skillset, setSkillset] = useState<number | null>(null);
  const [overall, setOverall] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>("Analyzing your intelligence...");
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);

  const loadingTexts = [
    "Analyzing your intelligence...",
    "Calculating grindset power...",
    "Evaluating hustle potential...",
    "Maximizing your network value...",
    "Optimizing your skillset..."
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
        (grindsetValue + hustleValue + networkValue + skillsetValue) / 4
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
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Hackathon Success Potential
      </h1>
      <div style={{ marginBottom: '15px' }}>
        <Label htmlFor="teams-count">How many rival teams are grinding?</Label>
        <Input id="teams-count" name="teams-count" type="number" />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <Label htmlFor="photo">Upload a photo</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
          <input
            id="photo-upload"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <Button
          onClick={handleClick}
          style={{ padding: '10px 20px' }}
          disabled={!fileUploaded}
        >
          Max Your Potential
        </Button>
      </div>

      {loading ? (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px' }}>{loadingText}</p>
          <Progress value={progress} />
        </div>
      ) : overall !== null && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ fontSize: '18px' }}>
            Grindset Efficiency: <strong>{grindset}</strong>%
          </p>
          <p style={{ fontSize: '18px' }}>
            Hustle Power: <strong>{hustle}</strong>%
          </p>
          <p style={{ fontSize: '18px' }}>
            Network Potential: <strong>{network}</strong>%
          </p>
          <p style={{ fontSize: '18px' }}>
            Skillset Maxing: <strong>{skillset}</strong>%
          </p>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Overall Hackathon Winning Potential: <strong>{overall}</strong>%
          </p>
        </div>
      )}
    </div>
  );
}
