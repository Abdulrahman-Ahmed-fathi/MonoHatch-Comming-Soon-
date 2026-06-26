import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEFAULT_APP_DOWNLOAD_SETTINGS,
  getAppDownloadSettings,
  saveAppDownloadSettings,
  type AppDownloadSettings,
} from "@/lib/siteSettings";

const fieldClassName =
  "rounded-lg border-[#e8dfe4] bg-white text-ink-warm focus-visible:ring-french-rose/20";

export default function AppDownloadSettingsPanel() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AppDownloadSettings>(DEFAULT_APP_DOWNLOAD_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const loadSettings = async () => {
    setIsLoading(true);
    setLoadError("");
    setSaveMessage("");
    setSaveError("");

    try {
      const data = await getAppDownloadSettings();
      setSettings(data);
    } catch {
      setLoadError(t("dashboard.settings.loadError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    setSaveError("");

    if (!settings.downloadUrl.trim()) {
      setSaveError(t("dashboard.settings.appDownload.urlRequired"));
      setIsSaving(false);
      return;
    }

    try {
      await saveAppDownloadSettings({
        downloadUrl: settings.downloadUrl.trim(),
        fileName: settings.fileName.trim() || DEFAULT_APP_DOWNLOAD_SETTINGS.fileName,
      });
      setSaveMessage(t("dashboard.settings.saved"));
    } catch (error) {
      const detail = error instanceof Error ? error.message : "";
      setSaveError(
        detail ? `${t("dashboard.settings.saveError")} (${detail})` : t("dashboard.settings.saveError"),
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink-warm">{t("dashboard.settings.appDownload.title")}</h2>
        <p className="mt-1 text-sm text-ink-warm/70">{t("dashboard.settings.appDownload.subtitle")}</p>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">
          {loadError}
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="downloadUrl">{t("dashboard.settings.appDownload.urlLabel")}</Label>
          <Input
            id="downloadUrl"
            type="url"
            value={settings.downloadUrl}
            onChange={(e) => setSettings((current) => ({ ...current, downloadUrl: e.target.value }))}
            placeholder="https://example.com/app.apk"
            disabled={isSaving}
            className={fieldClassName}
          />
          <p className="text-xs text-ink-warm/60">{t("dashboard.settings.appDownload.urlHint")}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fileName">{t("dashboard.settings.appDownload.fileNameLabel")}</Label>
          <Input
            id="fileName"
            value={settings.fileName}
            onChange={(e) => setSettings((current) => ({ ...current, fileName: e.target.value }))}
            placeholder={DEFAULT_APP_DOWNLOAD_SETTINGS.fileName}
            disabled={isSaving}
            className={fieldClassName}
          />
          <p className="text-xs text-ink-warm/60">{t("dashboard.settings.appDownload.fileNameHint")}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-[#efe8e5] pt-5">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="rounded-lg bg-french-rose px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-french-rose-shade1 disabled:opacity-60"
        >
          {isSaving ? t("dashboard.settings.saving") : t("dashboard.settings.save")}
        </button>
        <button
          type="button"
          onClick={() => void loadSettings()}
          disabled={isSaving || isLoading}
          className="rounded-lg border border-french-rose/40 bg-white px-5 py-2.5 text-sm font-medium text-french-rose transition hover:bg-french-rose/5 disabled:opacity-60"
        >
          {t("dashboard.settings.resetLoad")}
        </button>
        {saveMessage ? <p className="text-sm font-medium text-emerald-700">{saveMessage}</p> : null}
        {saveError ? <p className="text-sm font-medium text-rose-700">{saveError}</p> : null}
      </div>
    </div>
  );
}
