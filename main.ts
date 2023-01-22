radio.onReceivedString(function (receivedString) {
    if (receivedString == "LEDL") {
        DFRobotMaqueenPlusV2.setIndexColor(0, NeoPixelColors.Orange)
    } else if (receivedString == "LEDR") {
        DFRobotMaqueenPlusV2.setIndexColor(2, NeoPixelColors.Blue)
    } else if (receivedString == "LEDALL") {
        DFRobotMaqueenPlusV2.ledRainbow(1, 360)
    } else {
        DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "F") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eForward, Math.map(value, 550, 1023, 10, 255))
        basic.showArrow(ArrowNames.South)
        Blink = 0
    } else if (name == "B") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eBackward, Math.map(value, 0, 500, 255, 10))
        basic.showArrow(ArrowNames.North)
        Blink = 1
    } else if (name == "L") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, Math.map(value, 0, 450, 255, 40))
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 10)
        basic.showArrow(ArrowNames.East)
    } else if (name == "R") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, Math.map(value, 600, 1023, 40, 255))
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 10)
        basic.showArrow(ArrowNames.West)
    } else if (name == "S") {
        DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
        DFRobotMaqueenPlusV2.showColor(NeoPixelColors.Indigo)
    } else {
        DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
        basic.clearScreen()
    }
})
let Index = 0
let Blink = 0
DFRobotMaqueenPlusV2.I2CInit()
radio.setGroup(200)
for (let Index2 = 0; Index2 <= 5; Index2++) {
    music.playMelody("C D E F G F A C5 ", 2000)
}
Blink = 1
if (input.lightLevel() < 80) {
    DFRobotMaqueenPlusV2.showColor(NeoPixelColors.White)
}
DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
basic.showIcon(IconNames.Yes)
for (let Index = 0; Index <= 2; Index++) {
    basic.showString("" + input.temperature() + " °C")
}
basic.forever(function () {
    let US = 0
    Index = DFRobotMaqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)
    if (US < 5 && US != 0) {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 50)
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 5)
    }
})
control.inBackground(function () {
    while (true) {
        if (Blink) {
            DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eLeftLed, MyEnumSwitch.eOpen)
            DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eRightLed, MyEnumSwitch.eClose)
            basic.pause(500)
            DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eLeftLed, MyEnumSwitch.eClose)
            DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eRightLed, MyEnumSwitch.eOpen)
            basic.pause(500)
        } else {
            DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eAllLed, MyEnumSwitch.eClose)
            basic.pause(500)
        }
    }
})
