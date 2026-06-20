import { createContext, useContext } from "react";

import type { MetaPixelParams } from "../lib/metaPixel";

export type LeadFormModalContextValue = {
  openLeadFormModal: (params?: MetaPixelParams) => void;
};

export const LeadFormModalContext =
  createContext<LeadFormModalContextValue | null>(null);

export function useLeadFormModal() {
  const context = useContext(LeadFormModalContext);

  if (!context) {
    throw new Error(
      "useLeadFormModal must be used within LeadFormModalProvider.",
    );
  }

  return context;
}
