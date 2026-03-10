import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/chat', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    setError('');
  }, [isSignUp]);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    try {
      await signIn(email, password);
      navigate('/chat');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignup = async (email: string, password: string, confirmPassword: string) => {
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await signUp(email, password);
      navigate('/chat');
    } catch (err: any) {
      setError(err.message);
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
