import type { Metadata } from "next";
import { SettingsContent } from "@/components/settings/settings-content";

export const metadata: Metadata = {
  title: "Settings | UpworkCloser",
};

export default function SettingsPage() {
  return <SettingsContent />;
}
