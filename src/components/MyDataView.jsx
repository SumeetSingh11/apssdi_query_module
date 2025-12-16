import React from 'react';
import { Search, Edit, Download, Trash2 } from 'lucide-react';

const MyDataView = () => (
    <div className="p-6 fade-in" style={{ padding: '2.5rem', height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>All My Result</h2>
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <input type="text" placeholder="Search" style={{ width: '100%', padding: '10px 16px', borderRadius: '99px', border: '1px solid var(--border-color)', outline: 'none', background: '#f8fafc' }} />
                    <Search size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead style={{ background: '#f1f5f9', color: 'var(--text-secondary)' }}>
                    <tr>
                        <th style={{ padding: '1rem', textAlign: 'left', borderRadius: '8px 0 0 8px' }}>Name</th>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>Type</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Created at</th>
                        <th style={{ padding: '1rem', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: 'test_image_resampling', type: 'raster', date: '2025-11-14 9:12' },
                        { name: 'test.img', type: 'raster', date: '2025-11-14 9:41' },
                        { name: 'test_cent_div', type: 'vector', date: '2025-11-14 9:09' },
                        { name: 'test_buffer', type: 'vector', date: '2025-11-13 16:03' },
                    ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '1.25rem 1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{row.name}</td>
                            <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                                <span style={{
                                    background: row.type === 'vector' ? '#22c55e' : '#334155',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    fontWeight: 600
                                }}>
                                    {row.type}
                                </span>
                            </td>
                            <td style={{ padding: '1.25rem 1rem', color: 'var(--text-secondary)' }}>{row.date}</td>
                            <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                    <Edit size={18} className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                                    <Download size={18} className="text-gray-400 hover:text-green-600 cursor-pointer" />
                                    <Trash2 size={18} className="text-gray-400 hover:text-red-600 cursor-pointer" />
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
