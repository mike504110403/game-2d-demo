# Cocos Creator 專案開啟指南

## 🎯 解決方案

### 問題 1: JavaScript 腳本錯誤
**已修正**: 重新建立了符合 Cocos Creator 格式的 JavaScript 腳本

### 問題 2: 無法用 Cocos Creator 開啟專案
**解決方案**: 建立正確的專案結構和配置文件

## 📁 正確的專案結構

```
game-2d-demo/
├── project.json              # 專案配置文件
├── settings/
│   └── project.json          # 專案設定
├── assets/
│   ├── scripts/
│   │   ├── managers/
│   │   │   └── GameManager.js    # 遊戲管理器
│   │   └── components/
│   │       ├── PlayerController.js  # 玩家控制器
│   │       └── CameraFollow.js      # 相機跟隨
│   ├── scenes/               # 場景文件夾
│   ├── textures/             # 圖片資源
│   ├── animations/           # 動畫資源
│   ├── prefabs/              # 預製體
│   ├── audio/                # 音效資源
│   └── fonts/                # 字體資源
├── build/                    # 建置輸出
├── temp/                     # 暫存文件
├── library/                  # 庫文件
└── local/                    # 本地設定
```

## 🚀 開啟專案步驟

### 第一步: 確保 Cocos Creator 已安裝
1. 開啟 Cocos Dashboard
2. 確認已安裝 Cocos Creator 3.8.x
3. 如果沒有，請下載並安裝

### 第二步: 開啟專案
1. 在 Cocos Creator 中選擇「開啟專案」
2. 選擇您的專案資料夾: `/Users/mike/Documents/self/game-2d-demo`
3. 等待專案載入

### 第三步: 建立基本場景
1. 建立新場景 (File → New Scene)
2. 儲存場景為 `MainScene.scene`

### 第四步: 建立玩家角色
1. 在場景中建立一個 Sprite 節點
2. 命名為 "Player"
3. 附加以下組件:
   - RigidBody2D (Type: Dynamic)
   - Collider2D (Shape: Box)
   - PlayerController 腳本

### 第五步: 設定相機
1. 選擇 Main Camera
2. 附加 CameraFollow 腳本
3. 設定 target 為 Player 節點

### 第六步: 建立地面
1. 建立一個 Sprite 節點
2. 命名為 "Ground"
3. 附加 Collider2D 組件 (Type: Static)

## 🔧 腳本使用說明

### GameManager.js
- **用途**: 遊戲核心管理器
- **使用**: 建立空節點，附加此腳本

### PlayerController.js
- **用途**: 玩家角色控制
- **使用**: 附加到玩家節點上
- **功能**: 移動、跳躍控制

### CameraFollow.js
- **用途**: 相機跟隨玩家
- **使用**: 附加到 Main Camera 上
- **功能**: 平滑跟隨玩家移動

## 🎮 控制說明

- **移動**: A/D 鍵或左右箭頭鍵
- **跳躍**: 空格鍵或 W 鍵

## 📝 常見問題解決

### 問題: 專案無法開啟
**解決方案**:
1. 檢查專案路徑是否正確
2. 確認 Cocos Creator 版本相容
3. 重新建立專案並複製資源

### 問題: 腳本無法附加
**解決方案**:
1. 確認腳本檔案在 `assets/scripts/` 資料夾中
2. 重新整理 Cocos Creator 資源面板
3. 檢查腳本語法是否正確

### 問題: 玩家無法移動
**解決方案**:
1. 檢查 RigidBody2D 組件設定
2. 確認物理系統已啟用
3. 檢查 Collider2D 組件

## 💡 重要提醒

1. **使用正確的腳本格式**: 現在所有腳本都使用 `cc.Class()` 格式
2. **專案結構**: 確保專案結構符合 Cocos Creator 要求
3. **物理系統**: 記得啟用物理系統
4. **測試功能**: 在 Cocos Creator 中測試所有功能

現在您應該可以用 Cocos Creator 正常開啟專案了！
