/*
 * Portfolio Hardware Controller
 * Connects to Jacob.dev portfolio via Web Serial API
 * 
 * PINOUT:
 * - D2: Auth button (pull to GND to authenticate)
 * - D3: Theme toggle button
 * - D4: Blink trigger button
 * - A0: Eye X control (potentiometer)
 * - A1: Eye Y control (potentiometer)
 * - D5: RGB LED Red
 * - D6: RGB LED Green
 * - D7: RGB LED Blue
 * - D8: Morse button (tap for dots, hold for dashes)
 * - D9: Signal strength LED (PWM)
 */

const int AUTH_BUTTON = 2;
const int THEME_BUTTON = 3;
const int BLINK_BUTTON = 4;
const int EYE_X_PIN = A0;
const int EYE_Y_PIN = A1;
const int LED_R = 5;
const int LED_G = 6;
const int LED_B = 7;
const int MORSE_BUTTON = 8;
const int SIGNAL_LED = 9;

// Morse code timing
const int DOT_DURATION = 100;
const int DASH_DURATION = 300;
const int LETTER_GAP = 300;
const int WORD_GAP = 700;

// Signal simulation
unsigned long lastSignalUpdate = 0;
int signalStrength = 0;
int signalQuality = 0;

// Button debouncing
unsigned long lastDebounceTime = 0;
const int debounceDelay = 50;

// Morse code state
unsigned long morsePressStart = 0;
bool morseButtonPressed = false;
String morseBuffer = "";

// Theme state
String currentTheme = "dark";

void setup() {
  Serial.begin(9600);
  
  pinMode(AUTH_BUTTON, INPUT_PULLUP);
  pinMode(THEME_BUTTON, INPUT_PULLUP);
  pinMode(BLINK_BUTTON, INPUT_PULLUP);
  pinMode(MORSE_BUTTON, INPUT_PULLUP);
  
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
  pinMode(SIGNAL_LED, OUTPUT);
  
  // Initial status
  Serial.println("STATUS:INIT");
  setThemeLED("dark");
  
  // Random seed for signal simulation
  randomSeed(analogRead(A2));
}

void loop() {
  unsigned long currentTime = millis();
  
  // Check auth button
  if (digitalRead(AUTH_BUTTON) == LOW) {
    delay(debounceDelay);
    if (digitalRead(AUTH_BUTTON) == LOW) {
      Serial.println("AUTH:VALID");
      flashLED(LED_G, 100);
      while (digitalRead(AUTH_BUTTON) == LOW) delay(10);
    }
  }
  
  // Check theme button
  if (digitalRead(THEME_BUTTON) == LOW) {
    delay(debounceDelay);
    if (digitalRead(THEME_BUTTON) == LOW) {
      toggleTheme();
      while (digitalRead(THEME_BUTTON) == LOW) delay(10);
    }
  }
  
  // Check blink button
  if (digitalRead(BLINK_BUTTON) == LOW) {
    delay(debounceDelay);
    if (digitalRead(BLINK_BUTTON) == LOW) {
      sendEyeBlink();
      while (digitalRead(BLINK_BUTTON) == LOW) delay(10);
    }
  }
  
  // Read eye control potentiometers
  int eyeX = analogRead(EYE_X_PIN);
  int eyeY = analogRead(EYE_Y_PIN);
  // Map to -26 to 26 range for X, -16 to 16 for Y
  int normalizedX = map(eyeX, 0, 1023, -26, 26);
  int normalizedY = map(eyeY, 0, 1023, -16, 16);
  Serial.print("EYE:");
  Serial.print(normalizedX);
  Serial.print(",");
  Serial.print(normalizedY);
  Serial.println(",0");
  
  // Simulate signal data
  if (currentTime - lastSignalUpdate > 1000) {
    simulateSignal();
    lastSignalUpdate = currentTime;
  }
  
  // Handle Morse code input
  handleMorseInput();
  
  delay(50); // Main loop delay
}

void toggleTheme() {
  if (currentTheme == "dark") {
    currentTheme = "light";
    Serial.println("THEME:LIGHT");
  } else if (currentTheme == "light") {
    currentTheme = "matrix";
    Serial.println("THEME:MATRIX");
  } else {
    currentTheme = "dark";
    Serial.println("THEME:DARK");
  }
  setThemeLED(currentTheme);
}

void setThemeLED(String theme) {
  if (theme == "dark") {
    analogWrite(LED_R, 0);
    analogWrite(LED_G, 0);
    analogWrite(LED_B, 50); // Dim blue
  } else if (theme == "light") {
    analogWrite(LED_R, 255);
    analogWrite(LED_G, 255);
    analogWrite(LED_B, 255); // White
  } else if (theme == "matrix") {
    analogWrite(LED_R, 0);
    analogWrite(LED_G, 255);
    analogWrite(LED_B, 0); // Green
  }
}

void sendEyeBlink() {
  Serial.println("EYE:0,0,1");
  flashLED(LED_B, 50);
}

void simulateSignal() {
  // Simulate varying signal strength and quality
  signalStrength = random(60, 100);
  signalQuality = random(70, 95);
  
  Serial.print("SIGNAL:");
  Serial.print(signalStrength);
  Serial.print(",");
  Serial.println(signalQuality);
  
  // Update signal LED based on strength
  analogWrite(SIGNAL_LED, map(signalStrength, 0, 100, 0, 255));
}

void handleMorseInput() {
  int buttonState = digitalRead(MORSE_BUTTON);
  
  if (buttonState == LOW && !morseButtonPressed) {
    morseButtonPressed = true;
    morsePressStart = millis();
    flashLED(LED_R, 50);
  }
  
  if (buttonState == HIGH && morseButtonPressed) {
    morseButtonPressed = false;
    unsigned long pressDuration = millis() - morsePressStart;
    
    if (pressDuration < DOT_DURATION * 1.5) {
      morseBuffer += ".";
      Serial.println("MORSE:.");
    } else if (pressDuration < DASH_DURATION * 1.5) {
      morseBuffer += "-";
      Serial.println("MORSE:-");
    }
    
    // Send complete buffer after letter gap
    delay(LETTER_GAP);
    if (morseBuffer.length() > 0) {
      Serial.print("MORSE:");
      Serial.println(morseBuffer);
      morseBuffer = "";
    }
  }
}

void flashLED(int pin, int duration) {
  digitalWrite(pin, HIGH);
  delay(duration);
  digitalWrite(pin, LOW);
}
