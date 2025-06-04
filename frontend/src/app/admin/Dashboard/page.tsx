"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tours from "../Page/tour/page";
import BookingListPage from "../Page/Booking_list/page";
import Logout from "@/app/components/Logout/page";
interface DashboardData {
  // Customize this based on your Laravel response structure
  // totalUsers?: number;
  // totalTours?: number;
  message?: string;
}
const page = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found. Please log in.");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Unauthorized. Please log in again.");
            router.push("/login");
          } else {
            setError("Failed to fetch dashboard need to login.");
          }
          return;
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        setError("Something went wrong.");
        console.error(err);
      }
    };

    fetchDashboard();
  }, [router]);

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8 font-sans">
        <button >
            logout
        <Logout/>
        </button>
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center drop-shadow">
            🚀 Admin Dashboard
          </h1>

          {error && (
            <p className="text-red-600 text-center mb-6 bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}

          {dashboardData ? (
            <div className="text-center text-lg text-gray-700 space-y-4">
              {/* Example of possible stats, uncomment and customize */}
              {/* <p><strong>Total Users:</strong> {dashboardData.totalUsers}</p>
        <p><strong>Total Tours:</strong> {dashboardData.totalTours}</p> */}
              <p className="mt-4 text-green-700 bg-green-100 p-3 rounded-xl inline-block shadow">
                {dashboardData.message}
              </p>
            </div>
          ) : !error ? (
            <p className="text-center text-gray-500 animate-pulse">
              Loading...
            </p>
          ) : null}
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <Tours />
        </div>

        <div>
          <BookingListPage/>
        </div>
      </div>
    </>
  );
};

export default page;
