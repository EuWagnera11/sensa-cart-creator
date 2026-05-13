import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const KEY_CURRENT = "om_current_route";
const KEY_PREVIOUS = "om_previous_route";

/**
 * Mount once at the App root (inside <BrowserRouter>) to track route history.
 * Stores the previous route in sessionStorage so any page can read it.
 *
 * Why sessionStorage and not just location state? Because location state only
 * works when the user clicked a <Link state={...}> — direct URL changes,
 * external links, etc. don't carry state. sessionStorage is more robust.
 */
export function useNavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    try {
      const current = sessionStorage.getItem(KEY_CURRENT);
      if (current && current !== location.pathname) {
        sessionStorage.setItem(KEY_PREVIOUS, current);
      }
      sessionStorage.setItem(KEY_CURRENT, location.pathname + location.search);
    } catch {
      /* sessionStorage unavailable — ignore */
    }
  }, [location.pathname, location.search]);
}

/**
 * Returns the previous route (pathname + search) the user was on before
 * the current page. Returns null on first page of the session.
 */
export function getPreviousRoute(): string | null {
  try {
    return sessionStorage.getItem(KEY_PREVIOUS);
  } catch {
    return null;
  }
}
