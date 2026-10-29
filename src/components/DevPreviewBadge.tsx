// Visible only in `npm run dev`; stripped from production builds.
export function DevPreviewBadge() {
  if (!import.meta.env.DEV) return null
  return (
    <p className="pointer-events-none fixed left-3 top-[5.25rem] z-50 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-white lg:top-24">
      Concept preview · dev only
    </p>
  )
}
