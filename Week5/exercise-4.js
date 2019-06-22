"use strict";
/**
 * 最大子序和
 * https://leetcode-cn.com/problems/maximum-subarray/
 *
 * Created by JingHongGang on 2019-06-22.
 */

/**
 *
 * 遍历性能太差
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray1 = function(nums) {
    let max = nums[0];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (nums[j] <= 0 && i !== j) {
                continue
            }
            let tmp = nums.slice(i, j + 1);
            let tmpSum = 0;
            tmp.forEach(val => tmpSum += val);
            if (tmpSum > max) {
                max = tmpSum;
            }
        }
    }
    return max;
};

console.assert(maxSubArray1([-2,1,-3,4,-1,2,1,-5,4]) === 6, "maxSubArray1 input [-2,1,-3,4,-1,2,1,-5,4] return 6 false");
console.assert(maxSubArray1([-1]) === -1, "maxSubArray1 input [-1] return -1 false");
console.assert(maxSubArray1([-1, -2]) === -1, "maxSubArray1 input [-1, -2] return -1 false");
console.assert(maxSubArray1([-2, -1]) === -1, "maxSubArray1 input [-2, -1] return -1 false");

/**
 *
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray2 = function(nums) {
    let ans = nums[0];// 当前最大连续子序列和
    let sum = 0; // 当前连续子序列和
    nums.forEach(val => {
        if (sum > 0) {
            sum += val;
        } else {
            sum = val;
        }
        ans = Math.max(ans, sum);
    });
    return ans;
};

console.assert(maxSubArray2([-2,1,-3,4,-1,2,1,-5,4]) === 6, "maxSubArray2 input [-2,1,-3,4,-1,2,1,-5,4] return 6 false");
console.assert(maxSubArray2([-1]) === -1, "maxSubArray2 input [-1] return -1 false");
console.assert(maxSubArray2([-1, -2]) === -1, "maxSubArray2 input [-1, -2] return -1 false");
console.assert(maxSubArray2([-2, -1]) === -1, "maxSubArray2 input [-2, -1] return -1 false");