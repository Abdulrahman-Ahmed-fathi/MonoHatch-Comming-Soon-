import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Dashboard() {
  const navigate = useNavigate();
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
      setLoadError("We could not load dashboard data from Supabase.");
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

  return (
    <div className="min-h-screen bg-[#fdf7f9] p-5 md:p-10">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-[#f3e9ea] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-french-rose">Mono Hatch Admin Dashboard</h1>
            <p className="text-sm text-ink-warm/70">Review Supabase form entries for free trial, partner collaboration, workshop notifications, and subscribers.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => void loadData()}
              className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
            >
              Refresh data
            </button>
            <button
              onClick={signOut}
              className="rounded-lg bg-french-rose px-4 py-2 text-sm font-semibold text-white hover:bg-french-rose-shade1"
            >
              Sign out
            </button>
          </div>
        </div>

        {isLoading ? (
          <section className="rounded-2xl border border-[#f3e9ea] bg-white p-5 text-sm text-ink-warm/70 shadow-sm">
            Loading submissions from Supabase...
          </section>
        ) : null}

        {loadError ? (
          <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">
            {loadError}
          </section>
        ) : null}

        <section className="rounded-2xl border border-[#f3e9ea] bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-ink-warm">Start Your Free Trial</h2>
          {freeTrialEntries.length === 0 ? (
            <p className="text-sm text-ink-warm/65">No entries yet.</p>
          ) : (
            <div className="space-y-3">
              {freeTrialEntries.map((entry) => (
                <article key={entry.submittedAt} className="rounded-xl border border-[#efe8e5] p-3">
                  <p className="font-semibold text-french-rose">{entry.fullName}</p>
                  <p className="text-sm text-ink-warm/75">{entry.email} · {entry.phone}</p>
                  <p className="text-xs text-ink-warm/50">{new Date(entry.submittedAt).toLocaleString()}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[#f3e9ea] bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-ink-warm">Partner With Mono Hatch</h2>
          {partnerEntries.length === 0 ? (
            <p className="text-sm text-ink-warm/65">No entries yet.</p>
          ) : (
            <div className="space-y-3">
              {partnerEntries.map((entry) => (
                <article key={entry.submittedAt} className="rounded-xl border border-[#efe8e5] p-3">
                  <p className="font-semibold text-french-rose">{entry.fullName} • {entry.role}</p>
                  <p className="text-sm text-ink-warm/75">{entry.email} · {entry.phone}</p>
                  <p className="text-sm text-ink-warm/70">Organization: {entry.organization || "—"}</p>
                  <p className="text-sm text-ink-warm/70">Specialization: {entry.specialization || "—"}</p>
                  <p className="text-sm text-ink-warm/70">Experience: {entry.experience || "—"}</p>
                  <p className="text-xs text-ink-warm/50">{new Date(entry.submittedAt).toLocaleString()}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[#f3e9ea] bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-ink-warm">Our Workshop</h2>
          {workshopEntries.length === 0 ? (
            <p className="text-sm text-ink-warm/65">No entries yet.</p>
          ) : (
            <div className="space-y-2">
              {workshopEntries.map((entry) => (
                <div key={entry.submittedAt} className="rounded-lg border border-[#efe8e5] p-3">
                  <p className="text-sm text-ink-warm/75">{entry.email}</p>
                  <p className="text-xs text-ink-warm/50">{new Date(entry.submittedAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[#f3e9ea] bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-ink-warm">Stay Tuned and Updated</h2>
          {stayTunedEntries.length === 0 ? (
            <p className="text-sm text-ink-warm/65">No subscribers yet.</p>
          ) : (
            <div className="space-y-2">
              {stayTunedEntries.map((entry) => (
                <div key={entry.submittedAt} className="rounded-lg border border-[#efe8e5] p-3">
                  <p className="text-sm text-ink-warm/75">{entry.email}</p>
                  <p className="text-xs text-ink-warm/50">{new Date(entry.submittedAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
