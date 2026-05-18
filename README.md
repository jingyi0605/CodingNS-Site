# CodingNS 官网

这是 CodingNS 的独立官网项目，使用 `React + Vite + TypeScript` 实现。

当前官网文案已经按 `v0.8.0` 收口，重点覆盖这些能力：

- 工作区受控助手办公能力
- `office.browser` 真实浏览器桥接
- 静态 HTML 演示文档编辑与布局调整
- 更稳的安装、打包和运行时链路
- 多端继续、多 Host、文件 / Git / 终端协同

## 本地命令

```bash
pnpm --dir apps/codingns-site dev
pnpm --dir apps/codingns-site build
pnpm --dir apps/codingns-site preview
```

## 目录说明

- `src/content.ts`：官网全部双语文案与区块内容
- `src/App.tsx`：页面结构与交互
- `src/styles.css`：整站视觉样式
- `20260420-官网图片放置说明.md`：图片文件名与放置位置说明
