// app/page.tsx (for App Router) or pages/index.tsx (for Pages Router)
"use client";


import BookTicketDrawer from "@/components/BookTicketDrawer";
import { useState } from "react";
import { useAuth } from "@/utils/auth"; 
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const {user } = useAuth();
  const router = useRouter();


  const handleGetTicket = () => {
    const token = localStorage.getItem("token");
    if (user && token) {
      setConfirmed(false);
      setIsOpen(true);
    } else {
      
      router.push("/login");
      alert("Please log in to book a ticket.");
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">

<BookTicketDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmed={confirmed}
        setConfirmed={setConfirmed}
      />
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden bg-cover bg-center flex items-center justify-center">
              <div 
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{ 
      backgroundImage: `url('/hero_bg.jpeg')`, 
      opacity: 0.2 
    }}
  ></div>
        {/* Curtain effect */}
        {/* <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-purple-900 animate-curtain-left" style={{zIndex:100}}></div>
          <div className="w-1/2 bg-purple-900 animate-curtain-right" style={{zIndex:100}}></div>
        </div> */}
        {/* ---------------------------------------------------------- */}
        <div className="absolute inset-0 flex z-50 overflow-hidden pointer-events-none">
          {/* Left Curtain */}
          <div
            className="w-1/2 animate-curtain-left"
            style={{
              background: `
        repeating-linear-gradient(
          to right,
          #4c1d95 0px,
          #6b21a8 20px,
          #4c1d95 40px
        ),
        radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)
      `,
              backgroundBlendMode: "overlay",
              boxShadow: "inset -12px 0 30px rgba(0, 0, 0, 0.6)",
              borderTopRightRadius: "60px",
              borderBottomRightRadius: "60px",
              zIndex: 100,
            }}
          ></div>

          {/* Right Curtain */}
          <div
            className="w-1/2 animate-curtain-right"
            style={{
              background: `
        repeating-linear-gradient(
          to left,
          #4c1d95 0px,
          #6b21a8 20px,
          #4c1d95 40px
        ),
        radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)
      `,
              backgroundBlendMode: "overlay",
              boxShadow: "inset 12px 0 30px rgba(0, 0, 0, 0.6)",
              borderTopLeftRadius: "60px",
              borderBottomLeftRadius: "60px",
              zIndex: 100,
            }}
          ></div>
        </div>


        {/* ---------------------------------------------------------- */}


        <div className="z-10 text-center px-4 ">
          {/* <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">Upcoming: Annual Dinner</h1>
          <p className="text-lg md:text-xl text-gray-300">Join us for an unforgettable evening filled with food, fun, and celebration!</p> */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-white">
              Annual Dinner of <br/> IT Department
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Join us for an evening of elegance and networking
            </p>
            <div className="space-y-4">
              <p className="text-lg text-[#9b87f5]">December 25th, 2025 | 7:00 PM</p>
              <p className="text-lg text-gray-400">Grand Tech Plaza, Silicon Valley</p>
              <button    onClick={() => handleGetTicket()} className="bg-purple-900 text-white px-8 py-3 rounded-full hover:bg-[#8b77e5] transition-colors duration-300" style={{cursor:"pointer"}}>
                Get Your Tickets
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
