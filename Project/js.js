const canvas = document.querySelector('canvas')

//Health and Mana
let health = 20
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
