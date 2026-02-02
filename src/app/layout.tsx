import type { Metadata } from 'next';
import ClientMuiBoundary from './client-mui-boundary';
import Providers from './providers';

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
        <Providers>
          <ClientMuiBoundary>{children}</ClientMuiBoundary>
        </Providers>
      </body>
    </html>
  );
}
