import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const { email } = await req.json();

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

  const rl = await rateLimit(`forgot-password:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { message: 'Email is required' },
      { status: 400 }
    );
  }

  const normalized = email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalized }
  });

  // prevent user enumeration
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  await prisma.passwordResetToken.create({
    data: {
      email: normalized,
      tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30) // 30 min
    }
  });

  // TODO: send email
  console.log(
    `RESET LINK: http://localhost:3000/reset-password?token=${token}`
  );

  return NextResponse.json({ ok: true });
}
