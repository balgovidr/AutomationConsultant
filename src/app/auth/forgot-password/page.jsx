"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient.js";
import SlideAlert from "@/components/SlideAlert.jsx";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation'
import Button from "@/components/Button.jsx";
import Input from "@/components/Input.jsx";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { CircularProgress } from "@mui/material";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({message: "", severity: ""});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({message: "", severity: ""});

    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    setLoading(false);

    if (response.error) {
      setAlert({message: response.error.message, severity: "error"});
    } else {
      // Show user a success message
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircleOutlineIcon size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Check Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to {email}
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/auth/login")}
          className="w-full"
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <LockIcon size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Forgot Password?
        </h1>
        <p className="text-gray-600 mt-2">
          Enter your email to receive a reset link
        </p>
      </div>

      <div onSubmit={handleReset} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<MailIcon size={20} className="text-gray-400" />}
        />

        <Button
          type="submit"
          onClick={handleReset}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? <CircularProgress size={20} /> : 'Send Reset Link'}
        </Button>
      </div>
      
      {alert.message && (
        <SlideAlert alertDetails={alert}/>
      )}

      <div className="mt-6 text-center">
        <Button
          variant="text"
          onClick={() => router.push("/auth/login")}
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
}