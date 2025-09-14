"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient.js";
import { useRouter } from "next/navigation";
import SlideAlert from "@/components/SlideAlert.jsx";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Input from "@/components/Input.jsx";
import Button from "@/components/Button.jsx"
import { CircularProgress } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState({message: "", severity: ""});

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({message: "", severity: ""});

    // Check that the email provided is valid
    if (!email.toLowerCase().includes("reciengineering.com")) {
      setLoading(false);
      setAlert({message: "Please use a valid Reci Engineering email address.", severity: "error"});
      return;
    }

    const response = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (response.error) {
      setAlert({message: response.error.message, severity: "error"});
    } else {
      // Show user a success message and redirect
      setAlert({message: "Sign up successful! Redirecting to login...", severity: "success"});
      setTimeout(() => router.push("/auth/login"), 2000);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <PersonOutlineIcon size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>
        <p className="text-gray-600 mt-2">
          Get started with digital signatures
        </p>
      </div>

      <div onSubmit={handleSignUp} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          leftIcon={<MailIcon size={20} className="text-gray-400" />}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          helperText="Must be at least 8 characters"
          leftIcon={<LockIcon size={20} className="text-gray-400" />}
        />

        <Button
          type="submit"
          onClick={handleSignUp}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? <CircularProgress size={20} /> : 'Create Account'}
        </Button>
      </div>

      {alert.message && (
        <SlideAlert alertDetails={alert}/>
      )}

      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600">
          Already have an account?{' '}
          <Button
            variant="text"
            className="p-0 font-medium"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}