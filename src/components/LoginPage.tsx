import React, { useState } from 'react';
import { Lock, User, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (user: string) => void;
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'alice' && password === 'Password1') {
      onLogin('alice');
      onNavigate('profile');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md shadow-xl border-t-4 border-mit-purple"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-mit-purple/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-mit-purple" />
          </div>
          <h1 className="text-2xl font-black text-mit-purple uppercase tracking-tight">Student Portal</h1>
          <p className="text-text-muted text-sm mt-1 font-medium">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="label flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Username / Student ID
            </label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. alice"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="label flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Password
            </label>
            <input 
              type="password" 
              className="input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-md bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs font-bold"
            >
              <ShieldAlert className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <button type="submit" className="btn w-full py-3 text-base mt-2 flex items-center justify-center gap-2">
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-text-muted">
            Problems logging in? <a href="#" className="text-mit-purple font-bold hover:underline">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
