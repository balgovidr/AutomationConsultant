'use client'

import React, { useEffect, useState } from "react";
import { Alert, Slide } from "@mui/material";

export default function SlideAlert({ alertDetails }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), Math.max(alertDetails.message.length * 10, 3000));
    return () => clearTimeout(timer);

  }, [alertDetails.message]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <div>
        <br />
        <Alert severity={alertDetails.severity} sx={{ mb: 2 }}>
          {alertDetails.message}
        </Alert>
      </div>
    </Slide>
  );
}
