# 2D橫向捲軸遊戲開發專案

## 專案結構說明

### 主要資料夾
- `assets/` - 遊戲資源文件夾
  - `scenes/` - 遊戲場景文件
  - `scripts/` - 腳本文件
    - `managers/` - 管理器腳本 (場景管理、音效管理等)
    - `components/` - 組件腳本 (玩家控制、相機跟隨等)
    - `utils/` - 工具類腳本
    - `data/` - 資料結構定義
  - `textures/` - 圖片資源
  - `animations/` - 動畫資源
  - `prefabs/` - 預製體
  - `audio/` - 音效資源
  - `fonts/` - 字體資源

### 開發流程
1. 建立基本場景
2. 實作玩家控制器
3. 設定相機跟隨
4. 加入物理系統
5. 建立UI系統
6. 加入動畫效果

## 技術棧
- 前端: Cocos Creator 3.8.x
- 後端: Golang (後續開發)
- 通訊: WebSocket (後續整合)

## 開發環境需求
- Cocos Creator 3.8.x
- Node.js 16+
- TypeScript 4.9+