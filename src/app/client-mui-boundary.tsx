'use client';

import dynamic from 'next/dynamic';

const MuiRoot = dynamic(() => import('./mui-root'), {
  ssr: false
});

export default function ClientMuiBoundary({
  children
}: {
  children: React.ReactNode;
}) {
  return <MuiRoot>{children}</MuiRoot>;
}
