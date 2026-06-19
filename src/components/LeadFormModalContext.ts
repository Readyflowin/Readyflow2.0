import { createContext, useContext } from "react";

export type LeadFormModalContextValue = {
  openLeadFormModal: () => void;
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
