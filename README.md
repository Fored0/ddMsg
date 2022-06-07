# warning


## 安装
    npm i -g warning

## 目录说明
src
    services -- 所有接口处理，每个接口一个文件，所有文件修改后，服务端都会重新加载修改的文件
    types
        cache.ts -- 每个用户的缓存cache定义，存用户状态
        service.ts -- 接口类型定义，不用改
    config.ts -- 服务器配置,所有配置都可以用命令行参数改比如 --serverUrl.centerUrl=127.0.0.1:7777
    global.ts -- 服务端全局变量

    index.ts -- 启动文件，如果想在监听包更新，自动重载，在里面加watchPackage

    protocol.ts -- 接口定义


## 调试
    npm run start

    所有services中的文件修改后都会自动重新加载，要自动加载额外的文件，要使用watchPackage

### 当项目引用其他npm包时，npm包不发布，直接调试
    ● 在npm包源码目录执行npm link
    ● npm包可以用tsc -w开启有代码变动自动编译，在package.json里加npm run start对应tsc -w
    ● 在服务器源码目录执行 npm link npm包名
    ● 修改npm包后服务端源码应该能自动生效