import { writeFile } from "fs/promises";
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
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);
    savedFilePaths.push(`/uploads/${filename}`);
  }

  return NextResponse.json({ urls: savedFilePaths });
}
