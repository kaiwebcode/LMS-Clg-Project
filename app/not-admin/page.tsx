import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BsShieldFillExclamation } from "react-icons/bs";

export default function NotAdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md text-center border-destructive/50">
       <CardHeader className="text-2xl font-bold text-red-500">
        <div className="bg-destructive/20 p-4 rounded-full w-fit mx-auto"> 
            <BsShieldFillExclamation className="w-12 h-12 mx-auto text-red-500" />
        </div>
        <CardTitle className="mt-4">Access Restricted!</CardTitle>
        <CardDescription className="text-red-500/60">You are trespassing on restricted territory.</CardDescription>
        <CardDescription>Hey! You do not have permission to access this page, because you are not an admin, Which means you cannot perform admin actions.</CardDescription>
       </CardHeader>
       <CardContent>
        <Link href="/" className={buttonVariants({ 
            className: "mx-auto w-full ",
        })}>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Go back to Home</span>
        </Link>
       </CardContent>
      </Card>
    </div>
  );
}