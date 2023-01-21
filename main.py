def on_received_string(receivedString):
    if receivedString == "LEDL":
        DFRobotMaqueenPlusV2.set_index_color(0, NeoPixelColors.ORANGE)
    elif receivedString == "LEDR":
        DFRobotMaqueenPlusV2.set_index_color(2, NeoPixelColors.BLUE)
    elif receivedString == "LEDALL":
        DFRobotMaqueenPlusV2.led_rainbow(1, 360)
    else:
        DFRobotMaqueenPlusV2.control_motor_stop(MyEnumMotor.E_ALL_MOTOR)
radio.on_received_string(on_received_string)

def on_received_value(name, value):
    global Blink
    if name == "F":
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_ALL_MOTOR,
            MyEnumDir.E_FORWARD,
            Math.map(value, 550, 1023, 10, 255))
        basic.show_arrow(ArrowNames.SOUTH)
        Blink = 0
    elif name == "B":
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_ALL_MOTOR,
            MyEnumDir.E_BACKWARD,
            Math.map(value, 0, 500, 255, 10))
        basic.show_arrow(ArrowNames.NORTH)
        Blink = 1
    elif name == "L":
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_RIGHT_MOTOR,
            MyEnumDir.E_FORWARD,
            Math.map(value, 0, 450, 255, 40))
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_LEFT_MOTOR, MyEnumDir.E_FORWARD, 10)
        basic.show_arrow(ArrowNames.EAST)
    elif name == "R":
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_LEFT_MOTOR,
            MyEnumDir.E_FORWARD,
            Math.map(value, 600, 1023, 40, 255))
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_RIGHT_MOTOR, MyEnumDir.E_FORWARD, 10)
        basic.show_arrow(ArrowNames.WEST)
    elif name == "S":
        DFRobotMaqueenPlusV2.control_motor_stop(MyEnumMotor.E_ALL_MOTOR)
        DFRobotMaqueenPlusV2.show_color(NeoPixelColors.INDIGO)
    else:
        DFRobotMaqueenPlusV2.control_motor_stop(MyEnumMotor.E_ALL_MOTOR)
        basic.clear_screen()
radio.on_received_value(on_received_value)

Index = 0
Blink = 0
DFRobotMaqueenPlusV2.i2c_init()
radio.set_group(200)
for Index2 in range(11):
    music.play_melody("C D E F G F A C5 ", 2000)
Blink = 1
if input.light_level() < 100:
    DFRobotMaqueenPlusV2.show_color(NeoPixelColors.WHITE)
DFRobotMaqueenPlusV2.control_motor_stop(MyEnumMotor.E_ALL_MOTOR)
basic.show_icon(IconNames.YES)
for Index3 in range(3):
    basic.show_string("" + str(input.temperature()) + " ˘C")

def on_forever():
    global Index
    US = 0
    Index = DFRobotMaqueenPlusV2.read_ultrasonic(DigitalPin.P13, DigitalPin.P14)
    if US < 5 and US != 0:
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_LEFT_MOTOR, MyEnumDir.E_FORWARD, 50)
        DFRobotMaqueenPlusV2.control_motor(MyEnumMotor.E_RIGHT_MOTOR, MyEnumDir.E_FORWARD, 5)
basic.forever(on_forever)

def on_in_background():
    while True:
        if Blink:
            DFRobotMaqueenPlusV2.control_led(MyEnumLed.E_LEFT_LED, MyEnumSwitch.E_OPEN)
            DFRobotMaqueenPlusV2.control_led(MyEnumLed.E_RIGHT_LED, MyEnumSwitch.E_CLOSE)
            basic.pause(500)
            DFRobotMaqueenPlusV2.control_led(MyEnumLed.E_LEFT_LED, MyEnumSwitch.E_CLOSE)
            DFRobotMaqueenPlusV2.control_led(MyEnumLed.E_RIGHT_LED, MyEnumSwitch.E_OPEN)
            basic.pause(500)
        else:
            DFRobotMaqueenPlusV2.control_led(MyEnumLed.E_ALL_LED, MyEnumSwitch.E_CLOSE)
            basic.pause(500)
control.in_background(on_in_background)
