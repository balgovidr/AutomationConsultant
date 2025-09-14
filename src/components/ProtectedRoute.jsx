"use client";

import { useAuth } from "@/components/AuthProvider.jsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/auth/login");
    }
  }, [session, loading]);

  if (loading) return null;
  return session ? children : null;
}