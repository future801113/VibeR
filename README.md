# Quest VR Gallery 🥽

一個專為 Meta Quest 2 設計的 WebXR 圖片瀏覽器，讓你在虛擬實境中瀏覽圖片收藏。

## ✨ 特色功能

- 🥽 **完整 VR 支援** - 專為 Meta Quest 2 最佳化
- 🎮 **多種互動方式** - 支援控制器、手部追蹤和凝視互動
- 🖼️ **沉浸式圖片瀏覽** - 360° 圓形畫廊佈局
- 🎨 **美麗的 3D 環境** - 森林場景與動態光效
- 📱 **響應式設計** - 同時支援桌面和 VR 瀏覽器
- 🔗 **整合現有圖片** - 可連接到 i-love-col 專案圖片

## 🚀 快速開始

### 系統需求

- Node.js 16+ 
- Meta Quest 2 (或其他 WebXR 相容設備)
- 支援 WebXR 的瀏覽器 (Chrome, Edge, Firefox Reality)

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

### GitHub Pages 部署

1. **推送程式碼到 GitHub**
2. **啟用 GitHub Pages**：
   - 到 repository 的 Settings > Pages
   - Source 選擇 "GitHub Actions"
3. **自動部署**：每次推送到 main/master 分支會自動觸發部署

部署後可透過以下網址訪問：
- **線上版本**：`https://future801113.github.io/VibeR/`
- **Quest 2 HTTPS 支援**：完整 WebXR 功能需要 HTTPS

### 在 Quest 2 中測試

#### 本地開發測試
1. 確保 Quest 2 和電腦在同一個 WiFi 網路
2. 啟動開發伺服器：`npm run dev`
3. 記下顯示的本地 IP 位址 (例如：`http://192.168.1.100:3000`)
4. 在 Quest 2 的瀏覽器中開啟該網址
5. 點擊 "Enter VR" 按鈕進入 VR 模式

#### 生產環境測試（推薦）
1. 部署到 GitHub Pages
2. 在 Quest 2 瀏覽器中開啟 HTTPS 網址
3. 享受完整的 WebXR 功能

## 🎮 使用方式

### 桌面瀏覽器
- **滑鼠點擊** - 選擇圖片
- **WASD 鍵** - 移動視角
- **滑鼠拖拽** - 旋轉視角

### Quest 2 VR 模式
- **控制器雷射** - 指向並觸發選擇圖片
- **手部追蹤** - 直接用手指點擊
- **頭部移動** - 自然地環顧四周
- **握拳手勢** - 選擇物件（手部追蹤模式）

## 📁 專案結構

```
quest-vr-gallery/
├── index.html          # A-Frame VR 場景定義
├── main.js             # 核心 JavaScript 邏輯
├── style.css           # VR UI 樣式
├── vite.config.js      # Vite 建置配置
├── package.json        # 專案配置和依賴
└── .github/
    └── copilot-instructions.md
```

## 🛠️ 技術細節

### 核心技術
- **A-Frame 1.5.0** - WebXR 框架
- **Vite** - 快速建置工具
- **Vanilla JavaScript** - 純 JavaScript，無框架依賴

### VR 最佳化
- 60fps 渲染目標
- 最佳化材質和幾何體
- 高效的事件處理
- 記憶體管理

### 支援的 VR 功能
- ✅ 6DOF 頭部追蹤
- ✅ 控制器輸入
- ✅ 手部追蹤 (實驗性)
- ✅ 空間音效
- ✅ 觸覺回饋

## 🔗 整合 i-love-col 圖片

專案已經自動整合你的 i-love-col 圖片！

### 自動載入來源
1. **images 目錄**：從 `https://future801113.github.io/i-love-col/images/images.json` 載入
2. **colne_icol_images 目錄**：從 `https://future801113.github.io/i-love-col/colne_icol_images/images.json` 載入
3. **預設圖片**：如果無法載入則顯示範例圖片

### JSON 檔案格式
圖片資料從以下 JSON 檔案載入：
```json
[
  {
    "url": "images/sample_image_1.jpg",
    "title": "圖片標題"
  },
  {
    "url": "colne_icol_images/sample_image_2.jpg", 
    "title": "另一張圖片"
  }
]
```

### 圖片 URL 組成
完整圖片網址 = `https://future801113.github.io/i-love-col/` + `url 欄位的值`

### 手動設定（可選）
如果需要指定不同的圖片來源，可修改 `main.js` 中的 `loadILoveColImages()` 函數：

```javascript
// 修改圖片基礎 URL
const baseUrl = 'https://your-custom-domain.github.io/your-repo';
```

### 支援的圖片格式
- JPG/JPEG
- PNG  
- 建議尺寸：512x512 (VR 最佳化)

## 🎨 自訂設定

### 變更場景環境
在 `index.html` 中修改環境設定：
```html
<a-entity environment="preset: forest; groundColor: #445; grid: cross">
```

可用預設：`default`, `contact`, `egypt`, `checkerboard`, `forest`, `goaland`, `yavapai`, `goldmine`, `threetowers`, `poison`, `arches`, `tron`, `japan`, `dream`, `volcano`, `starry`, `osiris`

### 調整畫廊佈局
在 `index.html` 的 `#image-frames` 區塊中修改圖片位置和角度。

## 🐛 疑難排解

### Quest 2 無法載入頁面
- 確認防火牆設定
- 檢查網路連線
- 嘗試使用 IP 位址而非 localhost

### VR 模式無法啟動
- 確認瀏覽器支援 WebXR
- 檢查 HTTPS 憑證 (生產環境需要)
- 重新啟動 Quest 2 瀏覽器

### 效能問題
- 減少同時顯示的圖片數量
- 最佳化圖片大小 (建議 512x512)
- 關閉不必要的視覺效果

## 📝 開發注意事項

- VR 開發需要實際設備測試
- 注意使用者舒適度，避免快速移動
- 提供多種互動方式以增加可用性
- 定期檢查 WebXR 規格更新

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License - 詳見 LICENSE 檔案

---

**享受你的 VR 圖片瀏覽體驗！** 🚀✨
