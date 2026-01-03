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
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Registration from './pages/Registration';
import Schedule from './pages/Schedule';
import Payments from './pages/Payments';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

export const UniEduLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center w-full ${className}`}>
    <img 
      src="/assets/logos.png" 
      alt="UniEdu Logo" 
      className="h-20 w-auto object-contain max-w-[90%]"
      style={{ maxHeight: '80px' }}
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

const Layout = ({ onLogout }: { onLogout: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
  };

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
      {/* Sidebar - Static */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r border-gray-100 shrink-0">
        <div className="flex items-center justify-center p-3 lg:p-4 border-b border-gray-100 shrink-0">
          <img 
            src="/assets/logos.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 lg:px-4 py-2 lg:py-3 space-y-1">
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

        <div className="border-t border-gray-100 p-3 lg:p-4 space-y-2 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={18} strokeWidth={2} />
            <span>Logout</span>
          </button>
          <div className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest py-1">
            V 1.0.4
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white border-b border-gray-50 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
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
              <button 
                onClick={() => navigate('/notifications')}
                className="text-gray-400 hover:text-blue-600 transition-colors p-1 relative group"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full group-hover:scale-110 transition-transform"></span>
              </button>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                <History size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-3">
              <button 
                onClick={() => navigate('/profile')}
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#00679A] flex items-center justify-center text-white shadow-sm overflow-hidden shrink-0 hover:bg-[#004d7a] transition-colors"
              >
                <User size={20} />
              </button>
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

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/login" element={
        isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
      } />
      
      <Route path="/" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Layout onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="registration" element={<Registration />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="payments" element={<Payments />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
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
