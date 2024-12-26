function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    const numRegex = /^[^a-zA-Z]*/;
    result = input.match(numRegex)[0];

    if (result === "") return 1;
    if (result.includes('/')) {
      const numbers = result.split('/');
      if (numbers.length !== 2) return "invalid number";
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    } else {
      result = parseFloat(result);
    }

    return isNaN(result) ? "invalid number" : result;
  };

  this.getUnit = function (input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (unitMatch) {
      let unit = unitMatch[0];
      if (unit.toLowerCase() === 'l') return 'L'; // Ensure 'L' is case-sensitive
      if (validUnits.includes(unit.toLowerCase())) return unit.toLowerCase();
    }
    return 'invalid unit';
  }


  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    }

    return unitMap[initUnit] || "invalid unit";
  }



  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };

    return unitNames[unit] || "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);

    if (spelledInitUnit === "invalid unit" || spelledReturnUnit === "invalid unit") {
      return "invalid unit";
    }

    return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };

}

module.exports = ConvertHandler;
