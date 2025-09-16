import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import Breadcrumb from '../ui/Breadcrumb';

interface TopNavbarProps {
  currentPage: string;
  selectedId?: string | null;
  onToggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ currentPage, selectedId, onToggleSidebar }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New parcel #PKG001 has been delivered', time: '5 mins ago', unread: true },
    { id: 2, message: 'Customer John Doe updated their profile', time: '1 hour ago', unread: true },
    { id: 3, message: 'Branch revenue target achieved', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Breadcrumb currentPage={currentPage} selectedId={selectedId} />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium">John Admin</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Profile dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg">
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;