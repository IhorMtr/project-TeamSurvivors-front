import LayoutClient from '../components/LayoutClient/LayoutClient';

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient>{children}</LayoutClient>;
}
