import { useAuth } from '../../libs/contexts/auth';

export default function Profile() {
  const { onLogout, user } = useAuth();
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>
        Profile, {user.id}, {user.username}
      </h2>
      <button onClick={onLogout}>Logout</button>
    </main>
  );
}
