## 怎样集合redux到NextJs

#### 1. 服务端如何写入数据到store
#### 2. 如何同步服务端数据到客户端

+ **issue1**：

webpack 打包时候，会将Store 作为模块打包加载(与其他nodejs模块一样)，所以不同Client请求服务端数据会重用相同的store数据。

解决方法：
1. `./store`将store作为方法导出，client 每次render app page,都直接调用该方法新生成一个新的store.从而避免不同client复用。

代码：

store 导出
```javascript
export default function initializeStore(state) {
    const store = createStore(
        // 创建store方法
    )

    return store
}
```

server use:
```javascript
import React from 'react'
import createSore from '../store/store'

const isServer = typeof window === 'undefined'
const __NEXT_REUDX_STORE__ = '__NEXT_REUDX_STORE__'

function getOrCreateStore(initialState) {
  if (isServer) {
    return createSore(initialState)// 服务端直接创建新的store
  }

  if (!window[__NEXT_REUDX_STORE__]) {
    window[__NEXT_REUDX_STORE__] = createSore(initialState)// 首次创建新的store
  }
  return window[__NEXT_REUDX_STORE__]//存在就直接return
}
}
//....
```
+ issues 2
    Comp.getInitialProps 方法直接讲数据序列化为如下格式：
    ```
    <script id="__NEXT_DATA__" type="application/json">
      {"props":{"pageProps":{"test":"123"},"initialReduxState":{"counter":{"count":3},"user":{"username":"jokcy"}}},"page":"/","query":{},"buildId":"development"}</script
    ><script
      async=""
      id="__NEXT_PAGE__/"
      src="/_next/static/development/pages/index.js?ts=1554714764101"
    ></script
    ><script
      async=""
      id="__NEXT_PAGE__/_app"
      src="/_next/static/development/pages/_app.js?ts=1554714764101"
    >
    ```

    考虑到，数据序列化以及反序列相关问题，直接用store.getState() 方法得到实时store.

    ``` javascript
    //... 接上
    export default Comp => {
    class WithReduxApp extends React.Component {
        constructor(props) {
        super(props)
        this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {

      const { Component, pageProps, ...rest } = this.props

      if (pageProps) {
        pageProps.test = '123'
      }

      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      )
    }
  }

    WithReduxApp.getInitialProps = async ctx => {
        const reduxStore = getOrCreateStore()

        ctx.reduxStore = reduxStore

        let appProps = {}
        if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx)
        }

        return {
        ...appProps,
        initialReduxState: reduxStore.getState(),// 直接get 快照，作为object 返回
        }
    }

    return WithReduxApp
```
