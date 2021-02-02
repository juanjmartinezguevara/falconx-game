const canvas = document.querySelector('canvas')

//Health and Mana
let health = 100
let mana = 100

let healthPct = `${health}%`
let manaPct = `${mana}%`

document.getElementById('health-points').innerHTML = healthPct
document.getElementById('mana-points').innerHTML = manaPct

document.getElementById('health-fill').style.width = healthPct
if (health >= 70 && health <= 100) {
    document.getElementById('health-fill').style.backgroundColor = 'green'
} else if (health >= 30 && health < 70) {
    document.getElementById('health-fill').style.backgroundColor = 'yellow'
} else if (health >= 0 && health < 30) {
    document.getElementById('health-fill').style.backgroundColor = 'red'
}

document.getElementById('mana-fill').style.width = manaPct

//Score and Level
score = 000
level = 1

document.getElementById('scoreNum').innerHTML = score
document.getElementById('levelNum').innerHTML = level
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Background imported
// const spaceImg = new Image()
// spaceImg.src = "../images/falconXBackground.png"
// const space = { x: 0, y: 0, w: canvas.width, h: canvas.height, img: spaceImg }

// Ship imported
const shipImg = new Image()
shipImg.src = "../images/falconXSpaceship.png"

class gShip {
    constructor(x, y, w, h, img) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img = img
}
    draw(){
        context.drawImage(this.img, 
            this.x, 
            this.y, 
            this.w, 
            this.h)
    }
}

//Laser Weapon 1
class Laser {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
draw () {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color
    context.fill()
}
// Laser Weapon 3
// Add velocity to each individual laser x and y 
// For each frame set x / y coordinate for each laser
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}
//Create our player
const falcon = new gShip(canvas.width / 2 - 50, 
    canvas.height / 2, 
    100, 
    100, 
    shipImg)

//Laser Weapon 2.2
  //Youll see clientX/Y when you click. 
  const laser = new Laser(
    //Since we want the lasers to start from the ship
    // event.clientX, 
    // event.clientY,
    canvas.width / 2,
    canvas.height / 2,
    10,
    'orange',
// Laser Weapon 4 
// Creating js object with 2 properties
    {
        x: 1,
        y: 1
    }
    )

//Laser Weapon 5
//To get them rendered at the same time need to create array
const lasers = []

function animate() {
    requestAnimationFrame(animate)
    // context.drawImage(spaceImg, space.x, space.y, space.w, space.h)
    // Laser Weapon 10
    context.clearRect(0, 0, canvas.width, canvas.height)
    falcon.draw()
    //Laser Weapon 7
    //When we click we will add to the array
    lasers.forEach((laser) => {
        laser.update()
        })
}

//Laser Weapon 2.1
//First argument it takes is what event we want to listen for hence a click.
//Second argument is a function
//Anytime you call a function in response to a click using add event listener. The first argument
//within this function is going to be an event object.
addEventListener('click', (event) => { 
//Youll see clientX/Y when you click. 

//Laser Weapon 8. Distance from mouse and center of the screen
// 0 to 6.28 is equal to 0 to 360. Get exact angle from right triangle to center
    const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
    )
//Laser Weapon 9
//Equal to an empty object with an x and y property
//Cosine is always x adjacent axis. Return and number -1 to 1
//Sine will also return any num -1 to 1
//But together are going to produce 2 dif results that have a perfect ratio to
//wherever you clicked on the screen.
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    //Laser Weapon 7
    //When we click we will add to the array
    lasers.push(new Laser(canvas.width / 2,
        canvas.height / 2,
        5,
        'orange',
        velocity
        )
    )
    })

    animate()
