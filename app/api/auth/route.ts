import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;
  console.log(name);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function GET() {
  return NextResponse.json({ msg: "I am on GET" });
}
