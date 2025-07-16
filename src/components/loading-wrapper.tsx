"use client";

import { useState, useEffect } from "react";
import { LoaderOne } from "@/components/ui/loader";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);

    // Show loader only if page takes longer than 100ms to render
    const loaderTimer = setTimeout(() => {
      if (isLoading) {
        setShowLoader(true);
      }
    }, 100);

    // Check if page is fully loaded
    const checkLoaded = () => {
      if (document.readyState === 'complete') {
        setIsLoading(false);
        setShowLoader(false);
      }
    };

    // Initial check
    checkLoaded();

    // Listen for load events
    document.addEventListener('readystatechange', checkLoaded);
    window.addEventListener('load', checkLoaded);

    return () => {
      clearTimeout(loaderTimer);
      document.removeEventListener('readystatechange', checkLoaded);
      window.removeEventListener('load', checkLoaded);
    };
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  if (showLoader && isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <div className="flex flex-col items-center gap-4">
          <LoaderOne />
          <p className="text-sm text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}