import type { Metadata } from 'next';
import ClientMuiBoundary from './client-mui-boundary';

export const metadata: Metadata = {
  title: 'AI Resume Builder'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientMuiBoundary>{children}</ClientMuiBoundary>
      </body>
    </html>
  );
}
