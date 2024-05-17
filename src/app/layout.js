import { Open_Sans } from "next/font/google";
import "./globals.css";
import HeadBar from "@/components/HeadBar";
import { Footer } from "@/components/Footer";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Indiana courses",
  description: "Indiana courses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <HeadBar />
          <div className="pt-28 max-w-[1200px] w-[90%] mx-auto">
            {children}
          </div>
          <Footer />
      </body>
    </html>
  );
}
