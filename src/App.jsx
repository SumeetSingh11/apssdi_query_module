import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapArea from './components/MapArea';
import Dashboard from './components/Dashboard';
import ExplorerView from './components/ExplorerView';
import HistoryView from './components/HistoryView';
import TasksView from './components/TasksView';
import CityView3D from './components/CityView3D';
import DataCatalog from './components/DataCatalog';
import MyDataView from './components/MyDataView';

const ViewPlaceholder = ({ title }) => (
  <div className="p-6" style={{ padding: '2.5rem' }}>
    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Module under development.</p>
  </div>
);

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'map':
        return <MapArea />;
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'my-data':
        return <MyDataView />;
      case 'data-catalog':
        return <DataCatalog />;
      case 'history':
        return <HistoryView />;
      case '3d-city':
        return <CityView3D />;
      case 'tasks':
        return <TasksView />;
      case 'explorer':
        return <ExplorerView />;
      default:
        return <ViewPlaceholder title={activeView.charAt(0).toUpperCase() + activeView.slice(1)} />;
    }
  };

  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="main-content" style={{ marginLeft: 0 }}>
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
