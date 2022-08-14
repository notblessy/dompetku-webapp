import { useAuth } from '../../libs/contexts/auth';

export default function Profile() {
  const { onLogout } = useAuth();

  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Welcome to dompetku</h2>

      <button onClick={onLogout}>Logout</button>
    </main>
  );
}
