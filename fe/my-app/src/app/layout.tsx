import "./globals.css";

export const metadata = {
  title: "SavvySnap",
  description: "Capture photo and save notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
