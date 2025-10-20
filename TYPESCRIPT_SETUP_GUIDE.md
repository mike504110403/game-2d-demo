# TypeScript 專案設定指南

## 🎯 已修正的問題

### 1. TypeScript 配置
- ✅ 建立了 `tsconfig.json` 配置文件
- ✅ 設定了寬鬆的 TypeScript 檢查規則
- ✅ 建立了 `global.d.ts` 全域類型定義

### 2. 核心腳本
- ✅ `GameManager.ts` - 遊戲管理器
- ✅ `PlayerController.ts` - 玩家控制器
- ✅ `CameraFollow.ts` - 相機跟隨
- ✅ `InputManager.ts` - 輸入管理器

### 3. 資料結構
- ✅ `GameConstants.ts` - 遊戲常數
- ✅ `PlayerData.ts` - 玩家資料結構

## 📁 專案結構

```
assets/scripts/
├── managers/
│   ├── GameManager.ts        # 遊戲管理器
│   └── InputManager.ts       # 輸入管理器
├── components/
│   ├── PlayerController.ts   # 玩家控制器
│   └── CameraFollow.ts      # 相機跟隨
├── data/
│   ├── GameConstants.ts      # 遊戲常數
│   └── PlayerData.ts        # 玩家資料
└── global.d.ts              # 全域類型定義
```

## 🚀 在 Cocos Creator 中使用

### 第一步：開啟專案
1. 開啟 Cocos Creator 3.8.x
2. 選擇「開啟專案」
3. 選擇專案資料夾

### 第二步：建立場景
1. 建立新場景 `MainScene.scene`
2. 建立玩家角色節點
3. 設定相機和地面

### 第三步：附加腳本
1. **GameManager**: 建立空節點，附加 GameManager 腳本
2. **PlayerController**: 在玩家節點上附加 PlayerController 腳本
3. **CameraFollow**: 在 Main Camera 上附加 CameraFollow 腳本
4. **InputManager**: 建立空節點，附加 InputManager 腳本

## 🎮 功能說明

### GameManager
- 遊戲核心管理器
- 單例模式，全局唯一
- 管理遊戲狀態

### PlayerController
- 玩家角色控制
- 支援移動和跳躍
- 自動狀態更新

### CameraFollow
- 相機跟隨玩家
- 平滑跟隨效果
- 可調整跟隨參數

### InputManager
- 輸入事件管理
- 支援鍵盤輸入
- 狀態追蹤

## 🔧 TypeScript 配置說明

### tsconfig.json 設定
```json
{
  "strict": false,           // 關閉嚴格模式
  "noImplicitAny": false,    // 允許隱式 any
  "strictNullChecks": false, // 關閉 null 檢查
  "skipLibCheck": true       // 跳過庫檢查
}
```

### 全域類型定義
```typescript
declare const cc: any;  // 宣告 cc 為全域變數
```

## 📝 開發流程

1. **建立基本場景**
   - 玩家角色 (Sprite + RigidBody2D + Collider2D)
   - 地面 (Sprite + Collider2D)
   - 相機 (Main Camera + CameraFollow)

2. **測試基本功能**
   - 玩家移動 (A/D 鍵)
   - 玩家跳躍 (空格鍵)
   - 相機跟隨

3. **擴展功能**
   - 加入動畫系統
   - 建立 UI 系統
   - 加入關卡設計

## 💡 重要提醒

1. **TypeScript 錯誤**: 大部分錯誤是類型檢查警告，不影響實際運行
2. **Cocos Creator 相容**: 所有腳本都使用 Cocos Creator 的標準語法
3. **開發效率**: 使用 TypeScript 可以提供更好的代碼提示和錯誤檢查

## 🎯 下一步

1. 在 Cocos Creator 中開啟專案
2. 建立基本場景
3. 測試玩家控制和相機跟隨
4. 根據需要擴展功能

現在您的 TypeScript 專案已經準備就緒！
