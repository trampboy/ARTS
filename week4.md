### Algorithm
#### 问题
[回文数](https://leetcode-cn.com/problems/palindrome-number/)
#### 思考

#### 解答
```javascript
var isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  const strX = String(x);
  const palindromeX = [];
  for (let i = 0, n = strX.length; i < n; i++) {
    palindromeX.unshift(strX[i]);
  }
  return strX === palindromeX.join('');
};
```
#### 反思

### Review
[Streamline Code Reviews with ESLint + Prettier](https://medium.com/javascript-scene/streamline-code-reviews-with-eslint-prettier-6fb817a6b51d),该文章介绍了开发技巧。1.使用TDD。2.使用ESLint和Prettier格式化代码和找到代码异常。3.使用[Zeit Now](https://zeit.co/now)持续部署。4.使用watch脚本，在修改代码时自动执行lint和单测。

### Tip
[ola](https://github.com/franciscop/ola/)，一个很不错的CSS 动画库。

### Share
#### JavaScript概念笔记
##### 纯函数和非纯函数
* 纯函数指的是输出只与输入有关，只依赖于内部状态，只要输入不变，输出总是相同。
* 非纯函数指的是依赖外部状态，输出不总是相同。

##### 有状态和无状态
* 有状态指的是存储数据在内存中，并且随时可以修改
* 


##### 不可变和可变

##### 命令式编程和声明式编程

##### 高阶函数

##### 函数式编程

##### 热监听和冷监听

##### 响应式编程

##### 响应函数式编程

[编程范式](https://auth0.com/blog/glossary-of-modern-javascript-concepts/)

### 参考文献

