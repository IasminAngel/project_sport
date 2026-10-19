import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olímpica — histórias que inspiram",
  description: "Pesquise atletas brasileiros, explore modalidades e descubra curiosidades dos Jogos Olímpicos.",
  icons: { icon: "/logo-olimpica.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
