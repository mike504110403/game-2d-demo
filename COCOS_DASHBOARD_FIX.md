# Cocos Dashboard 問題解決指南

## 🚨 Cocos Dashboard 開不起來的解決方案

### 方法一：重新啟動 Cocos Dashboard
1. **完全關閉 Cocos Dashboard**
   - 在 Dock 中右鍵點擊 Cocos Dashboard
   - 選擇「退出」
   - 或使用 Activity Monitor 強制關閉

2. **重新啟動**
   - 從 Applications 資料夾重新開啟 Cocos Dashboard
   - 或從 Launchpad 重新啟動

### 方法二：清除快取和設定
1. **清除 Cocos Dashboard 快取**
   ```bash
   # 在終端機中執行
   rm -rf ~/Library/Caches/CocosDashboard
   rm -rf ~/Library/Preferences/com.cocos.dashboard.plist
   ```

2. **重新啟動 Cocos Dashboard**

### 方法三：重新安裝 Cocos Dashboard
1. **下載最新版本**
   - 前往 [Cocos 官網](https://www.cocos.com/creator)
   - 下載最新版本的 Cocos Dashboard

2. **完全移除舊版本**
   ```bash
   # 移除應用程式
   sudo rm -rf /Applications/CocosDashboard.app
   
   # 移除設定檔
   rm -rf ~/Library/Application\ Support/CocosDashboard
   rm -rf ~/Library/Caches/CocosDashboard
   rm -rf ~/Library/Preferences/com.cocos.dashboard.plist
   ```

3. **安裝新版本**
   - 下載並安裝最新版本

### 方法四：直接使用 Cocos Creator
如果 Dashboard 持續有問題，可以直接使用 Cocos Creator：

1. **找到 Cocos Creator 安裝位置**
   - 通常在 `/Applications/CocosCreator/` 或
   - `~/Library/Application Support/CocosDashboard/editors/`

2. **直接啟動 Cocos Creator**
   - 雙擊 Cocos Creator 應用程式
   - 選擇「開啟專案」
   - 選擇您的專案資料夾

## 🔧 替代方案：使用 Cocos Creator 直接開啟專案

### 步驟 1：找到 Cocos Creator
```bash
# 搜尋 Cocos Creator 安裝位置
find /Applications -name "*Cocos*" -type d
find ~/Library -name "*Cocos*" -type d
```

### 步驟 2：直接開啟專案
1. 開啟 Cocos Creator 應用程式
2. 選擇「開啟專案」
3. 瀏覽到您的專案資料夾：`/Users/mike/Documents/self/game-2d-demo`
4. 點擊「開啟」

## 🎯 專案開啟後的步驟

### 1. 建立基本場景
1. **建立新場景**
   - File → New Scene
   - 儲存為 `MainScene.scene`

2. **建立玩家角色**
   - 建立 Sprite 節點，命名為 "Player"
   - 附加 RigidBody2D 組件 (Type: Dynamic)
   - 附加 Collider2D 組件 (Shape: Box)
   - 附加 PlayerController 腳本

3. **設定相機**
   - 選擇 Main Camera
   - 附加 CameraFollow 腳本
   - 設定 target 為 Player 節點

4. **建立地面**
   - 建立 Sprite 節點，命名為 "Ground"
   - 附加 Collider2D 組件 (Type: Static)

### 2. 測試功能
- **移動**: A/D 鍵或左右箭頭鍵
- **跳躍**: 空格鍵或 W 鍵
- **相機跟隨**: 移動玩家觀察相機是否跟隨

## 💡 重要提醒

1. **TypeScript 警告已關閉**: 現在不會再看到 TypeScript 警告
2. **專案結構完整**: 所有必要的腳本都已準備就緒
3. **直接使用 Cocos Creator**: 如果 Dashboard 有問題，可以直接使用 Creator

## 🚀 下一步

1. 解決 Cocos Dashboard 問題
2. 開啟專案
3. 建立基本場景
4. 測試玩家控制和相機跟隨
5. 開始開發遊戲功能

現在您的專案已經完全準備就緒，可以開始開發了！
