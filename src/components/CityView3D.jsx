import React from 'react';

const CityView3D = () => (
    <div className="p-6 fade-in" style={{ padding: '0', height: '100%', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        {/* Mock 3D Viewport */}
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Grid Lines Mock */}
            <div style={{
                position: 'absolute', width: '200%', height: '200%', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
            }}></div>

            {/* 3D Object Mock */}
            <div className="animate-float" style={{
                width: '300px', height: '150px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6',
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)', transform: 'rotateY(-30deg) rotateX(20deg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontWeight: 600, letterSpacing: '2px', backdropFilter: 'blur(4px)'
            }}>
                ITANAGAR CITY MODEL
            </div>

            {/* Floating Controls */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid #334155', backdropFilter: 'blur(8px)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '1rem' }}>Scene Selection</h3>
                <select style={{ width: '100%', padding: '8px', background: '#1e293b', color: 'white', border: '1px solid #475569', borderRadius: '6px', marginBottom: '8px' }}>
                    <option>Itanagar - Capital Complex</option>
                    <option>New Delhi Structure</option>
                    <option>Urban Terrain Mesh</option>
                </select>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button style={{ flex: 1, padding: '6px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Load</button>
                    <button style={{ flex: 1, padding: '6px', background: '#334155', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset</button>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '30px', right: '30px', display: 'flex', gap: '10px' }}>
                {['Rotate', 'Pan', 'Zoom', 'Measure'].map(tool => (
                    <button key={tool} style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', backdropFilter: 'blur(4px)', cursor: 'pointer' }}>
                        {tool}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default CityView3D;
