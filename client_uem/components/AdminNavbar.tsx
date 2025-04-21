'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'User Registers', href: '/admin/register-users' },
  { label: 'QR Verification', href: '/admin/qr-verification' },
];

const AdminNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-950 border-b border-purple-700 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded hover:bg-purple-700 ${
              pathname === item.href ? 'bg-purple-700' : 'bg-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavbar;
