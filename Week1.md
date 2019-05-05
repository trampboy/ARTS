### Algorithm
#### 问题
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例：
```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

#### 思考
首先想到的是穷举法，因为不能重复利用这个数组中的同样的元素，所以数组中有4个数字，就有12种组合，依次相加，知道得出结果。

#### 解答
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (i = 0; i < nums.length - 1; i++) {
        for (j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
            continue;
        }
    }
};
```

#### 反思
穷举法毕竟效率比较低下，思考是否有更好的方案。看了解决方案之后，还有两种更好的解决方案。
##### 两遍哈希表
通过哈希表缩短查找的时间
第一遍遍历创建哈希表，第二遍判断```Target-nums[i]```是否存在于表中。
```JavaScript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (int i = 0; i < nums.length; i++) {
        map.put[nums[i], i];
    }
    for (int i = 0; i < nums.length; i++) {
        const remain = target - nums[i];
        if (map.has(remain) && map.get(remain) != i) {
            return [i, map.get(remain)];
        }
    }
};
```
##### 一遍哈希表
在迭代中判断```Target-nums[i]```是否存在于表中，如果不存在，则插入哈希表，否则返回结果。
```JavaScript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (int i = 0; i < nums.length; i++) {
        const remain = target - nums[i];
        if (map.has(remain) && map.get(remain) != i) {
            return [i, map.get(remain)];
        }
        map.put[nums[i], i];
    }
};
```

### Review
[How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
该文章主要介绍单测应该以实例优先，而不是单测覆盖率优先。写单测时排优先级，影响核心功能的实例优先完成单测。

### Tip
#### JavaScript执行顺序的坑
最近Code Review时，被同事指出一个因为JavaScript执行顺序导致的问题，在这里进行一个总结。

```JavaScript
// 更新BoxId
safeFreshBoxId(boxId) {
  return new Promise(resolve => {
    if (this.globalData.token) {
      return resolve(this.freshBoxId(boxId));
    } else {
      this.once("app:token:success", () => {
        resolve(this.freshBoxId(boxId));
      });
    }
  })
}
```

需求是如果当前boxId和被替换boxId不相同，在替换成功后发出消息。修改如下
```JavaScript
// 更新BoxId
safeFreshBoxId(boxId) {
  this.getBoxId().then(curBoxId => {
      return new Promise(resolve => {
        if (this.globalData.token) {
          return resolve(this.freshBoxId(boxId));
        } else {
          this.once("app:token:success", () => {
            resolve(this.freshBoxId(boxId));
          });
        }
      }).then(() => {
        if (curBoxId != boxId) {
          this.trigger("app:safeFreshBoxId:boxChange");
        }
        return Promise.resolve();
      });
    });
}
```

这里的问题就是```freshBoxId()```会被延后执行，导致接下来的同步函数使用旧的boxId。

原因就是```.then()```作为异步函数，将在全部的同步函数执行结束，再根据注册顺序执行，而在修改前，
```JavaScript
return new Promise(resolve => {
    if (this.globalData.token) {
      return resolve(this.freshBoxId(boxId));
    } else {
      this.once("app:token:success", () => {
        resolve(this.freshBoxId(boxId));
      });
    }
    })
```
```new Promise(resolve => {})```会被立即执行

最后修改如下：
```JavaScript
safeFreshBoxId(boxId) {
  const curBoxId =
    (this.globalData.token && this.globalData.token.boxId) || 0;
  return new Promise(resolve => {
    if (this.globalData.token) {
      return resolve(this.freshBoxId(boxId));
    } else {
      this.once("app:token:success", () => {
        resolve(this.freshBoxId(boxId));
      });
    }
  }).then(() => {
    if (curBoxId != boxId) {
      this.trigger("app:safeFreshBoxId:boxChange");
    }
    return Promise.resolve();
  });
}
```

### Share
#### JavaScript异步/同步代码执行顺序
前面刚好提到```JavaScript执行顺序的坑```，我就展开具体谈谈。本篇文章大部分是参考文献[JavaScript: Execution of Synchronous and Asynchronous codes](https://medium.com/@siddharthac6/javascript-execution-of-synchronous-and-asynchronous-codes-40f3a199e687)，觉得不错，在此分享。

在展开谈谈之前，我们先聊聊「JavaScript引擎」和「JavaScript运行环境」，因为在接下里的描述中会提到。
##### JavaScript引擎
解析脚本和将其转换成可执行命令的程序
##### JavaScript运行环境
执行命令中所需的工具、服务和函数库

##### 同步任务
![Sync task](https://cdn-images-1.medium.com/max/1600/1*w5OfUVZk_FXBZ3Cbv9d3IA.png)

1. Step 1，```First()函数体```被放入堆栈，执行时遇到```Second()函数体```
2. Step 2，```Second()函数体```被放入堆栈，执行时遇到```Third()函数体```
3. Step 3，```Third()函数体```被放入堆栈，执行结束后移出堆栈
4. Step 4，引擎继续执行```Second()函数体```，执行结束后移出堆栈
5. Step 5，引擎继续执行```First()函数体```，执行结束后移出堆栈

##### 异步任务
![Async tasl](https://cdn-images-1.medium.com/max/1600/1*jL3DKqpxzQeiJgoIW9PaEA.png)
1. Step 1，```console.log("Hello ")```被放入堆栈，执行结束后移出堆栈
2. Step 2，```setTimeout(callback, 2000)```被放入堆栈，```setTimeout```不是JavaScript引擎，是Web APIs，执行成功后移除堆栈
3. Step 3，```console.log( "I am" )```被放入堆栈，执行结束后移出堆栈
4. Step 4，因为Web APIs不能直接将函数体插入堆栈，所以2秒后，被插入```Callback Queue/Task Queue```
5. Step 5，```Event Loop```，当堆栈为空时，将```Callback Queue/Task Queue```里的第一个元素插入堆栈
6. Step 6，```console.log("Siddhartha")```被放入堆栈，执行结束后移出堆栈


### 参考文献
[JavaScript: Execution of Synchronous and Asynchronous codes](https://medium.com/@siddharthac6/javascript-execution-of-synchronous-and-asynchronous-codes-40f3a199e687)
