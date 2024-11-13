# AI 臣服声明生成器

一个趣味性的网页应用，生成独特的 AI 臣服声明。用户可以获得专属的 AI 臣服 ID 和个性化的臣服声明文本，支持将声明保存为精美的卡片图片。
<img width="1505" alt="image" src="https://github.com/user-attachments/assets/32fceb4b-cdb5-4d2a-82bb-87fe6776c2a4">
<img width="1167" alt="image" src="https://github.com/user-attachments/assets/aedfe972-06c7-4aa2-9488-6b7371f7fe02">

## ✨ 特性

- 🤖 生成独特的 AI 臣服 ID
- 📝 使用 GPT 模型生成个性化臣服声明
- 🎨 精美的卡片设计
- 🖼️ 支持导出 16:9 比例的图片
- 📱 完美支持移动端
- 🌓 支持浅色/深色主题

## 🛠️ 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式系统
- [Framer Motion](https://www.framer.com/motion/) - 动画效果
- [html2canvas](https://html2canvas.hertzen.com/) - 图片生成
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库

## 🚀 本地开发

1. 克隆项目
```bash
git clone https://github.com/yourusername/ai-surrender.git
```

2. 安装依赖
```bash
cd ai-surrender
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```

在 `.env.local` 文件中添加你的 API key：
```env
OPENAI_API_KEY=你的API密钥
```

4. 启动开发服务器
```bash
npm run dev
```

5. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 📦 部署

项目使用 Next.js 构建，可以轻松部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-surrender)

## 🤝 贡献指南

欢迎贡献！请随时提交 Pull Request 或创建 Issue。

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有贡献者的付出
- UI 组件基于 [shadcn/ui](https://ui.shadcn.com/)
- 动画效果使用 [Framer Motion](https://www.framer.com/motion/)

## 📮 联系方式
![image](https://github.com/user-attachments/assets/c2687031-8d86-4fd8-9085-8b326069b113)

如果您有任何问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/yourusername/ai-surrender/issues)
- 项目讨论区 [Discussions](https://github.com/yourusername/ai-surrender/discussions)
