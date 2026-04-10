import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface DashboardStats {
  totalJobs: number;
  totalProposals: number;
  avgScore: number | null;
}

export interface JobListItem {
  id: string;
  userId: string;
  title: string | null;
  description: string;
  createdAt: string;
  proposalCount: number;
  latestScore: number | null;
}

interface CreateJobPayload {
  title?: string;
  description: string;
}

interface CreateJobResponse {
  id: string;
  userId: string;
  title: string | null;
  description: string;
  createdAt: string;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get("/users/me/stats");
      return data;
    },
  });
}

export function useJobs() {
  return useQuery<JobListItem[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await api.get("/jobs");
      return data;
    },
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation<CreateJobResponse, Error, CreateJobPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/jobs", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
