const wifi = require("Wifi");
const http = require("http");

const WIFI_NAME = "LEHM";
const WIFI_OPTIONS = { password : "FRo2pk5S" };

const flexPin = 0;
const ledPin = D5;
const back = D13;
const buttonPin = D2;
const buttonState = 0;
let started = false;

let lastRequest = null;

const server = () => {
  setInterval(() => {
    request();
    console.log(started);
    if(started === true){
      let value = analogRead(flexPin) * 1000;
      console.log(value)
      // calibrate
      let initValue = value;
      console.log()
      let changeValue = Math.abs(initValue - value);
      console.log(changeValue);
      if(changeValue > 15){
        vibrate(back, 400, 5000);
      }
    }
  }, 1000);

  const request = () => {
    http.get("https://elu-be.herokuapp.com/api/exercise/status", (res) => {
      res.on('data', (d) => {
        const response = JSON.parse(d);
        if(lastRequest === null && response.started === true){
          calibrate();
        }
        if(lastRequest === null && response.started === true){
          calibrate();
        }
        response.started === true ? started = true : started = false;
        console.log(response)
      });
    });
  };
};

const vibrate = (pin, interval, time) => {
  let on = false;
  const blink = setInterval(function() {
    on = !on;
    digitalWrite(pin, on);
  }, interval);
  setTimeout(() => {clearInterval(blink);}, time);
};


wifi.connect(WIFI_NAME, WIFI_OPTIONS,(err) => {
  if (err) {
    console.log("Connection error: "+err);
    return;
  }
  console.log("Connected to wifi");
  server();
});
