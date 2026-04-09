"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-87.5">
        <CardContent>
          <div className="w-full flex justify-center ">
            <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-50 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h1 className="text-xl font-semibold">Payment Successfull</h1>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              Thank you! Your payment has been processed successfully. You
              should have the access to your course now.
            </p>

            <Link
              href="/dashboard"
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <ArrowLeft className="size-5" />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
