import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, GripVertical } from 'lucide-react';
import { PriorityBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import type { Task } from '@/types';
import { formatDate, isOverdue } from '@/utils/formatters';
import { cn } from '@/utils/cn';
import { TaskDetailModal } from '@/components/modals/TaskDetailModal';

/* Left border accent colors per priority */
const priorityAccent: Record<string, string> = {
  high:   '#f43f5e',
  medium: '#f59e0b',
  low:    '#60a5fa',
};

/* Subtle glow per priority */
const priorityGlow: Record<string, string> = {
  high:   'rgba(244,63,94,0.12)',
  medium: 'rgba(245,158,11,0.1)',
  low:    'rgba(96,165,250,0.1)',
};

interface KanbanTaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<void>;
}

export const KanbanTaskCard: React.FC<KanbanTaskCardProps> = ({ task, onDelete, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });
  const [detailOpen, setDetailOpen] = useState(false);

  const style = { transform: CSS.Transform.toString(transform), transition };
  const overdue = task.dueDate && task.status !== 'done' && isOverdue(task.dueDate);
  const accent  = priorityAccent[task.priority] || priorityAccent.medium;
  const glow    = priorityGlow[task.priority] || priorityGlow.medium;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'group cursor-pointer rounded-2xl transition-all duration-200',
          isDragging && 'opacity-40 scale-105 rotate-1 shadow-2xl'
        )}
      >
        <div
          onClick={() => setDetailOpen(true)}
          className="p-4 rounded-2xl"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${accent}`,
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border-strong)';
            el.style.boxShadow = `var(--shadow-md), 0 0 20px ${glow}`;
            el.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border)';
            el.style.boxShadow = 'none';
            el.style.transform = 'translateY(0)';
          }}
        >
          <div className="flex items-start gap-2">
            {/* Drag handle */}
            <button
              {...attributes}
              {...listeners}
              onClick={e => e.stopPropagation()}
              className="mt-0.5 p-0.5 rounded transition-all cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 flex-shrink-0"
              style={{ color: 'var(--aurora-teal)' }}
            >
              <GripVertical size={14} />
            </button>

            <div className="flex-1 min-w-0">
              {/* Title */}
              <p className="text-sm font-medium leading-snug line-clamp-2 mb-3"
                style={{ color: 'var(--text-primary)' }}>
                {task.title}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <PriorityBadge priority={task.priority} />
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <span
                      className={cn('flex items-center gap-1 text-xs')}
                      style={{ color: overdue ? '#fb7185' : 'var(--text-muted)' }}
                    >
                      <Calendar size={11} />
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                  {task.assignedTo && (
                    <Avatar name={task.assignedTo.name} avatar={task.assignedTo.avatar} size="xs" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskDetailModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        task={task}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
};
