"use strict";
/**
 * 合并两个有序链表
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 *
 * Created by JingHongGang on 2019-06-21.
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 递归
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists1 = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists1(l1.next, l2);
        return  l1;
    } else {
        l2.next = mergeTwoLists1(l1, l2.next);
        return l2;
    }
};

let l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(4);
let l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4)
let l3 = new ListNode(1);
l3.next = new ListNode(1);
l3.next.next = new ListNode(2);
l3.next.next.next = new ListNode(3);
l3.next.next.next.next = new ListNode(4);
l3.next.next.next.next.next = new ListNode(4);

function assert(l1, l2, message) {
    if (l1 === null) {
        console.assert(l1 === l2, message);
    } else {
        console.assert(l1.val === l2.val, message);
        assert(l1.next, l2.next);
    }
}

assert(mergeTwoLists1(l1, l2), l3, "mergeTwoLists1 input 1->2->4, 1->3->4 return 1->1->2->3->4->4 false");

/**
 * 迭代
 * @param l1
 * @param l2
 * @returns {*}
 */
var mergeTwoLists2 = function(l1, l2) {
    let prehead = new ListNode(-1);
    let prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }
    prev.next = l1 === null ? l2 : l1;
    return prehead.next;
};

assert(mergeTwoLists2(l1, l2), l3, "mergeTwoLists2 input 1->2->4, 1->3->4 return 1->1->2->3->4->4 false");