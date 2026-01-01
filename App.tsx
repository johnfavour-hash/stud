import React, { useState } from 'react';
import { 
  Routes, 
  Route, 
  Navigate, 
  useLocation, 
  useNavigate, 
  Outlet 
} from 'react-router-dom';
import { 
  Home, 
  Book, 
  Library, 
  Calendar, 
  Banknote, 
  Settings, 
  Search,
  Bell,
  History,
  Menu,
  X,
  User
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Registration from './pages/Registration';
import Schedule from './pages/Schedule';
import Payments from './pages/Payments';
import Login from './pages/Login';

export const UniEduLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-start ${className}`}>
    <img 
      src="/assets/043f81e40416f134c4a2b5c25b25e1ee4078dc94 (1).png" 
      alt="UniEdu Logo" 
      className="h-10 lg:h-12 w-auto object-contain max-w-full"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);

const Logo = () => <UniEduLogo />;

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <div className="px-4 py-1.5">
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-4 px-5 py-3.5 transition-all duration-200 rounded-2xl group ${
        active 
          ? 'bg-[#e8eff7] text-[#1e293b] font-bold' 
          : 'text-[#1e293b] hover:bg-gray-50'
      }`}
    >
      <Icon size={22} className={active ? 'text-[#1e293b]' : 'text-[#1e293b]'} strokeWidth={active ? 2 : 1.5} />
      <span className="text-[15px]">{label}</span>
    </button>
  </div>
);

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#fcfdfe] overflow-hidden">
      {/* Sidebar Overlay - Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col z-50 
        transition-transform duration-300 transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 lg:flex
      `}>
        <div className="p-8 lg:p-10 mb-4 flex items-center justify-between">
          <Logo />
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem 
            icon={Home} 
            label="Dashboard" 
            active={isActive('/dashboard')} 
            onClick={() => handleNavigation('/dashboard')} 
          />
          <SidebarItem 
            icon={Book} 
            label="Courses" 
            active={isActive('/courses')} 
            onClick={() => handleNavigation('/courses')} 
          />
          <SidebarItem 
            icon={Library} 
            label="Registration" 
            active={isActive('/registration')} 
            onClick={() => handleNavigation('/registration')} 
          />
          <SidebarItem 
            icon={Calendar} 
            label="Schedule" 
            active={isActive('/schedule')} 
            onClick={() => handleNavigation('/schedule')} 
          />
          <SidebarItem 
            icon={Banknote} 
            label="Payments" 
            active={isActive('/payments')} 
            onClick={() => handleNavigation('/payments')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={isActive('/settings')} 
            onClick={() => handleNavigation('/settings')} 
          />
        </nav>

        <div className="p-8 border-t border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Version 1.0.4
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 lg:h-24 bg-white border-b border-gray-50 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-slate-50 text-[#1e293b] hover:bg-slate-100 rounded-xl shrink-0 transition-colors border border-slate-100 shadow-sm"
              aria-label="Toggle Menu"
            >
              <Menu size={26} strokeWidth={2.5} />
            </button>
            <div className="relative w-full max-w-[140px] sm:max-w-xs lg:max-w-md">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-white border border-gray-200 rounded-full py-2 lg:py-2.5 pl-4 pr-10 text-xs lg:text-sm text-[#1e293b] focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder:text-gray-300"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-8 ml-4 shrink-0">
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                <Bell size={20} />
              </button>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                <History size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#00679A] flex items-center justify-center text-white shadow-sm overflow-hidden shrink-0">
                <User size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] lg:text-[13px] font-bold text-[#1e293b] leading-tight tracking-tight truncate max-w-[80px] lg:max-w-none">Grace Hopkins</p>
                <p className="hidden md:block text-[10px] text-gray-400 font-medium leading-tight">grace@uniedu.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8f9fb]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ isLoggedIn, children }: { isLoggedIn: boolean, children: React.ReactNode }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route path="/login" element={
        isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
      } />
      
      <Route path="/" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="registration" element={<Registration />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <Settings size={48} className="mb-4 animate-spin-slow" />
            <h2 className="text-xl font-semibold">Under Maintenance</h2>
            <p className="text-sm text-center">The Settings section is being updated.</p>
          </div>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
