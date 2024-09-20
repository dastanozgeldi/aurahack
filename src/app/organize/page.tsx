"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com";
import { ChangeEvent, useState } from "react";

export default function OrganizePage() {
  const [formData, setFormData] = useState({
    eventName: "",
    organizerName: "",
    date: "",
    location: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const templateParams = {
      event_name: formData.eventName,
      organizer_name: formData.organizerName,
      date: formData.date,
      location: formData.location,
      organizer_email: formData.email,
      description: formData.description,
    };

    emailjs
      .send(
        "service_mrnukxe",
        "template_70moq81",
        templateParams,
        "SByBuxXHJmfVhPRws",
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Hackathon details sent successfully!");
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to send email. Please try again.");
        },
      );
  };

  return (
    <Card className="mx-auto mt-6 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Organize Hackathon Form</CardTitle>
        <CardDescription>
          These details will get composed into an email that will be sent to
          organizers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizerName">Organizer Name</Label>
            <Input
              id="organizerName"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Event Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Organizer Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
