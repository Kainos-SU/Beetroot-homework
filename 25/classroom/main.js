"use strict";

function minNumber (arg1, arg2) {
    return arg1 > arg2 ? arg2 : arg1;
}

const min = (arg1, arg2) => arg1 > arg2 ? arg2 : arg1;

function pow (number, power) {
    power = Math.abs(power);
    if (power === 0) {
        return 1;
    }

    return number * pow(Math.abs(number), power-1);
}

function moduleDiv (num1, num2) {
    let temp = Math.floor(num1 / num2);
    temp *= num2;
    return num1 - temp;
}