import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "Regístame Ya! - Tu Contacto Profesional en 1 Clic",
  description: "Deja de perder trabajos porque tus clientes te olvidan. Configuramos tu contacto estratégico para que siempre aparezcas primero.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-cream text-navy`}
      >
        {children}
      </body>
    </html>
  );
}
