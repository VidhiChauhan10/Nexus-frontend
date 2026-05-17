import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, User, LogOut,
  ChevronLeft, ChevronRight, Plus,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useProjectStore } from '@/store/projectStore';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

/* Nexus logo mark — atom-ring SVG */
const NexusLogo: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" fill="#0df2c0" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#0df2c0" strokeWidth="1.5" fill="none" opacity="0.7" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#7c3aed" strokeWidth="1.5" fill="none" opacity="0.5"
      transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="#0df2c0" strokeWidth="1.5" fill="none" opacity="0.4"
      transform="rotate(120 12 12)" />
  </svg>
);

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { projects } = useProjectStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects',  icon: FolderKanban,   label: 'Projects'  },
    { to: '/profile',   icon: User,           label: 'Profile'   },
  ];

  return (
    <AnimatePresence initial={false}>
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="relative flex flex-col h-screen flex-shrink-0 overflow-hidden z-20"
        style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--sidebar-border)' }}
      >
        {/* Ambient glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #0df2c0, transparent 70%)' }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3 px-4 py-5"
          style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 animate-glow-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(13,242,192,0.15), rgba(124,58,237,0.15))',
              border: '1px solid rgba(13,242,192,0.35)',
              boxShadow: '0 0 14px rgba(13,242,192,0.25)',
            }}
          >
            <NexusLogo size={20} />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="font-bold text-white text-base leading-none"
                style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}>Nexus</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(13,242,192,0.45)' }}>
                Productivity Platform
              </p>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="relative flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} title={!sidebarOpen ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'text-[#060914]' : ''
                }`
              }
              style={({ isActive }) => ({
                background: isActive
                  ? 'linear-gradient(135deg, #0df2c0, #00c9a7)'
                  : 'transparent',
                color: isActive ? '#060914' : 'var(--sidebar-text)',
                boxShadow: isActive ? '0 4px 16px rgba(13,242,192,0.35)' : 'none',
                fontFamily: '"Space Grotesk", Inter, sans-serif',
                fontWeight: isActive ? 700 : 500,
              })}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                if (!el.style.background.includes('gradient')) {
                  el.style.background = 'var(--sidebar-hover)';
                  el.style.color = '#0df2c0';
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                if (!el.style.background.includes('gradient')) {
                  el.style.background = 'transparent';
                  el.style.color = 'var(--sidebar-text)';
                }
              }}
            >
              <Icon size={17} className="flex-shrink-0" />
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                  {label}
                </motion.span>
              )}
            </NavLink>
          ))}

          {/* Projects section */}
          {sidebarOpen && projects.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-5">
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(13,242,192,0.3)', fontFamily: '"Space Grotesk", Inter, sans-serif' }}>
                  Projects
                </p>
                <NavLink to="/projects"
                  className="transition-colors hover:text-[#0df2c0]"
                  style={{ color: 'rgba(13,242,192,0.3)' }}>
                  <Plus size={13} />
                </NavLink>
              </div>
              {projects.slice(0, 7).map((p, i) => {
                const colors = ['#0df2c0','#7c3aed','#f43f5e','#f59e0b','#60a5fa','#c084fc','#34d399'];
                const c = colors[i % colors.length];
                return (
                  <NavLink key={p._id} to={`/projects/${p._id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 truncate ${
                        isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5'
                      }`
                    }
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}
                  >
                    <div className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ background: c, boxShadow: `0 0 6px ${c}80` }} />
                    <span className="truncate">{p.title}</span>
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </nav>

        {/* User footer */}
        <div className="relative p-3" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl transition-colors"
            style={{ cursor: 'default' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,242,192,0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            {user && <Avatar name={user.name} avatar={user.avatar} size="sm" className="flex-shrink-0" />}
            {sidebarOpen && user && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate leading-none"
                  style={{ fontFamily: '"Space Grotesk", Inter, sans-serif' }}>{user.name}</p>
                <p className="text-xs mt-0.5 capitalize" style={{ color: 'rgba(13,242,192,0.4)' }}>{user.role}</p>
              </motion.div>
            )}
            {sidebarOpen && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={handleLogout}
                className="p-1.5 rounded-lg transition-all"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(244,63,94,0.15)';
                  (e.currentTarget as HTMLElement).style.color = '#fb7185';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)';
                }}
                title="Sign out"
              >
                <LogOut size={15} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full flex items-center justify-center transition-all z-10 shadow-lg"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            color: 'var(--aurora-teal)',
          }}
        >
          {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </motion.aside>
    </AnimatePresence>
  );
};
