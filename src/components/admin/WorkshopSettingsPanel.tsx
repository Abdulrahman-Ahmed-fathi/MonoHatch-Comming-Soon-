import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEFAULT_WORKSHOP_SETTINGS,
  getWorkshopSettings,
  saveWorkshopSettings,
  type WorkshopLocalizedContent,
  type WorkshopMode,
  type WorkshopRegistrationField,
  type WorkshopSettings,
} from "@/lib/siteSettings";

type LocaleKey = "en" | "ar";

const fieldClassName =
  "rounded-lg border-[#e8dfe4] bg-white text-ink-warm focus-visible:ring-french-rose/20";

function LocalizedFields({
  content,
  onChange,
  disabled,
}: {
  content: WorkshopLocalizedContent;
  onChange: (next: WorkshopLocalizedContent) => void;
  disabled?: boolean;
}) {
  const { t } = useTranslation();

  const update = <K extends keyof WorkshopLocalizedContent>(key: K, value: WorkshopLocalizedContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sectionTitle">{t("dashboard.settings.workshop.fields.sectionTitle")}</Label>
          <Input
            id="sectionTitle"
            value={content.sectionTitle}
            onChange={(e) => update("sectionTitle", e.target.value)}
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardTitle">{t("dashboard.settings.workshop.fields.cardTitle")}</Label>
          <Input
            id="cardTitle"
            value={content.cardTitle}
            onChange={(e) => update("cardTitle", e.target.value)}
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="badge">{t("dashboard.settings.workshop.fields.badge")}</Label>
        <Input
          id="badge"
          value={content.badge}
          onChange={(e) => update("badge", e.target.value)}
          disabled={disabled}
          className={fieldClassName}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t("dashboard.settings.workshop.fields.description")}</Label>
        <Textarea
          id="description"
          value={content.description}
          onChange={(e) => update("description", e.target.value)}
          disabled={disabled}
          rows={3}
          className={fieldClassName}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bullets">{t("dashboard.settings.workshop.fields.bullets")}</Label>
        <Textarea
          id="bullets"
          value={content.bullets.join("\n")}
          onChange={(e) =>
            update(
              "bullets",
              e.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
            )
          }
          disabled={disabled}
          rows={6}
          className={fieldClassName}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="emailPlaceholder">{t("dashboard.settings.workshop.fields.emailPlaceholder")}</Label>
          <Input
            id="emailPlaceholder"
            value={content.emailPlaceholder}
            onChange={(e) => update("emailPlaceholder", e.target.value)}
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phonePlaceholder">{t("dashboard.settings.workshop.fields.phonePlaceholder")}</Label>
          <Input
            id="phonePlaceholder"
            value={content.phonePlaceholder}
            onChange={(e) => update("phonePlaceholder", e.target.value)}
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="buttonText">{t("dashboard.settings.workshop.fields.buttonText")}</Label>
          <Input
            id="buttonText"
            value={content.buttonText}
            onChange={(e) => update("buttonText", e.target.value)}
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="externalLinkText">{t("dashboard.settings.workshop.fields.externalLinkText")}</Label>
          <Input
            id="externalLinkText"
            value={content.externalLinkText}
            onChange={(e) => update("externalLinkText", e.target.value)}
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thanksMessage">{t("dashboard.settings.workshop.fields.thanksMessage")}</Label>
        <Input
          id="thanksMessage"
          value={content.thanksMessage}
          onChange={(e) => update("thanksMessage", e.target.value)}
          disabled={disabled}
          className={fieldClassName}
        />
      </div>
    </div>
  );
}

export default function WorkshopSettingsPanel() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<WorkshopSettings>(DEFAULT_WORKSHOP_SETTINGS);
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
      const data = await getWorkshopSettings();
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

  const updateLocale = (locale: LocaleKey, content: WorkshopLocalizedContent) => {
    setSettings((current) => ({ ...current, [locale]: content }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    setSaveError("");

    if (settings.mode === "external_link" && !settings.externalUrl.trim()) {
      setSaveError(t("dashboard.settings.workshop.externalUrlRequired"));
      setIsSaving(false);
      return;
    }

    try {
      await saveWorkshopSettings(settings);
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
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink-warm">{t("dashboard.settings.workshop.title")}</h2>
        <p className="mt-1 text-sm text-ink-warm/70">{t("dashboard.settings.workshop.subtitle")}</p>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">
          {loadError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("dashboard.settings.workshop.modeLabel")}</Label>
          <Select
            value={settings.mode}
            onValueChange={(value: WorkshopMode) => setSettings((current) => ({ ...current, mode: value }))}
          >
            <SelectTrigger className={fieldClassName}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="registration">{t("dashboard.settings.workshop.modeRegistration")}</SelectItem>
              <SelectItem value="external_link">{t("dashboard.settings.workshop.modeExternal")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {settings.mode === "registration" ? (
          <div className="space-y-2">
            <Label>{t("dashboard.settings.workshop.registrationFieldsLabel")}</Label>
            <Select
              value={settings.registrationFields}
              onValueChange={(value: WorkshopRegistrationField) =>
                setSettings((current) => ({ ...current, registrationFields: value }))
              }
            >
              <SelectTrigger className={fieldClassName}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">{t("dashboard.settings.workshop.fieldEmail")}</SelectItem>
                <SelectItem value="phone">{t("dashboard.settings.workshop.fieldPhone")}</SelectItem>
                <SelectItem value="both">{t("dashboard.settings.workshop.fieldBoth")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="externalUrl">{t("dashboard.settings.workshop.externalUrlLabel")}</Label>
            <Input
              id="externalUrl"
              type="url"
              value={settings.externalUrl}
              onChange={(e) => setSettings((current) => ({ ...current, externalUrl: e.target.value }))}
              placeholder="https://forms.google.com/..."
              className={fieldClassName}
            />
          </div>
        )}
      </div>

      {settings.mode === "external_link" ? (
        <p className="rounded-lg border border-[#efe8e5] bg-[#fcf9f7] px-4 py-3 text-sm text-ink-warm/75">
          {t("dashboard.settings.workshop.externalHint")}
        </p>
      ) : null}

      <Tabs defaultValue="en" className="w-full">
        <TabsList className="mb-4 flex h-auto w-full max-w-xs flex-wrap justify-start gap-1 bg-[#f3e9ea] p-1">
          <TabsTrigger value="en" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
            {t("dashboard.settings.workshop.localeEn")}
          </TabsTrigger>
          <TabsTrigger value="ar" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
            {t("dashboard.settings.workshop.localeAr")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="en">
          <LocalizedFields
            content={settings.en}
            onChange={(content) => updateLocale("en", content)}
            disabled={isSaving}
          />
        </TabsContent>
        <TabsContent value="ar">
          <LocalizedFields
            content={settings.ar}
            onChange={(content) => updateLocale("ar", content)}
            disabled={isSaving}
          />
        </TabsContent>
      </Tabs>

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
