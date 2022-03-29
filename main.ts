// Setting up radio function to play snake
radio.setGroup(1)

// Check when game begins
let started = false

// Threshold to determine how much tilt is registered to move
let threshold = 20

// Keeping track of directions
let dir = 1

// Keeping track of the current score
let score = 0

// Checking when to begin game
while (!started && score === 0) {

    // Start the game on shake
    input.onGesture(Gesture.Shake, function() {
        started = true
        radio.sendValue("start", 1)
    })

}


// Main game loop
while (started) {

    // Keep checking for new movements
    let dirx = input.acceleration(Dimension.X)
    let diry = input.acceleration(Dimension.Y)

    if (dirx > threshold) {
        dir = 1
    } else if (dirx < -threshold) {
        dir = 3
    } else if (diry > threshold) {
        dir = 0
    } else if (diry < -threshold) {
        dir = 2
    }

    radio.sendValue("dir", dir)

    // Checking if the game is over
    radio.onReceivedValue(function (name: string, value: number) {
        if (name === "score") {
            started = false
        }
    })

}

// Game ended
if (!started && score > 0) {

    // Display score   
    basic.showNumber(score)

}