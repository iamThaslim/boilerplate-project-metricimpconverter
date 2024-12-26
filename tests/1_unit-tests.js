const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    // Test for correctly reading a whole number input
    test('Should correctly read a whole number input', function () {
        assert.strictEqual(convertHandler.getNum('32L'), 32);
    });

    // Test for correctly reading a decimal number input
    test('Should correctly read a decimal number input', function () {
        assert.strictEqual(convertHandler.getNum('3.2kg'), 3.2)
    });

    // Test for correctly reading a fractional input
    test('Should correctly read a fractional input with a decimal', function () {
        assert.strictEqual(convertHandler.getNum('4.5/1.5lbs'), 3);
    });

    // Test for correctly reading a fractional input with a decimal
    test('Should return an error on a double-fraction', function () {
        assert.strictEqual(convertHandler.getNum('3/2/3gal'), 'invalid number')
    });

    // Test for returning an error on a double-fraction
    test('Should return an error on a double-fraction', function () {
        assert.strictEqual(convertHandler.getNum('3/2/3gal'), 'invalid number');
    });

    // Test for defaulting to 1 when no numerical input is provided
    test('Should default to a numerical input of 1 when none is provided', function () {
        assert.strictEqual(convertHandler.getNum('kg'), 1);
    });

    // Test for correctly reading each valid input unit
    test('Should correctly read each valid input unit', function () {
        const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        validUnits.forEach(unit => {
            assert.strictEqual(convertHandler.getUnit(`5${unit}`), unit);
        });
    });

    // Test for returning an error for an invalid input unit
    test('Should return an error for an invalid input unit', function () {
        assert.strictEqual(convertHandler.getUnit('32gallons'), 'invalid unit');
    });

    // Test for returning the correct return unit for each valid input unit
    test('Should return the correct return unit for each valid input unit', function () {
        const unitPairs = {
            gal: 'L',
            L: 'gal',
            mi: 'km',
            km: 'mi',
            lbs: 'kg',
            kg: 'lbs',
        };
        for (let unit in unitPairs) {
            assert.strictEqual(convertHandler.getReturnUnit(unit), unitPairs[unit]);
        }
    });

    // Test for returning the spelled-out string unit for each valid input unit
    test('Should return the spelled-out string unit for each valid input unit', function () {
        const spelledOutUnits = {
            gal: 'gallons',
            L: 'liters',
            mi: 'miles',
            km: 'kilometers',
            lbs: 'pounds',
            kg: 'kilograms',
        };
        for (let unit in spelledOutUnits) {
            assert.strictEqual(convertHandler.spellOutUnit(unit), spelledOutUnits[unit]);
        }
    });

    // Conversion tests
    test('Should correctly convert gal to L', function () {
        assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
    });

    test('Should correctly convert L to gal', function () {
        assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
    });

    test('Should correctly convert mi to km', function () {
        assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
    });

    test('Should correctly convert km to mi', function () {
        assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
    });

    test('Should correctly convert lbs to kg', function () {
        assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
    });

    test('Should correctly convert kg to lbs', function () {
        assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
    });
});