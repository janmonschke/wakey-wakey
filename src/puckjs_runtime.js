// reset timezone to CET
// this might be off by one hour during winter time
E.setTimeZone(2);

const okayToWakeTimeInMinutes = 6 * 60; // 6:00
const bedtimeInMinutes = 19 * 60; // 19:00
let manualOn = false;
let interval = null;
let isChecking = false;

const blue = LED3;
const green = LED2;

function startWakey() {
  setManualOff();
  if (isChecking) {
    return;
  }
  isChecking = true;
  check();
  interval = setInterval(check, 60 * 1000);
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
  green.write(0);
}

function turnOnWakeyLight() {
  green.write(1);
}

function status() {
  return {
    isChecking,
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
