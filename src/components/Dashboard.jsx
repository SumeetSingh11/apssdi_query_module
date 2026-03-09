import React from 'react';
import { Database, Map as MapIcon, FileText, HardDrive, Layers } from 'lucide-react';
import './Dashboard.css';

const Card = ({ title, value, icon, color, subValue, gradientFrom, gradientTo }) => {
    // Generate gradient styles for the icon box
    const iconStyle = {
        '--icon-bg-gradient': `linear-gradient(135deg, ${gradientFrom || color + '22'}, ${gradientTo || color + '66'})`,
        '--card-color': color,
        '--card-gradient': `linear-gradient(to bottom, ${color}, ${gradientTo || color})`,
        '--icon-shadow-color': color + '40'
    };

    return (
        <div className="modern-card" style={iconStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="icon-box">
                    {icon}
                </div>
                {subValue && <span className="sub-value">{subValue}</span>}
            </div>
            <div>
                <p className="stat-value">{value}</p>
                <h3 className="stat-title">{title}</h3>
            </div>
        </div>
    );
};

const SectionHeader = ({ title }) => (
    <div className="section-header">
        <div className="section-line"></div>
        {title}
    </div>
);

const GlobeIcon = () => <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: 'currentColor' }}></div></div>;
const ImageIcon = () => <div style={{ width: 24, height: 24, background: 'currentColor', borderRadius: 4, opacity: 0.8 }}></div>;

const Dashboard = ({ setActiveView }) => (
    <div className="dashboard-container">

        {/* Overview Section */}
        <div className="dashboard-section">
            <SectionHeader title="Overview" />
            <div className="grid-container">
                <Card
                    title="Total Datasets"
                    value="313"
                    icon={<Database size={28} />}
                    color="#6366f1"
                    gradientFrom="#e0e7ff"
                    gradientTo="#818cf8"
                />
                <Card
                    title="Maps"
                    value="2"
                    icon={<MapIcon size={28} />}
                    color="#ef4444"
                    gradientFrom="#fee2e2"
                    gradientTo="#f87171"
                />
                <Card
                    title="Documents"
                    value="172"
                    icon={<FileText size={28} />}
                    color="#3b82f6"
                    gradientFrom="#dbeafe"
                    gradientTo="#60a5fa"
                />
                <Card
                    title="My Data"
                    value="14"
                    icon={<HardDrive size={28} />}
                    color="#10b981"
                    gradientFrom="#d1fae5"
                    gradientTo="#34d399"
                />
            </div>
        </div>

        {/* Dataset Section */}
        <div className="dashboard-section">
            <SectionHeader title="Dataset" />
            <div className="grid-container">
                <Card title="Feature Datasets" value="0" icon={<Layers size={28} />} color="#64748b" gradientFrom="#f1f5f9" gradientTo="#94a3b8" />
                <Card title="Feature Classes" value="50" icon={<Database size={28} />} color="#64748b" gradientFrom="#f1f5f9" gradientTo="#94a3b8" />
                <Card title="Remote Datasets" value="0" icon={<GlobeIcon />} color="#64748b" gradientFrom="#f1f5f9" gradientTo="#94a3b8" />
                <Card title="Raster Datasets" value="91" icon={<ImageIcon />} color="#64748b" gradientFrom="#f1f5f9" gradientTo="#94a3b8" />
            </div>
        </div>

        {/* Recent Datasets Table */}
        <div className="modern-table-container">
            <div className="table-header">
                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e293b' }}>My Datasets</h3>
                <button
                    onClick={() => setActiveView('my-data')}
                    className="view-all-btn"
                >
                    View all
                    <span>&raquo;</span>
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Theme</th>
                        <th style={{ textAlign: 'center' }}>Type</th>
                        <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: 'Arunachal Pradesh District Boundary', theme: 'Administrative map', type: 'Feature class' },
                        { name: 'Contour 5723005', theme: 'Administrative map', type: 'Feature class' },
                        { name: 'Aerial Tiling', theme: 'Administrative map', type: 'Feature class' },
                        { name: 'Health Infrastructure of Arunachal Pradesh', theme: 'Health & Family Map', type: 'Feature class' },
                    ].map((row, i) => (
                        <tr key={i}>
                            <td>{row.name}</td>
                            <td>
                                <span className="theme-badge" style={{
                                    background: row.theme.includes('Health') ? 'linear-gradient(135deg, #ecfdf5, #d1fae5)' : 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                                    color: row.theme.includes('Health') ? '#059669' : '#1d4ed8',
                                    border: row.theme.includes('Health') ? '1px solid #a7f3d0' : '1px solid #bfdbfe'
                                }}>
                                    {row.theme.length > 30 ? row.theme.substring(0, 30) + '...' : row.theme}
                                </span>
                            </td>
                            <td style={{ textAlign: 'center', color: '#64748b' }}>{row.type}</td>
                            <td style={{ textAlign: 'right' }}>
                                <button className="action-btn">More Info</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Dashboard;
