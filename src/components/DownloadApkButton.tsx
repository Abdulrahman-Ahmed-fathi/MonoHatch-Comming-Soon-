import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { APK_DOWNLOAD_URL, APK_FILE_NAME } from "@/constants/appDownload";
import {
  DEFAULT_APP_DOWNLOAD_SETTINGS,
  getAppDownloadSettings,
  type AppDownloadSettings,
} from "@/lib/siteSettings";
import { cn } from "@/lib/utils";
import LandingButton from "@/components/ui/button";

type DownloadApkButtonProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "white";
  /** Called once the download has been triggered (e.g. to reveal a safety notice). */
  onDownloadStart?: () => void;
};

/**
 * The real "download the APK" button. Fetches the current download URL /
 * file name from the admin dashboard settings (AppDownloadSettingsPanel)
 * and triggers a direct file download when clicked.
 */
export default function DownloadApkButton({
  size = "lg",
  className,
  showIcon = true,
  variant = "primary",
  onDownloadStart,
}: DownloadApkButtonProps) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [downloadSettings, setDownloadSettings] = useState<AppDownloadSettings>({
    downloadUrl: APK_DOWNLOAD_URL,
    fileName: APK_FILE_NAME,
  });

  useEffect(() => {
    void getAppDownloadSettings()
      .then(setDownloadSettings)
      .catch(() => setDownloadSettings(DEFAULT_APP_DOWNLOAD_SETTINGS));
  }, []);

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = downloadSettings.downloadUrl;
    link.download = downloadSettings.fileName;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownloadStart?.();
  };

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={cn("inline-flex", className)}
    >
      <LandingButton
        type="button"
        variant={variant}
        size={size}
        onClick={triggerDownload}
        ariaLabel={t("download.button")}
        className="gap-2"
      >
        {showIcon ? <Download className="h-4 w-4 shrink-0" aria-hidden /> : null}
        {t("download.button")}
      </LandingButton>
    </motion.div>
  );
}