"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { upload } from "@vercel/blob/client";
import { type PutBlobResult } from "@vercel/blob";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      return;
    }

    const file = inputFileRef.current.files[0];
    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/avatar/upload",
      });
      setBlob(newBlob);
    } catch (error) {
      console.error("Upload failed", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload Your Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-1">
              <Label htmlFor="avatar-upload">Choose file</Label>
              <Input
                id="avatar-upload"
                type="file"
                ref={inputFileRef}
                required
                className="pt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Upload
            </Button>
          </form>
          {blob && (
            <div className="mt-4 break-words">
              <p className="font-medium">Blob URL:</p>
              <a
                href={blob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {blob.url}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
