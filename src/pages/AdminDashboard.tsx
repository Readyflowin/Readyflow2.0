import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  Clipboard,
  ExternalLink,
  LoaderCircle,
  LogOut,
  Mail,
  RefreshCw,
  Save,
  Search,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const STATUSES = [
  "New",
  "Contacted",
  "Interested",
  "Closed",
  "Lost",
] as const;

type LeadStatus = (typeof STATUSES)[number];

type AdminLead = {
  rowIndex: number;
  leadId: string;
  timestamp: string;
  name: string;
  instagram: string;
  productType: string;
  photosReady: string;
  shopifyCostOkay: string;
  whatsapp: string;
  email: string;
  requirement: string;
  status: LeadStatus;
  internalNote: string;
  source: string;
  utm_campaign: string;
  lastContactedAt: string;
  closedAt: string;
  lostReason: string;
};

type ApiResult = {
  ok?: boolean;
  message?: string;
  adminRoute?: boolean;
  authenticated?: boolean;
  leads?: AdminLead[];
  lead?: AdminLead;
};

type SessionState = "checking" | "not-found" | "login" | "dashboard" | "error";

const INPUT_CLASS =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#070707] outline-none transition focus:border-[#1DFF8A] focus:ring-4 focus:ring-[#1DFF8A]/10";

async function fetchSessionState(pathname: string): Promise<SessionState> {
  try {
    const response = await fetch(
      `/api/admin/session?path=${encodeURIComponent(pathname)}`,
      { credentials: "include" },
    );
    const result = (await response.json()) as ApiResult;
    if (!response.ok || !result.ok) return "error";
    if (!result.adminRoute) return "not-found";
    return result.authenticated ? "dashboard" : "login";
  } catch {
    return "error";
  }
}

function formatDate(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function whatsappUrl(lead: AdminLead): string {
  const number = lead.whatsapp.replace(/\D/g, "");
  if (number.length < 10) return "";
  const message = `Hi ${lead.name || "there"}, this is Aditya from Readyflow. I saw your Shopify Launch request for ${lead.instagram || "your brand"}. Sharing the next steps here.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function copyText(lead: AdminLead): string {
  return [
    "New Readyflow Lead",
    "",
    `Name: ${lead.name}`,
    `Brand Instagram: ${lead.instagram}`,
    `What they sell: ${lead.productType}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
    `Requirement: ${lead.requirement || "—"}`,
    `Status: ${lead.status}`,
    `Source: ${lead.source || "—"}`,
    `UTM Campaign: ${lead.utm_campaign || "—"}`,
  ].join("\n");
}

function LoginScreen({
  path,
  onSuccess,
}: {
  path: string;
  onSuccess: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, path }),
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.ok) {
        setError(
          response.status === 401
            ? "Could not sign in with those details."
            : "Unable to sign in. Please try again.",
        );
        return;
      }
      onSuccess();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 py-12 text-[#F4EFE6]">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-2xl backdrop-blur md:p-10">
        <img src="/icon.png" alt="Readyflow" className="h-12 w-12 rounded-xl" />
        <p className="mt-8 text-[9px] font-black uppercase tracking-[0.35em] text-[#1DFF8A]">
          Private workspace
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tighter">
          Readyflow Leads
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-white/45">
          Sign in to manage enquiries and follow-up status.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
            Username
            <input
              required
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={`${INPUT_CLASS} mt-2`}
            />
          </label>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${INPUT_CLASS} mt-2`}
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1DFF8A] px-5 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#070707] disabled:opacity-50"
          >
            {loading && <LoaderCircle size={16} className="animate-spin" />}
            {loading ? "Signing in" : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

function LeadEditor({
  lead,
  onSaved,
}: {
  lead: AdminLead;
  onSaved: (lead: AdminLead) => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [internalNote, setInternalNote] = useState(lead.internalNote);
  const [lostReason, setLostReason] = useState(lead.lostReason);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const waUrl = whatsappUrl(lead);

  useEffect(() => {
    setStatus(lead.status);
    setInternalNote(lead.internalNote);
    setLostReason(lead.lostReason);
  }, [lead]);

  const save = async (options?: {
    status?: LeadStatus;
    markContacted?: boolean;
  }) => {
    const nextStatus = options?.status || status;
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.leadId || undefined,
          rowIndex: lead.rowIndex,
          status: nextStatus,
          internalNote,
          lostReason,
          markContacted: options?.markContacted || undefined,
        }),
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.ok || !result.lead) {
        setMessage(
          response.status === 401
            ? "Session expired. Refresh and sign in again."
            : "Could not save changes.",
        );
        return;
      }
      onSaved(result.lead);
      setStatus(result.lead.status);
      setMessage("Saved");
    } catch {
      setMessage("Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  const markContacted = () => {
    void save({ status: "Contacted", markContacted: true });
  };

  const openWhatsApp = () => {
    if (!waUrl) return;
    window.open(waUrl, "_blank", "noreferrer");
    void save({
      status: status === "New" ? "Contacted" : status,
      markContacted: true,
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText(lead));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setMessage("Could not copy lead details.");
    }
  };

  return (
    <div className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30">
            {formatDate(lead.timestamp)}
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tighter">
            {lead.name || "Unnamed lead"}
          </h3>
          <p className="mt-1 text-sm font-bold text-[#0A8F50]">
            {lead.instagram || "No Instagram handle"}
          </p>
        </div>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus)}
          className="rounded-full border border-black/10 bg-[#F4EFE6] px-4 py-2 text-xs font-black"
          aria-label={`Status for ${lead.name}`}
        >
          {STATUSES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        {[
          ["Product", lead.productType],
          ["WhatsApp", lead.whatsapp],
          ["Email", lead.email],
          ["Source", lead.utm_campaign || lead.source],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-black/[0.025] p-3">
            <dt className="text-[9px] font-black uppercase tracking-[0.16em] text-black/30">
              {label}
            </dt>
            <dd className="mt-1 break-words font-semibold text-black/70">
              {value || "—"}
            </dd>
          </div>
        ))}
      </dl>

      {lead.requirement && (
        <div className="mt-3 rounded-xl bg-black/[0.025] p-3 text-sm">
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/30">
            Requirement
          </p>
          <p className="mt-1 font-medium leading-relaxed text-black/65">
            {lead.requirement}
          </p>
        </div>
      )}

      <label className="mt-5 block text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
        Internal note
        <textarea
          rows={3}
          value={internalNote}
          onChange={(event) => setInternalNote(event.target.value)}
          className={`${INPUT_CLASS} mt-2 resize-y`}
          placeholder="Add private context or next action."
        />
      </label>

      {status === "Lost" && (
        <label className="mt-4 block text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
          Lost reason
          <input
            value={lostReason}
            onChange={(event) => setLostReason(event.target.value)}
            className={`${INPUT_CLASS} mt-2`}
            placeholder="Budget, timing, not ready..."
          />
        </label>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#070707] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#F4EFE6] disabled:opacity-50"
        >
          {saving ? (
            <LoaderCircle size={13} className="animate-spin" />
          ) : (
            <Save size={13} />
          )}
          Save
        </button>
        <button
          type="button"
          onClick={markContacted}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-700 disabled:opacity-50"
        >
          Mark Contacted
        </button>
        {waUrl ? (
          <button
            type="button"
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-white"
          >
            WhatsApp <ExternalLink size={12} />
          </button>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center rounded-full bg-black/5 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-black/25">
            Invalid WhatsApp
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em]"
        >
          {copied ? <Check size={12} /> : <Clipboard size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em]"
          >
            Email <Mail size={12} />
          </a>
        )}
      </div>

      {message && (
        <p
          className={`mt-4 text-xs font-bold ${
            message === "Saved" ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

function DesktopLeadRow({
  lead,
  onSaved,
}: {
  lead: AdminLead;
  onSaved: (lead: AdminLead) => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [internalNote, setInternalNote] = useState(lead.internalNote);
  const [lostReason, setLostReason] = useState(lead.lostReason);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const waUrl = whatsappUrl(lead);

  useEffect(() => {
    setStatus(lead.status);
    setInternalNote(lead.internalNote);
    setLostReason(lead.lostReason);
  }, [lead]);

  const save = async (options?: {
    status?: LeadStatus;
    markContacted?: boolean;
  }) => {
    const nextStatus = options?.status || status;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.leadId || undefined,
          rowIndex: lead.rowIndex,
          status: nextStatus,
          internalNote,
          lostReason,
          markContacted: options?.markContacted || undefined,
        }),
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.ok || !result.lead) {
        setMessage("Save failed");
        return;
      }
      onSaved(result.lead);
      setStatus(result.lead.status);
      setMessage("Saved");
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const markContacted = () => {
    void save({ status: "Contacted", markContacted: true });
  };

  const openWhatsApp = () => {
    if (!waUrl) return;
    window.open(waUrl, "_blank", "noreferrer");
    void save({
      status: status === "New" ? "Contacted" : status,
      markContacted: true,
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText(lead));
      setMessage("Copied");
    } catch {
      setMessage("Copy failed");
    }
  };

  return (
    <tr className="border-t border-black/5 align-top">
      <td className="min-w-40 p-4 text-xs font-semibold text-black/50">
        {formatDate(lead.timestamp)}
      </td>
      <td className="min-w-56 p-4">
        <p className="font-black">{lead.name || "Unnamed lead"}</p>
        <p className="mt-1 text-xs font-bold text-[#0A8F50]">
          {lead.instagram || "—"}
        </p>
        <p className="mt-2 text-xs text-black/45">
          {lead.productType || "—"}
        </p>
      </td>
      <td className="min-w-56 p-4 text-xs font-semibold leading-relaxed text-black/60">
        <p>Source: {lead.utm_campaign || lead.source || "—"}</p>
        {lead.requirement && <p>Requirement: {lead.requirement}</p>}
      </td>
      <td className="min-w-52 p-4 text-xs font-semibold text-black/60">
        <p>{lead.whatsapp || "—"}</p>
        <p className="mt-1 break-all">{lead.email || "—"}</p>
      </td>
      <td className="min-w-44 p-4">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus)}
          className="w-full rounded-xl border border-black/10 bg-[#F4EFE6] px-3 py-2 text-xs font-black"
          aria-label={`Status for ${lead.name}`}
        >
          {STATUSES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {status === "Lost" && (
          <input
            value={lostReason}
            onChange={(event) => setLostReason(event.target.value)}
            className={`${INPUT_CLASS} mt-2`}
            placeholder="Lost reason"
          />
        )}
      </td>
      <td className="min-w-64 p-4">
        <textarea
          rows={3}
          value={internalNote}
          onChange={(event) => setInternalNote(event.target.value)}
          className={`${INPUT_CLASS} resize-y`}
          aria-label={`Internal note for ${lead.name}`}
        />
      </td>
      <td className="min-w-48 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="inline-flex items-center gap-1 rounded-full bg-[#070707] px-3 py-2 text-[8px] font-black uppercase tracking-wider text-white"
          >
            {saving ? (
              <LoaderCircle size={11} className="animate-spin" />
            ) : (
              <Save size={11} />
            )}
            Save
          </button>
          <button
            type="button"
            onClick={markContacted}
            disabled={saving}
            className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[8px] font-black uppercase tracking-wider text-emerald-700"
          >
            Mark Contacted
          </button>
          {waUrl && (
            <button
              type="button"
              onClick={openWhatsApp}
              className="rounded-full bg-[#25D366] px-3 py-2 text-[8px] font-black uppercase tracking-wider text-white"
            >
              WhatsApp
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            className="rounded-full border border-black/10 px-3 py-2 text-[8px] font-black uppercase tracking-wider"
          >
            Copy
          </button>
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="rounded-full border border-black/10 px-3 py-2 text-[8px] font-black uppercase tracking-wider"
            >
              Email
            </a>
          )}
        </div>
        {message && (
          <p
            className={`mt-2 text-[10px] font-bold ${
              message === "Saved" || message === "Copied"
                ? "text-emerald-700"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </td>
    </tr>
  );
}

function Dashboard({
  onLogout,
}: {
  onLogout: () => Promise<void>;
}) {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads", {
        credentials: "include",
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.ok || !result.leads) {
        setError(
          response.status === 401
            ? "Your session expired. Please log in again."
            : result.message || "Unable to load leads.",
        );
        return;
      }
      setLeads(result.leads);
    } catch {
      setError("Unable to load leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const summary = useMemo(
    () =>
      Object.fromEntries(
        ["Total", ...STATUSES].map((status) => [
          status,
          status === "Total"
            ? leads.length
            : leads.filter((lead) => lead.status === status).length,
        ]),
      ) as Record<"Total" | LeadStatus, number>,
    [leads],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;
      const matchesSearch =
        !query ||
        [lead.name, lead.email, lead.whatsapp, lead.instagram]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [leads, search, statusFilter]);

  const updateLocalLead = (updatedLead: AdminLead) => {
    setLeads((current) =>
      current.map((lead) =>
        lead.rowIndex === updatedLead.rowIndex ? updatedLead : lead,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-[#F4EFE6] px-4 py-6 text-[#070707] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col gap-5 rounded-[2rem] bg-[#070707] p-6 text-[#F4EFE6] shadow-xl sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#1DFF8A]">
              Private admin
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tighter md:text-6xl">
              Readyflow Leads
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void loadLeads()}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em]"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              type="button"
              onClick={() => void onLogout()}
              className="inline-flex items-center gap-2 rounded-full bg-[#1DFF8A] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#070707]"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </header>

        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {(["Total", ...STATUSES] as const).map((status) => (
            <div
              key={status}
              className="rounded-[1.5rem] border border-black/5 bg-white p-5"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/35">
                {status === "Total" ? "Total leads" : status}
              </p>
              <p className="mt-2 text-3xl font-black">{summary[status]}</p>
            </div>
          ))}
        </section>

        <section className="mt-5 grid gap-3 rounded-[1.75rem] border border-black/5 bg-white p-4 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, WhatsApp or Instagram"
              className={`${INPUT_CLASS} pl-11`}
            />
          </label>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "All" | LeadStatus)
            }
            className={INPUT_CLASS}
            aria-label="Filter by status"
          >
            <option>All</option>
            {STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </section>

        <p className="mt-4 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-xs font-bold text-black/45">
          Closed/Lost leads are skipped from follow-up automation.
        </p>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <LoaderCircle size={34} className="animate-spin text-[#0A8F50]" />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-[1.75rem] border border-red-100 bg-red-50 p-6 text-sm font-bold text-red-700">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-6 rounded-[1.75rem] border border-black/5 bg-white p-10 text-center">
            <p className="text-xl font-black">No leads found</p>
            <p className="mt-2 text-sm text-black/45">
              New form submissions will appear here.
            </p>
          </div>
        ) : (
          <>
            <section className="mt-6 grid gap-4 xl:hidden">
              {filtered.map((lead) => (
                <LeadEditor
                  key={lead.leadId || lead.rowIndex}
                  lead={lead}
                  onSaved={updateLocalLead}
                />
              ))}
            </section>

            <section className="mt-6 hidden overflow-x-auto rounded-[1.75rem] border border-black/5 bg-white xl:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-black/[0.025]">
                  <tr className="text-[9px] font-black uppercase tracking-[0.16em] text-black/35">
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Lead</th>
                    <th className="p-4">Qualification</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Internal note</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <DesktopLeadRow
                      key={lead.leadId || lead.rowIndex}
                      lead={lead}
                      onSaved={updateLocalLead}
                    />
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default function AdminDashboard() {
  const { pathname } = useLocation();
  const [state, setState] = useState<SessionState>("checking");

  const checkSession = useCallback(async () => {
    setState(await fetchSessionState(pathname));
  }, [pathname]);

  useEffect(() => {
    let active = true;
    void fetchSessionState(pathname).then((nextState) => {
      if (active) setState(nextState);
    });
    return () => {
      active = false;
    };
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setState("login");
  };

  if (state === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-[#1DFF8A]">
        <LoaderCircle size={36} className="animate-spin" />
      </main>
    );
  }

  if (state === "not-found") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4EFE6] px-6 text-center">
        <div>
          <p className="text-7xl font-black">404</p>
          <p className="mt-3 text-sm font-bold text-black/45">
            This page does not exist.
          </p>
        </div>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-center text-[#F4EFE6]">
        <div>
          <p className="text-2xl font-black">Dashboard unavailable</p>
          <p className="mt-3 text-sm text-white/45">
            Check the server configuration and try again.
          </p>
          <button
            type="button"
            onClick={() => {
              setState("checking");
              void checkSession();
            }}
            className="mt-6 rounded-full bg-[#1DFF8A] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#070707]"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (state === "login") {
    return (
      <LoginScreen path={pathname} onSuccess={() => setState("dashboard")} />
    );
  }

  return <Dashboard onLogout={logout} />;
}
