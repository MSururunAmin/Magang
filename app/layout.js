import localFont from "next/font/local";
import "./globals.css";
import InformationPage from "./components/Contact";
import { UserProvider } from "./context/UserContext";

// Mengimpor font lokal
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata untuk halaman
export const metadata = {
  title: "Layanan Aptika",
  description: "Generated by create next app",
};

// Root Layout
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
        <InformationPage />
        {/* Menampilkan komponen informasi di bawah konten */}
      </body>
    </html>
  );
};

export default RootLayout;
