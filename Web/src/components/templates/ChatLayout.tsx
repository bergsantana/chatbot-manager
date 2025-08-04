export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-md shadow-md min-h-screen">
      {children}
    </div>
  );
}