import { Dieline, Face, Vertex3D, Box, DielinePart } from "../types"
import Rotator from './rotator';

class BoxGenerator {
  private vertices: { [id: string]: Vertex3D } = {}
  private faces: { [id: string]: Face } = {}

  constructor(private dieline: Dieline) { }

  call(): Box {
    this.prepareVertices()
    this.prepareFaces()
    this.rotateFaces()

    return {
      vertices: this.vertices,
      faces: this.faces
    }
  }

  private prepareVertices() {
    let Sx = 0
    let Sy = 0
    const bottomPart = this.dieline.parts.find((part) => part.id === 'BOTTOM')

    if (bottomPart) {
      const vertexIds = [...new Set(bottomPart.edges.flat())]

      this.dieline.vertices.forEach((vertex) => {
        if (vertexIds.includes(vertex.id)) {
          Sx += vertex.x
          Sy += vertex.y
        }
      })

      Sx /= vertexIds.length
      Sy /= vertexIds.length
    }

    this.dieline.vertices.forEach((vertex) => {
      this.vertices[vertex.id] = {
        id: vertex.id,
        x: vertex.x - Sx,
        y: 0,
        z: vertex.y - Sy
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

  private rotateFaces() {
    this.dieline.parts.forEach((part) => {
      if (part.rotation) {
        this.rotateFace(this.faces[part.id], part.rotation.edge, part.rotation.angle)
      }
    })
  }

  private rotateFace(face: Face, edge: string[], angle: number, excludedVertices: Vertex3D[] = []) {
    const vertices = [...new Set(face.edges.flat())]
    const verticesToRotate = vertices.filter((vertex) => {
      return !edge.includes(vertex.id) && !excludedVertices.includes(vertex)
    })

    verticesToRotate.forEach((vertex) => {
      const rotator = new Rotator(
        vertex,
        edge.map((vertexId) => this.vertices[vertexId]),
        angle
      )

      rotator.call()
    })

    face.dependentFaces.forEach((dependentFace) => {
      this.rotateFace(dependentFace, edge, angle, verticesToRotate)
    })
  }
}

export default BoxGenerator