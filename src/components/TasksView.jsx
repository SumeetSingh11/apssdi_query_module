import React from 'react';
import { MoreHorizontal, Clock } from 'lucide-react';

const PlusIcon = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

const TasksView = () => (
    <div className="p-6 fade-in" style={{ padding: '2.5rem', height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>My Tasks</h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--primary-color)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                <PlusIcon color="white" /> New Task
            </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
                { title: 'Update Metadata for Roads', priority: 'High', status: 'In Progress', due: 'Today', color: '#f59e0b' },
                { title: 'Review Digitization Quality', priority: 'Medium', status: 'Pending', due: 'Tomorrow', color: '#3b82f6' },
                { title: 'Prepare Weekly Report', priority: 'Low', status: 'Completed', due: 'Yesterday', color: '#10b981' },
                { title: 'Check Server Logs', priority: 'High', status: 'Pending', due: 'Dec 20', color: '#ef4444' },
                { title: 'Update User Permissions', priority: 'Medium', status: 'In Progress', due: 'Dec 22', color: '#6366f1' }
            ].map((task, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '99px', background: `${task.color}15`, color: task.color }}>
                            {task.priority.toUpperCase()} PRIORITY
                        </span>
                        <MoreHorizontal size={18} color="#94a3b8" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{task.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        <Clock size={14} /> Due: {task.due}
                    </div>
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '-8px' }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#cbd5e1', border: '2px solid white' }}></div>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#94a3b8', border: '2px solid white', marginLeft: '-8px' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: task.status === 'Completed' ? '#10b981' : '#64748b' }}>
                            {task.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default TasksView;
