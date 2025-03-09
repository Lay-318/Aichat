# AI Chat Tool

一个基于DeepSeek API的智能聊天应用。

## 功能特点

- 实时聊天界面
- AI智能回复
- 支持markdown格式
- 响应式设计

## 项目结构

```
apps/
├── chat-ui/          # 前端应用
│   ├── src/          # 源代码
│   ├── public/       # 静态资源
│   └── package.json  # 依赖配置
│
└── chat-api/         # 后端服务
    ├── server.js     # 服务器入口
    └── package.json  # 依赖配置
```

## 安装和运行

### 前端

```bash
cd apps/chat-ui
npm install
npm run dev
```

### 后端

```bash
cd apps/chat-api
npm install
node server.js
```

## 环境变量

需要在 `apps/chat-api/.env` 文件中配置以下环境变量：

```
PORT=3000
DEEPSEEK_API_KEY=your_api_key
```

## 技术栈

- 前端：React, TypeScript, Ant Design
- 后端：Node.js, Express
- API：DeepSeek AI API 