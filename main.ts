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
    US = DFRobotMaqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)
    if (US < 10 && US != 0) {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 50)
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 5)
    } else {
        if (name == "F") {
            DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eForward, Math.map(value, 550, 1023, 10, 255))
            basic.showArrow(ArrowNames.South)
        } else if (name == "B") {
            DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eBackward, Math.map(value, 0, 500, 255, 10))
            basic.showArrow(ArrowNames.North)
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
    }
})
let US = 0
radio.setGroup(200)
for (let Index = 0; Index <= 10; Index++) {
    music.playMelody("C D E F G F A C5 ", 1000)
}
DFRobotMaqueenPlusV2.showColor(NeoPixelColors.White)
DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
basic.showIcon(IconNames.Yes)
