import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"><div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500" /></div>;
  return user ? <>{children}</> : <Navigate to="/" />;
}
