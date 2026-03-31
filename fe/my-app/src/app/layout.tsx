import Sidebar from "@/components/Sidebar/Sidebar";

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
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
