

## Footer Redesign — Estilo KaBuM compacto

Comparing the current footer (image 53) with the KaBuM reference (images 54-56), the main issues are:
- Each section takes too much vertical space with excessive padding and centering
- On desktop, the newsletter should be a **single horizontal bar** (label + input + button in one row)
- Support info (hours + contact button) should be more compact, possibly inline
- Links grid spacing is too generous
- Overall too much vertical breathing room between sections

### Changes to `src/components/Footer.tsx`

**1. Newsletter bar — horizontal on desktop**
- Desktop: single row with "OoohMy News" label on left, subtitle, then input + button on right (like KaBuM's top bar)
- Mobile: stacked but tighter (reduce py from 5 to 3)

**2. Support section — compact**
- Combine hours + button into a single tight row on desktop
- Reduce padding (py-4 → py-2)

**3. Info blocks — reduce padding**
- py-3 → py-2, smaller emoji, tighter text

**4. Links grid — tighter**
- Reduce py-4 → py-3, gap-3 → gap-2
- Slightly larger font for readability but less spacing between items

**5. Social — inline with text on desktop**
- Like KaBuM: "Social:" label + icons in a row on desktop
- Reduce py-3 → py-2

**6. Logo + Legal + Payment + Copyright — merge into fewer sections**
- Combine logo, legal text, privacy links, payment badges, and copyright into one or two compact sections to reduce total section count
- Remove redundant borders

**7. Overall**
- Reduce all vertical padding by ~40%
- On desktop (sm+), use flex-row layouts for newsletter and support
- Keep mobile centered but much tighter

### File edited
- `src/components/Footer.tsx` — rewrite for compactness

