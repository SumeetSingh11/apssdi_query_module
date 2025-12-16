import React from 'react';
import { Search, Filter } from 'lucide-react';

const GlobeIcon = () => <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#94a3b8' }}></div></div>;

const DataCatalog = () => (
    <div className="p-6 fade-in" style={{ padding: '2.5rem', height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Data Catalog</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input type="text" placeholder="Search or filter results..." style={{ padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '300px', outline: 'none' }} />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <Filter size={18} /> Filter
                </button>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
                { title: 'test091225', org: 'Art and Culture Department', type: 'Administrative map', date: 'December 9th, 2025' },
                { title: 'Arunachal Pradesh Satellite Imagery_LISS_III', org: 'APSAC', type: 'Administrative map', date: 'December 8th, 2025' },
                { title: 'LULC', org: 'APSAC', type: 'Administrative map', date: 'December 7th, 2025' },
                { title: 'GW PROSPECT MAP_10K_ITANAGAR', org: 'APSAC', type: 'Ground Water', date: 'December 7th, 2025' },
                { title: 'Rajiv Gandhi Drinking water Mission_gwm82H13', org: 'APSAC', type: 'Administrative map', date: 'December 7th, 2025' },
                { title: 'Rajiv Gandhi Drinking water Mission_gwm82H10', org: 'APSAC', type: 'Administrative map', date: 'December 7th, 2025' },
            ].map((item, idx) => (
                <div key={idx} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ height: '160px', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {/* Placeholder Graphic */}
                        <div style={{ width: '80%', height: '60%', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <GlobeIcon color="#64748b" />
                        </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.4 }}>{item.org}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                            <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '6px', fontWeight: 500 }}>{item.type}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{item.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default DataCatalog;
