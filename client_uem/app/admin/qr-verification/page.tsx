'use client';

import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QRCodeScanner = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [inputId, setInputId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);

  const verifyDetails = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/verify-user-details/${inputId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      console.log('Verification Response:', data);

      if (!res.ok) throw new Error(data.message);
      setDetails(data);
      setError(null);
    } catch (err: any) {
      // Improved error handling
      setError(err?.message || 'Unknown error occurred');
      setDetails(null);
    }
  };

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold mb-2">🎯 QR Code Verification</h2>

      <button
        onClick={() => setShowScanner(!showScanner)}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        {showScanner ? 'Hide Scanner' : 'Scan QR Code'}
      </button>

      {showScanner && (
        <Scanner
          onScan={(codes) => {
            if (codes.length > 0) {
              const id = codes[0].rawValue;
              setScannedId(id);
              setInputId(id);
              setShowScanner(false);
            }
          }}
          onError={(error) => {
            console.error('Scanner error:', error);
            setError('An error occurred while scanning.');
          }}
        />
      )}

      <div>
        <label className="block text-sm">User ID:</label>
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="bg-gray-800 border border-gray-600 px-3 py-1 rounded text-white w-full"
        />
        <button
          onClick={verifyDetails}
          className="mt-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Verify Details
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {details && (
        <div className="bg-gray-800 p-4 mt-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">✅ Details Found</h3>
          <p><strong>Name:</strong> {details.user.firstName +" " + details.user.lastName }</p>
          <p><strong>Email:</strong> {details.user.email}</p>
          <p><strong>Roll no:</strong> {details.user.rollNumber}</p>
          <p><strong>Payment Status:</strong> {details.registration.paymentStatus === "completed" ? <span className='text-green-500'>✅ Completed</span>: <span className='text-red-500'>Pending</span> }</p>
          <p><strong>QR Code:</strong> {details.registration.qrCode === inputId ? <span className='text-green-500'>✅ Matched</span>: <span className='text-red-500'>❌ Not Matched</span> }</p>
          <p><strong>Registered:</strong> {new Date(details.registration.registeredAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
