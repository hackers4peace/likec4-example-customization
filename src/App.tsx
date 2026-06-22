
import type { NodeRenderers } from 'likec4/react'
import { ReactLikeC4 } from 'likec4:react'
import { useHash } from 'react-use'
import injectStyles from './App.css?inline'
import { ElementNode } from './CustomNodes'
import { CustomOverlay } from './CustomOverlay'
import { DiagramFrame } from './DiagramFrame'
import { useCustomOverlay } from './context'

const renderNodes = {
  element: ElementNode,
} satisfies NodeRenderers


function App() {
  // Use the hash to navigate to a specific view
  const [hash, setHash] = useHash()
  const { close } = useCustomOverlay()

  const viewId = hash.slice(1) || 'index'

  return (
    <ReactLikeC4
      colorScheme='light'
      viewId={viewId}
      controls
      fitViewPadding={{
        top: '80px',
        left: '30px',
        right: '30px',
        bottom: '30px',
      }}
      background='transparent'
      enableElementDetails
      enableFocusMode
      enableSearch
      enableElementTags={false}
      dynamicViewVariant='sequence'
      enableRelationshipBrowser={false}
      enableRelationshipDetails={false}
      onNavigateTo={(id) => setHash(`#${id}`)}
      onCanvasClick={() => close}
      renderNodes={renderNodes}
    >
      {/* Inject the custom styles inside the shadow DOM */}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: injectStyles }} />
      <DiagramFrame />
      <CustomOverlay />
    </ReactLikeC4>
  )
}

export default App
