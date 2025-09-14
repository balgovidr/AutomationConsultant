'use client'

import React, { useEffect, useState } from "react";
import { Alert, Slide } from "@mui/material";

export default function SlideAlert({ alertDetails, setAlert }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setAlert({ message: "", severity: "" });
    }, Math.max(alertDetails.message.length * 10, 3000));
    return () => clearTimeout(timer);

  }, [alertDetails.message]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-lg px-4">
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <div>
          <br />
          <Alert severity={alertDetails.severity} sx={{ mb: 2 }}>
            {alertDetails.message}
          </Alert>
        </div>
      </Slide>
    </div>
  );
}
