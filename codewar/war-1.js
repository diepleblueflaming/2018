'use strict';

/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 18/07/2018 - 19:14
 */

/**
 * Write a function, persistence, that takes in a positive parameter num and
 * returns its multiplicative persistence,
 * which is the number of times you must multiply the digits in num until you reach a single digit.
 * ex: persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4 and 4 has only one digit
 *
 */


function persistence(num) {
    let l = (num + '').split('');
    if (l.length === 1) {
        return 0;
    }
    let mul = l.reduce((a, c) => parseInt(a) * parseInt(c), 1);
    return 1 + +persistence(mul);
}
