"use strict";
function secondLargest(arr) {
    if (arr.length < 2)
        return undefined;
    let max = -Infinity;
    let secondMax = -Infinity;
    for (const num of arr) {
        if (num > max) {
            secondMax = max;
            max = num;
        }
        else if (num > secondMax && num !== max) {
            secondMax = num;
        }
    }
    return secondMax === -Infinity ? undefined : secondMax;
}
console.log(secondLargest([20, 120, 111, 215, 54, 78]));
