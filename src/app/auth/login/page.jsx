"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient.js";
import { useAuth } from "@/providers/AuthProvider.jsx";
import Button from "@/components/Button.jsx";
import Input from "@/components/Input.jsx";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import SlideAlert from "@/components/SlideAlert.jsx";
import { useRouter } from 'next/navigation'
import { CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({message: "", severity: ""});
  const { session } = useAuth();

  const router = useRouter()
  const redirectUrl = (new URLSearchParams(window.location.search)).get("redirect")
  const redirectParam = redirectUrl ? "?redirect=" + encodeURIComponent(redirectUrl) : "";

  // Redirect only when session exists
  if (session) {
    window.location.href = redirectUrl;
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({message: "", severity: ""});
    
    // Server-side login
    const serverResponse = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // If server-side login fails, login to client-side as well
    let clientResponse;
    if (serverResponse.ok) {
        // Client-side login
        clientResponse = await supabase.auth.signInWithPassword({ email, password });
    }

    const serverResult = await serverResponse.json();

    setLoading(false);

    if (clientResponse?.error || !serverResponse.ok) {
      setAlert({
        message: clientResponse?.error?.message || serverResult.error,
        severity: "error"
      });
    } else {
      setAlert({message: "Login successful! Redirecting...", severity: "success"});
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <LockIcon size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>
        <p className="text-gray-600 mt-2">
          Sign in to your digital signature account
        </p>
      </div>

      <div onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<MailIcon size={20} className="text-gray-400" />}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<LockIcon size={20} className="text-gray-400" />}
        />

        <Button
          type="submit"
          onClick={handleLogin}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? <CircularProgress size={20}/> : 'Sign In'}
        </Button>
      </div>

      {alert.message && (
        <SlideAlert alertDetails={alert}/>
      )}

      <div className="mt-6 text-center space-y-2">
        <Button
          onClick={() => router.push("/auth/forgot-password" + redirectParam)}
          variant="text"
        >
          Forgot your password?
        </Button>
        <div className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Button
            onClick={() => router.push("/auth/signup" + redirectParam)}
            variant="text"
            className="p-0 font-medium"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}