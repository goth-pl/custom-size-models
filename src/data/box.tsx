import { Dieline } from "../types"

export const box: Dieline = {
  vertices: [
    { id: 'A', x: 10, y: 0 },
    { id: 'B', x: 20, y: 0 },
    { id: 'C', x: 0, y: -10 },
    { id: 'D', x: 10, y: -10 },
    { id: 'E', x: 20, y: -10 },
    { id: 'F', x: 30, y: -10 },
    { id: 'G', x: 0, y: -20 },
    { id: 'H', x: 10, y: -20 },
    { id: 'I', x: 20, y: -20 },
    { id: 'J', x: 30, y: -20 },
    { id: 'K', x: 10, y: -30 },
    { id: 'L', x: 20, y: -30 },
    { id: 'M', x: 10, y: -40 },
    { id: 'N', x: 20, y: -40 },
  ],
  parts: [
    {
      id: 'FRONT',
      edges: [['A', 'B'], ['B', 'E'], ['D', 'E'], ['A', 'D']],
      rotation: { angle: -90, edge: ['D', 'E'] }
    },
    {
      id: 'RIGHT',
      edges: [['C', 'D'], ['D', 'H'], ['G', 'H'], ['C', 'G']],
      rotation: { angle: 90, edge: ['D', 'H'] }
    },
    {
      id: 'BOTTOM',
      edges: [['D', 'E'], ['E', 'I'], ['H', 'I'], ['D', 'H']]
    },
    {
      id: 'LEFT',
      edges: [['E', 'F'], ['F', 'J'], ['I', 'J'], ['E', 'I']],
      rotation: { angle: -90, edge: ['E', 'I'] }
    },
    {
      id: 'BACK',
      edges: [['H', 'I'], ['I', 'L'], ['K', 'L'], ['H', 'K']],
      rotation: { angle: 90, edge: ['H', 'I'] }
    },
    {
      id: 'TOP',
      edges: [['K', 'L'], ['L', 'N'], ['M', 'N'], ['K', 'M']],
      rotation: { angle: 45, edge: ['K', 'L'] }
    },
  ]
}