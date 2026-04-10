import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | UpworkCloser",
};

export default function Home() {
  return <DashboardContent />;
}
