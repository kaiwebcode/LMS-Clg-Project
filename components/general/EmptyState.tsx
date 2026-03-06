import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "You haven't created anything yet. Start by creating your first item.",
  buttonText,
  href = "/admin/courses/create",
}: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center border border-dashed rounded-xl px-6 py-12 sm:px-10 sm:py-16 lg:py-20 min-h-87.5 sm:min-h-105 bg-muted/30 overflow-hidden animate-in fade-in-50">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

      {/* Illustration */}
      <div className="relative mb-6 sm:mb-8">
        <svg
          width="140"
          height="140"
          viewBox="0 0 200 200"
          fill="none"
          className="opacity-90"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="2"
          />

          <rect
            x="55"
            y="60"
            width="90"
            height="70"
            rx="10"
            fill="currentColor"
            fillOpacity="0.08"
          />

          <rect
            x="70"
            y="80"
            width="60"
            height="8"
            rx="4"
            fill="currentColor"
            fillOpacity="0.2"
          />

          <rect
            x="70"
            y="95"
            width="40"
            height="8"
            rx="4"
            fill="currentColor"
            fillOpacity="0.15"
          />

          <circle
            cx="100"
            cy="140"
            r="12"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-md leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {buttonText && (
        <Link
          href={href}
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 flex items-center gap-2 shadow-sm",
          )}
        >
          <PlusCircle className="h-5 w-5" />
          {buttonText}
        </Link>
      )}
    </div>
  );
}
