import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  upworkProfileUrl: string | null;
  timezone: string | null;
  defaultTone: string;
  aiModel: string;
  defaultPlatform: string;
  notifyProposalSent: boolean;
  notifyWeeklyReport: boolean;
  notifyAiScoreAlerts: boolean;
  notifyJobMatches: boolean;
  createdAt: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  upworkProfileUrl?: string;
  timezone?: string;
}

export interface UpdatePreferencesPayload {
  defaultTone?: string;
  aiModel?: string;
  defaultPlatform?: string;
  notifyProposalSent?: boolean;
  notifyWeeklyReport?: boolean;
  notifyAiScoreAlerts?: boolean;
  notifyJobMatches?: boolean;
}

export function useUserProfile() {
  return useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfilePayload, Error, UpdateProfilePayload>({
    mutationFn: async (payload) => {
      const { data } = await api.patch("/users/me/profile", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation<UpdatePreferencesPayload, Error, UpdatePreferencesPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.patch("/users/me/preferences", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}
