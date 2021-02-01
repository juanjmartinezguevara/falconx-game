const canvas = document.querySelector('canvas')


const playerhold = canvas.getContext('2d')

    //When using a windows property can put innerWidth
    // instead of windows.innerWidth

    canvas.width = innerWidth
    canvas.height = innerHeight

    const scoreId = document.querySelector('#scoreId');
    const startGameId = document.querySelector('#startGameId')
    const startGameBox = document.querySelector('#startGameBox')
    const finalScore = document.querySelector('#finalScore')

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        playerhold.beginPath()
    //    (var).arc(x: Int, y: Int, r: Int, startAngle: Float, endAngle: Float,
    //    drawCounterClockwise: Bool (false));
        playerhold.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //Will need to  be created to change player color
        playerhold.fillStyle = this.color
    //Will need to  be created to see player part 1
        playerhold.fill()
    }
}

class shoots {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    
    draw() {
        playerhold.beginPath()
        playerhold.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        playerhold.fillStyle = this.color
        playerhold.fill()
    }
    //To add velocity to our attacks
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class mrFreeze {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    
    draw() {
        playerhold.beginPath()
        playerhold.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        playerhold.fillStyle = this.color
        playerhold.fill()
    }
    //To add velocity to our attacks
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const friction = 0.99
class Explode {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1                              //Always start being equal to 1.  Opacity
    }                                               //Dont need to pass in an argument. dots fade
    
    draw() {
        playerhold.save()                       //Allows us to call a global canvas fucntion
        playerhold.globalAlpha = this.alpha            //fades the dots. Can be a num. A - num makes them reapper
        playerhold.beginPath()
        playerhold.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        playerhold.fillStyle = this.color
        playerhold.fill()
        playerhold.restore()               //Stops the save
    }
    //To add velocity to our attacks
    update() {
        this.draw()
        this.velocity.x *= friction                              //To slow explosion dots
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01                          //Will fade over time
    }
}


    //Set up location of player 
const x = canvas.width / 2
const y = canvas.height / 2

       // When you make a new player can be put in new locations, new colors, etc
     let  playerR1 = new Player(x, y, 11, 'white')  
     let  projectiles = []   
     let  legiondoom = []
     let  dots = []    

    function restartgame() {                                //To restart game
        // When you make a new player can be put in new locations, new colors, etc
    playerR1 = new Player(x, y, 11, 'white')  
    projectiles = []   
    legiondoom = []
    dots = []
    score = 0
    scoreId.innerHTML = score
    finalScore.innerHTML = score
}


    
playerR1.draw()      //Will need to  be created to see player part 2

const projectile = new shoots(
        canvas.width / 2, 
        canvas.height / 2, 
        5, 
        'purple', 
        {
        x: 1, y: 1 // Diffrent x and y values so projectiles can go somewhere
        }
)

const projectile2 = new shoots(
        canvas.width / 2, 
        canvas.height / 2, 
        5, 
        'green', 
        {
        x: -1, y: -1    
        }
)         

    function  spawnMrFreeze() {     //To render on the screen and move them at the same time
        setInterval(() => {         //call back function then time between iterirations
            const radius = Math.random() * (30 - 4) + 4         //Allows us to make the size 4 - 30

        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius   //Spwan from everywhere    
            y = Math.random() * canvas.height   
        } else {  
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`            //hue(0-360),saturation,lightness
            //cant read string so have to backpcik(template literal)
            const angle = Math.atan2(canvas.height/ 2 - y,   //subtract from destination
                canvas.width / 2 - x)                             
          
            const velocity = {              //Lets you see shots
        x: Math.cos(angle),         //cos x ajacent axis, return any -1 to 1
        y: Math.sin(angle)          // Same will return -1 to 1
        }  
        
        
            legiondoom.push(new mrFreeze(x, y, radius, color, velocity));      //Adds values to mrFreezes
        }, 1000)                    
    }
    

let animatedId                            //Will pass through cancel to stop game
let score = 0
    function animate() {
        animatedId = requestAnimationFrame(animate)                //Returns value of what your currently on
        playerhold.fillStyle = 'rgba(0, 0, 0, 0.1)'                 //last = fade effect
        playerhold.fillRect(0, 0, canvas.width, canvas.height)     //Dots w/o lines. Rect = color change
        playerR1.draw()                                             //See player
        dots.forEach((dot, index) => {                              
        if (dot.alpha <= 0) {                                       //To specify when to remove
        dots.splice(index, 1)
        } else {
            dot.update()
        }
        })

        projectiles.forEach((projectile, index) => {                  //index specifies where to delete MrFreeze
            projectile.update ()

        if (
            projectile.x + projectile.radius < 0 ||                 //Remove from sides
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||                     //Remove from top bottom
            projectile.y - projectile.radius > canvas.height) 
            {                  
            setTimeout(() => {                                          //Remove mrFreese off screen            
                projectiles.splice(index, 1)                        //removed mrFreeze from edges
                }, 0) 
        }
    })
                                                     //index will help remove when it touches below
        legiondoom.forEach((mrFreeze, index) => {                          //We see enemies
            mrFreeze.update()

            const distance = Math.hypot(playerR1.x - mrFreeze.x, playerR1.y - mrFreeze.y)   //distance                          
            if (distance - mrFreeze.radius - playerR1.radius < 1)  {              //from player to mrfreeze
                cancelAnimationFrame(animatedId)                                //stops game
                startGameBox.style.display = 'flex'                         //Will show gameover when died
                finalScore.innerHTML = score                               //Will update gameover score
            }

            projectiles.forEach((projectile, projectileIndex) => {                 //hypot calculates distance x to y
                const distance = Math.hypot(projectile.x -mrFreeze.x, projectile.y - mrFreeze.y)

                if (distance - mrFreeze.radius - projectile.radius < 1)     //mrfreeze collision
                {
                score += 10                                                    //increase score
                scoreId.innerHTML = score  



                       for (let i = 0; i < mrFreeze.radius * 2; i++) {                         //Num will show how many explosions
                        dots.push(                                             // will have
                            new Explode(projectile.x, 
                            projectile.y, 
                            Math.random() * 3,                              //Makes explosions dif
                            mrFreeze.color, 
                            {
                            x: (Math.random() -0.5) * (Math.random() * 4),     //Math random does from 0 to 1 need some neg in there to be really random
                            y: (Math.random() -0.5) * (Math.random() * 4),                            //send num speed    
                            })
                            )
                       } 

                    if (mrFreeze.radius -10 > 6) {             //Shrink bigger mrFreezes when shot
                    score += 10                                                    //increase score
                    scoreId.innerHTML = score  
                    gsap.to(mrFreeze, {                     //Makes shrink nicer need 2nd script added in html
                    radius: mrFreeze.radius -= 10
                })
                    setTimeout(() => {               //Remove flash from collision 1st callbackback 2nd time
                            projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    score += 30             //increase score more if you have to make it smaller to kill                                     
                    scoreId.innerHTML = score           
                    setTimeout(() => {               //Remove flash from collision 1st callbackback 2nd time
                    legiondoom.splice(index, 1)             //Remove from screen
                    projectiles.splice(projectileIndex, 1)
                    }, 0)
                }               
                }
            })
        })
}

    
addEventListener('click', (event) => {                  
        const angle = Math.atan2(event.clientY - canvas.height/ 2,   //radius gives you pie
                                 event.clientX - canvas.width / 2)  //Shooting function                              
                           
        const velocity = {              //Lets you see shots
            x: Math.cos(angle) * 4,         //cos x ajacent axis, return any -1 to 1 (num * speed)
            y: Math.sin(angle) * 4        // Same will return -1 to 1
        }                 
            projectiles.push(new shoots(canvas.width / 2,               // shoots only when we click
            canvas.height / 2, 
            5, 
            'white', 
            velocity)
        )
    })

    startGameId.addEventListener('click', () => {
    restartgame()
    animate()
    spawnMrFreeze()
    startGameBox.style.display = 'none'
    })