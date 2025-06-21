export interface NetworkHealth {
  tps: number;
  successRate: number;
  blockTime: number;
  epoch: number;
  epochProgress: number;
}

export interface Supply {
  total: number;
  circulating: number;
  nonCirculating: number;
}

export interface Metadata {
  dataSource: string;
  estimatedValues?: string[];
  lastUpdated: string;
  rpcStatus?: string;
  period?: string;
  from?: string;
  to?: string;
  totalDataPoints?: number;
  totalTokens?: number;
  limit?: number;
  note?: string;
}

export interface OverviewData {
  totalTransactions: number;
  totalWallets: number;
  totalTokenVolume: string;
  activeWalletsToday: number;
  transactionsToday: number;
  currentSlot: number;
  tokenCount: number;
  networkHealth: NetworkHealth;
  supply: Supply;
  metadata: Metadata;
}

export interface TransactionTimeseriesData {
  timestamp: string;
  total: number;
  successful: number;
  failed: number;
  successRate: number;
}

export interface TransactionTimeseries {
  data: TransactionTimeseriesData[];
  metadata: Metadata;
}

export interface UserTimeseriesData {
  timestamp: string;
  activeUsers: number;
  newUsers: number;
}

export interface UserTimeseries {
  data: UserTimeseriesData[];
  metadata: Metadata;
}

export interface TokenData {
  mint: string;
  volume: string;
  decimals: number;
  lastUpdated: string;
}

export interface TokenVolume {
  tokens: TokenData[];
  totalVolume: string;
  metadata: Metadata;
}

export interface EpochInfo {
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  progress: number;
}

export interface Performance {
  avgBlockTime: number;
  successRate: number;
  networkLoad: number;
}

export interface NetworkHealthData {
  currentSlot: number;
  tps: number;
  epochInfo: EpochInfo;
  supply: Supply;
  performance: Performance;
  metadata: Metadata;
}

export interface ProgramData {
  programId: string;
  transactionCount: number;
  successRate: string;
}

export interface TopPrograms {
  data: ProgramData[];
  metadata: Metadata;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: string;
  message?: string;
  details?: string;
}
