# taro-scaffold
taro 集成dva, redux，rn等脚手架，比官方的更加简便，store action等分开的文件夹太多利用dva来统一管理

## redux-dva-core

> app.tsx Provider，PersistGate持久化

> redux里面目录的文件基本不用动，除非需要添加状态持久化就在redux-persist.ts的persisteReducerEnhancer的whitelist属性，添加状态的namespace的value即可

> models里面都是定义的redux状态，可以看实例

> 添加了redux统一入口，如redux-lifeccycle.ts,这两个方法在app.tsx中调用

```javascript
/**
 * 虽然文件名是声明周期，但是目前关注点都在启动过程，一下几个函数的含义是
 * beforeRunApp 在 redux 数据还原前执行，这时页面还没有加载，数据都是初始化状态 -> appWillMount
 * afterRehydrated 在 redux 数据还原后执行，紧随其后的是页面出现 -> appDidMount
 */

/**
 * 所有页面出现之前执行
 * **不要添加网络请求相关操作，如果超时会导致应用一直等待在启动页**
 */
export const beforeRunApp = function () {
    console.log("redux-lifecycle:beforeRunApp")
}

/**
 * redux 数据还原后执行
 */
export const afterRehydrated = function () {
    console.log("redux-lifecycle:afterRehydrated")
}
```

