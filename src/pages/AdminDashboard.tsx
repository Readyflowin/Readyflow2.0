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

const STATUSES = ["Open", "Interested", "Closed Won", "Closed Lost"] as const;

type LeadStatus = (typeof STATUSES)[number];
type YesNo = "Yes" | "No";

type EmailAction = {
  type: string;
  label: string;
  status: LeadStatus;
};

const EMAIL_ACTIONS: EmailAction[] = [
  { type: "open_instant", label: "Open Instant", status: "Open" },
  { type: "open_8h", label: "Open 8h", status: "Open" },
  { type: "open_24h", label: "Open 24h", status: "Open" },
  {
    type: "open_bonus_final_reminder",
    label: "Bonus Final",
    status: "Open",
  },
  { type: "open_7d", label: "Open 7d", status: "Open" },
  {
    type: "interested_immediate",
    label: "Interested Now",
    status: "Interested",
  },
  { type: "interested_8h", label: "Interested 8h", status: "Interested" },
  { type: "interested_24h", label: "Interested 24h", status: "Interested" },
  {
    type: "interested_bonus_final_reminder",
    label: "Bonus Final",
    status: "Interested",
  },
  { type: "interested_72h", label: "Interested 72h", status: "Interested" },
  { type: "interested_7d", label: "Interested 7d", status: "Interested" },
  {
    type: "closed_won_project_confirmed",
    label: "Project Confirmed",
    status: "Closed Won",
  },
  {
    type: "closed_won_content_checklist",
    label: "Content Checklist",
    status: "Closed Won",
  },
  {
    type: "closed_won_build_started",
    label: "Build Started",
    status: "Closed Won",
  },
  { type: "closed_won_handoff", label: "Handoff", status: "Closed Won" },
  {
    type: "closed_won_support_reminder",
    label: "Support Reminder",
    status: "Closed Won",
  },
  {
    type: "closed_won_review_request",
    label: "Review Request",
    status: "Closed Won",
  },
  {
    type: "closed_lost_closing",
    label: "Closing Email",
    status: "Closed Lost",
  },
  {
    type: "closed_lost_reactivation",
    label: "30-Day Reactivation",
    status: "Closed Lost",
  },
];

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
  statusChangedAt: string;
  emailSequence: string;
  emailPaused: YesNo;
  lastEmailSent: string;
  lastEmailSentAt: string;
  nextEmailDueAt: string;
  lastEmailError: string;
  emailNotes: string;
  internalNote: string;
  source: string;
  utm_campaign: string;
  lastContactedAt: string;
  closedAt: string;
  lostReason: string;
  openInstantSent: YesNo;
  open8hSent: YesNo;
  open24hSent: YesNo;
  open72hSent: YesNo;
  openBonusFinalReminderSent: YesNo;
  open7dSent: YesNo;
  interestedImmediateSent: YesNo;
  interested8hSent: YesNo;
  interested24hSent: YesNo;
  interestedBonusFinalReminderSent: YesNo;
  interested72hSent: YesNo;
  interested7dSent: YesNo;
  closedWonProjectConfirmedSent: YesNo;
  closedWonContentChecklistSent: YesNo;
  closedWonBuildStartedSent: YesNo;
  closedWonReviewHandoffSent: YesNo;
  closedWonSupportReminderSent: YesNo;
  closedWonReviewRequestSent: YesNo;
  closedLostClosingEmailSent: YesNo;
  closedLostReactivationEmailSent: YesNo;
  bonusStartedAt: string;
  bonusExpiresAt: string;
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
  if (!value) return "-";
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
    "Readyflow Lead",
    "",
    `Name: ${lead.name}`,
    `Brand Instagram: ${lead.instagram}`,
    `Product: ${lead.productType}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
    `Requirement: ${lead.requirement || "-"}`,
    `Status: ${lead.status}`,
    `Email Sequence: ${lead.emailSequence || "-"}`,
    `Email Paused: ${lead.emailPaused}`,
    `Last Email: ${lead.lastEmailSent || "-"}`,
    `Next Email Due: ${lead.nextEmailDueAt || "-"}`,
    `Source: ${lead.source || "-"}`,
    `UTM Campaign: ${lead.utm_campaign || "-"}`,
  ].join("\n");
}

function emailFlagForAction(lead: AdminLead, type: string): YesNo {
  const flags: Record<string, YesNo> = {
    open_instant: lead.openInstantSent,
    open_8h: lead.open8hSent,
    open_24h: lead.open24hSent,
    open_72h: lead.open72hSent,
    open_bonus_final_reminder: lead.openBonusFinalReminderSent,
    open_7d: lead.open7dSent,
    interested_immediate: lead.interestedImmediateSent,
    interested_8h: lead.interested8hSent,
    interested_24h: lead.interested24hSent,
    interested_bonus_final_reminder: lead.interestedBonusFinalReminderSent,
    interested_72h: lead.interested72hSent,
    interested_7d: lead.interested7dSent,
    closed_won_project_confirmed: lead.closedWonProjectConfirmedSent,
    closed_won_content_checklist: lead.closedWonContentChecklistSent,
    closed_won_build_started: lead.closedWonBuildStartedSent,
    closed_won_handoff: lead.closedWonReviewHandoffSent,
    closed_won_support_reminder: lead.closedWonSupportReminderSent,
    closed_won_review_request: lead.closedWonReviewRequestSent,
    closed_lost_closing: lead.closedLostClosingEmailSent,
    closed_lost_reactivation: lead.closedLostReactivationEmailSent,
  };
  return flags[type] || "No";
}

function bonusStatus(lead: AdminLead): {
  label: string;
  detail: string;
  className: string;
} {
  if (lead.status !== "Open" && lead.status !== "Interested") {
    return {
      label: "Not active",
      detail: "Bonus applies to Open and Interested leads only.",
      className: "border-black/10 bg-white text-black/45",
    };
  }

  const startAt =
    lead.status === "Interested"
      ? Date.parse(lead.bonusStartedAt || lead.statusChangedAt)
      : Date.parse(lead.timestamp);
  const expiryAt =
    lead.status === "Interested" && lead.bonusExpiresAt
      ? Date.parse(lead.bonusExpiresAt)
      : startAt + 48 * 60 * 60 * 1000;

  if (!Number.isFinite(startAt) || !Number.isFinite(expiryAt)) {
    return {
      label: "Unknown",
      detail: "Missing bonus timing.",
      className: "border-black/10 bg-white text-black/45",
    };
  }

  const expiryText = formatDate(new Date(expiryAt).toISOString());
  const startText = formatDate(new Date(startAt).toISOString());
  const remainingMs = expiryAt - Date.now();

  if (remainingMs <= 0) {
    return {
      label: "Expired",
      detail: `Started ${startText} · expired ${expiryText}`,
      className: "border-black/10 bg-white text-black/45",
    };
  }

  const endingSoonWindow = lead.status === "Interested" ? 6 : 8;
  if (remainingMs <= endingSoonWindow * 60 * 60 * 1000) {
    return {
      label: "Ending Soon",
      detail: `Started ${startText} · expires ${expiryText}`,
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  return {
    label: lead.status === "Interested" ? "Active" : "Reserved",
    detail: `Started ${startText} · expires ${expiryText}`,
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };
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
          Sign in to manage enquiries and status-based email follow-ups.
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

function EmailSequencePanel({
  lead,
  onSaved,
}: {
  lead: AdminLead;
  onSaved: (lead: AdminLead) => void;
}) {
  const [sendingType, setSendingType] = useState("");
  const [message, setMessage] = useState("");
  const actions = EMAIL_ACTIONS.filter((action) => action.status === lead.status);

  const sendEmail = async (emailType: string) => {
    setSendingType(emailType);
    setMessage("");
    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.leadId || undefined,
          rowIndex: lead.rowIndex,
          emailType,
        }),
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.ok || !result.lead) {
        setMessage(result.message || "Email send failed.");
        return;
      }
      onSaved(result.lead);
      setMessage("Email sent");
    } catch {
      setMessage("Email send failed.");
    } finally {
      setSendingType("");
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-black/5 bg-black/[0.025] p-4">
      <div className="grid gap-2 text-xs font-semibold text-black/60 sm:grid-cols-2 xl:grid-cols-3">
        <p>Sequence: {lead.emailSequence || "-"}</p>
        <p>Paused: {lead.emailPaused}</p>
        <p>Last email: {lead.lastEmailSent || "-"}</p>
        <p>Last sent: {formatDate(lead.lastEmailSentAt)}</p>
        <p>Next due: {formatDate(lead.nextEmailDueAt)}</p>
        <p>Status changed: {formatDate(lead.statusChangedAt)}</p>
      </div>
      {lead.lastEmailError && (
        <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
          {lead.lastEmailError}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((action) => {
          const sent = emailFlagForAction(lead, action.type) === "Yes";
          return (
            <button
              key={action.type}
              type="button"
              disabled={Boolean(sendingType) || !lead.email}
              onClick={() => void sendEmail(action.type)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-[8px] font-black uppercase tracking-wider disabled:opacity-45 ${
                sent
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-black/10 bg-white text-black/70"
              }`}
            >
              {sendingType === action.type && (
                <LoaderCircle size={11} className="animate-spin" />
              )}
              {sent ? "Sent: " : "Send "}
              {action.label}
            </button>
          );
        })}
      </div>
      {message && (
        <p
          className={`mt-3 text-xs font-bold ${
            message === "Email sent" ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

function LeadCard({
  lead,
  onSaved,
}: {
  lead: AdminLead;
  onSaved: (lead: AdminLead) => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [internalNote, setInternalNote] = useState(lead.internalNote);
  const [emailPaused, setEmailPaused] = useState<YesNo>(lead.emailPaused);
  const [emailNotes, setEmailNotes] = useState(lead.emailNotes);
  const [lostReason, setLostReason] = useState(lead.lostReason);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const waUrl = whatsappUrl(lead);
  const launchBonus = bonusStatus(lead);

  useEffect(() => {
    setStatus(lead.status);
    setInternalNote(lead.internalNote);
    setEmailPaused(lead.emailPaused);
    setEmailNotes(lead.emailNotes);
    setLostReason(lead.lostReason);
  }, [lead]);

  const save = async (options?: {
    status?: LeadStatus;
    emailPaused?: YesNo;
    markContacted?: boolean;
  }) => {
    const nextStatus = options?.status || status;
    const nextEmailPaused = options?.emailPaused || emailPaused;
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
          emailPaused: nextEmailPaused,
          emailNotes,
          markContacted: options?.markContacted || undefined,
        }),
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.ok || !result.lead) {
        setMessage(result.message || "Could not save changes.");
        return;
      }
      onSaved(result.lead);
      setStatus(result.lead.status);
      setEmailPaused(result.lead.emailPaused);
      setMessage(result.message || "Saved");
    } catch {
      setMessage("Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  const openWhatsApp = () => {
    if (!waUrl) return;
    window.open(waUrl, "_blank", "noreferrer");
    void save({ markContacted: true });
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
    <article className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-sm">
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

      {(lead.status === "Open" || lead.status === "Interested") && (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 ${launchBonus.className}`}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.18em]">
            Bonus status: {launchBonus.label}
          </p>
          <p className="mt-1 text-xs font-bold">{launchBonus.detail}</p>
        </div>
      )}

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Product", lead.productType],
          ["Photos", lead.photosReady],
          ["Shopify costs", lead.shopifyCostOkay],
          ["Source", lead.utm_campaign || lead.source],
          ["WhatsApp", lead.whatsapp],
          ["Email", lead.email],
          ["Last contacted", formatDate(lead.lastContactedAt)],
          ["Closed at", formatDate(lead.closedAt)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-black/[0.025] p-3">
            <dt className="text-[9px] font-black uppercase tracking-[0.16em] text-black/30">
              {label}
            </dt>
            <dd className="mt-1 break-words font-semibold text-black/70">
              {value || "-"}
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

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
          Internal note
          <textarea
            rows={3}
            value={internalNote}
            onChange={(event) => setInternalNote(event.target.value)}
            className={`${INPUT_CLASS} mt-2 resize-y`}
            placeholder="Add private context or next action."
          />
        </label>

        <label className="block text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
          Email notes
          <textarea
            rows={3}
            value={emailNotes}
            onChange={(event) => setEmailNotes(event.target.value)}
            className={`${INPUT_CLASS} mt-2 resize-y`}
            placeholder="Reason for pause, next email context, manual notes."
          />
        </label>
      </div>

      {status === "Closed Lost" && (
        <label className="mt-4 block text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
          Lost reason
          <input
            value={lostReason}
            onChange={(event) => setLostReason(event.target.value)}
            className={`${INPUT_CLASS} mt-2`}
            placeholder="Budget, timing, not ready, not interested..."
          />
        </label>
      )}

      <EmailSequencePanel lead={lead} onSaved={onSaved} />

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
          Save status / notes
        </button>
        {STATUSES.filter((option) => option !== status).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => void save({ status: option })}
            disabled={saving}
            className="rounded-full border border-black/10 bg-white px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] disabled:opacity-50"
          >
            Mark {option}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            void save({ emailPaused: emailPaused === "Yes" ? "No" : "Yes" })
          }
          disabled={saving}
          className="rounded-full border border-amber-200 bg-amber-50 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-amber-800 disabled:opacity-50"
        >
          {emailPaused === "Yes" ? "Resume Emails" : "Pause Emails"}
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
            message === "Saved" || message.includes("saved")
              ? "text-emerald-700"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </article>
  );
}

function Dashboard({ onLogout }: { onLogout: () => Promise<void> }) {
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
        [
          lead.name,
          lead.email,
          lead.whatsapp,
          lead.instagram,
          lead.productType,
        ]
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

        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
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
              placeholder="Search name, email, WhatsApp, product or Instagram"
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
          Closed Won and Closed Lost stop sales follow-ups. Paused emails are
          skipped by cron until resumed.
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
          <section className="mt-6 grid gap-4">
            {filtered.map((lead) => (
              <LeadCard
                key={lead.leadId || lead.rowIndex}
                lead={lead}
                onSaved={updateLocalLead}
              />
            ))}
          </section>
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
