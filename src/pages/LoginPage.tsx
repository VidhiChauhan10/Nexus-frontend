import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type FormData = z.infer<typeof schema>;

const NexusLogo: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" fill="#0df2c0" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#0df2c0" strokeWidth="1.5" fill="none" opacity="0.8" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#7c3aed" strokeWidth="1.5" fill="none" opacity="0.6"
      transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#0df2c0" strokeWidth="1.5" fill="none" opacity="0.4"
      transform="rotate(120 12 12)" />
  </svg>
);

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-void)' }}>

      {/* ── Left panel — Aurora art ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #06060f 0%, #0c0f1e 50%, #080b16 100%)' }}>
        {/* Mesh grid overlay */}
        <div className="absolute inset-0 mesh-grid opacity-60" />

        {/* Aurora blobs */}
        <div className="aurora-blob w-80 h-80 top-10 left-10"
          style={{ background: 'radial-gradient(circle, rgba(13,242,192,0.3), transparent 70%)' }} />
        <div className="aurora-blob w-64 h-64 bottom-20 right-10"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)', animationDelay: '4s' }} />
        <div className="aurora-blob w-48 h-48 bottom-40 left-20"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.2), transparent 70%)', animationDelay: '7s' }} />

        <div className="relative text-center z-10">
          {/* Big atom icon */}
          <div className="h-24 w-24 rounded-3xl flex items-center justify-center mx-auto mb-8"
            style={{
              background: 'linear-gradient(135deg,rgba(13,242,192,0.12),rgba(124,58,237,0.12))',
              border: '1px solid rgba(13,242,192,0.3)',
              boxShadow: '0 0 40px rgba(13,242,192,0.2)',
            }}>
            <NexusLogo size={48} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Welcome back
          </h2>
          <p className="text-lg mb-14" style={{ color: 'rgba(13,242,192,0.6)' }}>
            Your projects are waiting for you.
          </p>
          <div className="grid grid-cols-2 gap-3 text-left max-w-xs mx-auto">
            {['Kanban Boards', 'Team Collaboration', 'Analytics', 'Role Management'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(168,216,212,0.7)' }}>
                <div className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#0df2c0', boxShadow: '0 0 6px #0df2c0' }} />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — Form ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,rgba(13,242,192,0.15),rgba(124,58,237,0.15))', border: '1px solid rgba(13,242,192,0.3)' }}>
              <NexusLogo size={20} />
            </div>
            <span className="font-bold text-white" style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>Nexus</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>Sign in</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/signup"
              className="font-medium transition-colors"
              style={{ color: '#0df2c0' }}
              onMouseEnter={e => (e.currentTarget.style.textShadow = '0 0 8px #0df2c0')}
              onMouseLeave={e => (e.currentTarget.style.textShadow = 'none')}>
              Sign up free
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="login-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              icon={<Mail size={16} />}
              {...register('email')}
            />
            <div className="relative">
              <Input
                id="login-password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                error={errors.password?.message}
                icon={<Lock size={16} />}
                {...register('password')}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-9 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0df2c0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button type="submit" loading={isSubmitting} className="w-full mt-2" size="lg">
              Sign in <ArrowRight size={16} />
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl text-xs"
            style={{ background: 'rgba(13,242,192,0.04)', border: '1px solid rgba(13,242,192,0.12)' }}>
            <p className="font-semibold mb-1" style={{ color: 'var(--aurora-teal)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
              Demo credentials
            </p>
            <p style={{ color: 'var(--text-muted)' }}>Admin: <span style={{ color: 'var(--text-secondary)' }}>admin@example.com / admin123</span></p>
            <p style={{ color: 'var(--text-muted)' }}>Member: <span style={{ color: 'var(--text-secondary)' }}>sarah@example.com / member123</span></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
