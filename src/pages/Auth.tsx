import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, MESSAGES } from '../constants';
import AuthLayout from '../components/layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function Auth(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(ROUTES.CHAT, { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    setError('');
  }, [isSignUp]);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    setError('');
    try {
      await signIn(email, password);
      navigate(ROUTES.CHAT);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
      setError(errorMessage);
    }
  };

  const handleSignup = async (email: string, password: string, confirmPassword: string): Promise<void> => {
    setError('');
    
    if (password !== confirmPassword) {
      setError(MESSAGES.ERROR_PASSWORD_MISMATCH);
      return;
    }
    if (password.length < 6) {
      setError(MESSAGES.ERROR_PASSWORD_MIN_LENGTH);
      return;
    }
    
    try {
      await signUp(email, password);
      navigate(ROUTES.CHAT);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout isSignUp={isSignUp} onToggle={setIsSignUp}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {isSignUp ? 'Create your account' : 'Welcome back'}
      </h2>
      <p className="text-gray-600 mb-6">
        {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-shake">
          {error}
        </div>
      )}

      {isSignUp ? (
        <SignupForm onSubmit={handleSignup} />
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </AuthLayout>
  );
}
