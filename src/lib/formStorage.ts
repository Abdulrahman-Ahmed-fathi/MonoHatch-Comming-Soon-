import { ensureSupabase } from "@/lib/supabaseClient";

export interface FreeTrialEntry {
  fullName: string;
  email: string;
  phone: string;
  submittedAt: string;
}

export interface PartnerEntry {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  website: string;
  brief: string;
  collaborationTypes: string[];
  submittedAt: string;
}

export interface WorkshopEntry {
  email: string;
  submittedAt: string;
}

export interface StayTunedEntry {
  email: string;
  submittedAt: string;
}

type FormType = "free_trial" | "partner" | "workshop" | "stay_tuned";

type SubmissionRow = {
  payload: Record<string, unknown> | null;
  submitted_at: string;
};

const TABLE_NAME = "form_submissions";

const insertSubmission = async (
  formType: FormType,
  payload: Record<string, unknown>,
  submittedAt: string,
) => {
  const supabase = ensureSupabase();
  const { error } = await supabase.from(TABLE_NAME).insert({
    form_type: formType,
    payload,
    submitted_at: submittedAt,
  });

  if (error) {
    throw new Error(error.message);
  }
};

const getSubmissions = async (formType: FormType) => {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("payload, submitted_at")
    .eq("form_type", formType)
    .order("submitted_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SubmissionRow[];
};

const asString = (value: unknown) => (typeof value === "string" ? value : "");

const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

export const saveFreeTrialEntry = async (entry: FreeTrialEntry) => {
  await insertSubmission(
    "free_trial",
    {
      fullName: entry.fullName,
      email: entry.email,
      phone: entry.phone,
    },
    entry.submittedAt,
  );
};

export const getFreeTrialEntries = async (): Promise<FreeTrialEntry[]> => {
  const rows = await getSubmissions("free_trial");

  return rows.map(({ payload, submitted_at }) => ({
    fullName: asString(payload?.fullName),
    email: asString(payload?.email),
    phone: asString(payload?.phone),
    submittedAt: submitted_at,
  }));
};

export const savePartnerEntry = async (entry: PartnerEntry) => {
  await insertSubmission(
    "partner",
    {
      fullName: entry.fullName,
      organization: entry.organization,
      role: entry.role,
      email: entry.email,
      phone: entry.phone,
      specialization: entry.specialization,
      experience: entry.experience,
      website: entry.website,
      brief: entry.brief,
      collaborationTypes: entry.collaborationTypes,
    },
    entry.submittedAt,
  );
};

export const getPartnerEntries = async (): Promise<PartnerEntry[]> => {
  const rows = await getSubmissions("partner");

  return rows.map(({ payload, submitted_at }) => ({
    fullName: asString(payload?.fullName),
    organization: asString(payload?.organization),
    role: asString(payload?.role),
    email: asString(payload?.email),
    phone: asString(payload?.phone),
    specialization: asString(payload?.specialization),
    experience: asString(payload?.experience),
    website: asString(payload?.website),
    brief: asString(payload?.brief),
    collaborationTypes: asStringArray(payload?.collaborationTypes),
    submittedAt: submitted_at,
  }));
};

export const saveWorkshopEntry = async (entry: WorkshopEntry) => {
  await insertSubmission(
    "workshop",
    {
      email: entry.email,
    },
    entry.submittedAt,
  );
};

export const getWorkshopEntries = async (): Promise<WorkshopEntry[]> => {
  const rows = await getSubmissions("workshop");

  return rows.map(({ payload, submitted_at }) => ({
    email: asString(payload?.email),
    submittedAt: submitted_at,
  }));
};

export const saveStayTunedEntry = async (entry: StayTunedEntry) => {
  await insertSubmission(
    "stay_tuned",
    {
      email: entry.email,
    },
    entry.submittedAt,
  );
};

export const getStayTunedEntries = async (): Promise<StayTunedEntry[]> => {
  const rows = await getSubmissions("stay_tuned");

  return rows.map(({ payload, submitted_at }) => ({
    email: asString(payload?.email),
    submittedAt: submitted_at,
  }));
};
