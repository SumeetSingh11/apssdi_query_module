import React, { useState } from 'react';
import { Layers, Database, Search as QueryIcon, X, Eye, EyeOff } from 'lucide-react';
import './LayerPanel.css';

const LayerPanel = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('layers');
    const [layers, setLayers] = useState([
        { id: 1, name: 'Administrative Boundaries', active: true },
        { id: 2, name: 'Road Network', active: true },
        { id: 3, name: 'River Systems', active: false },
        { id: 4, name: 'Land Use / Land Cover', active: false },
        { id: 5, name: 'Satellite Imagery (2025)', active: true },
        { id: 6, name: 'Population Density', active: false },
    ]);

    const toggleLayer = (id) => {
        setLayers(layers.map(l => l.id === id ? { ...l, active: !l.active } : l));
    };

    return (
        <div className="layer-panel">
            <div className="panel-header">
                <div className="panel-tabs">
                    <button
                        className={`panel-tab ${activeTab === 'layers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('layers')}
                        title="Layers"
                    >
                        <Layers size={20} />
                    </button>
                    <button
                        className={`panel-tab ${activeTab === 'catalog' ? 'active' : ''}`}
                        onClick={() => setActiveTab('catalog')}
                        title="Data Catalog"
                    >
                        <Database size={20} />
                    </button>
                    <button
                        className={`panel-tab ${activeTab === 'query' ? 'active' : ''}`}
                        onClick={() => setActiveTab('query')}
                        title="Query"
                    >
                        <QueryIcon size={20} />
                    </button>
                </div>
                <button className="close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="panel-content">
                <h3 className="panel-title">{activeTab === 'layers' ? 'Active Layers' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>

                {activeTab === 'layers' && (
                    <div className="layer-list">
                        {layers.map(layer => (
                            <div key={layer.id} className="layer-item" onClick={() => toggleLayer(layer.id)}>
                                <span className="layer-name" style={{ opacity: layer.active ? 1 : 0.6 }}>{layer.name}</span>
                                <button className={`toggle-btn`}>
                                    {layer.active ? <Eye size={18} color="var(--accent-primary)" /> : <EyeOff size={18} color="var(--text-secondary)" />}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'catalog' && (
                    <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>
                        Catalog browsing coming soon...
                    </div>
                )}
                {activeTab === 'query' && (
                    <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>
                        Spatial query tools coming soon...
                    </div>
                )}
            </div>
        </div>
    );
};

export default LayerPanel;
