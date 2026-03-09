import React from 'react';
import { MoreHorizontal, Clock } from 'lucide-react';

const PlusIcon = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

const TasksView = () => (
    <div className="app-main-bg">
        <div className="tasks-header">
            <h2 className="page-title" style={{ margin: 0 }}>My Tasks</h2>
            <button className="action-btn">
                <PlusIcon color="white" /> New Task
            </button>
        </div>

        <div className="tasks-grid">
            {[
                { title: 'Update Metadata for Roads', priority: 'High', status: 'In Progress', due: 'Today', color: '#f59e0b', gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)' },
                { title: 'Review Digitization Quality', priority: 'Medium', status: 'Pending', due: 'Tomorrow', color: '#3b82f6', gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' },
                { title: 'Prepare Weekly Report', priority: 'Low', status: 'Completed', due: 'Yesterday', color: '#10b981', gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
                { title: 'Check Server Logs', priority: 'High', status: 'Pending', due: 'Dec 20', color: '#ef4444', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)' },
                { title: 'Update User Permissions', priority: 'Medium', status: 'In Progress', due: 'Dec 22', color: '#6366f1', gradient: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' }
            ].map((task, i) => (
                <div key={i} className="modern-card" style={{ padding: '1.5rem', minHeight: 'auto' }}>
                    <div className="task-card-header">
                        <span className="theme-badge task-priority-badge" style={{
                            background: task.gradient,
                            color: task.color,
                            border: `1px solid ${task.color}30` // 30% alpha
                        }}>
                            {task.priority.toUpperCase()} PRIORITY
                        </span>
                        <MoreHorizontal size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
                    </div>
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-meta">
                        <Clock size={14} /> Due: {task.due}
                    </div>
                    <div className="task-footer">
                        <div className="avatar-group">
                            <div className="avatar" style={{ background: '#cbd5e1' }}></div>
                            <div className="avatar" style={{ background: '#94a3b8', marginLeft: '-10px' }}></div>
                        </div>
                        <span className="task-status" style={{ color: task.status === 'Completed' ? '#10b981' : '#64748b' }}>
                            {task.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default TasksView;
