import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: 'rgba(6,6,15,0.75)' }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            className={`relative w-full ${sizes[size]} rounded-2xl p-6 z-10`}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-lg), var(--glow-sm)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold" style={{
                color: 'var(--text-primary)',
                fontFamily: '"Space Grotesk",Inter,sans-serif',
              }}>
                {title}
              </h2>
              <button onClick={onClose}
                className="h-7 w-7 rounded-lg flex items-center justify-center transition-all"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,63,94,0.3)';
                  (e.currentTarget as HTMLElement).style.color = '#fb7185';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(244,63,94,0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
                }}>
                <X size={15} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
