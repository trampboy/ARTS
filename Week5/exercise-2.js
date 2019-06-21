"use strict";
/**
 * Created by JingHongGang on 2019-06-20.
 */
var isValid1 = function(s) {
    let rightArray = [")", "]", "}"];
    let map = new Map([["(", ")"], ["[", "]"], ["{", "}"]]);
    let char = s.slice(0, 1);
    if (!char) {
        return true
    }
    if (rightArray.includes(char)){
        return false
    }
    let arrayChar = [char];
    s = s.slice(1);
    for (let v of s) {
        let leftChar = arrayChar.pop();
        if (leftChar) {
            if (map.get(leftChar) === v) {
                continue
            }
            arrayChar.push(leftChar);
        }
        arrayChar.push(v);
    }
    return arrayChar.length === 0
};

console.assert(isValid1("()") === true, "isValid1 input '()' return true");
console.assert(isValid1("()[]{}") === true, "isValid1 input '()[]{}' return true");
console.assert(isValid1("([)]") === false, "isValid1 input '([)]' return false");
console.assert(isValid1("{[]}") === true, "isValid1 input '{[]}' return true");
console.assert(isValid1("") === true, "isValid1 input '' return true");

var isValid2 = function(s) {
    let map = new Map([[")", "("], ["]", "["], ["}", "{"]]);
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        if (map.has(char)) {
            let topElement = stack.length === 0 ? "#" : stack.pop();
            if (topElement !== map.get(char)) {
                return false
            }
        } else {
            stack.push(char)
        }
    }
    return stack.length === 0;
};

console.assert(isValid2("()") === true, "isValid2 input '()' return true");
console.assert(isValid2("()[]{}") === true, "isValid2 input '()[]{}' return true");
console.assert(isValid2("([)]") === false, "isValid2 input '([)]' return false");
console.assert(isValid2("{[]}") === true, "isValid2 input '{[]}' return true");
console.assert(isValid2("") === true, "isValid2 input '' return true");