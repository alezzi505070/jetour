"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-night-950 text-steel-400">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-crimson-500 border-t-transparent mx-auto mb-4" />
        <p className="text-sm font-semibold tracking-wider uppercase">Redirecting...</p>
      </div>
    </div>
  );
}
