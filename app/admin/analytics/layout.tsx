

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center rounded-lg border-2 border-dashed p-4 mt-20">
         <h1 className="text-4xl font-bold mb-6 mt-2">Analytics Dashboard</h1>
      {children}
    </div>
  );
}
