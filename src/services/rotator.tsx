import { Vertex3D } from '../types';

class Rotator {
  constructor(private vertex: Vertex3D, private edge: Vertex3D[], private angle: number) { }

  // https://en.wikipedia.org/wiki/Rotation_matrix#Rotation_matrix_from_axis_and_angle
  call() {
    // Vector AB for Edge
    const Vx = this.edge[1].x - this.edge[0].x
    const Vy = this.edge[1].y - this.edge[0].y
    const Vz = this.edge[1].z - this.edge[0].z

    // Magnitude of AB
    const Vm = Math.sqrt(Vx * Vx + Vy * Vy + Vz * Vz)

    // Unit vector of AB
    const Ux = Vx / Vm
    const Uy = Vy / Vm
    const Uz = Vz / Vm

    const angleRad = this.angle * Math.PI / 180

    const sin = Math.sin(angleRad)
    const cos = Math.cos(angleRad)

    const M = [
      Ux * Ux * (1 - cos) + cos,
      Ux * Uy * (1 - cos) - Uz * sin,
      Ux * Uz * (1 - cos) + Uy * sin,

      Ux * Uy * (1 - cos) + Uz * sin,
      Uy * Uy * (1 - cos) + cos,
      Uy * Uz * (1 - cos) - Ux * sin,

      Ux * Uz * (1 - cos) - Uy * sin,
      Uy * Uz * (1 - cos) + Ux * sin,
      Uz * Uz * (1 - cos) + cos
    ]

    const Sx = this.vertex.x - this.edge[0].x
    const Sy = this.vertex.y - this.edge[0].y
    const Sz =  this.vertex.z - this.edge[0].z

    const x = M[0] * Sx + M[1] * Sy + M[2] * Sz
    const y = M[3] * Sx + M[4] * Sy + M[5] * Sz
    const z = M[6] * Sx + M[7] * Sy + M[8] * Sz

    this.vertex.x = x + this.edge[0].x
    this.vertex.y = y + this.edge[0].y
    this.vertex.z = z + this.edge[0].z
  }
}

export default Rotator