import React from 'react';
import { cn } from '@/utils/cn';

export const Spinner: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ className, size = 'md' }) => {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return (
    <svg className={cn('animate-spin', sizes[size], className)} viewBox="0 0 24 24" fill="none"
      style={{ color: '#0df2c0', filter: 'drop-shadow(0 0 6px rgba(13,242,192,0.5))' }}>
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
};

/* Nexus atom-ring logo for page loader */
const NexusAtom: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" fill="#0df2c0" style={{ filter: 'drop-shadow(0 0 6px #0df2c0)' }} />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#0df2c0" strokeWidth="1.2" fill="none" opacity="0.7" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#7c3aed" strokeWidth="1.2" fill="none" opacity="0.5"
      transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#0df2c0" strokeWidth="1.2" fill="none" opacity="0.35"
      transform="rotate(120 12 12)" />
  </svg>
);

export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-base)' }}>
    <div className="text-center">
      <div className="relative mx-auto mb-6 h-20 w-20">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: 'rgba(13,242,192,0.15)' }} />
        <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: '#0df2c0', filter: 'drop-shadow(0 0 6px rgba(13,242,192,0.6))' }} />
        {/* Inner violet ring counter-rotate */}
        <div className="absolute inset-3 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderBottomColor: '#7c3aed',
            animationDirection: 'reverse',
            animationDuration: '1.2s',
            filter: 'drop-shadow(0 0 4px rgba(124,58,237,0.5))',
          }} />
        {/* Center atom */}
        <div className="absolute inset-0 flex items-center justify-center">
          <NexusAtom />
        </div>
      </div>
      <p className="text-sm font-semibold" style={{ color: 'var(--aurora-teal)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
        Loading Nexus…
      </p>
    </div>
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div className="rounded-2xl p-5 animate-pulse"
    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
    <div className="h-11 w-11 rounded-2xl mb-5" style={{ background: 'var(--bg-elevated)' }} />
    <div className="h-3 rounded-full w-3/4 mb-3" style={{ background: 'var(--bg-elevated)' }} />
    <div className="h-2.5 rounded-full w-full mb-2" style={{ background: 'var(--bg-elevated)' }} />
    <div className="h-2.5 rounded-full w-2/3 mb-6" style={{ background: 'var(--bg-elevated)' }} />
    <div className="flex items-center justify-between">
      <div className="flex -space-x-1.5">
        {[0,1,2].map(i => <div key={i} className="h-6 w-6 rounded-full" style={{ background: 'var(--bg-elevated)' }} />)}
      </div>
      <div className="h-4 rounded-full w-14" style={{ background: 'var(--bg-elevated)' }} />
    </div>
  </div>
);
