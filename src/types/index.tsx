export interface Vertex2D {
  id: string
  x: number
  y: number
}

export interface Vertex3D {
  id: string
  x: number
  y: number
  z: number
}

export interface Rotation {
  angle: number
  edge: string[]
}

export interface DielinePart {
  id: string
  edges: string[][]
  rotation?: Rotation
}

export interface Dieline {
  vertices: Vertex2D[]
  parts: DielinePart[]
}

export interface Face {
  id: string
  edges: Vertex3D[][]
  dependentFaces: Face[]
}

export interface Box {
  vertices: { [id: string]: Vertex3D }
  faces: { [id: string]: Face }
}