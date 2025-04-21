'use client';

import { X, Ticket } from 'lucide-react';
import { useAuth } from '@/utils/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BookTicketDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  confirmed: boolean;
  setConfirmed: (confirmed: boolean) => void;
}

const BookTicketDrawer: React.FC<BookTicketDrawerProps> = ({
  isOpen,
  setIsOpen,
  confirmed,
  setConfirmed,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setErr(null);
    setLoading(false);
  }, [isOpen]);

  const handleGetTicket = async () => {
    const token = localStorage.getItem('token');

    if (!user || !token) {
      alert('Please log in to book a ticket.');
      return;
    }

    try {
      setLoading(true);
      setErr(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/register-seat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to book ticket. Please try again later.");
      }

      setErr(null);
      setConfirmed(true);
    } catch (error: any) {
      setErr(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 text-white shadow-xl transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 999 }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-purple-700 bg-purple-800">
          <h2 className="text-lg font-semibold">Book a Ticket</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close">
            <X className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-8rem)] space-y-4">
          {!confirmed ? (
            <>
              <div>
                <h3 className="text-xl font-bold">Annual Dinner</h3>
                <p className="text-sm text-gray-300">
                  Join us for an evening of celebration, dinner, and entertainment. 🎉
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-1">Payment Method</h4>
                <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded">
                  <Ticket className="text-purple-400" />
                  <span>Cash</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-12">
              <h3 className="text-lg font-bold text-green-400 mb-2">
                🎫 Your ticket request is received!
              </h3>
              <p className="text-sm text-gray-300">
                Your ticket will be generated after payment approval.
              </p>
              <Link
                href="/tickets"
                className="text-purple-400 underline mt-4 inline-block"
              >
                See tickets here
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        {!confirmed && (
          <div className="fixed bottom-0 right-0 w-full max-w-md p-4 border-t border-purple-700 bg-gray-900">
            {err && <p className="text-red-500 py-2 text-sm">{err}</p>}
            <button
              onClick={handleGetTicket}
              disabled={loading}
              className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        ></div>
      )}
    </>
  );
};

export default BookTicketDrawer;
