import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

// ── Job ─────────────────────────────────────────────────────────────
export interface Job {
  id: string;
  userId: string;
  title: string | null;
  description: string;
  createdAt: string;
}

export function useJob(jobId: string) {
  return useQuery<Job>({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const { data } = await api.get(`/jobs/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
}

// ── Analysis ────────────────────────────────────────────────────────
export interface Analysis {
  id: string;
  jobId: string;
  clientIntent: string;
  keyRequirements: string[];
  urgencyLevel: string;
  budgetSignal: string;
  clientType: string;
  hiddenExpectations: string[];
  winStrategy: string;
  createdAt: string;
}

export function useAnalysis(jobId: string) {
  return useQuery<Analysis | null>({
    queryKey: ["analysis", jobId],
    queryFn: async () => {
      const { data } = await api.get(`/analysis/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
}

export function useCreateAnalysis() {
  const qc = useQueryClient();
  return useMutation<Analysis, Error, { jobId: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/analysis", payload);
      return data;
    },
    onSuccess: (data) => {
      qc.setQueryData(["analysis", data.jobId], data);
    },
  });
}

// ── Proposal ────────────────────────────────────────────────────────
export interface Proposal {
  id: string;
  jobId: string;
  userId: string;
  content: string;
  tone: string;
  score: number | null;
  createdAt: string;
}

export function useProposals(jobId: string) {
  return useQuery<Proposal[]>({
    queryKey: ["proposals", jobId],
    queryFn: async () => {
      const { data } = await api.get(`/proposals/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
}

export function useGenerateProposal() {
  const qc = useQueryClient();
  return useMutation<Proposal, Error, { jobId: string; tone: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/proposals/generate", payload);
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["proposals", data.jobId] });
    },
  });
}

// ── Proof ───────────────────────────────────────────────────────────
export interface ProofIdea {
  id: string;
  jobId: string;
  title: string;
  description: string;
  whyItHelps: string;
  demoSuggestion: string;
}

export function useProofIdeas(jobId: string) {
  return useQuery<ProofIdea[]>({
    queryKey: ["proof", jobId],
    queryFn: async () => {
      const { data } = await api.get(`/proof/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
}

export function useGenerateProof() {
  const qc = useQueryClient();
  return useMutation<ProofIdea[], Error, { jobId: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/proof/generate", payload);
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["proof", vars.jobId] });
    },
  });
}

// ── Scoring ─────────────────────────────────────────────────────────
export interface ScoreResult {
  id: string;
  proposalId: string;
  score: number;
  feedback: string[];
  weaknesses: string[];
  improvements: string[];
}

export function useScoreProposal() {
  const qc = useQueryClient();
  return useMutation<ScoreResult, Error, { proposalId: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/scoring", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}

// ── Strategy ────────────────────────────────────────────────────────
export interface Strategy {
  id: string;
  jobId: string;
  howToWin: string;
  whatToEmphasize: string[];
  whatToAvoid: string[];
  positioningAngle: string;
}

export function useStrategy(jobId: string) {
  return useQuery<Strategy | null>({
    queryKey: ["strategy", jobId],
    queryFn: async () => {
      const { data } = await api.get(`/strategy/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
}

export function useCreateStrategy() {
  const qc = useQueryClient();
  return useMutation<Strategy, Error, { jobId: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/strategy", payload);
      return data;
    },
    onSuccess: (data) => {
      qc.setQueryData(["strategy", data.jobId], data);
    },
  });
}
