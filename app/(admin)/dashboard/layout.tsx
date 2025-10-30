import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboard";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminDashboardLayout>
            {children}
        </AdminDashboardLayout>
    );
}
