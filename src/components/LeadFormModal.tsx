import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  trackFormModalClose,
  trackFormModalOpen,
  type MetaPixelParams,
} from "../lib/metaPixel";
import LeadForm from "./LeadForm";
import { LeadFormModalContext } from "./LeadFormModalContext";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function LeadFormModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [modalParams, setModalParams] = useState<MetaPixelParams>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const openLeadFormModal = useCallback((params?: MetaPixelParams) => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setLeadSubmitted(false);
    setModalParams(params || {});
    setOpen(true);
    trackFormModalOpen(params);
  }, []);

  const closeModal = useCallback(() => {
    if (!leadSubmitted) {
      trackFormModalClose({
        status: "abandoned",
      });
    }

    setOpen(false);
  }, [leadSubmitted]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [closeModal, open]);

  return (
    <LeadFormModalContext.Provider value={{ openLeadFormModal }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="lead-form-modal-backdrop"
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <motion.div
              ref={dialogRef}
              data-testid="lead-form-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              tabIndex={-1}
              initial={{ opacity: 0, y: 48, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 48, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-[#F4EFE6] shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:max-w-[720px] sm:rounded-[2rem]"
            >
              <div className="flex shrink-0 items-start justify-between gap-6 border-b border-black/5 px-6 py-5 sm:px-8 sm:py-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.32em] text-[#0A8F50]">
                    Instagram Brand Shopify Launch
                  </p>
                  <h2
                    id={titleId}
                    className="mt-2 text-2xl font-black tracking-tighter text-[#070707] sm:text-4xl"
                  >
                    Get Your ₹14,999 Shopify Launch Plan
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-3 max-w-xl text-xs font-medium leading-relaxed text-black/50 sm:text-sm"
                  >
                    Share your brand details. We’ll review your product count,
                    content readiness and setup needs before sending the right
                    launch breakdown.
                  </p>
                  <p className="mt-3 text-[9px] font-black uppercase tracking-[0.22em] text-black/35">
                    Takes less than 60 seconds
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close form"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#070707] transition hover:border-black/25 hover:rotate-90"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
                <LeadForm
                  onLeadSuccess={() => setLeadSubmitted(true)}
                  leadSource={
                    typeof modalParams.cta_source === "string"
                      ? modalParams.cta_source
                      : undefined
                  }
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadFormModalContext.Provider>
  );
}
