'use strict';

/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 14/07/2018 - 05:49
 */

function basic_deep_merge(target, source) {
    let destination = {...source, ...target};
    return JSON.parse(JSON.stringify(destination));
}

function _pick(obj, keys) {
    keys = typeof keys === 'string' ? [keys] : keys;
    let listObj = keys.map((k) => k in obj ? {[k]: obj[k]} : {});
    return listObj.reduce(function (expectObj, currentEle) {
        return basic_deep_merge(expectObj, currentEle);
    }, {});
}

const std = {
    name: 'john doe',
    age: 23,
    major: ['C', 'C++', 'JS', 'CSS', 'HTML']
};

const majors = _pick(std, 'major');

std.major.push('JAVA');
console.log(std);
console.log(majors);


function _reject(obj, keys) {
    keys = typeof keys === 'string' ? [keys] : keys;
    let listObj = Object.keys(obj).map((key) => {
        return !keys.includes(key) ? {} : {[key]: obj[key]};
    });
    return listObj.reduce(function (expectObj, currentEle) {
        return basic_deep_merge(expectObj, currentEle);
    }, {});
}

let stdRejectNameAge = _reject(std, ['name', 'age']);
std.major.pop();
console.log(std);
console.log(stdRejectNameAge);
