import { useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent, trackLead, trackWhatsAppClick } from "../lib/metaPixel";
import WhatsAppIcon from "./WhatsAppIcon";

type LeadFormValues = {
  name: string;
  instagram: string;
  productType: string;
  whatsapp: string;
  email: string;
};

type Attribution = {
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
};

type LeadApiResponse = {
  ok?: boolean;
  message?: string;
  whatsappUrl?: string;
};

const INITIAL_VALUES: LeadFormValues = {
  name: "",
  instagram: "",
  productType: "",
  whatsapp: "",
  email: "",
};

const INPUT_CLASS =
  "mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm font-medium text-[#070707] outline-none transition placeholder:text-black/25 focus:border-[#1DFF8A] focus:ring-4 focus:ring-[#1DFF8A]/10";

const LABEL_CLASS =
  "block text-[10px] font-black uppercase tracking-[0.2em] text-black/45";

function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {
      source: "website",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      fbclid: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    source: "instagram_shopify_launch_form",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fbclid: params.get("fbclid") || "",
  };
}

export default function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [attribution] = useState<Attribution>(getAttribution);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const formStarted = useRef(false);
  const formStartedAt = useRef(Date.now());

  const markFormStarted = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("FormStart", {
      form: "instagram_shopify_launch",
      source: attribution.utm_source || attribution.source,
    });
  };

  const updateValue = (field: keyof LeadFormValues, value: string) => {
    markFormStarted();
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...attribution,
          companyWebsite,
          formStartedAt: formStartedAt.current,
          pageUrl: window.location.href,
        }),
      });
      const contentType = response.headers.get("content-type") || "";

      if (!contentType.toLowerCase().includes("application/json")) {
        throw new Error(
          "The lead API is not available in this dev server. Please run the project with `vercel dev` to test form submissions.",
        );
      }

      const result = (await response.json()) as LeadApiResponse;

      if (!response.ok || !result.ok || !result.whatsappUrl) {
        throw new Error(result.message || "Lead submission failed.");
      }

      setWhatsappUrl(result.whatsappUrl);
      setSuccessNotice(result.message || "");
      trackLead({
        form: "instagram_shopify_launch",
        value: 11999,
        currency: "INR",
        source: attribution.utm_source || attribution.source,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again or message us on WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (whatsappUrl) {
    return (
      <div className="rounded-[2rem] border border-emerald-100 bg-white p-7 text-left shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:p-12">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={30} strokeWidth={2.5} />
        </span>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
          Submission received
        </p>
        <h3 className="mt-3 text-3xl font-black tracking-tighter text-[#070707] md:text-5xl">
          Your store request is ready
        </h3>
        <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-black/55 md:text-base">
          We’ve sent the package details to your email. Tap below to send your
          filled details on WhatsApp so we can review your brand faster and
          share the next step.
        </p>
        {successNotice && (
          <p className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold leading-relaxed text-amber-800">
            {successNotice}
          </p>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "lead_form_success",
              offer: "Instagram Brand Shopify Launch",
            })
          }
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg transition hover:scale-[1.01] sm:w-auto"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          Send My Details on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markFormStarted}
      className="rounded-[2rem] border border-black/5 bg-white p-6 text-left shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:p-10"
    >
      <label className="sr-only" aria-hidden="true">
        Company website
        <input
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className={LABEL_CLASS}>
          Brand Name <span className="text-red-500">*</span>
          <input
            required
            value={values.instagram}
            onChange={(event) => updateValue("instagram", event.target.value)}
            placeholder="yourbrand"
            className={INPUT_CLASS}
          />
        </label>

        <label className={LABEL_CLASS}>
          What do you sell? <span className="text-red-500">*</span>
          <input
            required
            value={values.productType}
            onChange={(event) => updateValue("productType", event.target.value)}
            placeholder="Clothing, jewellery, perfume..."
            className={INPUT_CLASS}
          />
        </label>

        <label className={LABEL_CLASS}>
          Name <span className="text-red-500">*</span>
          <input
            required
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            placeholder="Your name"
            className={INPUT_CLASS}
          />
        </label>

        <label className={LABEL_CLASS}>
          WhatsApp number <span className="text-red-500">*</span>
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.whatsapp}
            onChange={(event) => updateValue("whatsapp", event.target.value)}
            placeholder="+91 98765 43210"
            className={INPUT_CLASS}
          />
        </label>

        <label className={`${LABEL_CLASS} md:col-span-2`}>
          Email {" "}
          <span className="text-red-500">*</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
        </label>

      </div>

      <p className="mt-6 text-[11px] font-medium leading-relaxed text-black/45">
        By submitting, you agree that Readyflow may contact you via
        WhatsApp/email about your store request. Your details may also be used
        for lead tracking, follow-up and ad measurement. Read our{" "}
        <Link
          to="/privacy-policy"
          className="font-bold text-[#0A8F50] underline-offset-4 hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          to="/delivery-scope-policy"
          className="font-bold text-[#0A8F50] underline-offset-4 hover:underline"
        >
          Delivery & Scope Policy
        </Link>
        .
      </p>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#070707] px-7 py-5 text-[11px] font-black uppercase tracking-[0.22em] text-[#F4EFE6] transition hover:bg-[#1DFF8A] hover:text-[#070707] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
      >
        {submitting ? (
          <>
            <LoaderCircle size={17} className="animate-spin" />
            Preparing Your Plan
          </>
        ) : (
          <>
            <Send size={16} />
            Prepare My Store Plan
          </>
        )}
      </button>
    </form>
  );
}
