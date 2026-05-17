import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'member']),
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

const perks = [
  'Create unlimited projects',
  'Invite team members',
  'Kanban drag & drop',
  'Real-time dashboard',
];

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'member' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data);
      toast.success('Account created! Welcome to Nexus 🚀');
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Failed to create account';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-void)' }}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #060914 0%, #0c0f1e 50%, #080b16 100%)' }}>
        <div className="absolute inset-0 mesh-grid opacity-60" />
        <div className="aurora-blob w-72 h-72 top-10 right-10"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)' }} />
        <div className="aurora-blob w-80 h-80 bottom-20 left-10"
          style={{ background: 'radial-gradient(circle, rgba(13,242,192,0.25), transparent 70%)', animationDelay: '3s' }} />
        <div className="aurora-blob w-48 h-48 top-1/2 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.15), transparent 70%)', animationDelay: '6s' }} />

        <div className="relative text-center z-10">
          <div className="h-24 w-24 rounded-3xl flex items-center justify-center mx-auto mb-8"
            style={{
              background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(13,242,192,0.12))',
              border: '1px solid rgba(124,58,237,0.35)',
              boxShadow: '0 0 40px rgba(124,58,237,0.2)',
            }}>
            <NexusLogo size={48} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Get started today
          </h2>
          <p className="text-lg max-w-xs mx-auto mb-12" style={{ color: 'rgba(168,216,212,0.65)' }}>
            Create your workspace and launch in under 2 minutes.
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(168,216,212,0.7)' }}>
                <CheckCircle size={16} style={{ color: '#0df2c0', flexShrink: 0 }} />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,rgba(13,242,192,0.15),rgba(124,58,237,0.15))', border: '1px solid rgba(13,242,192,0.3)' }}>
              <NexusLogo size={20} />
            </div>
            <span className="font-bold text-white" style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>Nexus</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>Create account</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login"
              className="font-medium transition-colors"
              style={{ color: '#0df2c0' }}
              onMouseEnter={e => (e.currentTarget.style.textShadow = '0 0 8px #0df2c0')}
              onMouseLeave={e => (e.currentTarget.style.textShadow = 'none')}>
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="signup-name"
              label="Full Name"
              placeholder="Alex Johnson"
              error={errors.name?.message}
              icon={<User size={16} />}
              {...register('name')}
            />
            <Input
              id="signup-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              icon={<Mail size={16} />}
              {...register('email')}
            />
            <div className="relative">
              <Input
                id="signup-password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 characters"
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
            <Select
              id="signup-role"
              label="I want to join as"
              options={[{ value: 'member', label: 'Team Member' }, { value: 'admin', label: 'Admin / Project Manager' }]}
              {...register('role')}
            />
            <Button type="submit" loading={isSubmitting} className="w-full mt-2" size="lg">
              Create Account <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-xs mt-4 text-center" style={{ color: 'var(--text-subtle)' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
