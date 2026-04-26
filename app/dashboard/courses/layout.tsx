export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* <div className="w-64 border-r">Sidebar</div> */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
