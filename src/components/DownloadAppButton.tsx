import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LandingButton from "@/components/ui/button";

const REGISTER_URL = "/register";

type DownloadAppButtonProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "white";
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

/**
 * Homepage "Download" buttons. These do NOT download the app directly —
 * they send the user to /register first. The actual APK download happens
 * via <DownloadApkButton /> on the Register success screen, after the
 * user submits their info.
 */
export default function DownloadAppButton({
  size = "md",
  className,
  showIcon = true,
  variant = "primary",
}: DownloadAppButtonProps) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const goToRegister = () => {
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
          onClick={goToRegister}
          ariaLabel={t("download.button")}
          className="gap-2"
        >
          {showIcon ? <Download className="h-4 w-4 shrink-0" aria-hidden /> : null}
          {t("download.button")}
        </LandingButton>
      </motion.div>
    </div>
  );
}