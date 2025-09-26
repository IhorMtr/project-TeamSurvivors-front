import LayoutClient from '../components/LayoutClient/LayoutClient';
import LayoutClient from '../components/LayoutClient'; 
import TestModalTrigger from '../components/TestModalTrigger';

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutClient>
      <h1>Тестова сторінка</h1>
      <TestModalTrigger />
      {children}
    </LayoutClient>
  );
}
export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient>{children}</LayoutClient>;
}
