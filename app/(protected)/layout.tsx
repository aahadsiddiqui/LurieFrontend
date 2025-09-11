import { LoginGate } from '@/components/LoginGate';
import { AppShell } from '@/components/layout/AppShell';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginGate>
      <AppShell>
        {children}
      </AppShell>
    </LoginGate>
  );
}
