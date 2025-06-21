'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import OverviewDashboard from '../components/OverviewDashboard';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-opacity duration-500">
          {activeTab === 'overview' && <OverviewDashboard />}
          {activeTab !== 'overview' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
              </h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                © 2024 Gorbagana Analytics
              </div>
              <div className="text-sm text-gray-500">
                Real-time blockchain analytics dashboard
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-xs text-gray-500">
                API Status: <span className="text-green-600 font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
