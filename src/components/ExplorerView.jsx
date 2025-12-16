import React, { useState } from 'react';
import { Database, Search, Filter, Trash2 } from 'lucide-react';

// Dummy Sub-Components for Icons
const PlusIcon = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const InfoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);
const ChevronDownIcon = ({ size }) => <svg width={size || "16"} height={size || "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>;

const ExplorerView = () => {
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    const data = [
        { name: 'test091225', dept: 'Art and Culture Department', type: 'Feature class', updated: 'Dec 12, 2025, 8:06 AM', created: 'Dec 9, 2025, 5:20 PM' },
        { name: 'Arunachal Pradesh Satellite Imagery_LISS_III', dept: 'APSAC', type: 'Raster dataset', updated: 'Dec 8, 2025, 1:58 PM', created: 'Dec 8, 2025, 1:51 PM' },
        { name: 'LULC', dept: 'APSAC', type: 'Feature class', updated: 'Dec 7, 2025, 4:59 PM', created: 'Dec 7, 2025, 4:59 PM' },
        { name: 'GW PROSPECT MAP_10K_ITANAGAR', dept: 'APSAC', type: 'Document', updated: 'Dec 7, 2025, 4:57 PM', created: 'Dec 7, 2025, 4:57 PM' },
        { name: 'Rajiv Gandhi Drinking water Mission_gwm82H13', dept: 'APSAC', type: 'Document', updated: 'Dec 7, 2025, 4:54 PM', created: 'Dec 7, 2025, 4:54 PM' },
        { name: 'Rajiv Gandhi Drinking water Mission_gwm82H10', dept: 'APSAC', type: 'Document', updated: 'Dec 7, 2025, 4:53 PM', created: 'Dec 7, 2025, 4:53 PM' },
        { name: 'Rajiv Gandhi Drinking water Mission_gwm82H7', dept: 'APSAC', type: 'Document', updated: 'Dec 7, 2025, 4:53 PM', created: 'Dec 7, 2025, 4:53 PM' },
        { name: 'Rajiv Gandhi Drinking water Mission_gwm82H6', dept: 'APSAC', type: 'Document', updated: 'Dec 7, 2025, 4:53 PM', created: 'Dec 7, 2025, 4:53 PM' },
        { name: 'Rajiv Gandhi Drinking water Mission_gwm82H11', dept: 'APSAC', type: 'Document', updated: 'Dec 7, 2025, 4:52 PM', created: 'Dec 7, 2025, 4:52 PM' },
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Feature class': return { bg: '#dcfce7', text: '#15803d' };
            case 'Raster dataset': return { bg: '#fae8ff', text: '#a21caf' };
            default: return { bg: '#f1f5f9', text: '#475569' };
        }
    };

    return (
        <div className="p-6 fade-in" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)' }}>

            {/* 2030 Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '18px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px -6px rgba(16, 185, 129, 0.4)' }}>
                        <Database size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold" style={{ background: 'linear-gradient(to right, #1e293b, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, letterSpacing: '-0.02em' }}>Data Explorer</h2>
                        <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Manage system assets and datasets</p>
                    </div>
                </div>
            </div>

            {/* Floating Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: 'white', padding: '12px 24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(255,255,255,0.8)' }}>
                <div style={{ fontWeight: 600, color: '#64748b', fontSize: '0.95rem' }}>
                    <span style={{ color: '#0f172a', fontSize: '1.1rem' }}>10</span> <span style={{ opacity: 0.5 }}>/ 313 items</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {/* Glass Search */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            style={{ padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', minWidth: '280px', fontSize: '0.95rem', outline: 'none', background: '#f8fafc', transition: 'all 0.2s' }}
                            onFocus={e => e.target.style.background = 'white'}
                            onBlur={e => e.target.style.background = '#f8fafc'}
                        />
                    </div>

                    <button style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><Filter size={20} /></button>

                    {/* Modern Create Button */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowCreateMenu(!showCreateMenu)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 16px -4px rgba(5, 150, 105, 0.4)', fontSize: '0.95rem' }}
                        >
                            <PlusIcon color="white" /> Create New
                        </button>

                        {showCreateMenu && (
                            <div className="animate-fade-in" style={{ position: 'absolute', top: '120%', right: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', width: '220px', zIndex: 50, padding: '8px', overflow: 'hidden' }}>
                                {['Feature dataset', 'Feature class', 'Raster dataset', 'Document', 'Remote dataset'].map(opt => (
                                    <div key={opt} style={{ padding: '12px 16px', fontSize: '0.95rem', color: '#334155', cursor: 'pointer', borderRadius: '10px', transition: 'background 0.2s', fontWeight: 500 }} onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modern Table */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                    <thead>
                        <tr>
                            {['Name', 'Department', 'Type', 'Updated', 'Created', 'Action'].map((h, i) => (
                                <th key={i} style={{ textAlign: h === 'Action' ? 'center' : 'left', padding: '0 24px 8px 24px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => {
                            const typeStyle = getTypeColor(row.type);
                            return (
                                <tr key={i} style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
                                    <td style={{ background: 'white', padding: '20px 24px', borderRadius: '16px 0 0 16px', color: '#1e293b', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>{row.name}</td>
                                    <td style={{ background: 'white', padding: '20px 24px', color: '#64748b', fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>{row.dept}</td>
                                    <td style={{ background: 'white', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                        <span style={{ background: typeStyle.bg, color: typeStyle.text, padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>{row.type}</span>
                                    </td>
                                    <td style={{ background: 'white', padding: '20px 24px', color: '#64748b', fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>{row.updated}</td>
                                    <td style={{ background: 'white', padding: '20px 24px', color: '#94a3b8', fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>{row.created}</td>
                                    <td style={{ background: 'white', padding: '20px 24px', borderRadius: '0 16px 16px 0', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                            <button style={{ background: '#f8fafc', padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#e2e8f0'} onMouseOut={e => e.currentTarget.style.background = '#f8fafc'}><InfoIcon /></button>
                                            <button style={{ background: '#fef2f2', padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#fee2e2'} onMouseOut={e => e.currentTarget.style.background = '#fef2f2'}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Minimalist Pagination */}
            <div style={{ padding: '20px 0 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 500 }}>Showing 1-10 of 313</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#64748b', cursor: 'pointer' }}>Previous</button>
                    <button style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: '#0f172a', boxShadow: '0 4px 10px rgba(15, 23, 42, 0.3)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>1</button>
                    <button style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#64748b', cursor: 'pointer' }}>2</button>
                    <button style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#64748b', cursor: 'pointer' }}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ExplorerView;
