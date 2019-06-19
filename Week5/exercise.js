"use strict";
/**
 * 罗马数字转整数
 * https://leetcode-cn.com/problems/roman-to-integer/
 *
 * Created by JingHongGang on 2019-06-19.
 */
var romanToInt = function(s) {
    let map = new Map([["I", 1], ["V", 5], ["X", 10], ["L", 50], ["C", 100], ["D", 500], ["M", 1000], ["IV", 4], ["IX", 9], ["XL", 40], ["XC", 90], ["CD", 400], ["CM", 900]]);
    let sum = 0;
    let index = 0;
    while (s.length > index) {
        let value = 0;
        let num = 1;
        let isTowChar = true;
        while (num <= 2) {
            let key = s.slice(index, index + num);
            if (map.has(key)) {
                value = map.get(key);
                isTowChar =  num === 2;
            }
            num++;
        }
        sum += value;
        index += (isTowChar ? 2 : 1);
    }
    return sum;
};
console.assert(romanToInt("III") === 3, "romanToInt input III return 3 false");
console.assert(romanToInt("IV") === 4, "romanToInt input IV return 4 false");
console.assert(romanToInt("LVIII") === 58, "romanToInt input LVIII return 58 false");
console.assert(romanToInt("MCMXCIV") === 1994, "romanToInt input MCMXCIV return 1994 false");

var romanToInt2 = function(s) {
    let map = new Map([["I", 1], ["V", 5], ["X", 10], ["L", 50], ["C", 100], ["D", 500], ["M", 1000], ["IV", 3], ["IX", 8], ["XL", 30], ["XC", 80], ["CD", 300], ["CM", 800]]);
    let sum = map.get(s.slice(0, 1));
    for (let i = 1; i < s.length; i++) {
        let one = s.slice(i, i + 1);
        let two = s.slice(i -1, i + 1);
        sum += map.has(two) ? map.get(two) : map.get(one);
    }
    return sum;
};

console.assert(romanToInt2("III") === 3, "romanToInt2 input III return 3 false");
console.assert(romanToInt2("IV") === 4, "romanToInt2 input IV return 4 false");
console.assert(romanToInt2("LVIII") === 58, "romanToInt2 input LVIII return 58 false");
console.assert(romanToInt2("MCMXCIV") === 1994, "romanToInt2 input MCMXCIV return 1994 false");