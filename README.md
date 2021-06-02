# taro-scaffold
taro 集成dva, redux，rn等脚手架，比官方的更加简便，store action等分开的文件夹太多利用dva来统一管理

## 入口

> app.tsx Provider，PersistGate持久化

> redux里面目录的文件基本不用动，除非需要添加状态持久化就在redux-persist.ts的persisteReducerEnhancer的whitelist属性，添加状态的namespace的value即可

> models里面都是定义的redux状态，可以看实例
