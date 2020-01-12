## 基于Oauth 机制来获取Github-Oauth认证, 并通过Redis存储获得session 数据。 可以调用github api 数据

#### 1. OAUTH 是什么？
[OAuth 2.0](https://oauth.net/2/)  
OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.

可以参考阮一峰的[博客](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)，简单来讲简单说，OAuth 就是一种**授权机制**。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。
授权方式包含：
+ 授权码（authorization-code）
+ 隐藏式（implicit）
+ 密码式（password）
+ 客户端凭证（client credentials）


#### 2. 接入Gibhub- OAuth 具体步骤

本项目开发采取授权码方式，主要包含流程：
请求授权码，返回授权码，请求令牌，返回令牌

1. 在自己的Github Settings -> Developer settings 中设置 自己的Oauth apps,并得到Client ID,Client Secret.

![设置图片](https://.github.com/xkx9431/Next/master/doc/asserts/oauth_userInfo.PNG)

在`./next.config.js`下配置相关内容，让sever 在运行时候可以拿到 Client ID, Client Secret.

```javascript
github:{
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id,
        client_secret
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
    // SCOPE 认证的范围
```

2. 建立session-store,可以获取Redis 中相关数据，并存储session数据。

3. 根据认证得到的code`授权码`,来获取token，并且每次获取github 资源的时候带上 相关的session信息，其中session里面包含token 令牌， Client ID, Client Secret。
4. 注意 token 令牌， Client ID, Client Secret，需要放在sever端，不暴露给client user.

####  3. 接入接口处理完善机制
对于 client,server 的请求处理添加过滤分别处理机制。
具体参考`./server/api`,对于`·path.startsWith('/github/'`进行URL替换，然后基于`./lib/api`接口进行判断，如果是服务端渲染，那么请求url 开头为`'https://api.github.com'`,否则正常Koa处理.
