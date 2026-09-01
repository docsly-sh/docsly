export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-0 flex-1 flex-col">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-0 flex-1 flex-col outline-none"
      >
        {children}
      </main>
    </div>
  );
}
