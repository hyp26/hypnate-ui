import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import AuthLayout from '../components/layout/AuthLayout';
import { Mail, Lock } from 'lucide-react';
import { GoogleIcon } from '../components/ui/icons';
import SocialButton from '../components/ui/SocialButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

interface Credentials {
    email: string;
    password: string;
}

interface AuthHook {
    login: (email: string, password: string) => void | Promise<void>;
}

const emailValue: string = email;
const passwordValue: string = password;

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    (auth as AuthHook).login(emailValue, passwordValue);
    (navigate as ReturnType<typeof useNavigate>)('/dashboard');
};

  return (
    <AuthLayout>
      <div className="w-full max-w-sm animate-fade-in">
        <Card className="glass-card shadow-glow">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to manage your store and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <SocialButton provider="Google" icon={GoogleIcon} />

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-primary/90">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
