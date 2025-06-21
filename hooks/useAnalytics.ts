import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  OverviewData,
  TransactionTimeseries,
  UserTimeseries,
  TokenVolume,
  NetworkHealthData,
  TopPrograms,
  ApiResponse,
} from "../types/analytics";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://gor-idx.gorbaganachain.xyz/api/analytics";

// Generic hook for API calls
const useApiCall = <T>(endpoint: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `${API_BASE_URL}/${endpoint}${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
      const response = await axios.get<ApiResponse<T>>(url);

      if (
        response.data &&
        typeof response.data === "object" &&
        !("error" in response.data)
      ) {
        setData(response.data as T);
      } else if ("data" in response.data && response.data.data) {
        setData(response.data.data);
      } else {
        throw new Error(response.data.error || "Failed to fetch data");
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An unexpected error occurred";
      setError(errorMessage);
      console.error(`Error fetching ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Specific hooks for each endpoint
export const useOverview = () => {
  return useApiCall<OverviewData>("overview");
};

export const useTransactionTimeseries = (params?: {
  period?: "hour" | "day" | "week" | "month" | "year";
  from?: string;
  to?: string;
  limit?: number;
}) => {
  return useApiCall<TransactionTimeseries>("transactions/timeseries", params);
};

export const useUserTimeseries = (params?: {
  period?: "hour" | "day" | "week" | "month" | "year";
  from?: string;
  to?: string;
}) => {
  return useApiCall<UserTimeseries>("users/timeseries", params);
};

export const useTokenVolume = (params?: { limit?: number; days?: number }) => {
  return useApiCall<TokenVolume>("tokens/volume", params);
};

export const useNetworkHealth = () => {
  return useApiCall<NetworkHealthData>("network/health");
};

export const useTopPrograms = (params?: {
  limit?: number;
  period?: "day" | "week" | "month" | "all";
}) => {
  return useApiCall<TopPrograms>("programs/top", params);
};

// Auto-refresh hook for real-time data
export const useAutoRefresh = (
  callback: () => void,
  interval: number = 10000
) => {
  useEffect(() => {
    const intervalId = setInterval(callback, interval);
    return () => clearInterval(intervalId);
  }, [callback, interval]);
};
