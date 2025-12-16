import React, { useState, useRef } from 'react';
import './MapDock.css';
import shp from 'shpjs';
import {
    Layers, Database, Search, Wrench, Map as MapIcon,
    X, ChevronDown, ChevronRight, Check, Info, MoreVertical,
    Plus, Trash2, FilePlus, Settings, Scissors, Maximize,
    Minimize, Activity, Zap, Image, Upload, FolderOpen, ArrowLeft
} from 'lucide-react';

// --- Shared Data ---
const CATALOG_DATA = [
    { id: 'ASI', label: 'ASI', count: 2 },
    { id: 'Bichom', label: 'Bichom Dam', count: 5 },
    { id: 'Agri', label: 'Agriculture/Horticulture', count: 8 },
    {
        id: 'Connectivity', label: 'Connectivity', count: 12, items: [
            { name: 'Border Road', count: 188 },
            { name: 'Helipads', count: 14 },
            { name: 'National Highway', count: 2 },
            { name: 'NEEPCO Road', count: 4 },
            { name: 'Other District Road', count: 450 },
            { name: 'Other village roads', count: 422 },
        ]
    },
    { id: 'Forest', label: 'Forest & Environment', count: 6 },
];

// --- Sub-Components ---

// 1. Layers Panel Content
const LayersContent = ({ onAddLayer, layers = [] }) => {
    const fileInputRef = useRef(null);
    const [view, setView] = useState('list'); // 'list' or 'catalog'
    const [expandedGroup, setExpandedGroup] = useState(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Check if zip
            if (file.name.endsWith('.zip')) {
                const buffer = await file.arrayBuffer();
                const geojson = await shp(buffer);

                // shpjs might return an array if zip has multiple shp
                const data = Array.isArray(geojson) ? geojson[0] : geojson;

                onAddLayer({
                    data: data,
                    name: file.name.replace('.zip', ''),
                    color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color
                });
            } else {
                alert("Please upload a .zip file containing the Shapefile (.shp, .dbf, .shx)");
            }
        } catch (err) {
            console.error("Shapefile parse error:", err);
            alert("Failed to parse shapefile. Ensure it is a valid zip archive.");
        }

        // Reset input
        e.target.value = null;
    };

    const handleAddFromCatalog = (itemName) => {
        onAddLayer({
            data: null, // Placeholder for actual catalog data fetch
            name: itemName,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            source: 'System Catalog'
        });
        setView('list');
    };

    if (view === 'catalog') {
        return (
            <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <button
                        onClick={() => setView('list')}
                        style={{ padding: '8px', borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}
                    >
                        <ArrowLeft size={18} color="#64748b" />
                    </button>
                    <h3 style={{ fontWeight: 600, margin: 0 }}>Select from Catalog</h3>
                </div>

                <div className="catalog-content-mini">
                    {CATALOG_DATA.map(group => (
                        <div key={group.id} className="catalog-group">
                            <div
                                className="catalog-header"
                                onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                            >
                                <span>{group.label}</span>
                                {expandedGroup === group.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </div>

                            {expandedGroup === group.id && (
                                <div className="catalog-list">
                                    {group.items ? group.items.map((item, idx) => (
                                        <div key={idx} className="catalog-item">
                                            <span style={{ flex: 1, fontSize: '0.9rem' }}>{item.name}</span>
                                            <button
                                                className="btn-xs-primary"
                                                onClick={() => handleAddFromCatalog(item.name)}
                                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    )) : (
                                        <div style={{ padding: '8px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>No items available</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                accept=".zip"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button className="tool-card" onClick={() => fileInputRef.current?.click()}>
                    <div className="tool-icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
                        <Upload size={22} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Upload File</span>
                </button>
                <button className="tool-card" onClick={() => setView('catalog')}>
                    <div className="tool-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}>
                        <FolderOpen size={22} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>From Catalog</span>
                </button>
                <button className="tool-card" style={{ gridColumn: 'span 2' }}>
                    <div className="tool-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                        <FilePlus size={22} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Create New Map</span>
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 600 }}>Active Layers ({3 + layers.length})</h3>
                <button style={{ color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Trash2 size={14} /> Clear All
                </button>
            </div>

            <div className="layer-list">
                {/* Dynamically added layers */}
                {layers.map((layer, i) => (
                    <div key={layer.id} className="catalog-item" style={{ borderRadius: '8px', border: `1px solid ${layer.color}`, background: `${layer.color}10`, marginBottom: '8px' }}>
                        <div className="checkbox-custom checked" style={{ background: layer.color, borderColor: layer.color }}><Check size={12} /></div>
                        <span style={{ flex: 1, fontWeight: 500 }}>{layer.name}</span>
                        {layer.source === 'System Catalog' && <span style={{ fontSize: '0.7rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', marginRight: '8px' }}>Catalog</span>}
                        <Settings size={16} color="#94a3b8" />
                        <MoreVertical size={16} color="#94a3b8" />
                    </div>
                ))}

                {/* Hardcoded Layers */}
                {['Road Network', 'District Boundaries', 'River System'].map((layer, i) => (
                    <div key={i} className="catalog-item" style={{ borderRadius: '8px', border: '1px solid #f1f5f9', marginBottom: '8px' }}>
                        <div className="checkbox-custom checked"><Check size={12} /></div>
                        <span style={{ flex: 1, fontWeight: 500 }}>{layer}</span>
                        <Settings size={16} color="#94a3b8" />
                        <MoreVertical size={16} color="#94a3b8" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 2. Catalog Panel Content (Reference Design)
const CatalogContent = () => {
    const [expanded, setExpanded] = useState('Connectivity');

    return (
        <div className="catalog-content">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <select style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <option>Department Wise</option>
                    <option>Theme Wise</option>
                </select>
                <select style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <option>Vector & Raster</option>
                    <option>Vector Only</option>
                    <option>Raster Only</option>
                </select>
            </div>

            {CATALOG_DATA.map(group => (
                <div key={group.id} className="catalog-group">
                    <div
                        className="catalog-header"
                        onClick={() => setExpanded(expanded === group.id ? null : group.id)}
                    >
                        <span>{group.label}</span>
                        {expanded === group.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>

                    {expanded === group.id && group.items && (
                        <div className="catalog-list">
                            {group.items.map((item, idx) => (
                                <div key={idx} className="catalog-item">
                                    <div className="checkbox-custom checked"><Check size={12} /></div>
                                    <span style={{ flex: 1, fontSize: '0.9rem' }}>{item.name} <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>({item.count})</span></span>
                                    <Info size={16} color="#64748b" style={{ cursor: 'pointer' }} />
                                    <MoreVertical size={16} color="#64748b" style={{ cursor: 'pointer' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// 3. Geoprocessing Tools
const GeoprocessingContent = () => {
    const [view, setView] = useState('main'); // main, vector, raster

    if (view === 'main') return (
        <div>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Select Tool Category</h3>
            <div className="tools-grid">
                <div className="tool-card" onClick={() => setView('vector')}>
                    <div className="tool-icon"><Activity size={28} /></div>
                    <h3>Vector Tools</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Buffer, Clip, Merge, Simplify</p>
                </div>
                <div className="tool-card" onClick={() => setView('raster')}>
                    <div className="tool-icon" style={{ background: '#fce7f3', color: '#db2777' }}><Image size={28} /></div>
                    <h3>Raster Tools</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Resample, Clip, Contour, Slope</p>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <button onClick={() => setView('main')} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, color: '#64748b' }}>
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Categories
            </button>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>{view === 'vector' ? 'Vector' : 'Raster'} Operations</h3>
            <div className="tools-grid">
                {view === 'vector' ? (
                    <>
                        {['Buffer Analysis', 'Clip Vector', 'Centroid', 'Simplify Geometry', 'Merge Layers', 'Dissolve'].map(tool => (
                            <div key={tool} className="tool-card" style={{ padding: '12px', gap: '8px' }}>
                                <div className="tool-icon" style={{ width: '36px', height: '36px' }}><Zap size={18} /></div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{tool}</span>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {['Clip Raster', 'Resample', 'Slope', 'Aspect', 'Hillshade', 'Contour'].map(tool => (
                            <div key={tool} className="tool-card" style={{ padding: '12px', gap: '8px' }}>
                                <div className="tool-icon" style={{ width: '36px', height: '36px', background: '#fce7f3', color: '#db2777' }}><Scissors size={18} /></div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{tool}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};


// 4. Query Tool Content
// 4. Query Tool Content
const QueryContent = ({ history, onAddQuery }) => {
    // No modal state needed anymore
    const [showAdvanced, setShowAdvanced] = useState(false); // Default to false to save space? User asked 'Show advanced options', implying hidden first? Actually user said "Hide advanced options" in previous prompt, but here says "add option show advanced options". I'll default to visible_initially=false or true based on context. Let's start with false (collapsed) to keep it clean.
    const [queryName, setQueryName] = useState('');

    const handleCreate = () => {
        if (!queryName.trim()) return;

        onAddQuery({
            name: queryName,
            date: 'Just now',
            type: 'Spatial Join'
        });
        setQueryName('');
    };

    // Filter Icon Component
    const FilterIcon = () => (
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <div style={{ position: 'relative' }}>
                <div style={{
                    width: '16px', height: '16px', borderRadius: '50%', background: '#ef4444', color: 'white',
                    fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'absolute', top: -6, right: -6, zIndex: 2, border: '2px solid white'
                }}>0</div>
                <Search size={18} style={{ color: '#94a3b8' }} />
            </div>
        </div>
    );

    return (
        <div className="query-content animate-fade-in">
            {/* Inline Form Section */}
            <div className="query-form-section" style={{ marginBottom: '24px' }}>

                <div className="form-group">
                    <label>Name of result</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter result name..."
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Select target dataset</label>
                    <div style={{ position: 'relative' }}>
                        <select className="form-select" style={{ paddingRight: '40px' }} defaultValue="">
                            <option value="" disabled>Select target dataset</option>
                            <option>District Boundaries</option>
                            <option>Village Locations</option>
                            <option>Parcel Data 2024</option>
                        </select>
                        <FilterIcon />
                    </div>
                </div>

                <div className="form-group">
                    <label>Select join dataset</label>
                    <div style={{ position: 'relative' }}>
                        <select className="form-select" style={{ paddingRight: '40px' }} defaultValue="">
                            <option value="" disabled>Select join dataset</option>
                            <option>Census Population 2011</option>
                            <option>Hospital Facilities</option>
                            <option>Property Assessments</option>
                        </select>
                        <FilterIcon />
                    </div>
                </div>

                <div className="advanced-section" style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div
                        className="toggle-advanced"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        style={{ marginBottom: showAdvanced ? '16px' : '0' }}
                    >
                        {showAdvanced ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <span>{showAdvanced ? 'Hide advanced options' : 'Show advanced options'}</span>
                    </div>

                    {showAdvanced && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group-outline">
                                <label>Join type</label>
                                <select className="form-select">
                                    <option>INNER JOIN</option>
                                    <option>LEFT JOIN</option>
                                    <option>RIGHT JOIN</option>
                                </select>
                            </div>

                            <div className="form-group-outline">
                                <label>Join operation</label>
                                <select className="form-select">
                                    <option>JOIN_ONE_TO_ONE</option>
                                    <option>JOIN_ONE_TO_MANY</option>
                                </select>
                            </div>

                            <div className="form-group-outline">
                                <label>Matching option</label>
                                <select className="form-select">
                                    <option>Intersects</option>
                                    <option>Contains</option>
                                    <option>Within</option>
                                    <option>Equals</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    className="btn-primary"
                    onClick={handleCreate}
                    disabled={!queryName}
                    style={{ marginTop: '20px' }}
                >
                    Create Query
                </button>
            </div>

            {/* History Section */}
            <div className="query-history-section">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={16} /> Recent Queries
                </h3>
                <div className="query-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {history.map((item, i) => (
                        <div key={i} className="query-list-item animate-fade-in">
                            <div style={{ color: '#3b82f6', background: '#eff6ff', padding: '6px', borderRadius: '8px' }}>
                                <Search size={14} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{item.name}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.date}</div>
                            </div>
                            <MoreVertical size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// 5. My Maps Content
const MyMapsContent = () => {
    const savedMaps = [
        { title: 'Project Alpha - Zone A', date: 'Oct 24, 2024', shared: true },
        { title: 'Forest Cover Analysis', date: 'Sep 15, 2024', shared: false },
        { title: 'Road Network Proposal', date: 'Aug 02, 2024', shared: true },
    ];

    return (
        <div className="mymaps-content">
            <button className="tool-card" style={{ width: '100%', marginBottom: '20px', flexDirection: 'row', justifyContent: 'center', gap: '12px', background: 'var(--primary-color)', color: 'white', border: 'none' }}>
                <Plus size={20} color="white" />
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Create New Map</span>
            </button>

            <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>Saved Maps</h3>
            <div className="saved-maps-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {savedMaps.map((map, i) => (
                    <div key={i} className="tool-card" style={{ padding: '16px', alignItems: 'flex-start', flexDirection: 'row', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MapIcon size={24} color="#64748b" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{map.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                                Last edited: {map.date}
                            </div>
                        </div>
                        <MoreVertical size={20} color="#94a3b8" style={{ cursor: 'pointer' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const MapToolsPanel = ({ activeTab, onClose, onAddLayer, layers }) => {
    // Lifted State for persistence
    const [queryHistory, setQueryHistory] = useState([
        { name: 'District Population > 50k', date: '2 mins ago' },
        { name: 'Roads near Hospitals', date: '1 hour ago' },
        { name: 'Flood Risk Areas', date: 'Yesterday' },
        { name: 'Schools with Playground', date: '2 days ago' },
    ]);
    const [toast, setToast] = useState(null);

    const handleAddQuery = (query) => {
        setQueryHistory([query, ...queryHistory]);
        setToast(`Query "${query.name}" created successfully!`);
        setTimeout(() => setToast(null), 3000);
    };

    const getContent = () => {
        switch (activeTab) {
            case 'layers': return <LayersContent onAddLayer={onAddLayer} layers={layers} />;
            case 'catalog': return <CatalogContent />;
            case 'geoprocessing': return <GeoprocessingContent />;
            case 'query': return <QueryContent history={queryHistory} onAddQuery={handleAddQuery} />;
            case 'mymaps': return <MyMapsContent />;
            default: return <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Select a tool to view options</div>;
        }
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'layers': return 'Layer Manager';
            case 'catalog': return 'Data Catalog';
            case 'geoprocessing': return 'Geoprocessing Tools';
            case 'query': return 'Query Builder';
            case 'mymaps': return 'My Saved Maps';
            default: return 'Tools';
        }
    };

    if (!activeTab) return null;

    return (
        <div className="tools-panel">
            <div className="panel-header">
                <div className="panel-title">
                    {activeTab === 'layers' && <Layers size={20} />}
                    {activeTab === 'catalog' && <Database size={20} />}
                    {activeTab === 'geoprocessing' && <Wrench size={20} />}
                    {activeTab === 'query' && <Search size={20} />}
                    {activeTab === 'mymaps' && <MapIcon size={20} />}
                    {getTitle()}
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} color="#64748b" />
                </button>
            </div>
            <div className="panel-content">
                {getContent()}
            </div>

            {/* Simple Toast Notification */}
            {toast && (
                <div className="animate-fade-in" style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#10b981',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 2000,
                    whiteSpace: 'nowrap'
                }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                    {toast}
                </div>
            )}
        </div>
    );
};

export default MapToolsPanel;
