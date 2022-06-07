import { createServerConfig } from "@gswl/netkit";
/**
 * !!!!
 * 注意启动时config文件变化时，会自动重新加载config，所有使用config.xxx的地方都会改变
 *
 * 服务端配置定义,启动服务端时用 -c xxx.json指定文件，启动时加参数 -t xxx，可以强制修改配置的tag
 * config格式必要参数如下,tag代表本服务器类型，客户端通过tag，从centerUrl的服务器来查找自己要连接的服务器
 * {
 *    "server": {
 *       "tag": "xxxx",
 *    }
 * }
 *
 * 多服务器时，必要参数多一个centerUrl
 * {
 *    "server": {
 *       "centerUrl":"127.0.0.1:7881",
 *       "tag": "xxxx",
 *    }
 * }
 */

export default createServerConfig({
   server: { 
        centerUrl: "192.168.3.207:10022",
        tag: "warning", 
        enableHttp: true,
     },
});
