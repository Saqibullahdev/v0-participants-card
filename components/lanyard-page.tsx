"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LanyardWithControls from "@/components/lanyard-with-controls";
import { decryptUsername } from "@/lib/utils";

function LanyardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Decrypt username from URL params if present
  const defaultName = useMemo(() => {
    const encryptedName = searchParams.get("u");
    if (encryptedName) {
      const decrypted = decryptUsername(encryptedName);
      return decrypted ?? null;
    }
    return null;
  }, [searchParams]);

  // Redirect to home if no valid encrypted name is provided
  useEffect(() => {
    if (defaultName === null) {
      router.replace("/");
    }
  }, [defaultName, router]);

  // Show loading while checking/redirecting
  if (defaultName === null) {
    return (
      <main className="relative flex min-h-dvh flex-col items-center justify-center">
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center">
      <div className="relative w-full max-w-2xl">
        <LanyardWithControls
          position={[0, 0, 18]}
          containerClassName="relative aspect-square w-full h-screen"
          defaultName={defaultName}
        />
      </div>
    </main>
  );
}

export default function LanyardPage() {
  return (
    <Suspense fallback={
      <main className="relative flex min-h-dvh flex-col items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </main>
    }>
      <LanyardContent />
    </Suspense>
  );
}
