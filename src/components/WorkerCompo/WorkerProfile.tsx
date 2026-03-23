"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setLayout } from "recharts/types/state/layoutSlice";

interface WorkerProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkerProfile = ({ open, onOpenChange }: WorkerProfileProps) => {
  const [vehicalType, setVehicalType] = useState("");
  const [loading,setLoading] = useState(false)
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await fetch("/api/workerprofile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicalType, gender }),
      });
      onOpenChange(false);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Failed to create worker profile:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Worker Profile</DialogTitle>
          <DialogDescription>
            Fill in your details to create your worker profile. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicalType" className="text-right">
              Vehicle Type
            </Label>
            <Input
              id="vehicalType"
              placeholder="e.g. Bike, Car, Truck"
              value={vehicalType}
              onChange={(e) => setVehicalType(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <div className="col-span-3">
              <Select
                value={gender}
                onValueChange={(value: "MALE" | "FEMALE") => setGender(value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button  variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>Create Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkerProfile;