import React from 'react';
import { LayoutDashboard, Folder, Map as MapIcon, Globe, Database, History, ListTodo, HardDrive } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'my-data', icon: <Folder size={20} />, label: 'My Data' },
    { id: 'map', icon: <MapIcon size={20} />, label: 'Map' },
    { id: '3d-city', icon: <Globe size={20} />, label: '3D City View' },
    { id: 'data-catalog', icon: <Database size={20} />, label: 'Data Catalog' },
    { id: 'history', icon: <History size={20} />, label: 'History' },
    { id: 'tasks', icon: <ListTodo size={20} />, label: 'Tasks' },
    { id: 'explorer', icon: <HardDrive size={20} />, label: 'Explorer' },
  ];

  return (
    <div className="sidebar">
      <div className="nav-group">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange && onViewChange(item.id)}
            title={item.label}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
