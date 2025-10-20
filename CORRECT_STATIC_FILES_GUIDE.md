# 📁 正確的靜態檔案放置指南

## 🎯 正確的目錄結構

### 📂 Cocos Creator 專案結構
```
game-2d-demo/
├── assets/                         # 🎯 主要靜態檔案目錄（開發用）
│   ├── scenes/                     # 場景檔案
│   │   └── GamePlay.fire           # 遊戲場景
│   ├── scripts/                    # 腳本檔案
│   │   ├── components/             # 組件腳本
│   │   ├── managers/               # 管理器腳本
│   │   ├── scenes/                 # 場景腳本
│   │   └── utils/                  # 工具腳本
│   ├── textures/                   # 圖片資源
│   │   ├── backgrounds/            # 背景圖片
│   │   ├── characters/             # 角色圖片
│   │   ├── platforms/              # 平台圖片
│   │   └── ui/                     # UI 圖片
│   ├── audio/                      # 音效資源
│   │   ├── bgm/                    # 背景音樂
│   │   ├── sfx/                    # 音效
│   │   └── voice/                  # 語音
│   ├── animations/                 # 動畫資源
│   ├── prefabs/                    # 預製體
│   └── fonts/                      # 字體資源
├── build/                          # 建置輸出目錄（自動生成）
│   ├── index.html                  # 建置後的遊戲頁面
│   └── assets/                     # 建置後的資源（自動複製）
├── library/                        # Cocos Creator 庫檔案
├── settings/                       # 專案設定
└── simple-server.js                # HTTP 伺服器
```

## 🎮 場景檔案放置

### 📍 場景檔案位置
```
assets/scenes/
├── GamePlay.fire                   # 主遊戲場景 ✅
├── MainMenu.fire                   # 主選單場景
└── Settings.fire                   # 設定場景
```

### 🔧 如何建立場景檔案
1. **在 Cocos Creator 中**:
   - 右鍵點擊 `assets/scenes` 資料夾
   - 選擇 "新建" → "場景"
   - 命名並儲存

2. **手動建立**:
   - 將 `.fire` 檔案放在 `assets/scenes/` 目錄
   - 確保檔案格式正確

## 🖼️ 圖片資源放置

### 📍 圖片檔案位置
```
assets/textures/
├── backgrounds/                    # 背景圖片
│   ├── sky.png                     # 天空背景
│   ├── mountain.png                # 山脈背景
│   └── tree.png                    # 樹木背景
├── characters/                     # 角色圖片
│   ├── player/                    # 玩家角色
│   │   ├── idle.png               # 待機動畫
│   │   ├── walk.png               # 行走動畫
│   │   └── jump.png               # 跳躍動畫
│   └── enemies/                    # 敵人角色
├── platforms/                      # 平台圖片
│   ├── ground.png                  # 地面
│   ├── platform.png               # 平台
│   └── obstacle.png               # 障礙物
└── ui/                            # UI 圖片
    ├── buttons/                    # 按鈕
    ├── icons/                      # 圖示
    └── panels/                     # 面板
```

### 🎨 如何添加圖片資源
1. **在 Cocos Creator 中**:
   - 右鍵點擊 `assets/textures` 資料夾
   - 選擇 "導入" → "資源"
   - 選擇圖片檔案

2. **手動複製**:
   - 將圖片檔案複製到對應的 `assets/textures/` 子目錄
   - 支援格式：`.png`, `.jpg`, `.gif`, `.svg`

## 🔊 音效資源放置

### 📍 音效檔案位置
```
assets/audio/
├── bgm/                           # 背景音樂
│   ├── main_theme.mp3             # 主主題音樂
│   ├── battle_theme.mp3           # 戰鬥音樂
│   └── menu_theme.mp3             # 選單音樂
├── sfx/                           # 音效
│   ├── jump.wav                   # 跳躍音效
│   ├── attack.wav                 # 攻擊音效
│   ├── collect.wav                # 收集音效
│   └── damage.wav                 # 受傷音效
└── voice/                         # 語音
    ├── player/                    # 玩家語音
    └── npc/                       # NPC 語音
```

### 🎵 如何添加音效資源
1. **在 Cocos Creator 中**:
   - 右鍵點擊 `assets/audio` 資料夾
   - 選擇 "導入" → "資源"
   - 選擇音效檔案

2. **手動複製**:
   - 將音效檔案複製到對應的 `assets/audio/` 子目錄
   - 支援格式：`.mp3`, `.wav`, `.ogg`

## 📝 腳本檔案放置

### 📍 腳本檔案位置
```
assets/scripts/
├── components/                     # 組件腳本 ✅
│   ├── PlayerController.ts        # 玩家控制器
│   ├── CameraFollow.ts            # 相機跟隨
│   ├── ParallaxBackground.ts         # 視差背景
│   └── PlatformGenerator.ts       # 平台生成器
├── scenes/                         # 場景腳本 ✅
│   ├── GameScene.ts               # 遊戲場景
│   ├── MapleStoryScene.ts         # 楓之谷場景
│   └── MainMenuScene.ts           # 主選單場景
├── managers/                       # 管理器腳本 ✅
│   ├── GameManager.ts             # 遊戲管理器
│   ├── InputManager.ts            # 輸入管理器
│   └── AudioManager.ts            # 音效管理器
└── utils/                          # 工具腳本 ✅
    ├── SceneLoader.ts             # 場景載入器
    └── MathUtils.ts                # 數學工具
```

## 🎨 動畫資源放置

### 📍 動畫檔案位置
```
assets/animations/
├── characters/                     # 角色動畫
│   ├── player/                    # 玩家動畫
│   │   ├── idle.anim              # 待機動畫
│   │   ├── walk.anim              # 行走動畫
│   │   ├── jump.anim              # 跳躍動畫
│   │   └── attack.anim             # 攻擊動畫
│   └── enemies/                   # 敵人動畫
├── effects/                       # 特效動畫
│   ├── particles/                 # 粒子特效
│   ├── explosions/                # 爆炸特效
│   └── magic/                     # 魔法特效
└── ui/                           # UI 動畫
    ├── buttons/                   # 按鈕動畫
    └── transitions/                # 轉場動畫
```

## 🏗️ 預製體放置

### 📍 預製體檔案位置
```
assets/prefabs/
├── characters/                     # 角色預製體
│   ├── Player.prefab              # 玩家預製體
│   └── Enemy.prefab                # 敵人預製體
├── platforms/                      # 平台預製體
│   ├── Ground.prefab              # 地面預製體
│   └── Platform.prefab             # 平台預製體
└── ui/                           # UI 預製體
    ├── Button.prefab               # 按鈕預製體
    └── Panel.prefab                # 面板預製體
```

## 🔧 建置流程

### 1. 開發階段
- 所有資源放在 `assets/` 目錄
- 在 Cocos Creator 中編輯和測試
- 使用相對路徑引用資源

### 2. 建置階段
- Cocos Creator 自動將 `assets/` 中的資源複製到 `build/assets/`
- 生成 `build/index.html` 等建置檔案
- 優化和壓縮資源

### 3. 發布階段
- 使用 `build/` 目錄中的檔案
- 部署到網頁伺服器
- 確保所有資源路徑正確

## 🚀 如何正確放置檔案

### 方法 1: 使用 Cocos Creator（推薦）
1. 在 Cocos Creator 中開啟專案
2. 在資源管理器中右鍵點擊對應資料夾
3. 選擇 "導入" → "資源"
4. 選擇要導入的檔案

### 方法 2: 手動複製
```bash
# 複製圖片資源
cp your-images/*.png assets/textures/backgrounds/

# 複製音效資源
cp your-audio/*.mp3 assets/audio/bgm/

# 複製腳本檔案
cp your-scripts/*.ts assets/scripts/components/
```

### 方法 3: 使用檔案管理器
1. 開啟檔案管理器
2. 導航到 `assets/` 目錄
3. 將檔案拖拽到對應的子目錄

## 📋 檢查清單

### ✅ 檔案放置檢查
- [ ] 場景檔案在 `assets/scenes/`
- [ ] 腳本檔案在 `assets/scripts/`
- [ ] 圖片檔案在 `assets/textures/`
- [ ] 音效檔案在 `assets/audio/`
- [ ] 動畫檔案在 `assets/animations/`
- [ ] 預製體檔案在 `assets/prefabs/`

### 🎯 最佳實踐
1. **使用 Cocos Creator**: 在編輯器中管理資源
2. **保持目錄結構**: 按照功能分類放置檔案
3. **檔案命名**: 使用英文和數字，避免特殊字符
4. **版本控制**: 將 `assets/` 目錄加入版本控制
5. **備份**: 定期備份重要的資源檔案

## 🎮 現在開始！

你的靜態檔案應該放在 `assets/` 目錄中！🎉

- ✅ 開發時使用 `assets/` 目錄
- ✅ 建置後自動複製到 `build/assets/`
- ✅ 發布時使用 `build/` 目錄

**立即開始**: 將你的資源檔案放在 `assets/` 目錄的對應子目錄中！
