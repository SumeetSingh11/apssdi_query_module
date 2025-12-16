import React from 'react';
import { Edit, Layers, Download, FileText, Trash2 } from 'lucide-react';

const HistoryView = () => (
    <div className="p-6 fade-in" style={{ padding: '2.5rem', height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Activity History</h2>
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', padding: '2rem' }}>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input type="text" placeholder="Search history..." style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, outline: 'none' }} />
                <button style={{ padding: '10px 16px', background: 'var(--primary-color)', color: 'white', borderRadius: '8px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>Filter</button>
            </div>

            <div className="timeline">
                {[
                    { action: 'Updated Metadata', target: 'District Boundaries', user: 'Admin', time: '2 hours ago', icon: <Edit size={16} /> },
                    { action: 'Layer Published', target: 'Road Network 2024', user: 'System', time: 'Yesterday at 4:30 PM', icon: <Layers size={16} /> },
                    { action: 'Data Import', target: 'Village_Locations.shp', user: 'You', time: 'Dec 14, 2025', icon: <Download size={16} /> },
                    { action: 'Project Created', target: 'Forest Cover Analysis', user: 'You', time: 'Dec 12, 2025', icon: <FileText size={16} /> },
                    { action: 'Deleted Dataset', target: 'Temp_Raster_Old', user: 'Admin', time: 'Dec 10, 2025', icon: <Trash2 size={16} /> },
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 2 }}>
                                {item.icon}
                            </div>
                            {i !== 4 && <div style={{ width: '2px', flex: 1, background: '#e2e8f0', margin: '4px 0' }}></div>}
                        </div>
                        <div style={{ flex: 1, paddingBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{item.action}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.time}</span>
                            </div>
                            <p style={{ margin: '4px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                {item.action} on <span style={{ fontWeight: 500, color: '#334155' }}>{item.target}</span> by {item.user}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white', color: 'var(--text-primary)', fontWeight: 500, cursor: 'pointer', marginTop: '1rem' }}>
                Load Older Activities
            </button>
        </div>
    </div>
);

export default HistoryView;
