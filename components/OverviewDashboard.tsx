'use client';

import React from 'react';
import { useOverview } from '../hooks/useAnalytics';
import MetricCard from './MetricCard';
import { 
  Activity, 
  Users, 
  Coins, 
  Database,
  TrendingUp
} from 'lucide-react';

const OverviewDashboard: React.FC = () => {
  const { data, loading, error } = useOverview();

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <MetricCard key={i} title="" value="" loading={true} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Activity className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Failed to load overview</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Database className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No data available</h3>
        <p className="text-gray-500">Please check your API connection</p>
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const formatVolume = (volume: string): string => {
    const num = parseFloat(volume);
    if (num >= 1000000000) {
      return '$' + (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(1) + 'M';
    }
    return '$' + num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date(data.metadata.lastUpdated).toLocaleTimeString()}
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Transactions"
          value={formatNumber(data.totalTransactions)}
          icon={<Activity className="w-6 h-6" />}
        />
        
        <MetricCard
          title="Total Wallets"
          value={formatNumber(data.totalWallets)}
          icon={<Users className="w-6 h-6" />}
        />
        
        <MetricCard
          title="Token Volume"
          value={formatVolume(data.totalTokenVolume)}
          icon={<Coins className="w-6 h-6" />}
        />
        
        <MetricCard
          title="Active Wallets Today"
          value={formatNumber(data.activeWalletsToday)}
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Network Health */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Network Health</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Healthy</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.networkHealth.tps.toFixed(2)}</div>
            <div className="text-sm text-gray-600">TPS</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{(data.networkHealth.successRate * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{data.networkHealth.epoch}</div>
            <div className="text-sm text-gray-600">Current Epoch</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{data.networkHealth.epochProgress.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Epoch Progress</div>
          </div>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.transactionsToday)}</div>
              <div className="text-sm text-gray-600">Transactions</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.activeWalletsToday)}</div>
              <div className="text-sm text-gray-600">Active Wallets</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Coins className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.tokenCount)}</div>
              <div className="text-sm text-gray-600">Total Tokens</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard; 