import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { AvatarGroup } from '@/components/ui/Avatar';
import { SkeletonCard } from '@/components/ui/Spinner';
import { CreateProjectModal } from '@/components/modals/CreateProjectModal';
import { useProjects } from '@/hooks/useProjects';
import { formatDate } from '@/utils/formatters';

const colorPalette = [
  { from: '#0df2c0', to: '#00c9a7', bg: 'rgba(13,242,192,0.07)',  border: 'rgba(13,242,192,0.2)',  glow: 'rgba(13,242,192,0.25)' },
  { from: '#7c3aed', to: '#a855f7', bg: 'rgba(124,58,237,0.07)',  border: 'rgba(124,58,237,0.2)',  glow: 'rgba(124,58,237,0.25)' },
  { from: '#f43f5e', to: '#fb7185', bg: 'rgba(244,63,94,0.07)',   border: 'rgba(244,63,94,0.2)',   glow: 'rgba(244,63,94,0.25)'  },
  { from: '#f59e0b', to: '#fbbf24', bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.2)',  glow: 'rgba(245,158,11,0.25)' },
  { from: '#60a5fa', to: '#93c5fd', bg: 'rgba(96,165,250,0.07)',  border: 'rgba(96,165,250,0.2)',  glow: 'rgba(96,165,250,0.25)' },
  { from: '#c084fc', to: '#e879f9', bg: 'rgba(192,132,252,0.07)', border: 'rgba(192,132,252,0.2)', glow: 'rgba(192,132,252,0.25)' },
];

export const ProjectsPage: React.FC = () => {
  const { projects, isLoading, fetchProjects } = useProjects();
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            Projects
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {projects.length} project{projects.length !== 1 ? 's' : ''} · Manage your workspaces
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}><Plus size={15} /> New Project</Button>
      </div>

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-36 text-center">
          {/* Animated orbit placeholder */}
          <div className="relative h-24 w-24 mb-8">
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(13,242,192,0.08)', border: '1px solid rgba(13,242,192,0.2)', boxShadow: '0 0 24px rgba(13,242,192,0.15)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <FolderOpen size={32} style={{ color: '#0df2c0' }} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2"
            style={{ color: 'var(--text-primary)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
            No projects yet
          </h3>
          <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--text-muted)' }}>
            Create your first project to start organizing tasks and collaborating with your team.
          </p>
          <Button onClick={() => setCreateOpen(true)}><Plus size={15} /> Create your first project</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const palette = colorPalette[i % colorPalette.length];
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/projects/${project._id}`}
                  className="block rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden"
                  style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 24px ${palette.glow}`;
                    el.style.borderColor = palette.from;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                    el.style.borderColor = palette.border;
                  }}
                >
                  {/* Background glow */}
                  <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity"
                    style={{ background: `linear-gradient(135deg,${palette.from},${palette.to})` }} />

                  {/* Icon & member count */}
                  <div className="flex items-start justify-between mb-5 relative">
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg,${palette.from},${palette.to})`,
                        boxShadow: `0 4px 16px ${palette.glow}`,
                      }}>
                      <FolderOpen size={20} className="text-[#060914]" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: palette.bg, color: palette.from, border: `1px solid ${palette.border}` }}>
                      <Users size={11} />
                      {project.members.length}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-bold mb-2 transition-colors"
                    style={{ color: 'var(--text-primary)', fontFamily: '"Space Grotesk",Inter,sans-serif' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm line-clamp-2 mb-5 min-h-[40px]" style={{ color: 'var(--text-muted)' }}>
                    {project.description || 'No description provided.'}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between relative">
                    <AvatarGroup users={project.members.map(m => m.user)} max={4} size="xs" />
                    <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                      style={{ color: palette.from }}>
                      Open <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      <CreateProjectModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onCreated={fetchProjects} />
    </div>
  );
};
