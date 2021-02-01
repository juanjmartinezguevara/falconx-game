const canvas = document.querySelector('canvas')
// 1 Lets create a player
const stats = canvas.getContext('2d')

            // windows not needed below
            canvas.width = innerWidth
            canvas.height = innerHeight

// 1 - 2 Lets create a player
class Player {
    //constructur needed to create properties and assign to a specific class
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
// 1 - 4 Lets create a player. draw can be anything
        draw () {
            stats.beginPath()
             //    (var).arc(x: Int, y: Int, r: Int, startAngle: Float, endAngle: Float,
             //    drawCounterClockwise: Bool (false));
            stats.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            //Will need to  be created to change player color
            stats.fillStyle = this.color
            stats.fill()
        }
    }
// 2 - 1 Lets shoot stuff. Velocity added since we need it
class Attack {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw () {
        stats.beginPath()
        stats.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        stats.fillStyle = this.color
        stats.fill()
    }

    // 2 - 6 Lets shoot stuff. Things that we will change later
    update () {
    // 2 - 10 Lets shoot stuff. Added this.draw()
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y
    }
}

// 3 - 1 Create baddies
class TeamRocket {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
}
    draw () {
        stats.beginPath()
        stats.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        stats.fillStyle = this.color
        stats.fill()
}
    update () {
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y
}
}


// 1 - 5 Lets create a player

    const x = canvas.width / 2
    const y = canvas.height / 2

// 1 - 3 Lets create a player
const haunter = new Player(x, y, 30, 'blue')
// haunter.draw() moved to 2 - 16

// 2 - 3  Lets shoot stuff. 
const attack = new Attack (
    // 2 - 4 Lets shoot stuff. Replace event.clickX/clickY with canvas.width/height / 2
    canvas.width / 2, 
    canvas.height / 2, 
    5, 
    'blue',
    // 2 - 7 Lets shoot stuff. Sets the info for velocity. To send the attack in the right direction.
    {
    x: 1,
    y: 1
    }
)

// 2 - 8 Lets shoot stuff
const attacks = []
// 3 - 3 Create baddies.
const rocketHq = []


// 3 - 2 Create baddies. Who you will spwan and interval
    function spawnTeamRocket() {
    setInterval(() => {
        // 3 - 6 Create baddies. The size of baddies will be 4 - 30
        const radius = Math.random() * (30 - 4) + 4
        // 3 - 7 Create baddies. x and y needs to be outside if 
        let x
        let y 
        if (Math.random() < 0.5) {
        // x/y used to be 100. Below makes them randomly spawn from L and R 
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
        // Below makes them randomly spawn from T and B 
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius    
        }
        // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        const color = 'purple'
        // Below deleted when 3 - 5
        // const velocity = {
        //     x: 1,
        //     y: 1
        // }

// 3 - 5 Create baddies
        const angle = Math.atan2(canvas.height / 2 - y,
        canvas.width / 2 -x
        )
        const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
        }

        rocketHq.push(new TeamRocket(x, y, radius, color, velocity))
        console.log(rocketHq)
    }, 1000)
}
    

// 2 - 5 Lets shoot stuff. Its just going to call itself over and over
function animate() {
    requestAnimationFrame(animate)
    // 2 - 15 Lets shoot stuff.
    stats.clearRect(0, 0, canvas.width, canvas.height)
    // 2 - 16
    haunter.draw()
    // 2 - 9 Lets shoot stuff. 
    attacks.forEach((attack) => {
            attack.update()
        })
    // 3 - 4 Create baddies. They will start appearing on screen
    rocketHq.forEach((teamrocket) => {
            teamrocket.update()
    })
}

// 2 - 2 Lets shoot stuff. event will show up when you click in console log
addEventListener('click', (event) => {  
                // 2 - 3 Lets shoot stuff. USED TO GO HERE
                // 2 - 12 Lets shoot stuff. Angle from click to middle of screen. 
                const angle = Math.atan2(event.clientY - canvas.height / 2,
                                         event.clientX - canvas.width / 2)
                // 2 - 13 Lets shoot stuff. cos/sin return num -1 to 1. Will allow shots to track where you click
                const velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                }

                // 2 - 11 Lets shoot stuff
                attacks.push(new Attack(canvas.width / 2, 
                    canvas.height / 
                    2, 
                    5, 
                    'orange',
                    // 2 - 14 Lets shoot stuff. Replaces below
                    velocity
                    // {
                    // x: 1,
                    // y: 1
                    // }
                    )
                )
})

animate()         //2-5
spawnTeamRocket() //3-2