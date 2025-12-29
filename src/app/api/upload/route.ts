import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const savedFilePaths: string[] = [];

  for (const file of files) {
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    savedFilePaths.push(blob.url);
  }

  return NextResponse.json({ urls: savedFilePaths });
}
