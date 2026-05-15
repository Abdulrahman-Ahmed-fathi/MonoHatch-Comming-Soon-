import { useTranslation } from "react-i18next";
import type { AppLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = i18n.language === "ar" ? "ar" : "en";

  const setLanguage = (lang: AppLanguage) => {
    if (lang !== current) void i18n.changeLanguage(lang);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-[#efe8e5] bg-white/80 p-0.5 text-xs font-semibold shadow-sm",
        className
      )}
      role="group"
      aria-label={t("language.switchLabel")}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "rounded-full px-3 py-1.5 transition-all",
          current === "en"
            ? "bg-french-rose text-white shadow-pink"
            : "text-ink-warm/70 hover:text-french-rose"
        )}
      >
        {t("language.en")}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ar")}
        className={cn(
          "rounded-full px-3 py-1.5 transition-all",
          current === "ar"
            ? "bg-french-rose text-white shadow-pink"
            : "text-ink-warm/70 hover:text-french-rose"
        )}
      >
        {t("language.ar")}
      </button>
    </div>
  );
}
