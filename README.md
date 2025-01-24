# Mi-AI-Schedule-BISTU
小爱课程表-北京信息科技大学(BISTU)-2025最新适配


## 工作原理

**Provider** 负责获取必要的 HTML，代码的运行环境在本地，可直接进行 DOM 操作，返回值是字符串

**Parser** 负责将字符串解析成小爱课程表可识别的格式（参考官方文档），代码的运行环境在服务器，不可直接进行 DOM 操作，返回值是对象数组

**Timer** 负责设置课程表的时间配置，代码的运行环境在本地，可直接进行 DOM 操作，返回值是对象


## 参考文档

小爱课程表官方文档：https://open-schedule-prod.ai.xiaomi.com/docs/#/help/

小爱课程表开发者资源库：https://open-schedule-prod.ai.xiaomi.com/docs/#/assets/

小爱课程表更新日志：https://open-schedule-prod.ai.xiaomi.com/docs/#/release/


## 小爱课程表开发者工具本地调试工具

[x] 使用WebSocket将NodeWatch监听到的文件变动发送到开发者工具
[x] Parser本地调试环境，完全模拟服务器处理环境

### 使用说明

首先修改`config.ini`，根据注释修改为自己对应的文件，保存间隔最好还是不要低于300，通信和处理信息都需要时间

lock文件是使用了淘宝镜像源的，可以直接`npm i`

随后就可以运行脚本`npm run start`

此时打开开发者工具，进入`版本详情`Tab，如果代码编写右边出现绿色链接标志，则表明链接成功

修改你在`config.ini`配置的代码文件，则会自动同步到代码框中

> 注意：不要在输入框弹出的时候使用，是不生效的

本工具还附带了模拟服务器环境运行parser的功能，在进行本地测试时会自动调用

如需debug需要自行关注命令行输出
