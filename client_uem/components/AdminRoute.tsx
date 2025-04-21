"use client";

import { useAuth } from "@/utils/auth";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!user) {
      setIsChecking(false);
      return;
    }

    const checkAdminStatus = async () => {
      const token = localStorage.getItem("token"); // Ensure token is in localStorage
      if (!token) {
        setError("Authentication token not found");
        setIsChecking(false);
        router.push("/not-authorized");
        return;
      }

      try {
     
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-admin/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });
        
       
        

        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
          } else {
            setError("User is not an admin.");
            router.push("/not-authorized");
          }
        } else {
          setError("Error checking admin status.");
          router.push("/not-authorized");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setError("An error occurred while verifying your admin status.");
        router.push("/not-authorized");
      } finally {
        setIsChecking(false);
      }
    };

    // Call checkAdminStatus only if the user exists and is an admin
    if (user?.id) {
      checkAdminStatus();
    } else {
      setIsChecking(false);
      router.push("/not-authorized");
    }
  }, [user, router]);

  if (isChecking) {
    return <p className="p-4">Checking access...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return isAdmin ? <>{children}</> : null;
}
