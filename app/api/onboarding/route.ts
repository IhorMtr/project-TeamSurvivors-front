import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const gender = formData.get("gender") as string;
  const dueDate = formData.get("dueDate") as string;
  const avatar = formData.get("avatar") as File | null;

  if (!gender || !dueDate) {
    return NextResponse.json({ error: "Заповніть усі поля" }, { status: 400 });
  }

  let avatarPath = null;
  if (avatar) {
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    avatarPath = path.join(uploadDir, avatar.name);
    await fs.writeFile(avatarPath, buffer);
  }

  return NextResponse.json({
    message: "Дані збережено",
    gender,
    dueDate,
    avatar: avatar ? `/uploads/${avatar.name}` : null,
  });
}
