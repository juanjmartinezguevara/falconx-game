let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Ship imported
let shipImg = new Image()
shipImg.src = "../images/falconXSpaceship.png"
let ship = { x: 0, y: 0, w: 100, h: 100, img: shipImg }

// Background imported
let spaceImg = new Image()
spaceImg.src = "../images/falconXBackground.png"
let space = { x: 0, y: 0, w: canvas.width, h: canvas.height, img: spaceImg }

function animate() {
    requestAnimationFrame(animate)
    context.drawImage(spaceImg, space.x, space.y, space.w, space.h)
    context.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h)
}
animate()