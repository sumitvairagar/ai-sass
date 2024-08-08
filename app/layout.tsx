"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const inter = Inter({ subsets: ["latin"] });

function Footer() {
  return (
    <footer className="bg-green-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="hover:underline mr-4">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Provider store={store}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
