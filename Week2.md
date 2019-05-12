### Algorithm
#### 问题
给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

说明:

返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
示例:

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

#### 解答
```
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    const map = new Map();
    for (let i = 0; i < numbers.length; i++) {
        const value = target - numbers[i]
        if (map.has(value)) {
            return [map.get(value) + 1, i + 1]
        }
        map.set(numbers[i], i);
    }
    throw new Error("未找到答案")
};
```

### Review
[WHAT’S NEW IN WEBSTORM](https://www.jetbrains.com/webstorm/whatsnew/)

介绍WebStorm 2019.1新的特性：

JavaScript和TypeScript：
使用重构（Alt-Enter）进行数组和对象解构
使用重构（Alt-Enter）将Promise转换成async/await

框架：
新增Angular应用程序检查
更容易的Angular项目导航
改进Vue项目中对TypeScript的支持
使用重构提取React钩子
改进React props的代码完成

HTML和CSS：
支持HTML和CSS最新的文档
支持CSS的浏览器兼容性检查
支持对CSS模块的驼峰版本
提取CSS变量

测试：
突出显示测试中的失败行

工具：
新的调试器控制台
自动完成npm脚本输入
改进对lint的支持
支持Docker Compose
依赖项的版本范围提示

IED：
新的UI主题
最近位置的弹出
将项目另存为模板

### Tip
[Wallaby](https://wallabyjs.com)

Wallaby.js是JavaScript持续集成测试工具，在修改代码时自动执行测试 ，区别显示结果（包括代码覆盖率、异常和控制台学习）。

### Share
#### SQL注入问题
前段时间自己在写API的时候，被同事Code Review时发现写的不严谨，可以被SQL注入。知道后我就查了下相关的资料，具体内容下面都有，感兴趣可以细看。


#### 参考文献
[渗透攻防Web篇-SQL注入攻击初级](http://bbs.ichunqiu.com/thread-9518-1-1.html)

[渗透攻防Web篇-SQL注入攻击中级](https://bbs.ichunqiu.com/thread-9668-1-1.html)

[渗透攻防Web篇-SQL注入攻击高级](https://bbs.ichunqiu.com/thread-10093-1-1.html)

[SQL_Injection_Prevention_Cheat_Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.md)

[防止SQL注入攻击的8个最佳实践](https://tableplus.io/blog/2018/08/best-practices-to-prevent-sql-injection-attacks.html)

[sql_injection](https://www.w3schools.com/sql/sql_injection.asp)