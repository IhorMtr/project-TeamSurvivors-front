import type { Metadata } from 'next';
import './globals.css';
import { Lato, Comfortaa } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Sidebar from '@/components/Sidebar/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { Toaster } from 'react-hot-toast';

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
            <Breadcrumbs />
            {children}
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
              },
            }}
          />
        </TanStackProvider>
      </body>
    </html>
  );
}
