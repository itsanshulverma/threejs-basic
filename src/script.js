import './style.css'
import * as THREE from 'three'

// Debug GUI
// import * as dat from 'dat.gui'
// const gui = new dat.GUI()

// Loading textures
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/NormalMap.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .9, 16, 16 );

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = .7
material.roughness = .2
material.normalMap = texture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

/**
 * Lights
 */

// Light 1 - White
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2 - Red
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.6, 1.1, -0.5)
pointLight2.intensity = 10
scene.add(pointLight2)

// Debug GUI for Light 2
// const light2 = gui.addFolder('Light 2')
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(.01)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(.01)
// light2.add(pointLight2.position, 'x').min(-3).max(3).step(.01)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(.01)

// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, .5)
// scene.add(pointLight2Helper)

// Light 3 - Blue
const pointLight3 = new THREE.PointLight(0xb3ff, 2)
pointLight3.position.set(1, -1.5, 0.25)
pointLight3.intensity = 10
scene.add(pointLight3)

// Debug GUI for Light 3
// const light3 = gui.addFolder('Light 3')
// light3.add(pointLight3.position, 'y').min(-3).max(3).step(.01)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(.01)
// light3.add(pointLight3.position, 'x').min(-3).max(3).step(.01)
// light3.add(pointLight3, 'intensity').min(0).max(10).step(.01)

// const light3Color = {
//     color: 0xff0000
// }
// light3.addColor(light3Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light3Color.color)
//     })
// const pointLight3Helper = new THREE.PointLightHelper(pointLight3, .5)
// scene.add(pointLight3Helper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(e){
    mouseX = (e.clientX - windowHalfX)
    mouseY = (e.clientY - windowHalfY)
}

const clock = new THREE.Clock()
const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z -= .05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()