"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient.js";
import { useRouter } from "next/navigation";
import SlideAlert from "@/components/SlideAlert.jsx";
import Button from "@/components/Button.jsx";
import Input from "@/components/Input.jsx";
import LockIcon from '@mui/icons-material/Lock';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({message: "", severity: ""});
  const router = useRouter();

  const redirectUrl = (new URLSearchParams(window.location.search)).get("redirect")
  const redirectParam = redirectUrl ? "?redirect=" + encodeURIComponent(redirectUrl) : "";

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({message: "", severity: ""});

    const response = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (response.error) {
      setAlert({message: response.error.message, severity: "error"});
    } else {
      // Show user a success message and redirect
      setAlert({message: "Password updated successfully!", severity: "success"});
      setTimeout(() => router.push("/auth/login" + redirectParam), 2000);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <LockIcon size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Update Password
        </h1>
        <p className="text-gray-600 mt-2">
          Choose a new secure password
        </p>
      </div>

      <div onSubmit={handleUpdate} className="space-y-6">

        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          helperText="Must be at least 8 characters"
          leftIcon={<LockIcon size={20} className="text-gray-400" />}
        />

        <Button
          type="submit"
          onClick={handleUpdate}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? <CircularProgress size={20} /> : 'Update Password'}
        </Button>
      </div>
            
      {alert.message && (
        <SlideAlert alertDetails={alert}/>
      )}
    </div>
  );
}