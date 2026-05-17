import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Users, BarChart3, Kanban, Shield, Sparkles } from 'lucide-react';

/* Nexus atom logo */
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

const features = [
  { icon: Kanban,   title: 'Kanban Boards',        desc: 'Visualize workflow with drag-and-drop boards that sync in real time.' },
  { icon: Users,    title: 'Team Collaboration',   desc: 'Invite members, assign roles, and collaborate across unlimited projects.' },
  { icon: BarChart3,title: 'Insightful Analytics', desc: 'Track progress with beautiful dashboards and activity feeds.' },
  { icon: Shield,   title: 'Secure by Default',    desc: 'JWT auth, RBAC, and encrypted passwords guard every workspace.' },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-void)', color: 'var(--text-primary)' }}>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(6,6,15,0.75)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg,rgba(13,242,192,0.15),rgba(124,58,237,0.15))',
              border: '1px solid rgba(13,242,192,0.3)',
            }}>
            <NexusLogo size={18} />
          </div>
          <span className="font-bold text-lg text-white" style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Nexus
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login"
            className="text-sm px-4 py-2 transition-colors"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter,sans-serif' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0df2c0')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary text-sm px-4 py-2">Get Started Free</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden mesh-grid">
        {/* Aurora blobs */}
        <div className="aurora-blob w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4"
          style={{ background: 'radial-gradient(circle, rgba(13,242,192,0.25), transparent 70%)' }} />
        <div className="aurora-blob w-[400px] h-[400px] top-24 left-1/4"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)', animationDelay: '3s' }} />
        <div className="aurora-blob w-[300px] h-[300px] top-32 right-1/4"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.15), transparent 70%)', animationDelay: '5s' }} />

        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{
              background: 'rgba(13,242,192,0.08)',
              border: '1px solid rgba(13,242,192,0.25)',
              color: '#0df2c0',
              fontFamily: '"Space Grotesk",Inter,sans-serif',
            }}>
            <Sparkles size={14} />
            <span>The future of team productivity</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Work beyond{' '}
            <span className="gradient-text">limits</span>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter,sans-serif' }}>
            Nexus brings your projects, tasks, and team into one luminous workspace.
            Drag. Drop. Deliver — at the speed of thought.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-2xl text-base transition-all duration-200 text-[#060914]"
              style={{
                background: 'linear-gradient(135deg,#0df2c0,#00c9a7)',
                boxShadow: '0 0 30px rgba(13,242,192,0.4)',
                fontFamily: '"Space Grotesk",Inter,sans-serif',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(13,242,192,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(13,242,192,0.4)';
              }}>
              Launch your workspace
              <ArrowRight size={18} />
            </Link>
            <Link to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-2xl text-base transition-all duration-200"
              style={{
                background: 'rgba(13,242,192,0.06)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                fontFamily: '"Space Grotesk",Inter,sans-serif',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                (e.currentTarget as HTMLElement).style.color = '#0df2c0';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-sm)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}>
              Sign in
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm"
            style={{ color: 'var(--text-muted)' }}>
            {['Free forever plan', 'No credit card needed', 'Unlimited projects'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={14} style={{ color: '#0df2c0' }} /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── App Preview ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: '1px solid var(--border-strong)',
            boxShadow: '0 0 80px rgba(13,242,192,0.12), 0 32px 80px rgba(0,0,0,0.5)',
          }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5"
            style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
            <div className="h-3 w-3 rounded-full" style={{ background: '#f43f5e' }} />
            <div className="h-3 w-3 rounded-full" style={{ background: '#f59e0b' }} />
            <div className="h-3 w-3 rounded-full" style={{ background: '#0df2c0' }} />
            <div className="flex-1 mx-4 h-6 rounded-lg"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }} />
          </div>
          {/* Kanban preview */}
          <div className="p-8 grid grid-cols-3 gap-5 min-h-[300px]"
            style={{ background: 'var(--bg-base)' }}>
            {[
              { label: 'Todo',        dot: '#4a7a76', count: 3 },
              { label: 'In Progress', dot: '#f59e0b', count: 2 },
              { label: 'Done',        dot: '#0df2c0', count: 4 },
            ].map((col) => (
              <div key={col.label} className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full"
                    style={{ background: col.dot, boxShadow: `0 0 8px ${col.dot}` }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
                    {col.label}
                  </span>
                  <span className="text-xs px-1.5 rounded-full"
                    style={{ background: `${col.dot}20`, color: col.dot }}>
                    {col.count}
                  </span>
                </div>
                {Array.from({ length: Math.min(col.count, 3) }).map((_, j) => (
                  <div key={j} className="card p-3.5 space-y-2.5"
                    style={{ borderLeft: `3px solid ${col.dot}60` }}>
                    <div className="h-2.5 rounded-full" style={{ background: 'var(--bg-elevated)', width: `${70 - j * 15}%` }} />
                    <div className="h-2 rounded-full" style={{ background: 'var(--bg-elevated)', width: '50%' }} />
                    <div className="flex gap-1.5">
                      <div className="h-4 w-12 rounded-full" style={{ background: `${col.dot}25` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Everything your team{' '}
            <span className="gradient-text-aurora">deserves</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Designed for fast-moving teams who need clarity, not complexity.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card p-6 group cursor-default"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md), var(--glow-sm)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}>
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg,rgba(13,242,192,0.12),rgba(124,58,237,0.08))',
                  border: '1px solid rgba(13,242,192,0.2)',
                }}>
                <f.icon size={20} style={{ color: '#0df2c0' }} />
              </div>
              <h3 className="font-bold text-white mb-2"
                style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center card p-14 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg,rgba(13,242,192,0.06),rgba(124,58,237,0.06))' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 blur-3xl opacity-40 pointer-events-none"
            style={{ background: 'linear-gradient(135deg,#0df2c0,#7c3aed)' }} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative"
            style={{ fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Ready to enter the{' '}
            <span className="gradient-text">Nexus?</span>
          </h2>
          <p className="mb-8 relative" style={{ color: 'var(--text-secondary)' }}>
            Join teams who ship faster and stress less. Start free, no card needed.
          </p>
          <Link to="/signup" className="btn-primary text-base px-8 py-3.5 inline-flex">
            Create your workspace <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 text-center text-sm" style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <div className="h-6 w-6 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,rgba(13,242,192,0.15),rgba(124,58,237,0.15))', border: '1px solid rgba(13,242,192,0.2)' }}>
            <NexusLogo size={14} />
          </div>
          <span className="font-semibold" style={{ color: 'var(--text-secondary)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Nexus
          </span>
        </div>
        <p>© {new Date().getFullYear()} Nexus. Productivity beyond limits.</p>
      </footer>
    </div>
  );
};
