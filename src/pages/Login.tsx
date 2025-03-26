
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would authenticate with Supabase
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would register with Supabase
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-secondary/30">
      <Link to="/" className="absolute top-8 left-8 flex items-center space-x-2 mb-8">
        <Volume2 className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">VoiceStudio</span>
      </Link>
      
      <div className="w-full max-w-md glassmorphism rounded-xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome to VoiceStudio</h1>
          <p className="text-foreground/70 mt-2">Sign in to access your account</p>
        </div>
        
        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? 'Logging in...' : 'Log In'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
                <span className="absolute inset-0 button-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
                <span className="absolute inset-0 button-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-foreground/70">
          <p>By continuing, you agree to our</p>
          <p className="mt-1">
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' and '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
