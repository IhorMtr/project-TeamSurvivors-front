import type { Metadata } from 'next';
import './globals.css';
import { Lato, Comfortaa } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Sidebar from '@/components/Sidebar/Sidebar';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-family',
});

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
    <html lang="en">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <Sidebar />
          <main>
            {children}
          </main>
        </TanStackProvider>
      </body>
    </html>
  );
}
