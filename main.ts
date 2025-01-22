let tree_side = "left"
let matrix = ["..#..", "###..", "..#..", "..###", "..#.."]
let game_running = false
let game_over = false
let points = 0
function update() {
    
    music.playTone(Note.C, music.beat(BeatFraction.Sixteenth))
    if (tree_side == "left" && (matrix[3] == "###.." || matrix[4] == "###..") || tree_side == "right" && (matrix[3] == "..###" || matrix[4] == "..###") && !game_over) {
        game_running = false
        game_over = true
        music.playMelody("B A F", 300)
        basic.clearScreen()
        basic.showNumber(points)
        points = 0
        basic.pause(100)
        game_over = false
    }
    
    if (game_running) {
        _py.py_array_pop(matrix, 4)
        if (matrix[0] == "..#..") {
            if (randint(0, 1) == 0) {
                if (matrix[1] == "###..") {
                    matrix.insertAt(0, "..###")
                } else {
                    matrix.insertAt(0, "###..")
                }
                
            } else {
                matrix.insertAt(0, matrix[1])
            }
            
        } else {
            matrix.insertAt(0, "..#..")
        }
        
        points += 1
    }
    
}

function render() {
    basic.clearScreen()
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            if (matrix[y][x] == "#") {
                led.plot(x, y)
            }
            
        }
    }
    if (tree_side == "left") {
        led.plot(1, 4)
    } else {
        led.plot(3, 4)
    }
    
}

basic.forever(function on_forever() {
    basic.pause(50)
    if (game_running) {
        render()
    } else if (game_over) {
        // my4digit.show(points)
        
    } else {
        basic.plotLeds(`
        . # . . .
        . # # . .
        . # # # .
        . # # . .
        . # . . .
        `)
    }
    
})
grove.onJoystick(GroveJoystickKey.Down, AnalogPin.C16, AnalogPin.C17, function left() {
    let matrix: string[];
    
    if (game_running) {
        tree_side = "left"
        update()
    } else if (!game_over) {
        game_running = true
        matrix = ["..#..", "###..", "..#..", "..###", "..#.."]
        tree_side = "left"
    }
    
})
grove.onJoystick(GroveJoystickKey.Up, AnalogPin.C16, AnalogPin.C17, function right() {
    let matrix: string[];
    
    if (game_running) {
        tree_side = "right"
        update()
    } else if (!game_over) {
        game_running = true
        matrix = ["..#..", "###..", "..#..", "..###", "..#.."]
        tree_side = "left"
    }
    
})
