

## Update Announcement Banner Text

Replace the current marquee banner items with the six new phrases provided by the user.

### Changes

**File: `src/components/AnnounceBanner.tsx`**

Update the `items` array to:
```
"Not for everyone."
"OoohMy is not a mistake."
"Your Mum Would Be Proud. Well… maybe not."
"Just browsing? Sure you are."
"You weren't supposed to find this."
"What happens here, stays here."
```

Each item will keep the existing `★` separator rendered via the JSX template — no need to include it in the strings. Remove the emoji from the strings (the old items had 🚚 and 🍑).

