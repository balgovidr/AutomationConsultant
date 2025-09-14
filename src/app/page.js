"use client";

// import { useEffect } from "react";
// import { useAuth } from "@/providers/AuthProvider.jsx";
// import { useRouter } from "next/navigation";

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
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Nothing to see here yet
          </h1>
          <p className="text-gray-600">
            Go straight to the <a href="/risk-register">Risk Register app</a>
          </p>
        </div>
      </div>
    </div>
  );
}