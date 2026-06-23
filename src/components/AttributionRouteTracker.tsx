import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { captureTrafficAttribution } from "../lib/attribution";

export default function AttributionRouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => { captureTrafficAttribution(pathname); }, [pathname]);
  return null;
}
