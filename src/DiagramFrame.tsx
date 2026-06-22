import { useCurrentView } from 'likec4/react'

/**
 * Decorative canvas chrome in the style of the W3C "Minimalist Web Threat Model"
 * figure: a thin black frame around the diagram with a folded-corner title tab
 * in the top-left. Purely cosmetic — it does not capture pointer events.
 */
export function DiagramFrame() {
  const view = useCurrentView()
  const title = view?.title ?? 'Cloud System'

  return (
    <div className="diagram-frame" aria-hidden>
      <div className="diagram-title-tab">{title}</div>
    </div>
  )
}
