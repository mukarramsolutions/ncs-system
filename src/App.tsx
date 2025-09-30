import React, { useState } from 'react';
import Login from './pages/auth/Login';
import TrackingPage from './pages/tracking/TrackingPage';
import Sidebar from './components/layout/Sidebar';
import TopNavbar from './components/layout/TopNavbar';
import Dashboard from './pages/Dashboard';
import ParcelList from './pages/parcels/ParcelList';
import ParcelDetail from './pages/parcels/ParcelDetail';
import CustomerList from './pages/customers/CustomerList';
import CustomerDetail from './pages/customers/CustomerDetail';
import StaffList from './pages/staff/StaffList';
import StaffDetail from './pages/staff/StaffDetail';
import BranchList from './pages/branches/BranchList';
import BranchDetail from './pages/branches/BranchDetail';
import RevenuesDashboard from './pages/revenues/RevenuesDashboard';
import UserManagement from './pages/users/UserManagement';
import Settings from './pages/settings/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);

  // Check if we're on tracking page
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = urlParams.get('track');
  
  if (trackParam && !trackingNumber) {
    setTrackingNumber(trackParam);
    return <TrackingPage trackingNumber={trackParam} />;
  }

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Handle login logic here
    console.log('Login credentials:', credentials);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'parcels':
        return selectedId ? 
          <ParcelDetail id={selectedId} onBack={() => setSelectedId(null)} /> : 
          <ParcelList onViewDetail={setSelectedId} />;
      case 'customers':
        return selectedId ? 
          <CustomerDetail id={selectedId} onBack={() => setSelectedId(null)} /> : 
          <CustomerList onViewDetail={setSelectedId} />;
      case 'staff':
        return selectedId ? 
          <StaffDetail id={selectedId} onBack={() => setSelectedId(null)} /> : 
          <StaffList onViewDetail={setSelectedId} />;
      case 'branches':
        return selectedId ? 
          <BranchDetail id={selectedId} onBack={() => setSelectedId(null)} /> : 
          <BranchList onViewDetail={setSelectedId} />;
      case 'revenues':
        return <RevenuesDashboard />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={(page) => {
          setCurrentPage(page);
          setSelectedId(null);
          setSidebarOpen(false);
        }} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="lg:ml-64">
        <TopNavbar 
          currentPage={currentPage} 
          selectedId={selectedId}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="p-4 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;