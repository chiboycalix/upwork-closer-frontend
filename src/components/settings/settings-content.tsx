"use client";

import { useEffect, useState } from "react";

import { ProfileSection } from "@/components/settings/profile-section";
import { PreferencesSection } from "@/components/settings/preferences-section";
import { NotificationsSection } from "@/components/settings/notifications-section";
import { DangerZone } from "@/components/settings/danger-zone";
import {
  useUserProfile,
  useUpdateProfile,
  useUpdatePreferences,
  type UpdateProfilePayload,
  type UpdatePreferencesPayload,
} from "@/hooks/use-settings";
import { notify } from "@/lib/notification-store";

export function SettingsContent() {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();
  const updatePreferences = useUpdatePreferences();

  const [profileForm, setProfileForm] = useState<UpdateProfilePayload>({
    fullName: "",
    email: "",
    upworkProfileUrl: "",
    timezone: "",
  });

  const [prefsForm, setPrefsForm] = useState<UpdatePreferencesPayload>({
    defaultTone: "Formal",
    aiModel: "GPT-4o",
    defaultPlatform: "Upwork",
    notifyProposalSent: true,
    notifyWeeklyReport: true,
    notifyAiScoreAlerts: false,
    notifyJobMatches: true,
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        fullName: profile.fullName ?? "",
        email: profile.email ?? "",
        upworkProfileUrl: profile.upworkProfileUrl ?? "",
        timezone: profile.timezone ?? "",
      });
      setPrefsForm({
        defaultTone: profile.defaultTone,
        aiModel: profile.aiModel,
        defaultPlatform: profile.defaultPlatform,
        notifyProposalSent: profile.notifyProposalSent,
        notifyWeeklyReport: profile.notifyWeeklyReport,
        notifyAiScoreAlerts: profile.notifyAiScoreAlerts,
        notifyJobMatches: profile.notifyJobMatches,
      });
    }
  }, [profile]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const isSaving = updateProfile.isPending || updatePreferences.isPending;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!profileForm.email?.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (
      profileForm.upworkProfileUrl?.trim() &&
      !/^https?:\/\/.+/.test(profileForm.upworkProfileUrl)
    ) {
      errs.upworkProfileUrl = "Please enter a valid URL (e.g. https://upwork.com/…).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      await Promise.all([
        updateProfile.mutateAsync(profileForm),
        updatePreferences.mutateAsync(prefsForm),
      ]);
      notify.success("Settings saved", "Your changes have been saved successfully.");
    } catch {
      notify.error("Save failed", "Could not save your settings. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-sm text-zinc-400">Loading your settings…</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="size-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage your account, preferences, and notification settings.
        </p>
      </div>

      <ProfileSection value={profileForm} onChange={setProfileForm} errors={errors} />
      <PreferencesSection value={prefsForm} onChange={setPrefsForm} />
      <NotificationsSection value={prefsForm} onChange={setPrefsForm} />
      <DangerZone />

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
