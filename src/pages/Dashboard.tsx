import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileDown } from "lucide-react";
import {
  getFreeTrialEntries,
  getPartnerEntries,
  getWorkshopEntries,
  getStayTunedEntries,
  FreeTrialEntry,
  PartnerEntry,
  WorkshopEntry,
  StayTunedEntry,
} from "@/lib/formStorage";
import { exportToExcel } from "@/lib/exportExcel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import logoUrl from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import WorkshopSettingsPanel from "@/components/admin/WorkshopSettingsPanel";
import AppDownloadSettingsPanel from "@/components/admin/AppDownloadSettingsPanel";

function formatDate(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleString(locale === "ar" ? "ar-EG" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

type TableProps = {
  headers: string[];
  rows: (string | number)[][];
  emptyMessage: string;
};

function DataTable({ headers, rows, emptyMessage }: TableProps) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-[#efe8e5] bg-[#fcf9f7] px-4 py-10 text-center text-sm text-ink-warm/65">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#efe8e5]">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-[#efe8e5] bg-french-rose/5 text-start">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-ink-warm">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row[0]}-${i}`}
              className={cn(
                "border-b border-[#efe8e5]/80 transition-colors hover:bg-french-rose/5",
                i % 2 === 1 && "bg-[#fcf9f7]/80"
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-warm/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-[#efe8e5] p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const locale = i18n.language === "ar" ? "ar" : "en";

  const [freeTrialEntries, setFreeTrialEntries] = useState<FreeTrialEntry[]>([]);
  const [partnerEntries, setPartnerEntries] = useState<PartnerEntry[]>([]);
  const [workshopEntries, setWorkshopEntries] = useState<WorkshopEntry[]>([]);
  const [stayTunedEntries, setStayTunedEntries] = useState<StayTunedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const [freeTrials, partners, workshops, stayTuned] = await Promise.all([
        getFreeTrialEntries(),
        getPartnerEntries(),
        getWorkshopEntries(),
        getStayTunedEntries(),
      ]);

      setFreeTrialEntries(freeTrials);
      setPartnerEntries(partners);
      setWorkshopEntries(workshops);
      setStayTunedEntries(stayTuned);
    } catch {
      setLoadError(t("dashboard.loadError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const signOut = () => {
    localStorage.removeItem("mono-hatch-authenticated");
    navigate("/login", { replace: true });
  };

  const col = {
    index: t("dashboard.columns.index"),
    name: t("dashboard.columns.name"),
    email: t("dashboard.columns.email"),
    phone: t("dashboard.columns.phone"),
    organization: t("dashboard.columns.organization"),
    role: t("dashboard.columns.role"),
    submittedAt: t("dashboard.columns.submittedAt"),
  };

  const translateCollab = (key: string) => {
    const known = ["doctors", "brands", "investment", "clinical"];
    if (known.includes(key)) {
      return t(`partner.collaborationOptions.${key as "doctors"}`);
    }
    return key;
  };

  const freeTrialRows = freeTrialEntries.map((entry, i) => [
    i + 1,
    entry.fullName,
    entry.email,
    entry.phone,
    formatDate(entry.submittedAt, locale),
  ]);

  const partnerRows = partnerEntries.map((entry, i) => [
    i + 1,
    entry.fullName,
    entry.email,
    entry.phone,
    entry.organization || "—",
    entry.role || "—",
    formatDate(entry.submittedAt, locale),
  ]);

  const workshopRows = workshopEntries.map((entry, i) => [
    i + 1,
    "—",
    entry.email || "—",
    entry.phone || "—",
    formatDate(entry.submittedAt, locale),
  ]);

  const stayTunedRows = stayTunedEntries.map((entry, i) => [
    i + 1,
    "—",
    entry.email,
    "—",
    formatDate(entry.submittedAt, locale),
  ]);

  const exportFreeTrialToExcel = () => {
    const rows = freeTrialEntries.map((entry, i) => ({
      [col.index]: i + 1,
      [col.name]: entry.fullName,
      [col.email]: entry.email,
      [col.phone]: entry.phone,
      [col.submittedAt]: formatDate(entry.submittedAt, locale),
    }));

    exportToExcel(
      rows,
      `free-trial-entries-${new Date().toISOString().slice(0, 10)}.xlsx`,
      "Free Trial"
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf7f9]">
      <header className="border-b border-[#efe8e5] bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Mono Hatch" className="h-10 w-auto" />
            <div>
              <h1 className="text-lg font-bold text-french-rose md:text-xl">{t("dashboard.title")}</h1>
              <p className="text-xs text-ink-warm/60 md:text-sm">{t("brand.name")}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void loadData()}
              disabled={isLoading}
              className="rounded-lg border border-french-rose/40 bg-white px-4 py-2 text-sm font-medium text-french-rose transition hover:bg-french-rose/5 disabled:opacity-60"
            >
              {t("dashboard.refresh")}
            </button>
            <button
              type="button"
              onClick={signOut}
              className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              {t("dashboard.logout")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-5 py-8 md:px-10">
        <p className="text-sm text-ink-warm/70">{t("dashboard.subtitle")}</p>

        {loadError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">
            {loadError}
          </div>
        ) : null}

        <Tabs defaultValue="free_trial" className="w-full">
          <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-1 bg-[#f3e9ea] p-1">
            <TabsTrigger value="free_trial" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
              {t("dashboard.tabs.freeTrial")} ({freeTrialEntries.length})
            </TabsTrigger>
            <TabsTrigger value="partner" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
              {t("dashboard.tabs.partner")} ({partnerEntries.length})
            </TabsTrigger>
            <TabsTrigger value="workshop" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
              {t("dashboard.tabs.workshop")} ({workshopEntries.length})
            </TabsTrigger>
            <TabsTrigger value="stay_tuned" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
              {t("dashboard.tabs.stayTuned")} ({stayTunedEntries.length})
            </TabsTrigger>
            <TabsTrigger value="workshop_settings" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
              {t("dashboard.tabs.workshopSettings")}
            </TabsTrigger>
            <TabsTrigger value="app_download" className="data-[state=active]:bg-white data-[state=active]:text-french-rose">
              {t("dashboard.tabs.appDownload")}
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <>
              <TabsContent value="free_trial">
                <TableSkeleton />
              </TabsContent>
              <TabsContent value="partner">
                <TableSkeleton />
              </TabsContent>
              <TabsContent value="workshop">
                <TableSkeleton />
              </TabsContent>
              <TabsContent value="stay_tuned">
                <TableSkeleton />
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="free_trial" className="rounded-2xl border border-[#efe8e5] bg-white p-5 shadow-sm">
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={exportFreeTrialToExcel}
                    disabled={freeTrialEntries.length === 0}
                    className="inline-flex items-center gap-2 rounded-lg border border-french-rose/40 bg-white px-4 py-2 text-sm font-medium text-french-rose transition hover:bg-french-rose/5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FileDown className="h-4 w-4" aria-hidden />
                    {t("dashboard.exportExcel")}
                  </button>
                </div>
                <DataTable
                  headers={[col.index, col.name, col.email, col.phone, col.submittedAt]}
                  rows={freeTrialRows}
                  emptyMessage={t("dashboard.empty")}
                />
              </TabsContent>
              <TabsContent value="partner" className="rounded-2xl border border-[#efe8e5] bg-white p-5 shadow-sm">
                <DataTable
                  headers={[col.index, col.name, col.email, col.phone, col.organization, col.role, col.submittedAt]}
                  rows={partnerRows}
                  emptyMessage={t("dashboard.empty")}
                />
                {partnerEntries.length > 0 ? (
                  <div className="mt-6 space-y-3">
                    {partnerEntries.map((entry) => (
                      <details
                        key={entry.submittedAt}
                        className="rounded-lg border border-[#efe8e5] bg-[#fcf9f7] p-3 text-sm"
                      >
                        <summary className="cursor-pointer font-medium text-french-rose">
                          {entry.fullName} — {entry.collaborationTypes.map(translateCollab).join(", ") || "—"}
                        </summary>
                        <p className="mt-2 text-ink-warm/75">
                          {entry.brief || "—"}
                        </p>
                      </details>
                    ))}
                  </div>
                ) : null}
              </TabsContent>
              <TabsContent value="workshop" className="rounded-2xl border border-[#efe8e5] bg-white p-5 shadow-sm">
                <DataTable
                  headers={[col.index, col.name, col.email, col.phone, col.submittedAt]}
                  rows={workshopRows}
                  emptyMessage={t("dashboard.empty")}
                />
              </TabsContent>
              <TabsContent value="stay_tuned" className="rounded-2xl border border-[#efe8e5] bg-white p-5 shadow-sm">
                <DataTable
                  headers={[col.index, col.name, col.email, col.phone, col.submittedAt]}
                  rows={stayTunedRows}
                  emptyMessage={t("dashboard.empty")}
                />
              </TabsContent>
            </>
          )}

          <TabsContent value="workshop_settings" className="rounded-2xl border border-[#efe8e5] bg-white p-5 shadow-sm">
            <WorkshopSettingsPanel />
          </TabsContent>
          <TabsContent value="app_download" className="rounded-2xl border border-[#efe8e5] bg-white p-5 shadow-sm">
            <AppDownloadSettingsPanel />
          </TabsContent>
        </Tabs>

        {isLoading ? (
          <p className="text-center text-sm text-ink-warm/60">{t("dashboard.loading")}</p>
        ) : null}
      </main>
    </div>
  );
}