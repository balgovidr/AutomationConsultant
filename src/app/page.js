"use client";

// import { useEffect } from "react";
// import { useAuth } from "@/providers/AuthProvider.jsx";
// import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function Home() {
  // const { session } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (session === null) {
  //     // Not signed in
  //     router.replace("/auth/login");
  //   } else if (session) {
  //     // Signed in
  //     router.replace("/dashboard");
  //   }
  // }, [session, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <CircularProgress size={50} className="text-blue-600" />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Loading your workspace
          </h1>
          <p className="text-gray-600">
            Please wait while we prepare the digital signature dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}