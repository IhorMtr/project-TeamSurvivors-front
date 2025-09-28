import type { Metadata } from 'next';
import './globals.css';
import { Comfortaa } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import ReactToaster from '@/components/ReactToaster/ReactToaster';

const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  variable: '--second-family',
});

export const metadata: Metadata = {
  title: 'Lehleka App',
  description: 'Pregnancy tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${comfortaa.variable}`}>
        <ReactToaster />
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
