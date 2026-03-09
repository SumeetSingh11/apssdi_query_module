import React from 'react';
import { Edit, Layers, Download, FileText, Trash2 } from 'lucide-react';

const HistoryView = () => (
    <div className="app-main-bg">
        <h2 className="page-title">Activity History</h2>
        <div className="modern-card">
            <div className="history-filters">
                <input type="text" placeholder="Search history..." className="history-search-input" />
                <button className="action-btn">Filter</button>
            </div>

            <div className="timeline">
                {[
                    { action: 'Updated Metadata', target: 'District Boundaries', user: 'Admin', time: '2 hours ago', icon: <Edit size={16} /> },
                    { action: 'Layer Published', target: 'Road Network 2024', user: 'System', time: 'Yesterday at 4:30 PM', icon: <Layers size={16} /> },
                    { action: 'Data Import', target: 'Village_Locations.shp', user: 'You', time: 'Dec 14, 2025', icon: <Download size={16} /> },
                    { action: 'Project Created', target: 'Forest Cover Analysis', user: 'You', time: 'Dec 12, 2025', icon: <FileText size={16} /> },
                    { action: 'Deleted Dataset', target: 'Temp_Raster_Old', user: 'Admin', time: 'Dec 10, 2025', icon: <Trash2 size={16} /> },
                ].map((item, i) => (
                    <div key={i} className="history-item">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="history-icon-wrapper">
                                {item.icon}
                            </div>
                            {i !== 4 && <div className="history-line"></div>}
                        </div>
                        <div className="history-content">
                            <div className="history-header">
                                <h4 className="history-title">{item.action}</h4>
                                <span className="history-time">{item.time}</span>
                            </div>
                            <p className="history-details">
                                {item.action} on <span className="theme-badge history-target-badge">{item.target}</span> by <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{item.user}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="load-more-btn">
                Load Older Activities
            </button>
        </div>
    </div>
);

export default HistoryView;
