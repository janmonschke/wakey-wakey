// reset timezone to CET
// this might be off by one hour during winter time
E.setTimeZone(2);

// Act as an NCF URL device for the controller website
NRF.nfcURL("https://janmonschke.com/wakey-wakey");

const okayToWakeTimeInMinutes = 6 * 60 + 30; // 6:30
const bedtimeInMinutes = 19 * 60; // 19:00
let manualOn = false;
let interval = null;
let isChecking = false;
let isOn = false;

const blue = LED3;
const green = LED2;

function startWakey() {
  setManualOff();
  if (isChecking) {
    return;
  }
  isChecking = true;
  check();
  // check every 2 minutes
  interval = setInterval(check, 2 * 60 * 1000);
}

function check() {
  const time = new Date();
  const minutesOfDay = time.getHours() * 60 + time.getMinutes();
  if (
    minutesOfDay >= okayToWakeTimeInMinutes &&
    minutesOfDay < bedtimeInMinutes
    // It's time to get up and it's not bed time yet
  ) {
    turnOnWakeyLight();
  }
}

function stopWakey() {
  clearInterval(interval);
  isChecking = false;
  isOn = false;
  setManualOff();
  green.write(0);
}

function turnOnWakeyLight() {
  green.write(1);
  isOn = true;
}

function status() {
  return {
    isChecking,
    isOn,
    manualOn,
    battery: E.getBattery(),
  };
}

function setManualOn() {
  stopWakey();
  turnOnWakeyLight();
  manualOn = true;
}

function setManualOff() {
  manualOn = false;
}

// let's go
startWakey();
