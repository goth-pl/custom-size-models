import React, { PropsWithChildren } from "react"
import { Circle, Group, Layer, Line, Stage, Text } from "react-konva"
import { Dieline } from "../types"

interface Scene2DProps {
  dieline: Dieline
}

const Scene2D = (props: PropsWithChildren<Scene2DProps>) => {
  const { dieline } = props

  const xOffset = 10
  const yOffset = -10

  const vertices = dieline.vertices.map((vertex) => {
    const x = vertex.x * xOffset
    const y = vertex.y * yOffset
    const text = `${vertex.id} (${vertex.x}, ${vertex.y})`

    return (
      <Group x={x} y={y}>
        <Circle radius={2} fill="red" />
        <Text x={5} y={-15} text={text} />
      </Group>
    )
  })

  const faces = dieline.parts.map((part) => {
    const edges = part.edges.map((edge) => {
      const points = edge.map((vertexId) => {
        const vertex = dieline.vertices.find((vertex) => vertex.id === vertexId)

        return [vertex!.x * xOffset, vertex!.y * yOffset]
      }).flat()

      return <Line points={points} stroke="black" />
    })

    return (
      <Group>
        {edges}
      </Group>
    )
  })

  return (
    <Stage width={window.innerWidth} height={window.innerHeight / 2}>
      <Layer x={20} y={20}>
        {faces}
        {vertices}
      </Layer>
    </Stage>
  )
}

export default Scene2D