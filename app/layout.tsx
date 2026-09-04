import type { Metadata } from "next";
import "./globals.css";
import { RightClickContact } from "@/components/right-click-contact";
import { MotionPreferences } from "@/components/motion-preferences";

export const metadata: Metadata = {
  title: "ZACK STUDIOS — Video Editing, Graphic Design, AI + Web",
  description:
    "Zack is a multidisciplinary creative working across video editing and motion, graphic design and AI, campaigns, product visualization and web design.",
  openGraph: {
    title: "ZACK STUDIOS — Video Editing, Graphic Design, AI + Web",
    description: "Video editing and motion, graphic design and AI, campaigns and web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionPreferences>
          {children}
          <RightClickContact />
        </MotionPreferences>
      </body>
    </html>
  );
}
