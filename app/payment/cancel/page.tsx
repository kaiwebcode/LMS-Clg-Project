import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-87.5">
        <CardContent>
          <div className="w-full flex justify-center ">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-50 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h1 className="text-xl font-semibold">Payment Cancelled</h1>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              No worries, you won&apos;t be charged. Please try again!
            </p>

            <Link
              href="/"
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <ArrowLeft className="size-5" />
              Go Back HomePage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
