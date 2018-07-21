'use strict';

/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 19/07/2018 - 06:05
 */

/**
 * Sum all integer in range [a, b]
 * if a == b return a or b.
 */

function getSum(a, b) {
    if (a === b) {
        return a;
    }
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    return (max - min + 1) * (max + min) / 2;
}

console.log(getSum(3, -1) === 5);
