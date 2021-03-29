#前端界面展示（待定）

## 项目模板来源
https://github.com/PanJiaChen/vue-admin-template

## 安装：
nodejs环境

python3环境

根目录下执行
```shell script
npm install
pip install werkzeug flask flask_cors
```

我这里用了伪后端(为了开发方便，后期融合到django中，到时候再进行更改)，伪后端服务器在python_web_upload 文件夹下，

## 项目测试
需要开两个终端
1. 开启伪后端服务器
```shell script
cd python_web_upload
python app.py
```
2.项目运行
```shell script
npm run dev
```

## 主要改动文件
在模板的基础上新增了以下文件夹：

src/views/Celebrity

src/views/CycleGAN

src/views/RealTimeVoiceCloning

src/views/Asvspoof

修改了路由文件

src/router/index.js

全局背景样式在

src/layout/components/AppMain.vue

