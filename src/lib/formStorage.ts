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

const FREE_TRIAL_KEY = "mono-hatch-free-trial-entries";
const PARTNER_KEY = "mono-hatch-partner-entries";
const WORKSHOP_KEY = "mono-hatch-workshop-entries";
const STAY_TUNED_KEY = "mono-hatch-stay-tuned-entries";

const readEntries = <T,>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
};

const writeEntries = <T,>(key: string, entries: T[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(entries));
};

export const saveFreeTrialEntry = (entry: FreeTrialEntry) => {
  const entries = readEntries<FreeTrialEntry>(FREE_TRIAL_KEY);
  writeEntries(FREE_TRIAL_KEY, [entry, ...entries]);
};

export const getFreeTrialEntries = () => readEntries<FreeTrialEntry>(FREE_TRIAL_KEY);

export const savePartnerEntry = (entry: PartnerEntry) => {
  const entries = readEntries<PartnerEntry>(PARTNER_KEY);
  writeEntries(PARTNER_KEY, [entry, ...entries]);
};

export const getPartnerEntries = () => readEntries<PartnerEntry>(PARTNER_KEY);

export const saveWorkshopEntry = (entry: WorkshopEntry) => {
  const entries = readEntries<WorkshopEntry>(WORKSHOP_KEY);
  writeEntries(WORKSHOP_KEY, [entry, ...entries]);
};

export const getWorkshopEntries = () => readEntries<WorkshopEntry>(WORKSHOP_KEY);

export const saveStayTunedEntry = (entry: StayTunedEntry) => {
  const entries = readEntries<StayTunedEntry>(STAY_TUNED_KEY);
  writeEntries(STAY_TUNED_KEY, [entry, ...entries]);
};

export const getStayTunedEntries = () => readEntries<StayTunedEntry>(STAY_TUNED_KEY);

export const clearAllDashboardData = () => {
  localStorage.removeItem(FREE_TRIAL_KEY);
  localStorage.removeItem(PARTNER_KEY);
  localStorage.removeItem(WORKSHOP_KEY);
  localStorage.removeItem(STAY_TUNED_KEY);
};
