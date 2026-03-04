import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, BarChart3, Newspaper, MapPin, LogOut, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { label: 'News', path: '/news', icon: Newspaper },
  { label: 'Lots', path: '/lots', icon: MapPin },
  // { label: 'Districts', path: '/districts', icon: MapPin },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => toggleSidebar()}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-30 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold">Admin</h1>
            <button
              onClick={() => toggleSidebar()}
              className="md:hidden"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    toggleSidebar();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-gray-800 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export const SidebarToggle: React.FC = () => {
  const { toggleSidebar } = useUIStore();
  return (
    <button
      onClick={() => toggleSidebar()}
      className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
    >
      <Menu size={24} />
    </button>
  );
};