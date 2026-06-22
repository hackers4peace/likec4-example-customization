import { defineConfig } from 'likec4/config'

/**
 * Theme based on the visual language of the W3C Threat Modeling Guide's
 * "Minimalist Web Threat Model" figure:
 *   - pale-yellow external entities
 *   - sky-blue containers
 *   - pink/lavender special nodes
 *   - thin near-black borders, solid black data-flow arrows
 *   - plain sans-serif type on a white "paper" canvas
 *
 * NOTE: the theme is not color-scheme aware, so these are literal light
 * values, paired with `colorScheme='light'` in src/App.tsx.
 */

// Near-black used for borders and text throughout the figure.
const ink = '#1a1a1a'

// Transparent label background — data-flow labels sit directly on the canvas.
const noFill = 'rgba(255, 255, 255, 0)'

const relationships = {
  line: ink,
  label: ink,
  labelBg: noFill,
}

export default defineConfig({
  name: 'cloud-system',
  title: 'Cloud System',
  styles: {
    theme: {
      // We reuse built-in color keys (amber/sky) so the model can reference them
      // without a custom-color declaration, and override them to the W3C palette.
      colors: {
        // External entities (actors / externals) — pale yellow.
        amber: {
          elements: { fill: '#f7e98e', stroke: ink, hiContrast: ink, loContrast: '#4a4a4a' },
          relationships,
        },
        // Containers — sky blue.
        sky: {
          elements: { fill: '#74cff0', stroke: ink, hiContrast: ink, loContrast: '#33414a' },
          relationships,
        },
        // Special nodes (e.g. certificates) — pink/lavender ellipse.
        pink: {
          elements: { fill: '#f3d9f2', stroke: '#b36bb0', hiContrast: ink, loContrast: '#555555' },
          relationships,
        },
        // Neutral fallbacks so anything unstyled still reads as "paper".
        primary: {
          elements: { fill: '#74cff0', stroke: ink, hiContrast: ink, loContrast: '#33414a' },
          relationships,
        },
        muted: {
          elements: { fill: '#f0f0f0', stroke: ink, hiContrast: ink, loContrast: '#4a4a4a' },
          relationships,
        },
        gray: {
          elements: { fill: '#f0f0f0', stroke: ink, hiContrast: ink, loContrast: '#4a4a4a' },
          relationships,
        },
      },
    },
    defaults: {
      color: 'amber',
      opacity: 100,
      border: 'solid',
      relationship: {
        color: 'gray',
        line: 'solid',
        arrow: 'normal',
      },
    },
  },
})
