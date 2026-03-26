import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearAllDashboardData,
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

  const loadData = () => {
    setFreeTrialEntries(getFreeTrialEntries());
    setPartnerEntries(getPartnerEntries());
    setWorkshopEntries(getWorkshopEntries());
    setStayTunedEntries(getStayTunedEntries());
  };

  useEffect(() => {
    loadData();
  }, []);

  const signOut = () => {
    localStorage.removeItem("mono-hatch-authenticated");
    navigate("/login", { replace: true });
  };

  const clearAll = () => {
    clearAllDashboardData();
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#fdf7f9] p-5 md:p-10">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-[#f3e9ea] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-french-rose">Mono Hatch Admin Dashboard</h1>
            <p className="text-sm text-ink-warm/70">Review captured form entries for free trial, partner collaboration, and workshop notifications.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearAll}
              className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
            >
              Clear all entries
            </button>
            <button
              onClick={signOut}
              className="rounded-lg bg-french-rose px-4 py-2 text-sm font-semibold text-white hover:bg-french-rose-shade1"
            >
              Sign out
            </button>
          </div>
        </div>

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
