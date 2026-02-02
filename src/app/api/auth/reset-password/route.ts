import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

  const rl = await rateLimit(`reset-password:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  if (!token || !password) {
    return NextResponse.json(
      { message: 'Token and password are required' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  const tokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const record = await prisma.passwordResetToken.findFirst({
    where: {
      tokenHash,
      expiresAt: { gt: new Date() }
    }
  });

  if (!record) {
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: record.email },
      data: { passwordHash }
    }),
    prisma.passwordResetToken.deleteMany({
      where: { email: record.email }
    })
  ]);

  return NextResponse.json({ ok: true });
}
