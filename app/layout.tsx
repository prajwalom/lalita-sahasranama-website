import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'श्री ललिता सहस्रनाम - Lalita Sahasranama',
  description: 'Experience the divine thousand names of Goddess Lalita with interactive features, meanings, and spiritual guidance',
  keywords: 'Lalita Sahasranama, Divine Mother, Sanskrit, Spirituality, Meditation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}