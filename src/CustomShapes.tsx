import { ElementShape, type ElementNodeProps } from "likec4/react"

/**
 * Renders node glyphs in the visual language of the W3C Threat Modeling Guide's
 * "Minimalist Web Threat Model" figure:
 *
 *   - containers      -> sky-blue box with a folder/package tab (FolderTabContainer)
 *   - components      -> rounded rect with a white center band (ProcessShape)
 *   - databases       -> "D" square + body, the classic data-store glyph (DataStoreShape)
 *   - `_shape: oval`  -> pink/lavender ellipse for special nodes (EllipseShape)
 *   - everything else -> the default (sharp) element shape, which for actors /
 *                        externals is the pale-yellow rectangle.
 *
 * Fill/stroke come from the LikeC4 palette CSS variables, so each glyph follows
 * the color assigned to its element in the model / theme.
 */
export function CustomShape({ nodeModel, nodeProps }: ElementNodeProps) {
  const metadata = nodeModel.element.getMetadata()
  const kind = nodeModel.element.kind
  const { shape, width, height } = nodeProps.data

  switch (true) {
    case metadata._shape === "data-object":
      return <EllipseShape width={width} height={height} />
    case metadata._shape === "data-store":
      return <DataStoreShape width={width} height={height} />
    case kind === "softwareSystem":
      return <FolderTabContainer width={width} height={height} />
    case metadata._shape === "process":
      return <ProcessShape width={width} height={height} />
    default:
      return <ElementShape {...nodeProps} />
  }
}

const FILL = "var(--likec4-palette-fill)"
const STROKE = "var(--likec4-palette-stroke)"
const STROKE_WIDTH = 2

type GlyphSize = { width: number; height: number }

/** Absolutely-positioned SVG that fills the node, 1:1 with its pixel size. */
function GlyphSvg({
  width,
  height,
  children,
}: GlyphSize & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </svg>
  )
}

/** Sky-blue box with a small folder/package tab on the top-left. */
const FolderTabContainer = ({ width, height }: GlyphSize) => {
  const tabH = Math.min(22, height * 0.16)
  const tabW = Math.min(width * 0.45, 140)
  const o = STROKE_WIDTH / 2
  const d = [
    `M${o},${o}`,
    `H${tabW}`,
    `V${tabH}`,
    `H${width - o}`,
    `V${height - o}`,
    `H${o}`,
    `Z`,
  ].join(" ")
  return (
    <GlyphSvg width={width} height={height}>
      <path
        d={d}
        fill={FILL}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="miter"
      />
    </GlyphSvg>
  )
}

/** Rounded rectangle with a white center band, the figure's "process" glyph. */
const ProcessShape = ({ width, height }: GlyphSize) => {
  const o = STROKE_WIDTH / 2
  const r = Math.min(16, height * 0.22)
  const bandH = Math.min(height * 0.42, 80)
  const bandY = (height - bandH) / 2
  // Small divider in the top band, top-left, as in image3.png.
  const tabX = Math.min(width * 0.22, 40)
  return (
    <GlyphSvg width={width} height={height}>
      <rect
        x={o}
        y={o}
        width={width - STROKE_WIDTH}
        height={height - STROKE_WIDTH}
        rx={r}
        ry={r}
        fill={FILL}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      <line
        x1={tabX}
        y1={o}
        x2={tabX}
        y2={bandY}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      <rect
        x={o}
        y={bandY}
        width={width - STROKE_WIDTH}
        height={bandH}
        fill="#ffffff"
      />
      <line
        x1={o}
        y1={bandY}
        x2={width - o}
        y2={bandY}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      <line
        x1={o}
        y1={bandY + bandH}
        x2={width - o}
        y2={bandY + bandH}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
    </GlyphSvg>
  )
}

/** Classic data-store glyph: a gray "D" square next to the body. */
const DataStoreShape = ({ width, height }: GlyphSize) => {
  const o = STROKE_WIDTH / 2
  const sq = Math.min(height - STROKE_WIDTH, Math.max(36, width * 0.18))
  return (
    <GlyphSvg width={width} height={height}>
      <rect
        x={o}
        y={o}
        width={width - STROKE_WIDTH}
        height={height - STROKE_WIDTH}
        fill={FILL}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      <rect
        x={o}
        y={o}
        width={sq}
        height={height - STROKE_WIDTH}
        fill="#c9c9c9"
      />
      <line
        x1={sq + o}
        y1={o}
        x2={sq + o}
        y2={height - o}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      <text
        x={o + sq / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize={Math.min(20, sq * 0.5)}
        fontWeight={600}
        fill={STROKE}
      >
        D
      </text>
    </GlyphSvg>
  )
}

/** Pink/lavender ellipse for special nodes (e.g. certificates). */
const EllipseShape = ({ width, height }: GlyphSize) => {
  const o = STROKE_WIDTH / 2
  return (
    <GlyphSvg width={width} height={height}>
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2 - o}
        ry={height / 2 - o}
        fill={FILL}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
    </GlyphSvg>
  )
}
