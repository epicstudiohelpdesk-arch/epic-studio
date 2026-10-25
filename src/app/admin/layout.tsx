import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Console | EPIC STUDIO",
  description: "Executive command center for client inquiries, consultations, and database management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root bg-slate-50 text-slate-900 min-h-screen antialiased selection:bg-blue-600 selection:text-white">
      {children}
    </div>
  );
}
