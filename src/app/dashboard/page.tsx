// server component
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // preserve intended destination so user returns after sign-in
    const cb = encodeURIComponent('/dashboard');
    redirect(`/signin?callbackUrl=${cb}`);
  }

  return (
    <>
      <Header />
      <main style={{ padding: 24 }}>
        <h1>Dashboard</h1>
        <p>Welcome, {session?.user?.email ?? 'user'}.</p>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </main>
      <Footer />
    </>
  );
}
