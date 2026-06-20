import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { loadGA4, trackGA4PageView } from "../lib/ga4";

export default function GA4RouteTracker() {
  const { pathname } = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === lastTrackedPath.current) {
      return;
    }

    loadGA4();
    lastTrackedPath.current = pathname;
    trackGA4PageView(pathname);
  }, [pathname]);

  return null;
}
