import React from "react"
import Scene2D from "./components/scene2D"
import Scene3D from "./components/scene3D"
import { box } from "./data/box"

function App() {
  return (
    <>
      <Scene2D dieline={box}></Scene2D>
      <Scene3D dieline={box}></Scene3D>
    </>
  )
}

export default App
