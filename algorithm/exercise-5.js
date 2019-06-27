"use strict";
/**
 * 爬楼梯
 * https://leetcode-cn.com/problems/climbing-stairs/
 *
 * Created by JingHongGang on 2019-06-27.
 */

var climbStairs = function(n) {
    let cache = [];
    return climb_Stairs(n, cache)
};

function climb_Stairs(n, cache) {
    if ( n <= 0) {
        throw new Error("输入值必须大于0");
    }
    if (cache[n] > 0) {
        return cache[n]
    }
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    cache[n] = climb_Stairs(n - 2, cache) + climb_Stairs(n -1, cache);
    return cache[n]
}

console.assert(climbStairs(2) === 2, "input climbStairs with 2 return 2");
console.assert(climbStairs(3) === 3, "input climbStairs with 3 return 3");
console.assert(climbStairs(5) === 8, "input climbStairs with 5 return 8");
