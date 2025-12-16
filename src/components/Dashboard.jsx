import React from 'react';
import { Database, Map as MapIcon, FileText, HardDrive, Layers } from 'lucide-react';

const Card = ({ title, value, icon, color, subValue }) => (
    <div className="card animate-fade-in" style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '160px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
                {icon}
            </div>
            {subValue && <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: '#f1f5f9', padding: '4px 8px', borderRadius: '8px' }}>{subValue}</span>}
        </div>
        <div>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: 500 }}>{title}</h3>
        </div>
    </div>
);

const SectionHeader = ({ title }) => (
    <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
        <span style={{ width: '4px', height: '24px', background: 'var(--accent-secondary)', display: 'inline-block', borderRadius: '2px' }}></span>
        {title}
    </h2>
);

const GlobeIcon = () => <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#94a3b8' }}></div></div>;
const ImageIcon = () => <div style={{ width: 24, height: 24, background: '#94a3b8', borderRadius: 4, opacity: 0.5 }}></div>;

const Dashboard = ({ setActiveView }) => (
    <div className="p-6 fade-in" style={{ padding: '2.5rem', overflowY: 'auto', height: '100%', background: '#f8fafc' }}>

        {/* Overview Section */}
        <div className="section mb-10" style={{ marginBottom: '3rem' }}>
            <SectionHeader title="Overview" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <Card title="Total Datasets" value="313" icon={<Database size={28} />} color="#6366f1" />
                <Card title="Maps" value="2" icon={<MapIcon size={28} />} color="#ef4444" />
                <Card title="Documents" value="172" icon={<FileText size={28} />} color="#3b82f6" />
                <Card title="My Data" value="14" icon={<HardDrive size={28} />} color="#10b981" />
            </div>
        </div>

        {/* Dataset Section */}
        <div className="section mb-10" style={{ marginBottom: '3rem' }}>
            <SectionHeader title="Dataset" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <Card title="Feature Datasets" value="0" icon={<Layers size={28} />} color="#64748b" />
                <Card title="Feature Classes" value="50" icon={<Database size={28} />} color="#64748b" />
                <Card title="Remote Datasets" value="0" icon={<GlobeIcon />} color="#64748b" />
                <Card title="Raster Datasets" value="91" icon={<ImageIcon />} color="#64748b" />
            </div>
        </div>

        {/* Recent Datasets Table */}
        <div className="section" style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>My Datasets</h3>
                <button
                    onClick={() => setActiveView('my-data')}
                    style={{ color: 'var(--primary-light)', fontSize: '0.9rem', fontWeight: 600, background: 'transparent', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', cursor: 'pointer' }}
                >
                    View all
                    <span style={{ fontSize: '1.2em' }}>&raquo;</span>
                </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead style={{ background: '#f8fafc', color: 'var(--text-secondary)' }}>
                    <tr>
                        <th style={{ padding: '1.25rem 2rem', textAlign: 'left', fontWeight: 600 }}>Name</th>
                        <th style={{ padding: '1.25rem 2rem', textAlign: 'left', fontWeight: 600 }}>Theme</th>
                        <th style={{ padding: '1.25rem 2rem', textAlign: 'center', fontWeight: 600 }}>Type</th>
                        <th style={{ padding: '1.25rem 2rem', textAlign: 'right', fontWeight: 600 }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: 'Arunachal Pradesh District Boundary', theme: 'Administrative map', type: 'Feature class' },
                        { name: 'Contour 5723005', theme: 'Administrative map', type: 'Feature class' },
                        { name: 'Aerial Tiling', theme: 'Administrative map', type: 'Feature class' },
                        { name: 'Health Infrastructure of Arunachal Pradesh', theme: 'Health & Family Map', type: 'Feature class' },
                    ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                            <td style={{ padding: '1.25rem 2rem', color: 'var(--text-primary)', fontWeight: 500 }}>{row.name}</td>
                            <td style={{ padding: '1.25rem 2rem' }}>
                                <span style={{
                                    background: row.theme.includes('Health') ? '#ecfdf5' : '#eff6ff',
                                    color: row.theme.includes('Health') ? '#059669' : '#1d4ed8',
                                    padding: '6px 14px',
                                    borderRadius: '99px',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap'
                                }}>
                                    {row.theme.length > 25 ? row.theme.substring(0, 25) + '...' : row.theme}
                                </span>
                            </td>
                            <td style={{ padding: '1.25rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>{row.type}</td>
                            <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                                <button style={{ background: '#0f766e', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, boxShadow: '0 1px 2px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}>More Info</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Dashboard;
