import LayoutClient from '@/components/LayoutClient/LayoutClient';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient>{children}</LayoutClient>;
}
