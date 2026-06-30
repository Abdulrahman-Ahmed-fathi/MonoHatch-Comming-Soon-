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

const REGISTER_URL = "http://localhost:8080/register";

type DownloadAppButtonProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "white";
  hideInlineNotice?: boolean;
};

export function ApkSafetyNotice({
  onDismiss,
  className,
}: {
  onDismiss?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "rounded-shell border border-french-rose/25 bg-gradient-to-br from-french-rose/10 via-pastel-rose/30 to-white p-5 text-start shadow-card",
        className
      )}
      role="status"
    >
      <p className="text-base font-semibold text-french-rose">{t("download.thanksTitle")}</p>
      <p className="p2-r mt-2 text-ink-warm/80">{t("download.thanksBody")}</p>
      <p className="p2-r mt-3 text-ink-warm/70">{t("download.safetyNote")}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="mt-4 text-sm font-semibold text-french-rose hover:underline focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 rounded-sm"
        >
          {t("download.dismiss")}
        </button>
      ) : null}
    </motion.div>
  );
}

export default function DownloadAppButton({
  size = "md",
  className,
  showIcon = true,
  variant = "primary",
  hideInlineNotice = false,
}: DownloadAppButtonProps) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [showNotice, setShowNotice] = useState(false);
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
    // Redirect to registration page instead of downloading directly.
    // The actual APK download (downloadSettings.downloadUrl /
    // downloadSettings.fileName) should be triggered from the
    // /register flow once the user has submitted their info.
    window.location.href = REGISTER_URL;
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        className="inline-flex"
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
      {showNotice ? <ApkSafetyNotice onDismiss={() => setShowNotice(false)} /> : null}
    </div>
  );
}