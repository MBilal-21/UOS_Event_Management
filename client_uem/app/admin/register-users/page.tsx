'use client';

import { useEffect, useState } from 'react';

type RegistrationInfo = {
  status: string;
  paymentStatus: string;
  qrCode: string;
  registeredAt: string;
} | "Not Registered";

type UserType = {
  name: string;
  email: string;
  rollNumber: string;
  registrationInfo: RegistrationInfo;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/registration-status`);
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Registration Status</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded">
            <thead className="bg-purple-800">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-t border-purple-700 hover:bg-gray-700">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.rollNumber}</td>
                  {user.registrationInfo === 'Not Registered' ? (
                    <td colSpan={3} className="p-3 text-yellow-400 text-center">
                      Not Registered
                    </td>
                  ) : (
                    <>
                      <td className="p-3">{user.registrationInfo.status}</td>
                      <td className="p-3">{user.registrationInfo.paymentStatus}</td>
                      <td className="p-3">
                        {new Date(user.registrationInfo.registeredAt).toLocaleDateString()}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
