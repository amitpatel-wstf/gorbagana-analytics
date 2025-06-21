import React from 'react';
import { 
  BarChart3, 
  Activity, 
  Users, 
  Coins, 
  Wifi, 
  Code 
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'transactions', name: 'Transactions', icon: Activity },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'tokens', name: 'Tokens', icon: Coins },
    { id: 'network', name: 'Network Health', icon: Wifi },
    { id: 'programs', name: 'Programs', icon: Code },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gorbagana Analytics
              </h1>
              <p className="text-xs text-gray-500">
                Real-time blockchain insights
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-1 pb-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header; 