'use client';

import { useEffect, useState } from 'react';
import { User, CheckCircle2, Clock, Users } from 'lucide-react';

type RegistrationInfo =
  | {
      id: string;
      status: string;
      paymentStatus: string;
      qrCode: string | null;
      registeredAt: string;
    }
  | 'Not Registered';

type UserType = {
  _id: string;
  name: string;
  email: string;
  rollNumber: string;
  registrationInfo: RegistrationInfo;
};

const tabs = [
  { id: 'all', name: 'All Users', icon: Users },
  { id: 'registered', name: 'Registered', icon: User },
  { id: 'verified', name: 'Verified', icon: CheckCircle2 },
  { id: 'pending', name: 'Pending', icon: Clock },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [ploading, setPLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/registration-status`);
      const data = await res.json();
      console.log('Fetched Users:', data.users);
      
      setUsers(data.users);
      console.log('Users:', users);
      
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // only on mount
  }, [activeTab]);

  const handleVerify = async (id: string, id2: string) => {
    setPLoading(true);
 
    
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/confirm-seat/${id2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: id }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to Verify Payment. Please try again later.");
    } else {
      // Re-fetch users after successful verification
      await fetchUsers();
    }

    setPLoading(false);
  };

  const filterUsers = () => {
    switch (activeTab) {
      case 'registered':
        return users.filter((user) => user.registrationInfo !== 'Not Registered');
      case 'verified':
        return users.filter(
          (user) =>
            user.registrationInfo !== 'Not Registered' &&
            user.registrationInfo.paymentStatus === "completed"
        );
      case 'pending':
        return users.filter(
          (user) =>
            user.registrationInfo !== 'Not Registered' &&
            user.registrationInfo.paymentStatus === "pending"
        );
      default:
        return users;
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 border-b border-purple-700 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm rounded ${
              activeTab === tab.id
                ? 'bg-purple-700 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded text-sm md:text-base">
            <thead className="bg-purple-800">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Registered At</th>
                <th className="p-3 text-left">Verified</th>
                {activeTab === 'pending' && <th className="p-3 text-left">Action</th>}
              </tr>
            </thead>
            <tbody>
              {filterUsers().map((user, idx) => (
                <tr key={idx} className="border-t border-purple-700 hover:bg-gray-700">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.rollNumber}</td>
                  {user.registrationInfo === 'Not Registered' ? (
                    <td colSpan={4} className="p-3 text-yellow-400 text-center">
                      Not Registered
                    </td>
                  ) : (
                    <>
                      <td className="p-3">{user.registrationInfo.status}</td>
                      <td className="p-3">{user.registrationInfo.paymentStatus}</td>
                      <td className="p-3">
                        {new Date(user.registrationInfo.registeredAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        {user.registrationInfo.paymentStatus === "completed" ? (
                          <span className="text-green-400">Yes</span>
                        ) : (
                          <span className="text-yellow-400">No</span>
                        )}
                      </td>
                      {activeTab === 'pending' && (
                        <td className="p-3">
                          <button
                            onClick={() => handleVerify(user._id, user.registrationInfo.id)}
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs sm:text-sm"
                            disabled={ploading}
                          >
                            {ploading ? 'Verifying...' : 'Verify'}
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
              {filterUsers().length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-400">
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
