import React from 'react';
import { Search, Edit, Download, Trash2, Clock, Box, Play, CheckCircle2 } from 'lucide-react';

const MyDataView = () => (
    <div className="p-8 animate-fade-in" style={{ padding: '3rem', height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
        <div style={{ marginBottom: '3rem' }}>
            <div style={{ color: '#059669', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Processing History</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px' }}>Engineered Results</h2>
        </div>

        <div className="tool-card" style={{ padding: '32px', background: 'white', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div className="input-wrapper" style={{ width: '380px', borderRadius: '16px', padding: '10px 20px', background: '#f8fafc' }}>
                    <Search size={18} color="#94a3b8" />
                    <input type="text" placeholder="Filter your results..." style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '12px', fontSize: '1rem', width: '100%' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>
                        <Clock size={16} /> Latest First
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                        <Download size={16} /> Batch Export
                    </button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th style={{ padding: '0 24px', color: '#64748b', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Analysis Output</th>
                        <th style={{ padding: '0 24px', color: '#64748b', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Engine Type</th>
                        <th style={{ padding: '0 24px', color: '#64748b', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Timestamp</th>
                        <th style={{ padding: '0 24px', color: '#64748b', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                        <th style={{ padding: '0 24px', color: '#64748b', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: 'Pop_Density_Join_2024', type: 'Spatial Join', date: 'Just Now', status: 'Completed', color: '#3b82f6' },
                        { name: 'Mizoram_Flood_Clip', type: 'Raster Clip', date: '2 hours ago', status: 'Completed', color: '#10b981' },
                        { name: 'Road_Buffer_Analysis', type: 'Vector Buffer', date: 'Dec 14, 2024', status: 'In Progress', color: '#f59e0b' },
                        { name: 'District_Centroids_Final', type: 'Centroid Gen', date: 'Dec 12, 2024', status: 'Completed', color: '#8b5cf6' },
                    ].map((row, i) => (
                        <tr key={i} className="catalog-item" style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #f1f5f9', cursor: 'default' }}>
                            <td style={{ padding: '20px 24px', borderRadius: '18px 0 0 18px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', background: `${row.color}15`, color: row.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box size={20} />
                                    </div>
                                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{row.name}</span>
                                </div>
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                                <span style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                                    {row.type}
                                </span>
                            </td>
                            <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>{row.date}</td>
                            <td style={{ padding: '20px 24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: row.status === 'Completed' ? '#059669' : '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                                    {row.status === 'Completed' ? <CheckCircle2 size={16} /> : <Play size={16} />}
                                    {row.status}
                                </div>
                            </td>
                            <td style={{ padding: '20px 24px', borderRadius: '0 18px 18px 0', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    <button style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', border: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                                    <button style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', border: 'none', cursor: 'pointer' }}><Download size={18} /></button>
                                    <button style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default MyDataView;
