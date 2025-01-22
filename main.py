
tree_side = 'left'
matrix = ['..#..', '###..', '..#..', '..###', '..#..']
game_running = False
game_over = False
points = 0


def update():
    global matrix, points, game_running, game_over

    music.play_tone(Note.C, music.beat(BeatFraction.SIXTEENTH))

    if (tree_side == 'left' and (matrix[3] == '###..' or matrix[4] == '###..')) or (tree_side == 'right' and (matrix[3] == '..###' or matrix[4] == '..###')) and not game_over:
        game_running = False
        game_over = True
        music.play_melody("B A F", 300)
        basic.clear_screen()
        basic.show_number(points)
        points = 0
        basic.pause(100)
        game_over = False
        
        
        
    if game_running:
        matrix.pop(4)
        if matrix[0] == '..#..':
            if randint(0, 1) == 0:
                if matrix[1] == '###..':
                    matrix.insert_at(0, '..###')
                else:
                    matrix.insert_at(0, '###..')
            else:
                matrix.insert_at(0, matrix[1])
        else:
            matrix.insert_at(0, '..#..')
        points += 1



def left():
    global tree_side, game_running
    if game_running:
        
        tree_side = 'left'

        update()
    elif not game_over:
        game_running = True
        matrix = ['..#..', '###..', '..#..', '..###', '..#..']
        tree_side = 'left'

def right():
    global tree_side, game_running
    if game_running:
        

        tree_side = 'right'

        update()
            
    elif not game_over:
        game_running = True
        matrix = ['..#..', '###..', '..#..', '..###', '..#..']
        tree_side = 'left'


def render():
    basic.clear_screen()
    for x in range(5):
        for y in range(5):
            if matrix[y][x] == '#':
                led.plot(x, y)
    if tree_side == 'left':
        led.plot(1, 4)
    else:
        led.plot(3, 4)
            

            
def on_forever():
    basic.pause(50)
    if game_running:
        render()
        #my4digit.show(points)
    elif game_over:
        pass
    else:
        basic.plot_leds("""
        . # . . .
        . # # . .
        . # # # .
        . # # . .
        . # . . .
        """)




basic.forever(on_forever)
grove.on_joystick(GroveJoystickKey.DOWN, AnalogPin.C16, AnalogPin.C17, left)
grove.on_joystick(GroveJoystickKey.UP, AnalogPin.C16, AnalogPin.C17, right)