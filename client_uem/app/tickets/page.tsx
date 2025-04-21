'use client';

import React, { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/navigation';

type RegistrationResponse = {
  _id: string;
  userId: string;
  qrCode: string | null;
  paymentStatus: 'pending' | 'completed';
  expireAt: string | null;
  registrationStatus: 'registered' | 'not_registered';
  registeredAt: string;
};

const RegistrationStatus: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<RegistrationResponse | null>(null);
  const [error, setError] = useState('');
  const { Canvas } = useQRCode();
  const { user } = useAuth();
  const router = useRouter();

  const fetchRegistration = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!user?.id || !token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/get-ticket/${user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('You have not Booked the Ticket yet!');
      }

      const data = await res.json();
      setRegistration(data.registration);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/login');
    } else {
      fetchRegistration();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-800 px-6 py-4 rounded-lg shadow-md text-lg">
          You have not booked the ticket for event yet.
        </div>
      </div>
    );
  }

  const isPending =
    registration.qrCode === "null" && registration.paymentStatus === 'pending';
  const isCompleted =
    registration.qrCode !== "null" && registration.paymentStatus === 'completed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center text-white p-4">
      {isPending && (
        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">Payment Pending</h2>
          <p className="text-lg">Please complete the payment to receive your QR pass.</p>
        </div>
      )}

      {isCompleted && (
        <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-md mt-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">QR Pass For Annual Dinner <br/> Of IT Department</h2>
          <div className="flex flex-col items-center space-y-4">
            <Canvas
              text={registration.qrCode!}
              options={{
                errorCorrectionLevel: 'M',
                margin: 2,
                scale: 4,
                width: 160,
                color: {
                  dark: '#000000',
                  light: '#ffffff',
                },
              }}
            />
            <p className="text-lg font-semibold">Name: {user?.name}</p>
            <p className="text-sm text-gray-600">
              Registered on:{' '}
              {new Date(registration.registeredAt).toLocaleString()}
            </p>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              Status: Verified
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationStatus;
