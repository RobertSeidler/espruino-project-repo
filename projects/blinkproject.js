var lights = [LED1, LED2, LED3, LED4];

function flash(lights){
  if(lights instanceof Array){
    lights.forEach(light => {
      digitalWrite(light, 1);
      setTimeout(function() {
        digitalWrite(light, 0);
      }, 200);
    });
  } else {
    digitalWrite(lights, 1);
    setTimeout(function() {
      digitalWrite(lights, 0);
    }, 200);
  }
}

var interval = {};

function startOneBlink(light){
  let success = false;
  if(!interval[light.toString()]){
    interval[light.toString()] = setInterval(function() {
      flash(light);
    }, 500);
    success = true;
  }
  return success;
}

function startBlink(lights){
  let success = false;

  if(lights instanceof Array){
    lights.forEach(light => {
      success += startOneBlink(light);
    });
  } else {
    success += startOneBlink(lights);
  }

  return success;
}

function stopBlinkOne(light){
  let success = false;
  if (interval[light.toString()]){
    clearInterval(interval[light.toString()]);
    delete interval[light.toString()];
    success = true;
  }
  return success;
}

function stopBlink(lights){
  let success = false;

  if(lights instanceof Array){
    lights.forEach(light => {
      success += stopBlinkOne(light);
    });
  } else {
    success += stopBlinkOne(lights);
  }

  return success;
}

var turnAllLightsOn = () => {
  lights.forEach(light => digitalWrite(light, 1));
};

var turnAllLightsOff = () => {
  lights.forEach(light => digitalWrite(light, 0));
};

var toggleAllLights = () => {
  lights.forEach(light => digitalWrite(light, (1 - digitalRead(light))));
};