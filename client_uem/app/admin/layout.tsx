import AdminNavbar from "@/components/AdminNavbar";
import AdminRoute from "@/components/AdminRoute";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRoute>
    <AdminNavbar/>
    {children}
    </AdminRoute>;
}
