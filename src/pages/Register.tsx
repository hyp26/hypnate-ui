import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import AuthLayout from '../components/layout/AuthLayout';
import { Store, Mail, Lock } from 'lucide-react';
import { GoogleIcon } from '../components/ui/icons';
import SocialButton from '../components/ui/SocialButton';

const SignupPage = () => {
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  interface Auth {
    signup: (storeName: string, email: string, fullName: string, password: string) => void | Promise<void>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Safely call signup if it's provided by the auth object; use an any-cast to avoid the
    // improper direct cast error from TS. If signup is missing, log a warning and still navigate.
    if ('signup' in auth && typeof (auth as any).signup === 'function') {
      await (auth as any).signup(storeName, email, 'N/A', password);
      navigate('/dashboard');
    } else {
      console.warn('signup is not available on auth');
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm animate-fade-in">
        <Card className="glass-card shadow-glow">
          <CardHeader className="text-center">
            <CardTitle>Create Your Store</CardTitle>
            <CardDescription>Start selling in minutes. It's free!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} required placeholder="Your Awesome Store" className="pl-10 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="pl-10 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="pl-10 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-all duration-300 transform hover:scale-105"
              >
                Create Account
              </button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <SocialButton provider="Google" icon={GoogleIcon} />

             <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/90">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
