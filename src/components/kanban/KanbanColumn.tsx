import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { KanbanTaskCard } from './KanbanTaskCard';
import type { Task } from '@/types';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, data: Record<string, unknown>) => Promise<void>;
}

const colStyles: Record<string, { dot: string; label: string; header: string; zone: string; badge: string; glow: string }> = {
  todo: {
    dot:    '#4a7a76',
    label:  'var(--text-muted)',
    header: 'rgba(74,122,118,0.08)',
    zone:   'rgba(74,122,118,0.03)',
    badge:  'rgba(74,122,118,0.15)',
    glow:   'rgba(74,122,118,0.3)',
  },
  'in-progress': {
    dot:    '#f59e0b',
    label:  '#f59e0b',
    header: 'rgba(245,158,11,0.08)',
    zone:   'rgba(245,158,11,0.03)',
    badge:  'rgba(245,158,11,0.15)',
    glow:   'rgba(245,158,11,0.3)',
  },
  done: {
    dot:    '#0df2c0',
    label:  '#0df2c0',
    header: 'rgba(13,242,192,0.08)',
    zone:   'rgba(13,242,192,0.03)',
    badge:  'rgba(13,242,192,0.15)',
    glow:   'rgba(13,242,192,0.3)',
  },
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id, title, color, tasks, onAddTask, onDeleteTask, onUpdateTask,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = colStyles[id] || colStyles.todo;

  return (
    <div className="flex flex-col w-80 flex-shrink-0">
      {/* ── Column header ── */}
      <div className="flex items-center justify-between mb-3 px-3 py-2.5 rounded-2xl"
        style={{ background: style.header, border: `1px solid ${style.dot}20` }}>
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full"
            style={{ background: style.dot, boxShadow: `0 0 8px ${style.dot}` }} />
          <h3 className="font-semibold text-sm" style={{
            color: style.label,
            fontFamily: '"Space Grotesk",Inter,sans-serif',
          }}>
            {title}
          </h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: style.badge, color: style.dot }}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="h-7 w-7 rounded-xl flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: 'var(--bg-elevated)',
            color: style.dot,
            border: `1px solid ${style.dot}30`,
          }}
          title="Add task"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* ── Drop zone ── */}
      <div
        ref={setNodeRef}
        className="flex-1 min-h-[480px] rounded-2xl p-2 space-y-2.5 transition-all duration-200"
        style={{
          background: isOver ? `${style.dot}0a` : style.zone,
          border: `2px dashed ${isOver ? style.dot : 'transparent'}`,
          boxShadow: isOver ? `inset 0 0 20px ${style.glow}` : 'none',
        }}
      >
        <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <KanbanTaskCard
              key={task._id}
              task={task}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-28 gap-2">
            <div className="h-9 w-9 rounded-2xl flex items-center justify-center"
              style={{ background: style.badge, border: `1px solid ${style.dot}25` }}>
              <Plus size={16} style={{ color: style.dot }} />
            </div>
            <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};
