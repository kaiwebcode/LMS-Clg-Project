import { Suspense } from "react";
import VerifyRequestClient from "./_components/verify-request-client";


export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <VerifyRequestClient />
    </Suspense>
  );
}
