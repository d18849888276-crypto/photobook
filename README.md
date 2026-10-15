# 影集 · 2024.11 — 2026.10

997 张照片做成的 2D 翻页画册，纯静态网页，阅读器来自
[create-photo-flipbook-ui](https://github.com/HaichaoLihc/create-photo-flipbook-ui)。

**在线翻看：<https://d18849888276-crypto.github.io/photobook/>**

- 左右方向键 / 空格 / 拖动页面翻页；目录页可以点章节跳转；`?page=<n>` 可以直链到第 n 面
- 963 面、7 章，按 EXIF 拍摄时间排列
- 997 张全部收录，每张只出现一次；其中 116 个文件只剩"另存时间"，收在最后的《另存》
- 照片按原比例显示，未裁切、未调色；网页版长边压到 1024px

## 版权

照片版权归本人所有，请勿转载或二次使用。

## 技术

静态页面，无后端、无统计脚本。`assets/lazy.js` 只加载当前跨页附近的照片，
所以 997 张的册子也能秒开。构建脚本与原始画册在本地工作区 `E:\DHwork\vivo-photobook\`。
