import { IoChatbubbles } from 'react-icons/io5';
import Button from '../ui/Button';

interface AuthLayoutProps {
  children: React.ReactNode;
  isSignUp: boolean;
  onToggle: (isSignUp: boolean) => void;
}

export default function AuthLayout({ children, isSignUp, onToggle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Messages */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <IoChatbubbles className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold">ChatApp</h1>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                {isSignUp ? 'Join our community' : 'Welcome back!'}
              </h2>
              <p className="text-xl text-white/80">
                {isSignUp 
                  ? 'Create an account to start chatting with your team instantly'
                  : 'Sign in to continue your conversations'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Real-time messaging</h3>
                  <p className="text-white/70">Chat with your team instantly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Organized channels</h3>
                  <p className="text-white/70">Keep conversations organized by topic</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure & private</h3>
                  <p className="text-white/70">Your data is encrypted and protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-white/60 text-sm">
          © {new Date().getFullYear()} ChatApp. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <IoChatbubbles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChatApp
            </h1>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 p-1 bg-white rounded-lg shadow-sm mb-8">
            <Button variant="toggle" active={!isSignUp} onClick={() => onToggle(false)} className="flex-1">
              Sign In
            </Button>
            <Button variant="toggle" active={isSignUp} onClick={() => onToggle(true)} className="flex-1">
              Sign Up
            </Button>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
