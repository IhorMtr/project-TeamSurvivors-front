'use client';
import LayoutClient from '@/components/LayoutClient/LayoutClient';
import { usePathname } from 'next/navigation';
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === '/profile/edit') {
    return <>{children}</>;
  }
  return <LayoutClient>{children}</LayoutClient>;
}
