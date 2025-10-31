import { AdminDashboardLayout } from "@/components/layout/admin/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mafaaheem Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDashboardLayout>
      {children}
    </AdminDashboardLayout>
  );
}
