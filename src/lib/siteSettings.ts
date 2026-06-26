import { APK_DOWNLOAD_URL, APK_FILE_NAME } from "@/constants/appDownload";
import { getSupabaseClient } from "@/lib/supabaseClient";

export type WorkshopMode = "registration" | "external_link";
export type WorkshopRegistrationField = "email" | "phone" | "both";

export interface WorkshopLocalizedContent {
  sectionTitle: string;
  cardTitle: string;
  badge: string;
  description: string;
  bullets: string[];
  emailPlaceholder: string;
  phonePlaceholder: string;
  buttonText: string;
  thanksMessage: string;
  externalLinkText: string;
}

export interface WorkshopSettings {
  mode: WorkshopMode;
  registrationFields: WorkshopRegistrationField;
  externalUrl: string;
  en: WorkshopLocalizedContent;
  ar: WorkshopLocalizedContent;
}

export interface AppDownloadSettings {
  downloadUrl: string;
  fileName: string;
}

const SETTINGS_TABLE = "site_settings";
const WORKSHOP_KEY = "workshop";
const APP_DOWNLOAD_KEY = "app_download";

const DEFAULT_WORKSHOP_EN: WorkshopLocalizedContent = {
  sectionTitle: "Our Workshop",
  cardTitle: "Our First Workshop",
  badge: "COMING SOON",
  description:
    "The first Mono Hatch workshop for confidence building, personal growth, and better health awareness - designed for women, by women.",
  bullets: [
    "Build confidence and self-esteem",
    "Join a supportive, empowering community",
    "Learn about personal growth and independence",
    "Take steps toward self-development",
    "Understand your physical and mental health",
  ],
  emailPlaceholder: "Enter your email",
  phonePlaceholder: "+20 1xx xxx xxxx",
  buttonText: "Notify Me",
  thanksMessage: "Thanks! We will notify you soon.",
  externalLinkText: "Register Now",
};

const DEFAULT_WORKSHOP_AR: WorkshopLocalizedContent = {
  sectionTitle: "ورشتنا",
  cardTitle: "ورشتنا الأولى",
  badge: "قريباً",
  description:
    "أول ورشة Mono Hatch لبناء الثقة والنمو الشخصي والوعي الصحي — من نساء، لنساء.",
  bullets: [
    "بناء الثقة وتقدير الذات",
    "انضمي إلى مجتمع داعم ومُمكّن",
    "تعرّفي على النمو الشخصي والاستقلالية",
    "خطوات نحو تطوير الذات",
    "افهمي صحتك الجسدية والنفسية",
  ],
  emailPlaceholder: "أدخلي بريدك الإلكتروني",
  phonePlaceholder: "+20 1xx xxx xxxx",
  buttonText: "أبلغوني",
  thanksMessage: "شكراً! سنبلغك قريباً.",
  externalLinkText: "سجّلي الآن",
};

export const DEFAULT_WORKSHOP_SETTINGS: WorkshopSettings = {
  mode: "registration",
  registrationFields: "email",
  externalUrl: "",
  en: DEFAULT_WORKSHOP_EN,
  ar: DEFAULT_WORKSHOP_AR,
};

export const DEFAULT_APP_DOWNLOAD_SETTINGS: AppDownloadSettings = {
  downloadUrl: APK_DOWNLOAD_URL,
  fileName: APK_FILE_NAME,
};

type SettingRow = {
  value: Record<string, unknown> | null;
};

const asString = (value: unknown, fallback: string) =>
  typeof value === "string" ? value : fallback;

const asStringArray = (value: unknown, fallback: string[]) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : fallback;

const mergeLocalizedContent = (
  stored: Record<string, unknown> | undefined,
  defaults: WorkshopLocalizedContent,
): WorkshopLocalizedContent => ({
  sectionTitle: asString(stored?.sectionTitle, defaults.sectionTitle),
  cardTitle: asString(stored?.cardTitle, defaults.cardTitle),
  badge: asString(stored?.badge, defaults.badge),
  description: asString(stored?.description, defaults.description),
  bullets: asStringArray(stored?.bullets, defaults.bullets),
  emailPlaceholder: asString(stored?.emailPlaceholder, defaults.emailPlaceholder),
  phonePlaceholder: asString(stored?.phonePlaceholder, defaults.phonePlaceholder),
  buttonText: asString(stored?.buttonText, defaults.buttonText),
  thanksMessage: asString(stored?.thanksMessage, defaults.thanksMessage),
  externalLinkText: asString(stored?.externalLinkText, defaults.externalLinkText),
});

const mergeWorkshopSettings = (stored: Record<string, unknown> | null): WorkshopSettings => {
  const mode = stored?.mode === "external_link" ? "external_link" : "registration";
  const registrationFields =
    stored?.registrationFields === "phone" || stored?.registrationFields === "both"
      ? stored.registrationFields
      : "email";

  return {
    mode,
    registrationFields,
    externalUrl: asString(stored?.externalUrl, ""),
    en: mergeLocalizedContent(stored?.en as Record<string, unknown> | undefined, DEFAULT_WORKSHOP_EN),
    ar: mergeLocalizedContent(stored?.ar as Record<string, unknown> | undefined, DEFAULT_WORKSHOP_AR),
  };
};

const mergeAppDownloadSettings = (stored: Record<string, unknown> | null): AppDownloadSettings => ({
  downloadUrl: asString(stored?.downloadUrl, DEFAULT_APP_DOWNLOAD_SETTINGS.downloadUrl),
  fileName: asString(stored?.fileName, DEFAULT_APP_DOWNLOAD_SETTINGS.fileName),
});

const getSettingRow = async (key: string): Promise<SettingRow | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as SettingRow | null) ?? null;
};

const saveSettingRow = async (key: string, value: Record<string, unknown>) => {
  const supabase = getSupabaseClient();
  const payload = {
    key,
    value,
    updated_at: new Date().toISOString(),
  };

  const { data: existing, error: readError } = await supabase
    .from(SETTINGS_TABLE)
    .select("key")
    .eq("key", key)
    .maybeSingle();

  if (readError) {
    throw new Error(readError.message);
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from(SETTINGS_TABLE)
      .update({
        value: payload.value,
        updated_at: payload.updated_at,
      })
      .eq("key", key);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return;
  }

  const { error: insertError } = await supabase.from(SETTINGS_TABLE).insert(payload);

  if (insertError) {
    throw new Error(insertError.message);
  }
};

export const getWorkshopSettings = async (): Promise<WorkshopSettings> => {
  const row = await getSettingRow(WORKSHOP_KEY);
  return mergeWorkshopSettings(row?.value ?? null);
};

export const saveWorkshopSettings = async (settings: WorkshopSettings) => {
  await saveSettingRow(WORKSHOP_KEY, settings as unknown as Record<string, unknown>);
};

export const getAppDownloadSettings = async (): Promise<AppDownloadSettings> => {
  const row = await getSettingRow(APP_DOWNLOAD_KEY);
  return mergeAppDownloadSettings(row?.value ?? null);
};

export const saveAppDownloadSettings = async (settings: AppDownloadSettings) => {
  await saveSettingRow(APP_DOWNLOAD_KEY, settings as unknown as Record<string, unknown>);
};

export const getWorkshopContentForLanguage = (
  settings: WorkshopSettings,
  language: string,
): WorkshopLocalizedContent => (language === "ar" ? settings.ar : settings.en);
