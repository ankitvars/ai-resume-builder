import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

  const rateLimitResult = await rateLimit(`signup:${ip}`);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: 'Password too short' },
      { status: 400 }
    );
  }  

  const emailNormalized = email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: emailNormalized } });
  if (existing) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email: emailNormalized,
      name,
      passwordHash,
    },
  });

  return NextResponse.json({ ok: true });
}
