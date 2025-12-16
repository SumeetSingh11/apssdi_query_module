import React, { useState } from 'react';
import './MapArea.css';
import './MapDock.css'; // Import the new Dock styles
import { Search, Plus, Minus, Locate, Layers, Printer, Ruler, Maximize, Settings, FileText, Database, GitBranch, Map as MapIcon, Wrench, X } from 'lucide-react';
import MapToolsPanel from './MapToolsPanel';
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapDock = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'layers', label: 'Layers', icon: <Layers size={22} /> },
        { id: 'catalog', label: 'Catalog', icon: <Database size={22} /> },
        { id: 'query', label: 'Query', icon: <Search size={22} /> },
        { id: 'geoprocessing', label: 'Tools', icon: <Wrench size={22} /> },
        { id: 'mymaps', label: 'My Maps', icon: <MapIcon size={22} /> },
    ];

    return (
        <div className="map-dock">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`dock-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id === activeTab ? null : tab.id)}
                    title={tab.label}
                >
                    <div className="dock-icon-container">
                        {tab.icon}
                    </div>
                    <span className="dock-label">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

const MeasureWidget = ({ onClose }) => (
    <div className="media-widget animate-fade-in" style={{
        position: 'absolute', top: '70px', right: '20px', width: '280px',
        background: 'white', padding: '16px', borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 900
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontWeight: 600 }}>Measurement</h4>
            <X size={16} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button className="tool-btn-sm active" style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#eff6ff', color: '#2563eb' }}>Distance</button>
            <button className="tool-btn-sm" style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white' }}>Area</button>
        </div>
        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Distance</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>0.00 <span style={{ fontSize: '1rem', fontWeight: 400 }}>km</span></div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Click on the map to start measuring. Double click to finish.
        </div>
    </div>
);

const MapLegend = ({ layers }) => {
    if (!layers || layers.length === 0) return null;

    return (
        <div className="animate-fade-in" style={{
            position: 'absolute', bottom: '30px', left: '20px',
            background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)',
            padding: '12px', borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 900,
            maxWidth: '200px', pointerEvents: 'auto'
        }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Legend</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {layers.filter(l => l.visible !== false).map(layer => (
                    <div key={layer.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
                        <div style={{
                            width: '16px', height: '16px', borderRadius: '4px',
                            background: layer.fillColor || layer.color,
                            border: `2px solid ${layer.color}`,
                            opacity: 0.8
                        }}></div>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{layer.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MapArea = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [activeTool, setActiveTool] = useState(null);
    // Removed district-boundary layer
    const [layers, setLayers] = useState([]);

    // Coordinates for Arunachal Pradesh, India
    const position = [28.2180, 94.7278];

    const toggleTool = (tool) => {
        if (activeTool === tool) {
            setActiveTool(null);
        } else {
            setActiveTool(tool);
        }
    };

    const handleAddLayer = (newLayer) => {
        setLayers((prev) => [...prev, { ...newLayer, id: Date.now() }]);
    };

    return (
        <div className="map-area" style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                <MapContainer
                    center={position}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <TileLayer
                        url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
                        attribution='&copy; Google Maps'
                    />

                    {layers.map(layer => (
                        layer.visible !== false && (
                            <GeoJSON
                                key={layer.id}
                                data={layer.data}
                                style={{
                                    color: layer.color || '#3b82f6',
                                    weight: 2,
                                    fillColor: layer.fillColor || null,
                                    fillOpacity: 0.2
                                }}
                            />
                        )
                    ))}
                </MapContainer>

                {/* Central Floating Dock */}
                <MapDock activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Floating Search Bar (Top Left) */}
                <div className="map-search-bar animate-fade-in" style={{
                    top: '20px',
                    left: '20px',
                    width: '320px',
                    zIndex: 800 /* Below panels */
                }}>
                    <Search color="var(--text-secondary)" size={20} style={{ marginRight: 8 }} />
                    <input type="text" placeholder="Search..." />
                </div>

                {/* Top Right Tools */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '8px', zIndex: 1000 }}>
                    <button
                        className={`control-btn ${activeTool === 'print' ? 'active' : ''}`}
                        title="Print"
                        onClick={() => toggleTool('print')}
                    >
                        <Printer size={20} />
                    </button>
                    <button
                        className={`control-btn ${activeTool === 'measure' ? 'active' : ''}`}
                        title="Measure"
                        onClick={() => toggleTool('measure')}
                    >
                        <Ruler size={20} />
                    </button>
                    <button
                        className={`control-btn ${activeTool === 'identify' ? 'active' : ''}`}
                        title="Identify"
                        onClick={() => toggleTool('identify')}
                    >
                        <Locate size={20} />
                    </button>
                    <button className="control-btn" title="Settings"><Settings size={20} /></button>
                </div>

                {/* Tool Widgets */}
                {activeTool === 'measure' && <MeasureWidget onClose={() => setActiveTool(null)} />}

                {/* Universal Map Tools Panel */}
                {activeTab && (
                    <MapToolsPanel
                        activeTab={activeTab}
                        onClose={() => setActiveTab(null)}
                        onAddLayer={handleAddLayer}
                        layers={layers}
                    />
                )}

                {/* Map Legend */}
                <MapLegend layers={layers} />

                {/* Map Controls (Bottom Right) */}
                <div className="map-controls animate-fade-in">
                    <button className="control-btn" title="Zoom In"><Plus size={22} /></button>
                    <button className="control-btn" title="Zoom Out"><Minus size={22} /></button>
                    <button className="control-btn" title="Fullscreen"><Maximize size={22} /></button>
                </div>
            </div>
        </div>
    );
};

export default MapArea;
