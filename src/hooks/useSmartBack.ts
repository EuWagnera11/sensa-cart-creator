import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Returns a "back" handler that:
 *   - Goes to the previous page if the user navigated to the current page from
 *     inside the app (i.e. there's app history).
 *   - Falls back to the provided URL if the user landed directly on this page
 *     (shared link, refresh, external referrer, etc.) — so we never push them
 *     out of the site.
 *
 * Usage:
 *   const goBack = useSmartBack("/shop");
 *   <button onClick={goBack}>Back</button>
 *
 * How it works: React Router 6 sets `location.key` to "default" for the very
 * first entry of the session. Any subsequent navigation generates a new key.
 * So `key !== "default"` reliably means there IS app history to go back to.
 */
export function useSmartBack(fallback: string = "/") {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }, [navigate, location.key, fallback]);
}
