exports.Accelorometer = class{
  constructor(){
    this.sensitivity = 0.018;
    this.onInit();
  }

  onInit() {
    SPI1.setup({sck:A5, miso:A6, mosi:A7});
    SPI1.send([0x20,0b01000111], E3);
  }

  _getAxisAcceleration(spiRegister){
    let acc = SPI1.send([spiRegister, 0], E3)[1];
    if (acc > 127) acc -= 256;
    return acc * this.sensitivity;
  }

  getAxisAccelerations(){
    return {
      x: this._getAxisAcceleration(0xA9), 
      y: this._getAxisAcceleration(0xAB), 
      z: this._getAxisAcceleration(0xAD)
    };
  }

  getAbsoluteAcceleration(){
    let axisForces = this.getAxisAccelerations();

    return Math.sqrt(Object.keys(axisForces)
                           .map(key => (axisForces[key] * axisForces[key]))
                           .reduce(((col, cur) => (col + cur)), 0));
  }
};
