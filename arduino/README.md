# Arduino Hardware Integration for Jacob.dev Portfolio

This Arduino sketch enables hardware interaction with the Jacob.dev portfolio website via Web Serial API.

## Features

- **Hardware Authentication**: Press button to unlock Matrix mode
- **Physical Eye Control**: Two potentiometers control eye pupil position
- **Theme Switching**: Physical button cycles through Dark/Light/Matrix themes
- **Signal Simulation**: Real-time signal strength/quality data transmission
- **Morse Code Input**: Tap/hold button to input Morse code
- **RGB LED Feedback**: LED reflects current theme state

## Hardware Requirements

### Components
- Arduino Uno (or compatible board)
- USB cable (Type A to Type B)
- 4x Push buttons
- 2x Potentiometers (10kΩ)
- 1x RGB LED (common cathode)
- 1x LED (for signal strength)
- Breadboard and jumper wires

### Pinout

| Arduino Pin | Component | Function |
|-------------|-----------|----------|
| D2 | Push Button | Hardware Auth (pull to GND) |
| D3 | Push Button | Theme Toggle |
| D4 | Push Button | Eye Blink Trigger |
| A0 | Potentiometer | Eye X Position Control |
| A1 | Potentiometer | Eye Y Position Control |
| D5 | RGB LED Red | Theme Indicator |
| D6 | RGB LED Green | Theme Indicator |
| D7 | RGB LED Blue | Theme Indicator |
| D8 | Push Button | Morse Code Input |
| D9 | LED | Signal Strength Indicator |
| A2 | - | Random Seed (leave unconnected) |

### Wiring Diagram

```
Arduino Uno
├── D2 → Button → GND (Auth)
├── D3 → Button → GND (Theme)
├── D4 → Button → GND (Blink)
├── D8 → Button → GND (Morse)
├── A0 → Potentiometer → 5V & GND (Eye X)
├── A1 → Potentiometer → 5V & GND (Eye Y)
├── D5 → RGB Red → 220Ω → GND
├── D6 → RGB Green → 220Ω → GND
├── D7 → RGB Blue → 220Ω → GND
└── D9 → LED → 220Ω → GND (Signal)
```

## Setup Instructions

### 1. Install Arduino IDE
Download from [arduino.cc](https://www.arduino.cc/en/software)

### 2. Upload the Sketch
1. Open `portfolio_hardware.ino` in Arduino IDE
2. Select your board: Tools → Board → Arduino Uno
3. Select your port: Tools → Port → (your Arduino's COM port)
4. Click Upload button (→)

### 3. Connect to Portfolio
1. Open portfolio in Chrome/Edge/Opera (Web Serial API required)
2. Press `Ctrl+K` or `Cmd+K` to open Command Palette
3. Type "hardware" and select "Connect Hardware (Arduino)"
4. Browser will prompt to select serial port - choose your Arduino
5. Hardware Status panel will appear in bottom-right corner

## Usage

### Hardware Authentication
- Press the button on D2 to authenticate
- Automatically unlocks Matrix mode
- Green LED flashes on success

### Theme Switching
- Press button on D3 to cycle themes
- RGB LED reflects current theme:
  - Dim blue = Dark mode
  - White = Light mode
  - Green = Matrix mode

### Eye Control
- Rotate potentiometer on A0 for horizontal eye movement
- Rotate potentiometer on A1 for vertical eye movement
- Position displayed in Hardware Status panel

### Blink Trigger
- Press button on D4 to trigger eye blink
- Blue LED flashes briefly

### Morse Code Input
- Tap button on D8 for dots (short press <150ms)
- Hold button on D8 for dashes (long press <450ms)
- Morse input appears in Hardware Status panel

### Signal Monitoring
- Arduino simulates signal strength (60-100%)
- Signal quality displayed (70-95%)
- LED on D9 brightness indicates signal strength

## Troubleshooting

### Port Not Found
- Ensure Arduino is connected via USB
- Check Device Manager (Windows) or `ls /dev/tty.*` (Mac/Linux)
- Try different USB cable (some cables are power-only)

### Connection Failed
- Close Arduino IDE Serial Monitor (it locks the port)
- Refresh browser and try connecting again
- Check baud rate (must be 9600)

### No Data Received
- Verify sketch uploaded successfully
- Check wiring connections
- Open Arduino Serial Monitor (9600 baud) to debug

### Browser Not Supported
- Web Serial API requires Chrome, Edge, or Opera
- Firefox: Enable `dom.serial.enabled` in `about:config`
- Safari: Limited support, use Chrome/Edge instead

## Serial Protocol

The Arduino sends data in the following formats:

```
AUTH:VALID              - Authentication successful
EYE:x,y,blink          - Eye position (x: -26 to 26, y: -16 to 16, blink: 0/1)
SIGNAL:strength,quality - Signal datastrength: 0-100, quality: 0-100)
THEME:LIGHT/DARK/MATRIX - Theme change
MORSE:. or -           - Morse code input
STATUS:INIT            - Initialization status
```

## Advanced Customization

### Adjust Timing
Edit constants in `portfolio_hardware.ino`:
```cpp
const int DOT_DURATION = 100;      // Morse dot duration (ms)
const int DASH_DURATION = 300;     // Morse dash duration (ms)
const int LETTER_GAP = 300;        // Gap between letters (ms)
```

### Modify Signal Simulation
Change random ranges in `simulateSignal()`:
```cpp
signalStrength = random(60, 100);  // Signal strength range
signalQuality = random(70, 95);    // Signal quality range
```

### Add New Features
The sketch is modular - add new functions and serial commands following the existing pattern.

## Security Notes

- Web Serial API requires user permission to connect
- Connection is local (USB) - no network exposure
- Disconnect hardware when not in use
- Browser will prompt on each connection attempt

## License

This hardware integration is part of the Jacob.dev portfolio project.
