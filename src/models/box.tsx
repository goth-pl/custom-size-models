import { Face } from "../types"

class Box {
  constructor(private faces: { [id: string]: Face }) { }

  getFaces(): Face[] {
    return Object.values(this.faces)
  }
}

export default Box