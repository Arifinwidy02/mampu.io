"use client";

import LottieState from "@/components/client/LottieState";
import { Button } from "@/components/ui/button";

export default function UserDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-10">
      <LottieState
        src="/lottie/empty_state.json"
        description="Something went wrong loading this user."
      >
        <Button onClick={reset}>Try Again</Button>
      </LottieState>
    </div>
  );
}
