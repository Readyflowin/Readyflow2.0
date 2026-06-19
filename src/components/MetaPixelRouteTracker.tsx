import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/metaPixel";

export default function MetaPixelRouteTracker() {
  const { pathname } = useLocation();
  const lastTrackedPath = useRef(pathname);

  useEffect(() => {
    if (pathname === lastTrackedPath.current) {
      return;
    }

    lastTrackedPath.current = pathname;
    trackPageView({ path: pathname });
  }, [pathname]);

  return null;
}
