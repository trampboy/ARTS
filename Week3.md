### Algorithm
#### 问题
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:
```
输入: 123
输出: 321
```

示例 2:

```
输入: -123
输出: -321
```

示例 3:

```
输入: 120
输出: 21
```

注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。


#### 解答
```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if (x > 2147483647 || x < -2147483648) {
        return 0;
    }
    // 记录正数还是负数
    let e = 1;
    if (x < 0) {
        e = -1;
    }
    const temp = [];
    let index = 1;
    x *= e;
    // 将整数拆分，倒序组成数组
    while(x >= Math.pow(10, index - 1)) {
        let y = x % Math.pow(10, index);
        x = x - y;
        y = y / Math.pow(10, index - 1)
        temp.push(y);
        index++;
    }
    
    let z = 0;
    // 数组翻转成整数
    for (let i = 0; i < temp.length; i++) {
        z += temp[i] * Math.pow(10, temp.length - i - 1)
    }
    z *= e;
    if (z > 2147483647 || z < -2147483648) {
        return 0;
    } else {
        return z;
    }
};
```

### Review
[HTTP headers for the responsible developer](https://www.twilio.com/blog/a-http-headers-for-the-responsible-developer)

该文章介绍了HTTP Header的最佳实践，包括安全、压缩、缓存、预加载等，非常值得一读。

### Tip
[retire](https://github.com/RetireJS/retire.js)

JavaScript库漏洞检测工具，用于Web和Node工程。可以通过命令号、Grunt、Gulp、Chrome/FireFox插件和Burp/OWASP Zap插件使用。

### Share
#### 分布式系统幂等性问题
#### 问题
最近有用户反馈出现同一节课重复预约的问题，对于这个问题，我收集了一些资料，在这里做个简单总结。

##### 原因
约课时，可能由于网络问题，响应慢，用户多次点击，客户端产生多次相同的请求，服务端接收到请求后，没有对操作过程进行锁定，最终导致数据库插入多条数据。

##### 目的
在执行约课操作时，保证约过的课不能再约。

##### 原理
建立分布式锁，具体可以参考[分布式系统互斥性与幂等性问题的分析与解决](https://tech.meituan.com/2016/09/29/distributed-system-mutually-exclusive-idempotence-cerberus-gtis.html)。

##### 方案
方案一 [单节点锁定算法](https://redis.io/commands/set)

使用`SET resource_name my_random_value NX PX 30000`创建锁，`NP`保证锁的互斥性，`PX`设置过期时间，保证不会死锁。使用`DEL resource_name`释放锁。

该算法比较简单，也能满足基本需求，但单节点redis宕机的会存在无法保证互斥性的问题，我们具体分析下以下情况。
由于Redis写入是异步的，如果客户端A请求锁，获得锁成功后执行操作，Redis还未写入就挂了，重启后客户端B请求锁，这样客户端A和客户端B同时拥有锁，客户端A在操作结束后，会把锁释放掉，这样客户端C和B同时拥有锁。如果你在意这种宕机的异常情况，就需要考虑方案二。

方案二 [单节点锁定算法优化版]((https://redis.io/commands/set))

在请求锁的时候，生成唯一随机数，在释放锁时，判断是否和随机数一致，只有一致时才释放锁，这样可以保证只释放自己加的锁。但该方案只能保证单节点Redis，如果是Redis集群，则需要使用方案四。

方案三 [Redlock算法](https://redis.io/topics/distlock)

[中文版](http://ifeve.com/redis-lock/)

有N个Redis节点，客户端获取锁时，依次轮询请求Redis节点，如果创建(N+1)个Redis锁，则加锁成功，如果加锁失败或者释放锁，则去除所有的Redis锁。

##### 反思
[Redlock算法](https://redis.io/topics/distlock)存在着缺陷，理论上网络延迟、过程暂停、时钟错误都是有可能存在的，导致超过结果不一致。例如：
客户端A获取锁A，在进行业务操作时，GC导致过程暂停，一段时间后锁A过期，客户端B获取锁A，这时客户端A过程恢复，同时持有锁的客户端A和B，就会导致结果不一致。关于这个问题的推论，详情可参看[how to do distributed locking](http://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)


### 参考文献
* [再谈幂等机制](https://juejin.im/post/5b134000e51d4506b9429e4a)
* [支付之订单重复支付](https://juejin.im/post/5c09ffc6e51d451dc066fcc3)
* [分布式系统互斥性与幂等性问题的分析与解决](https://tech.meituan.com/2016/09/29/distributed-system-mutually-exclusive-idempotence-cerberus-gtis.html)
* [redisson](https://github.com/redisson/redisson)
* [A better mutex for Node.js](https://medium.com/@the1mills/a-better-mutex-for-node-js-4b4897fd9f11)
* [《Redis官方文档》用Redis构建分布式锁](http://ifeve.com/redis-lock/)
* [Distributed locks with Redis](https://redis.io/topics/distlock)
* [how to do distributed locking](http://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)
* [node-redlock](https://github.com/mike-marcacci/node-redlock)
* [Centralizing Distributed Locks In Order To Provide Application-Oriented Semantics Around Locking In Node.js](https://www.bennadel.com/blog/3270-centralizing-distributed-locks-in-order-to-provide-application-oriented-semantics-around-locking-in-node-js.htm)
* [可重入锁](http://ifeve.com/java_lock_see4/)