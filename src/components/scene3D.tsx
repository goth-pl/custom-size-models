import React, { PropsWithChildren } from "react"
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  Scene,
  Mesh,
  VertexData,
  StandardMaterial, Color3, MeshBuilder, DirectionalLight, ArcRotateCamera
} from "@babylonjs/core"
import SceneComponent from "babylonjs-hook"
import { Dieline } from "../types"
import "./scene3D.scss"
import BoxGenerator from "../services/box-generator"

interface Scene3DProps {
  dieline: Dieline
}

const Scene3D = (props: PropsWithChildren<Scene3DProps>) => {
  const { dieline } = props
  const box = new BoxGenerator(dieline).call()

  const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera("camera", 0, 0, 0, new Vector3(0, 0, 0), scene)
    camera.setPosition(new Vector3(0, 5, -50))

    const canvas = scene.getEngine().getRenderingCanvas()
    // // This attaches the camera to the canvas
    camera.attachControl(canvas, true)
    // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new DirectionalLight("light", new Vector3(0, 0, 1), scene)
    // // Our built-in 'box' shape.
    // box = MeshBuilder.CreateBox("box", {size: 2}, scene);
    // // Move the box upward 1/2 its height
    // box.position.y = 1;
    // // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene)

    createBox(scene)
  }

  const createBox = (scene: Scene) => {
    const material = new StandardMaterial("material", scene)
    material.emissiveColor = new Color3(1, 0, 0)
    material.wireframe = true

    box.getFaces().forEach((face) => {
      const mesh = new Mesh(face.id, scene)
      mesh.material = material

      const vertices = [...new Set(face.edges.flat())]

      const positions = vertices.map((vertex) => {
        return [
          vertex.x,
          vertex.y,
          vertex.z
        ]
      }).flat()

      let indices: number[] = []

      for (let i = 0; i < vertices.length - 2; i ++) {
        indices = [...indices, 0, i + 1, i + 2]
      }

      const vertexData = new VertexData()
      vertexData.positions = positions
      vertexData.indices = indices
      vertexData.applyToMesh(mesh)
    })
  }

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene: Scene) => {
    // if (box !== undefined) {
    //   var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    //   const rpm = 10;
    //   box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    // }
  }

  return (
    <div className="scene3d">
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="scene-3d" />
    </div>
  )
}

export default Scene3D