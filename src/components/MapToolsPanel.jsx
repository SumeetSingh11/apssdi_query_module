import React, { useState, useRef, useEffect } from 'react';
import './MapDock.css';
import shp from 'shpjs';
import {
    Layers, Database, Search, Wrench, Map as MapIcon,
    X, ChevronDown, ChevronRight, Check, Info, MoreVertical,
    Plus, Trash2, FilePlus, Settings, Scissors, Maximize,
    Minimize, Activity, Zap, Image, Upload, FolderOpen, ArrowLeft,
    AlignLeft, AlignRight, Database as DbIcon, ArrowRightLeft, Split,
    Expand, Shrink, Equal, BoxSelect, Sparkles, GitBranch, History,
    Ruler, Target, Palette, Type, Grid3X3, MousePointer2, Gauge, FileDigit
} from 'lucide-react';

// --- Shared Data ---
const CATALOG_DATA = [
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
    { id: 'ASI', label: 'ASI Heritage Sites', count: 2, items: [{ name: 'Temple Ruins', count: 1 }, { name: 'Fort Wall', count: 1 }] },
    { id: 'Agri', label: 'Agriculture & Horticulture', count: 8, items: [{ name: 'Active Cropland', count: 4 }, { name: 'Fruit Orchards', count: 4 }] },
    { id: 'Forest', label: 'Forest & Environment', count: 6, items: [{ name: 'Reserve Forest', count: 3 }, { name: 'Wildlife Sanctuary', count: 3 }] },
];

// --- Sub-Components ---

// 1. Layers Panel Hub
const LayersContent = ({ onAddLayer, layers = [], onEnterCatalog }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            if (file.name.endsWith('.zip')) {
                const buffer = await file.arrayBuffer();
                const geojson = await shp(buffer);
                const data = Array.isArray(geojson) ? geojson[0] : geojson;
                onAddLayer({
                    data: data,
                    name: file.name.replace('.zip', ''),
                    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    source: 'Local Upload'
                });
            } else {
                alert("Please upload a .zip file");
            }
        } catch (err) {
            console.error("Parse error:", err);
        }
        e.target.value = null;
    };

    return (
        <div className="animate-fade-in">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept=".zip" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div className="tool-card" onClick={() => fileInputRef.current?.click()}>
                    <div className="tool-icon" style={{ background: '#eff6ff', color: '#2563eb', width: '48px', height: '48px', borderRadius: '14px' }}>
                        <Upload size={22} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Upload Local</div>
                </div>
                <div className="tool-card" onClick={onEnterCatalog}>
                    <div className="tool-icon" style={{ background: '#f5f3ff', color: '#7c3aed', width: '48px', height: '48px', borderRadius: '14px' }}>
                        <FolderOpen size={22} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>From Catalog</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Active Layer Stack ({layers.length + 3})
                </div>
                <button style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>
                    <Trash2 size={14} /> FLUSH ALL
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {layers.map((layer) => (
                    <div key={layer.id} className="catalog-item" style={{ borderRadius: '20px', background: 'white', border: `1.5px solid ${layer.color}20` }}>
                        <div className="checkbox-custom checked" style={{ background: layer.color, borderColor: layer.color }}>
                            <Check size={14} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{layer.name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Source: {layer.source || 'Local'}</div>
                        </div>
                        <Settings size={16} color="#cbd5e1" />
                    </div>
                ))}
                {['Mizoram Boundary', 'Road Network v2', 'River Systems'].map((name, i) => (
                    <div key={i} className="catalog-item" style={{ borderRadius: '20px', background: '#f8fafc', opacity: 0.8 }}>
                        <div className="checkbox-custom checked" style={{ background: '#94a3b8', borderColor: '#94a3b8' }}>
                            <Check size={14} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>{name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Base Foundation Layer</div>
                        </div>
                        <MoreVertical size={16} color="#cbd5e1" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 2. Data Catalog Panel
const CatalogContent = ({ onSelectItem, selectionMode, onBack }) => {
    const [expandedGroup, setExpandedGroup] = useState('Connectivity');

    return (
        <div className="catalog-content animate-fade-in">
            {onBack && (
                <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '14px', cursor: 'pointer', fontWeight: 700, color: '#475569' }}>
                    <ArrowLeft size={16} /> Back to Hub
                </button>
            )}

            {selectionMode && (
                <div className="selection-banner" style={{ marginBottom: '24px' }}>
                    <div className="input-icon" style={{ background: '#2563eb', color: 'white', width: '44px', height: '44px', borderRadius: '14px' }}>
                        <Info size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>Selection Mode</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Select data for {selectionMode === 'target' ? 'Primary Target' : 'Secondary Join'}</div>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div className="input-wrapper" style={{ padding: '4px 12px', borderRadius: '12px' }}>
                    <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
                        <option>Department Wise</option>
                        <option>Theme Wise</option>
                    </select>
                </div>
                <div className="input-wrapper" style={{ padding: '4px 12px', borderRadius: '12px' }}>
                    <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
                        <option>All Types</option>
                        <option>Vector Only</option>
                        <option>Raster Only</option>
                    </select>
                </div>
            </div>

            {CATALOG_DATA.map(group => (
                <div key={group.id} className="catalog-group" style={{ marginBottom: '12px' }}>
                    <div className="catalog-header" onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Database size={18} color="#3b82f6" />
                            <span style={{ fontSize: '0.95rem' }}>{group.label}</span>
                        </div>
                        {expandedGroup === group.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                    {expandedGroup === group.id && group.items && (
                        <div className="catalog-list">
                            {group.items.map((item, idx) => (
                                <div key={idx} className="catalog-item" onClick={() => onSelectItem && onSelectItem(item.name)}>
                                    <div className={`checkbox-custom ${selectionMode ? '' : 'checked'}`}>
                                        {selectionMode ? <Plus size={14} /> : <Check size={14} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: SDI-{(Math.random() * 999).toFixed(0)} • {item.count} Layers</div>
                                    </div>
                                    <div className="tool-icon-sm" style={{ width: '32px', height: '32px' }}><MoreVertical size={14} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// 3. Geoprocessing Panel Hub & Forms
const GeoprocessingContent = () => {
    const [view, setView] = useState('main'); // main, vector, raster
    const [activeTool, setActiveTool] = useState(null);

    // Form states
    const [outputName, setOutputName] = useState('');
    const [inputDataset, setInputDataset] = useState('');
    const [maskDataset, setMaskDataset] = useState('');
    const [distance, setDistance] = useState('100');
    const [tolerance, setTolerance] = useState('100');
    const [level, setLevel] = useState('2');
    const [resolution, setResolution] = useState('');
    const [quadsegs, setQuadsegs] = useState('');
    const [capsStyle, setCapsStyle] = useState('round');
    const [joinStyle, setJoinStyle] = useState('round');
    const [mitreLimit, setMitreLimit] = useState('5');

    const resetForm = () => {
        setOutputName('');
        setInputDataset('');
        setMaskDataset('');
    };

    const handleToolSelect = (tool) => {
        setActiveTool(tool);
        setView('form');
        resetForm();
    };

    if (view === 'main') return (
        <div className="animate-fade-in">
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                Processing Categories
            </div>
            <div className="tools-grid">
                <div className="tool-card" onClick={() => setView('vector')}>
                    <div className="tool-icon vector"><Activity size={32} /></div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Vector Tools</div>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>Geometry fixes, Buffers, and Spatial intersections</p>
                </div>
                <div className="tool-card" onClick={() => setView('raster')}>
                    <div className="tool-icon raster"><Image size={32} /></div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Raster Tools</div>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>Resampling, Cropping, and Terrain analytics</p>
                </div>
            </div>
        </div>
    );

    if (view === 'vector' || view === 'raster') return (
        <div className="animate-fade-in">
            <button onClick={() => setView('main')} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '14px', cursor: 'pointer', fontWeight: 700, color: '#475569' }}>
                <ArrowLeft size={16} /> Hub
            </button>
            <div className="tools-grid">
                {(view === 'vector' ? ['Buffer', 'Centroid', 'Clip vector', 'Simplify'] : ['Clip raster', 'Image resampling']).map(tool => (
                    <div key={tool} className="tool-card" style={{ padding: '16px 8px', gap: '8px' }} onClick={() => handleToolSelect(tool)}>
                        <div className={`tool-icon-sm ${view}`} style={{ width: '40px', height: '40px' }}>
                            {view === 'vector' ? <Zap size={18} /> : <Scissors size={18} />}
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{tool}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    // Dynamic Tool Forms
    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <button onClick={() => setView(activeTool.includes('raster') ? 'raster' : 'vector')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '14px', cursor: 'pointer', fontWeight: 700, color: '#475569', width: 'fit-content' }}>
                <ArrowLeft size={16} /> Back to Tools
            </button>

            <div style={{ paddingBottom: '20px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>
                    Engineered Operation
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>{activeTool}</h3>
            </div>

            <div className="query-form-group">
                {/* 1. Name Output */}
                <div className="form-group">
                    <label><Type size={16} color="#3b82f6" /> Name of output</label>
                    <div className="input-wrapper">
                        <div className="input-icon"><FileDigit size={20} /></div>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Required field..."
                            value={outputName}
                            onChange={(e) => setOutputName(e.target.value)}
                        />
                    </div>
                </div>

                {/* 2. Select Input (Vector or Raster) */}
                <div className="form-group">
                    <label>
                        {activeTool.includes('raster') ? <Grid3X3 size={16} color="#3b82f6" /> : <Layers size={16} color="#3b82f6" />}
                        {activeTool.includes('raster') ? ' Select Raster Dataset' : ' Select Vector'}
                    </label>
                    <button className={`input-wrapper ${inputDataset ? 'selected' : ''}`} style={{ width: '100%', cursor: 'pointer', background: 'transparent', border: 'none' }}>
                        <div className="input-icon" style={{ background: inputDataset ? '#2563eb' : '', color: inputDataset ? 'white' : '' }}>
                            {activeTool.includes('raster') ? <Grid3X3 size={20} /> : <BoxSelect size={20} />}
                        </div>
                        <div style={{ flex: 1, padding: '0 16px', fontSize: '0.95rem', fontWeight: 700, color: inputDataset ? '#0f172a' : '#cbd5e1', textAlign: 'left' }}>
                            {inputDataset || (activeTool.includes('raster') ? 'Choose imaging data...' : 'Select geometry layer...')}
                        </div>
                        <ChevronRight size={18} color="#cbd5e1" />
                    </button>
                </div>

                {/* 3. Specialized Fields per Tool */}
                {activeTool === 'Buffer' && (
                    <div className="tool-special-fields animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label><Ruler size={16} color="#3b82f6" /> Distance (m)</label>
                            <div className="input-wrapper">
                                <div className="input-icon"><Settings size={20} /></div>
                                <input type="number" className="form-input" value={distance} onChange={(e) => setDistance(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                                <label><Target size={14} color="#3b82f6" /> Resolution (m)</label>
                                <div className="input-wrapper" style={{ padding: '4px' }}>
                                    <input type="text" className="form-input" placeholder="Value..." value={resolution} onChange={(e) => setResolution(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label><MousePointer2 size={14} color="#3b82f6" /> Quadsegs</label>
                                <div className="input-wrapper" style={{ padding: '4px' }}>
                                    <input type="text" className="form-input" placeholder="Segments..." value={quadsegs} onChange={(e) => setQuadsegs(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label><Palette size={16} color="#3b82f6" /> Caps & Join Style</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="input-wrapper" style={{ padding: '8px 12px', borderRadius: '16px' }}>
                                    <select className="form-input" value={capsStyle} onChange={(e) => setCapsStyle(e.target.value)} style={{ padding: 0 }}>
                                        <option value="round">Round Cap</option>
                                        <option value="flat">Flat Cap</option>
                                        <option value="square">Square Cap</option>
                                    </select>
                                </div>
                                <div className="input-wrapper" style={{ padding: '8px 12px', borderRadius: '16px' }}>
                                    <select className="form-input" value={joinStyle} onChange={(e) => setJoinStyle(e.target.value)} style={{ padding: 0 }}>
                                        <option value="round">Round Join</option>
                                        <option value="mitre">Mitre Join</option>
                                        <option value="bevel">Bevel Join</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label><Activity size={16} color="#3b82f6" /> Mitre limit</label>
                            <div className="input-wrapper">
                                <div className="input-icon"><Settings size={20} /></div>
                                <input type="number" className="form-input" value={mitreLimit} onChange={(e) => setMitreLimit(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTool.includes('Clip') && (
                    <div className="form-group animate-fade-in">
                        <label><BoxSelect size={16} color="#3b82f6" /> Select mask layer</label>
                        <button className={`input-wrapper ${maskDataset ? 'selected' : ''}`} style={{ width: '100%', cursor: 'pointer', background: 'transparent', border: 'none' }}>
                            <div className="input-icon" style={{ background: maskDataset ? '#2563eb' : '', color: maskDataset ? 'white' : '' }}><Maximize size={20} /></div>
                            <div style={{ flex: 1, padding: '0 16px', fontSize: '0.95rem', fontWeight: 700, color: maskDataset ? '#0f172a' : '#cbd5e1', textAlign: 'left' }}>
                                {maskDataset || 'Select clipping boundary...'}
                            </div>
                            <ChevronRight size={18} color="#cbd5e1" />
                        </button>
                    </div>
                )}

                {activeTool === 'Simplify' && (
                    <div className="form-group animate-fade-in">
                        <label><Target size={16} color="#3b82f6" /> Tolerance (m)</label>
                        <div className="input-wrapper">
                            <div className="input-icon"><Gauge size={20} /></div>
                            <input type="number" className="form-input" value={tolerance} onChange={(e) => setTolerance(e.target.value)} />
                        </div>
                    </div>
                )}

                {activeTool === 'Image resampling' && (
                    <div className="form-group animate-fade-in">
                        <label><Gauge size={16} color="#3b82f6" /> Resampling Level</label>
                        <div className="input-wrapper">
                            <div className="input-icon"><FileDigit size={20} /></div>
                            <input type="number" className="form-input" value={level} min="1" onChange={(e) => setLevel(e.target.value)} />
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '8px' }}>Level must be an integer greater than 0</p>
                    </div>
                )}

                <button
                    className={`btn-run-engine ${outputName ? 'animate-pulse-subtle' : ''}`}
                    style={{ marginTop: '20px' }}
                    disabled={!outputName}
                >
                    <Sparkles size={20} /> Execute Process Engine
                </button>
            </div>
        </div>
    );
};

// 4. Query Builder Components
const IconSelector = ({ options, value, onChange, label }) => (
    <div className="form-group">
        <label>{label}</label>
        <div className="icon-selector-grid">
            {options.map((opt) => (
                <div
                    key={opt.value}
                    className={`icon-selection-item ${value === opt.value ? 'selected' : ''}`}
                    onClick={() => onChange(opt.value)}
                >
                    <div className="selection-icon-wrapper" style={{ width: '60px', height: '60px', borderRadius: '18px' }}>
                        <opt.icon size={28} />
                    </div>
                    <span className="selection-label" style={{ fontSize: '0.75rem', marginTop: '4px' }}>{opt.label}</span>
                </div>
            ))}
        </div>
    </div>
);

const QueryContent = ({
    targetDataset,
    joinDataset,
    onEnterSelectionMode,
    queryName,
    setQueryName,
    showAdvanced,
    setShowAdvanced,
    joinType,
    setJoinType,
    joinOp,
    setJoinOp,
    matchOption,
    setMatchOption,
    onCreateQuery,
    history
}) => {
    const joinTypeOptions = [
        { value: 'INNER JOIN', label: 'Inner Join', icon: DbIcon },
        { value: 'LEFT JOIN', label: 'Left Join', icon: AlignLeft },
        { value: 'RIGHT JOIN', label: 'Right Join', icon: AlignRight },
    ];
    const joinOpOptions = [
        { value: 'JOIN_ONE_TO_ONE', label: '1 to 1', icon: ArrowRightLeft },
        { value: 'JOIN_ONE_TO_MANY', label: '1 to Many', icon: Split },
    ];
    const matchOptions = [
        { value: 'Intersects', label: 'Intersects', icon: Layers },
        { value: 'Contains', label: 'Contains', icon: BoxSelect },
        { value: 'Within', label: 'Within', icon: Shrink },
        { value: 'Equals', label: 'Equals', icon: Equal },
        { value: 'Touches', label: 'Touches', icon: Zap },
        { value: 'Overlaps', label: 'Overlaps', icon: Sparkles },
        { value: 'Crosses', label: 'Crosses', icon: GitBranch },
    ];

    return (
        <div className="query-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="query-form-group">
                <div className="form-group">
                    <label><BoxSelect size={16} color="#3b82f6" /> Final Output Name</label>
                    <div className="input-wrapper">
                        <div className="input-icon"><Settings size={20} /></div>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g., Analysis_Output_01"
                            value={queryName}
                            onChange={(e) => setQueryName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label><Database size={16} color="#3b82f6" /> Target Dataset</label>
                    <button className={`input-wrapper ${targetDataset ? 'selected' : ''}`} onClick={() => onEnterSelectionMode('target')} style={{ width: '100%', cursor: 'pointer', border: 'none', background: 'transparent' }}>
                        <div className="input-icon" style={{ background: targetDataset ? '#2563eb' : '', color: targetDataset ? 'white' : '' }}><BoxSelect size={20} /></div>
                        <div style={{ flex: 1, padding: '0 16px', fontSize: '0.95rem', fontWeight: 700, color: targetDataset ? '#0f172a' : '#cbd5e1', textAlign: 'left' }}>
                            {targetDataset || 'Search Data Catalog...'}
                        </div>
                        <ChevronRight size={18} color="#cbd5e1" style={{ marginRight: '12px' }} />
                    </button>
                </div>

                <div className="form-group">
                    <label><GitBranch size={16} color="#3b82f6" /> Secondary Join Dataset</label>
                    <button className={`input-wrapper ${joinDataset ? 'selected' : ''}`} onClick={() => onEnterSelectionMode('join')} style={{ width: '100%', cursor: 'pointer', border: 'none', background: 'transparent' }}>
                        <div className="input-icon" style={{ background: joinDataset ? '#2563eb' : '', color: joinDataset ? 'white' : '' }}><Layers size={20} /></div>
                        <div style={{ flex: 1, padding: '0 16px', fontSize: '0.95rem', fontWeight: 700, color: joinDataset ? '#0f172a' : '#cbd5e1', textAlign: 'left' }}>
                            {joinDataset || 'Select relationship source...'}
                        </div>
                        <ChevronRight size={18} color="#cbd5e1" style={{ marginRight: '12px' }} />
                    </button>
                </div>

                <div className="advanced-section" style={{ padding: showAdvanced ? '24px' : '16px', borderRadius: '24px' }}>
                    <div className="toggle-advanced" onClick={() => setShowAdvanced(!showAdvanced)} style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Settings size={16} className={showAdvanced ? 'animate-spin-slow' : ''} />
                            {showAdvanced ? 'Engine Configuration' : 'Advanced Engine Options'}
                        </span>
                        {showAdvanced ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                    {showAdvanced && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                            <IconSelector label={<><ArrowRightLeft size={16} color="#3b82f6" /> Join Relationship</>} options={joinTypeOptions} value={joinType} onChange={setJoinType} />
                            <IconSelector label={<><Split size={16} color="#3b82f6" /> Operation Cardinality</>} options={joinOpOptions} value={joinOp} onChange={setJoinOp} />
                            <IconSelector label={<><BoxSelect size={16} color="#3b82f6" /> Spatial Matching Rule</>} options={matchOptions} value={matchOption} onChange={setMatchOption} />
                        </div>
                    )}
                </div>

                <button
                    className={`btn-run-engine ${(!queryName || !targetDataset || !joinDataset) ? '' : 'animate-pulse-subtle'}`}
                    onClick={onCreateQuery}
                    disabled={!queryName || !targetDataset || !joinDataset}
                    style={{ marginTop: '24px' }}
                >
                    <Sparkles size={20} /> Run High-Speed Processing
                </button>
            </div>

            {/* --- Query History Down Section --- */}
            {history && history.length > 0 && (
                <div className="query-history-section animate-fade-in" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <History size={16} /> Recent Query Execution
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {history.map((q, idx) => (
                            <div key={idx} className="catalog-item" style={{ borderRadius: '20px', background: '#f8fafc', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div className="tool-icon-sm" style={{ background: '#dcfce7', color: '#059669', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                                    <Check size={18} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{q.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{q.rule} • {q.target} + {q.join}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{q.time}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 800 }}>READY</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN PANEL COMPONENT ---
const MapToolsPanel = ({ activeTab, setActiveTab, onClose, onAddLayer, layers, position = 'left' }) => {
    const [queryName, setQueryName] = useState('');
    const [targetDataset, setTargetDataset] = useState(null);
    const [joinDataset, setJoinDataset] = useState(null);
    const [selectionMode, setSelectionMode] = useState(null); // 'target' | 'join' | null
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [joinType, setJoinType] = useState('INNER JOIN');
    const [joinOp, setJoinOp] = useState('JOIN_ONE_TO_ONE');
    const [matchOption, setMatchOption] = useState('Intersects');
    const [queryHistory, setQueryHistory] = useState([
        { name: 'Road_Buffer_Result_01', rule: 'Intersects', target: 'Mizoram Highway', join: 'District_Admin', time: '5m ago' }
    ]);

    const handleEnterSelectionMode = (mode) => {
        setSelectionMode(mode);
        setActiveTab('catalog');
    };

    const handleSelectItemFromCatalog = (itemName) => {
        if (selectionMode === 'target') setTargetDataset(itemName);
        else if (selectionMode === 'join') setJoinDataset(itemName);
        setSelectionMode(null);
        setActiveTab('query');
    };

    const handleCreateQuery = () => {
        const newQuery = {
            name: queryName,
            rule: matchOption,
            target: targetDataset,
            join: joinDataset,
            time: 'Just now'
        };
        setQueryHistory([newQuery, ...queryHistory]);
        setQueryName('');
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'layers': return 'Layer Manager';
            case 'catalog': return 'Data Catalog';
            case 'geoprocessing': return 'Geoprocessing Tools';
            case 'query': return 'Query Builder';
            default: return 'Tools Hub';
        }
    };

    const getContent = () => {
        switch (activeTab) {
            case 'layers': return <LayersContent onAddLayer={onAddLayer} layers={layers} onEnterCatalog={() => setActiveTab('catalog')} />;
            case 'catalog': return <CatalogContent onSelectItem={handleSelectItemFromCatalog} selectionMode={selectionMode} onBack={selectionMode ? () => setActiveTab('query') : null} />;
            case 'geoprocessing': return <GeoprocessingContent />;
            case 'query': return (
                <QueryContent
                    targetDataset={targetDataset}
                    joinDataset={joinDataset}
                    onEnterSelectionMode={handleEnterSelectionMode}
                    queryName={queryName}
                    setQueryName={setQueryName}
                    showAdvanced={showAdvanced}
                    setShowAdvanced={setShowAdvanced}
                    joinType={joinType}
                    setJoinType={setJoinType}
                    joinOp={joinOp}
                    setJoinOp={setJoinOp}
                    matchOption={matchOption}
                    setMatchOption={setMatchOption}
                    onCreateQuery={handleCreateQuery}
                    history={queryHistory}
                />
            );
            default: return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Select a tool to begin</div>;
        }
    };

    if (!activeTab) return null;

    return (
        <div className={`tools-panel ${position}`}>
            <div className="panel-header">
                <div className="panel-title">
                    {activeTab === 'layers' && <Layers size={22} color="#3b82f6" />}
                    {activeTab === 'catalog' && <Database size={22} color="#8b5cf6" />}
                    {activeTab === 'geoprocessing' && <Wrench size={22} color="#10b981" />}
                    {activeTab === 'query' && <Search size={22} color="#2563eb" />}
                    {getTitle()}
                </div>
                <button onClick={onClose} className="panel-close-btn">
                    <X size={20} />
                </button>
            </div>
            <div className="panel-content">
                {getContent()}
            </div>
        </div>
    );
};

export default MapToolsPanel;
