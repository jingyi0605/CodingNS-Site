# CodingNS 官网

这是 CodingNS 的独立官网项目，使用 `React + Vite + TypeScript` 实现，默认提供：

- 极简、以真实产品画面为主的单页展示体验
- 中英文切换
- 日间 / 夜间模式
- 面向普通用户的产品文案
- 可直接替换的图片占位与固定图片路径

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
