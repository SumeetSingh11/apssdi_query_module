import React from 'react';
import { Search, Filter, Database, Calendar, Building2, ExternalLink, ArrowUpRight } from 'lucide-react';

const DataCatalog = () => (
    <div className="p-8 fade-in" style={{ padding: '3rem', height: '100%', overflowY: 'auto', background: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
                <div style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Asset Explorer</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px' }}>Global Data Catalog</h2>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <div className="input-wrapper" style={{ width: '400px', borderRadius: '16px', padding: '10px 20px' }}>
                    <Search size={18} color="#94a3b8" />
                    <input type="text" placeholder="Search departments, themes or layer names..." style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '12px', fontSize: '1rem', width: '100%' }} />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 24px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', color: '#475569', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <Filter size={18} /> Filters
                </button>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
            {[
                { title: 'District Boundary 2024', org: 'Land Resources Dept', type: 'Administrative', date: 'Dec 2024', color: '#3b82f6' },
                { title: 'LULC Analysis 2023', org: 'Forest Department', type: 'Environmental', date: 'Nov 2023', color: '#10b981' },
                { title: 'Road Infrastructure v3', org: 'PWD Mizoram', type: 'Infrastructure', date: 'Jan 2025', color: '#f59e0b' },
                { title: 'Village Locations', org: 'Local Governance', type: 'Social', date: 'Oct 2024', color: '#8b5cf6' },
                { title: 'River Network Hydro', org: 'Water Resources', type: 'Hydrology', date: 'Dec 2024', color: '#06b6d4' },
                { title: 'Agriculture Zones', org: 'Agri Dept', type: 'Thematic', date: 'May 2024', color: '#e11d48' },
            ].map((item, idx) => (
                <div key={idx} className="tool-card" style={{ padding: 0, overflow: 'hidden', alignItems: 'stretch', textAlign: 'left', background: 'white', border: '1px solid #f1f5f9' }}>
                    <div style={{ height: '180px', background: `linear-gradient(135deg, ${item.color}cc, ${item.color})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Database size={64} color="rgba(255,255,255,0.4)" />
                        <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '10px', color: 'white', fontSize: '0.75rem', fontWeight: 800, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                            {item.type}
                        </div>
                    </div>

                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', flex: 1 }}>{item.title}</h3>
                            <ArrowUpRight size={20} color="#94a3b8" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                                <Building2 size={14} /> {item.org}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.85rem' }}>
                                <Calendar size={14} /> Updated {item.date}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '12px', color: '#475569', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.background = '#e2e8f0'} onMouseOut={e => e.target.style.background = '#f1f5f9'}>
                                Preview Metadata
                            </button>
                            <button style={{ padding: '12px 20px', background: '#2563eb', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}>
                                Add to Map <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default DataCatalog;
