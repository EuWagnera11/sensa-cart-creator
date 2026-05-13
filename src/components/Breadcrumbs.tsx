import { Link } from "react-router-dom";
import type { Crumb } from "@/hooks/useProductBreadcrumbs";

interface Props {
  items: Crumb[];
}

/**
 * Renders breadcrumb trail. Last item is always non-link (current page).
 * Truncates the product title with line-clamp.
 */
const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs font-serif italic text-muted-foreground flex-wrap">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2 min-w-0">
              {crumb.href && !isLast ? (
                <Link
                  to={crumb.href}
                  className="hover:text-primary transition-colors no-underline text-muted-foreground shrink-0"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "text-foreground font-semibold truncate max-w-[300px] sm:max-w-[480px]"
                      : "text-muted-foreground shrink-0"
                  }
                  aria-current={isLast ? "page" : undefined}
                  title={isLast ? crumb.label : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && <span className="text-muted-foreground/60 shrink-0">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
