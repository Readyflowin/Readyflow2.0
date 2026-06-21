import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  CircleAlert,
  Clock3,
  ExternalLink,
  LoaderCircle,
  LogOut,
  Mail,
  RefreshCw,
  Save,
  Search,
  Send,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO";

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

type ActionNotice = {
  id: number;
  tone: "success" | "error" | "pending";
  title: string;
  detail?: string;
};

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

function actionLabel(type: string): string {
  return type
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function ActionToast({ notice }: { notice: ActionNotice | null }) {
  if (!notice) return null;
  const icon =
    notice.tone === "success" ? (
      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
    ) : notice.tone === "error" ? (
      <CircleAlert className="h-5 w-5 text-red-600" />
    ) : (
      <LoaderCircle className="h-5 w-5 animate-spin text-[#087746]" />
    );
  const color =
    notice.tone === "success"
      ? "border-emerald-200 bg-emerald-50"
      : notice.tone === "error"
        ? "border-red-200 bg-red-50"
        : "border-black/10 bg-white";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-5 top-5 z-[200] flex w-[min(420px,calc(100vw-40px))] items-start gap-3 rounded-2xl border p-4 shadow-xl ${color}`}
    >
      {icon}
      <div>
        <p className="text-sm font-black text-[#070707]">{notice.title}</p>
        {notice.detail && <p className="mt-1 text-xs font-semibold leading-5 text-black/60">{notice.detail}</p>}
      </div>
    </div>
  );
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
    <>
      <SEO
        title="Private workspace | Readyflow"
        description="Private Readyflow workspace."
        canonicalPath={null}
        noindex
      />
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
    </>
  );
}

function EmailSequencePanel({
  lead,
  onSaved,
  onNotice,
}: {
  lead: AdminLead;
  onSaved: (lead: AdminLead) => void;
  onNotice: (notice: Omit<ActionNotice, "id">) => void;
}) {
  const [sendingType, setSendingType] = useState("");
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState<"success" | "error" | "">("");
  const actions = EMAIL_ACTIONS.filter((action) => action.status === lead.status);
  const nextAction = actions.find(
    (action) => emailFlagForAction(lead, action.type) !== "Yes",
  );
  const emailBlocked = !lead.email || lead.emailPaused === "Yes";

  const sendEmail = async (emailType: string) => {
    setSendingType(emailType);
    onNotice({
      tone: "pending",
      title: `Sending ${actionLabel(emailType)} email`,
      detail: `Sending to ${lead.email || "this lead"} through Resend...`,
    });
    setMessage("Sending email through Resend…");
    setMessageKind("");
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
        onNotice({
          tone: "error",
          title: "Email was not sent",
          detail:
            result.message || "Try again after checking the lead and email setup.",
        });
        setMessage(result.message || "Email send failed.");
        setMessageKind("error");
        return;
      }
      onSaved(result.lead);
      onNotice({
        tone: "success",
        title: "Email sent successfully",
        detail: `${actionLabel(emailType)} was accepted by Resend and logged against ${lead.email}.`,
      });
      setMessage("Email accepted by Resend and recorded in this lead’s sequence.");
      setMessageKind("success");
    } catch {
      onNotice({
        tone: "error",
        title: "Email was not sent",
        detail: "The dashboard could not reach the email service. Please try again.",
      });
      setMessage("Email send failed.");
      setMessageKind("error");
    } finally {
      setSendingType("");
    }
  };

  return (
    <>
      <section className="rounded-2xl border border-black/8 bg-[#fbfaf7] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">Email activity</p>
            <h4 className="mt-1 text-lg font-black tracking-tight text-[#070707]">
              {lead.lastEmailSent
                ? `${actionLabel(lead.lastEmailSent)} sent`
                : "No email sent yet"}
            </h4>
            <p className="mt-1 text-xs font-semibold text-black/55">
              {lead.lastEmailSentAt
                ? `Sent ${formatDate(lead.lastEmailSentAt)} to ${lead.email}.`
                : lead.email
                  ? `Ready to email ${lead.email}.`
                  : "This lead has no email address."}
            </p>
          </div>
          <div className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-wider ${lead.emailPaused === "Yes" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
            <Clock3 size={13} />
            {lead.emailPaused === "Yes"
              ? "Emails paused"
              : lead.nextEmailDueAt
                ? `Next due ${formatDate(lead.nextEmailDueAt)}`
                : "Sequence complete"}
          </div>
        </div>
        {lead.lastEmailError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs font-bold text-red-700">
            Last delivery error: {lead.lastEmailError}
          </div>
        )}
        {nextAction && !emailBlocked ? (
          <button
            type="button"
            onClick={() => void sendEmail(nextAction.type)}
            disabled={Boolean(sendingType)}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087746] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#065f39] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {sendingType === nextAction.type ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
            {sendingType === nextAction.type
              ? "Sending email..."
              : `Send next email: ${nextAction.label}`}
          </button>
        ) : (
          <p className="mt-5 rounded-xl border border-black/8 bg-white px-4 py-3 text-xs font-bold text-black/55">
            {lead.emailPaused === "Yes"
              ? "Resume emails before sending another follow-up."
              : !lead.email
                ? "Add an email address before sending a follow-up."
                : "All emails for this lead’s current sequence are recorded as sent."}
          </p>
        )}
        <details className="group mt-5 border-t border-black/8 pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-black text-black/60">
            View full email sequence
            <ChevronDown size={16} className="transition group-open:rotate-180" />
          </summary>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {actions.map((action) => {
              const sent = emailFlagForAction(lead, action.type) === "Yes";
              return (
                <button key={action.type} type="button" disabled={Boolean(sendingType) || emailBlocked} onClick={() => void sendEmail(action.type)} className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-xs font-bold transition disabled:opacity-45 ${sent ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-black/10 bg-white text-black/70 hover:border-[#087746]"}`}>
                  <span>{action.label}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider">{sendingType === action.type ? "Sending..." : sent ? "Sent" : "Send"}</span>
                </button>
              );
            })}
          </div>
        </details>
      </section>
      <div className="hidden">
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
              {sendingType === action.type
                ? "Sending…"
                : sent
                  ? `Sent: ${action.label}`
                  : `Send ${action.label}`}
            </button>
          );
        })}
      </div>
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-xs font-bold ${
            messageKind === "success"
              ? "text-emerald-700"
              : messageKind === "error"
                ? "text-red-600"
                : "text-black/55"
          }`}
        >
          {message}
        </p>
      )}
      </div>
    </>
  );
}

function LeadCard({
  lead,
  onSaved,
  onNotice,
}: {
  lead: AdminLead;
  onSaved: (lead: AdminLead) => void;
  onNotice: (notice: Omit<ActionNotice, "id">) => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [internalNote, setInternalNote] = useState(lead.internalNote);
  const [emailPaused, setEmailPaused] = useState<YesNo>(lead.emailPaused);
  const [emailNotes, setEmailNotes] = useState(lead.emailNotes);
  const [lostReason, setLostReason] = useState(lead.lostReason);
  const [savingAction, setSavingAction] = useState("");
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState<"success" | "error" | "">("");
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
    action?: string;
    progressMessage?: string;
    successMessage?: string;
  }) => {
    const nextStatus = options?.status || status;
    const nextEmailPaused = options?.emailPaused || emailPaused;
    const action = options?.action || "save";
    setSavingAction(action);
    setMessage(options?.progressMessage || "Saving changes…");
    setMessageKind("");
    onNotice({
      tone: "pending",
      title: options?.progressMessage || "Saving lead changes",
    });

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
        onNotice({
          tone: "error",
          title: "Lead was not updated",
          detail: result.message || "Please try again.",
        });
        setMessage(result.message || "Could not save changes.");
        setMessageKind("error");
        return;
      }
      onSaved(result.lead);
      setStatus(result.lead.status);
      setEmailPaused(result.lead.emailPaused);
      setMessage(result.message || options?.successMessage || "Saved");
      setMessageKind("success");
      onNotice({
        tone: "success",
        title: result.message || options?.successMessage || "Lead updated",
        detail: `${result.lead.name || "This lead"} is now ${result.lead.status}.`,
      });
    } catch {
      onNotice({
        tone: "error",
        title: "Lead was not updated",
        detail: "The dashboard could not save this change. Please try again.",
      });
      setMessage("Could not save changes.");
      setMessageKind("error");
    } finally {
      setSavingAction("");
    }
  };

  const openWhatsApp = () => {
    if (!waUrl) return;
    window.open(waUrl, "_blank", "noreferrer");
    void save({
      markContacted: true,
      action: "whatsapp",
      progressMessage: "WhatsApp opened — recording this contact…",
      successMessage: "WhatsApp opened and contact recorded.",
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText(lead));
      setCopied(true);
      onNotice({
        tone: "success",
        title: "Lead details copied",
        detail: "You can paste them into WhatsApp, email, or your notes.",
      });
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      onNotice({ tone: "error", title: "Could not copy lead details" });
      setMessage("Could not copy lead details.");
      setMessageKind("error");
    }
  };

  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/8 pb-5">
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
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-black/40">
          Lead status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as LeadStatus)}
            className="mt-1 block rounded-lg border border-black/10 bg-[#fbfaf7] px-4 py-2.5 text-xs font-black normal-case tracking-normal text-[#070707]"
            aria-label={`Status for ${lead.name}`}
          >
            {STATUSES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
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
          ["WhatsApp", lead.whatsapp],
          ["Email", lead.email],
          ["Source", lead.utm_campaign || lead.source],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-black/5 bg-[#fbfaf7] p-3">
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

      <details className="group mt-5 rounded-2xl border border-black/8 bg-[#fbfaf7] p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-black/55">
          Notes and lead context
          <ChevronDown size={16} className="transition group-open:rotate-180" />
        </summary>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
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
      </details>

      <div className="mt-5">
        <EmailSequencePanel lead={lead} onSaved={onSaved} onNotice={onNotice} />
      </div>

      <div className="mt-5 border-t border-black/8 pt-5">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-black/40">Lead controls</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void save({ action: "save" })}
          disabled={Boolean(savingAction)}
          className="inline-flex items-center gap-2 rounded-full bg-[#070707] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#F4EFE6] disabled:opacity-50"
        >
          {savingAction === "save" ? (
            <LoaderCircle size={13} className="animate-spin" />
          ) : (
            <Save size={13} />
          )}
          {savingAction === "save" ? "Saving…" : "Save status / notes"}
        </button>
        <div className="hidden">
        {STATUSES.filter((option) => option !== status).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() =>
              void save({
                status: option,
                action: `status-${option}`,
                progressMessage: `Marking ${option}…`,
                successMessage: `Marked ${option}.`,
              })
            }
            disabled={Boolean(savingAction)}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] disabled:opacity-50"
          >
            {savingAction === `status-${option}` && (
              <LoaderCircle size={13} className="animate-spin" />
            )}
            {savingAction === `status-${option}` ? "Saving…" : `Mark ${option}`}
          </button>
        ))}
        </div>
        <button
          type="button"
          onClick={() =>
            void save({
              emailPaused: emailPaused === "Yes" ? "No" : "Yes",
              action: "email-pause",
              progressMessage:
                emailPaused === "Yes" ? "Resuming emails…" : "Pausing emails…",
              successMessage:
                emailPaused === "Yes" ? "Emails resumed." : "Emails paused.",
            })
          }
          disabled={Boolean(savingAction)}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-amber-800 disabled:opacity-50"
        >
          {savingAction === "email-pause" && (
            <LoaderCircle size={13} className="animate-spin" />
          )}
          {savingAction === "email-pause"
            ? "Saving…"
            : emailPaused === "Yes"
              ? "Resume Emails"
              : "Pause Emails"}
        </button>
        {waUrl ? (
          <button
            type="button"
            onClick={openWhatsApp}
            disabled={Boolean(savingAction)}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-white"
          >
            {savingAction === "whatsapp" ? (
              <LoaderCircle size={12} className="animate-spin" />
            ) : (
              <ExternalLink size={12} />
            )}
            {savingAction === "whatsapp" ? "Recording…" : "WhatsApp"}
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
      </div>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-xs font-bold ${
            messageKind === "success"
              ? "text-emerald-700"
              : messageKind === "error"
                ? "text-red-600"
                : "text-black/55"
          }`}
        >
          {message}
        </p>
      )}
    </article>
  );
}

function Dashboard({ onLogout }: { onLogout: () => Promise<boolean> }) {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionNotice, setActionNotice] = useState<ActionNotice | null>(null);
  const noticeTimer = useRef<number | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");

  const showNotice = useCallback((notice: Omit<ActionNotice, "id">) => {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    setActionNotice({ ...notice, id: Date.now() });
    if (notice.tone !== "pending") {
      noticeTimer.current = window.setTimeout(() => setActionNotice(null), 6000);
    }
  }, []);

  useEffect(() => () => {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
  }, []);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
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
      setRefreshing(false);
    }
  }, []);

  const logout = async () => {
    setLoggingOut(true);
    setActionMessage("Signing out…");
    const loggedOut = await onLogout();
    if (!loggedOut) {
      setLoggingOut(false);
      setActionMessage("Could not sign out. Please try again.");
    }
  };

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
    <>
      <SEO
        title="Private workspace | Readyflow"
        description="Private Readyflow workspace."
        canonicalPath={null}
        noindex
      />
      <main className="min-h-screen bg-[#F4EFE6] px-4 py-6 text-[#070707] sm:px-6 lg:px-10">
      <ActionToast notice={actionNotice} />
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
              disabled={loading || refreshing || loggingOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] disabled:opacity-50"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : undefined}
              />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-full bg-[#1DFF8A] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#070707] disabled:opacity-50"
            >
              {loggingOut ? (
                <LoaderCircle size={13} className="animate-spin" />
              ) : (
                <LogOut size={13} />
              )}
              {loggingOut ? "Signing out…" : "Logout"}
            </button>
          </div>
        </header>

        {actionMessage && (
          <p
            role="status"
            aria-live="polite"
            className="mt-3 text-xs font-bold text-black/55"
          >
            {actionMessage}
          </p>
        )}

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

        {loading && leads.length === 0 ? (
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
                onNotice={showNotice}
              />
            ))}
          </section>
        )}
      </div>
      </main>
    </>
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

  const logout = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) return false;
      setState("login");
      return true;
    } catch {
      return false;
    }
  };

  if (state === "checking") {
    return (
      <>
        <SEO title="Private workspace | Readyflow" description="Private Readyflow workspace." canonicalPath={null} noindex />
        <main className="flex min-h-screen items-center justify-center bg-[#070707] text-[#1DFF8A]">
          <LoaderCircle size={36} className="animate-spin" />
        </main>
      </>
    );
  }

  if (state === "not-found") {
    return (
      <>
        <SEO title="Page not found | Readyflow" description="This page does not exist." canonicalPath={null} noindex />
        <main className="flex min-h-screen items-center justify-center bg-[#F4EFE6] px-6 text-center">
          <div>
            <p className="text-7xl font-black">404</p>
            <p className="mt-3 text-sm font-bold text-black/45">
              This page does not exist.
            </p>
          </div>
        </main>
      </>
    );
  }

  if (state === "error") {
    return (
      <>
        <SEO title="Private workspace | Readyflow" description="Private Readyflow workspace." canonicalPath={null} noindex />
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
      </>
    );
  }

  if (state === "login") {
    return (
      <LoginScreen path={pathname} onSuccess={() => setState("dashboard")} />
    );
  }

  return <Dashboard onLogout={logout} />;
}
