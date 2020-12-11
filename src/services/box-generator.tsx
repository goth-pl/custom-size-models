import { Dieline, DielinePart, Face, Vertex3D } from "../types"
import Box from "../models/box"

class BoxGenerator {
  private vertices: { [id: string]: Vertex3D } = {}
  private faces: { [id: string]: Face } = {}

  constructor(private dieline: Dieline) { }

  call(): Box {
    this.prepareVertices()
    this.prepareFaces()

    return new Box(this.faces)
  }

  private prepareVertices() {
    this.dieline.vertices.forEach((vertex) => {
      this.vertices[vertex.id] = {
        id: vertex.id,
        x: vertex.x,
        y: 0,
        z: vertex.y
      }
    })
  }

  private prepareFaces() {
    this.dieline.parts.forEach((part) => {
      this.faces[part.id] = {
        id: part.id,
        edges: part.edges.map((edge) => {
          return edge.map((vertexId) => this.vertices[vertexId])
        }),
        dependentFaces: []
      }
    })
    
    this.prepareDependentFaces(this.faces['BOTTOM'])
  }

  private prepareDependentFaces(face: Face, previousFace?: Face) {
    face.edges.forEach((edge) => {
      const vertexIds = edge.map((vertex) => vertex.id)

      const dependentFace = Object.values(this.faces).find((faceToCheck) => {
        const isExcluded = [face.id, previousFace?.id].includes(faceToCheck.id)
        const isNeighbor = faceToCheck.edges.some((edgesToCheck) => {
          return edgesToCheck.every((vertexToCheck) => vertexIds.includes(vertexToCheck.id))
        })

        return !isExcluded && isNeighbor
      })

      if (dependentFace) {
        face.dependentFaces.push(dependentFace)

        this.prepareDependentFaces(dependentFace, face)
      }
    })
  }
}

export default BoxGenerator