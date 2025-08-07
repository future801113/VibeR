<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# VR Gallery Project - Copilot Instructions

## 專案概述
這是一個 WebXR VR 圖片瀏覽器專案，專門為 Meta Quest 2 設計。使用 A-Frame 框架構建，支援 VR 環境中的圖片瀏覽和互動。

## 技術堆疊
- **前端框架**: Vite + Vanilla JavaScript
- **VR 框架**: A-Frame 1.5.0
- **目標平台**: Meta Quest 2, WebXR 相容瀏覽器
- **開發環境**: Node.js, Vite Dev Server

## 程式碼慣例

### JavaScript
- 使用 ES6+ 語法
- 採用模組化架構
- 事件驅動程式設計
- 為 VR 環境最佳化效能

### A-Frame 元件
- 使用語義化的實體名稱 (entity names)
- 遵循 A-Frame 的 ECS (Entity-Component-System) 架構
- 所有互動元素須添加適當的 class 名稱 (.clickable, .gallery-image)
- 使用 A-Frame 動畫系統而非 CSS 動畫

### VR 開發最佳實踐
- 確保所有互動元素適合 VR 環境 (大小、距離、可達性)
- 提供多種輸入方式支援 (控制器、手部追蹤、凝視)
- 最佳化效能以維持 VR 所需的高幀率
- 考慮使用者的舒適度 (避免動暈症)

## 特殊需求

### Quest 2 整合
- 支援 Quest 2 控制器互動
- 手部追蹤功能
- 效能最佳化設定
- 適當的 UI 縮放和定位

### 圖片整合
- 整合現有的 i-love-col 專案圖片
- 支援動態載入圖片
- 圖片預載和快取機制
- 支援多種圖片格式

### 輔助功能
- 提供多種互動方式
- 視覺回饋和音效回饋
- 清晰的導航指示
- 適當的文字大小和對比度

## 檔案結構說明
- `index.html`: 主要的 A-Frame 場景定義
- `main.js`: 核心 JavaScript 邏輯和事件處理
- `style.css`: VR UI 樣式和響應式設計
- `vite.config.js`: Vite 建置配置，包含 VR 開發最佳化

## 開發注意事項
- 測試時需要支援 WebXR 的瀏覽器
- 本地開發時使用 HTTP，生產環境需要 HTTPS
- Quest 2 測試需要在同一網路下訪問開發伺服器
- 注意 VR 環境中的使用者體驗和舒適度

當協助開發此專案時，請特別注意 VR 環境的特殊需求和 Quest 2 的硬體限制。
