interface AppShellProps {
  header: React.ReactNode;
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
}

export function AppShell({ header, children, bottomNav }: AppShellProps) {
  return (
    <div className="app-shell">
      {header}
      <main className="app-content">
        {children}
      </main>
      {bottomNav}
    </div>
  );
}
