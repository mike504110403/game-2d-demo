# 📁 靜態檔案放置指南

## 🎯 正確的目錄結構

### 📂 主要目錄結構
```
game-2d-demo/
├── build/                          # 建置輸出目錄（主要靜態檔案位置）
│   ├── index.html                  # 遊戲主頁面
│   ├── assets/                     # 遊戲資源目錄
│   │   ├── scenes/                 # 場景檔案
│   │   │   └── GamePlay.fire       # 遊戲場景
│   │   ├── scripts/                # 腳本檔案
│   │   │   ├── components/         # 組件腳本
│   │   │   ├── scenes/             # 場景腳本
│   │   │   ├── managers/           # 管理器腳本
│   │   │   └── utils/              # 工具腳本
│   │   ├── textures/               # 圖片資源
│   │   │   ├── backgrounds/        # 背景圖片
│   │   │   ├── characters/         # 角色圖片
│   │   │   ├── platforms/          # 平台圖片
│   │   │   └── ui/                 # UI 圖片
│   │   ├── audio/                  # 音效資源
│   │   │   ├── bgm/                # 背景音樂
│   │   │   ├── sfx/                # 音效
│   │   │   └── voice/              # 語音
│   │   └── animations/             # 動畫資源
│   ├── css/                        # 樣式檔案
│   ├── js/                         # JavaScript 檔案
│   └── images/                     # 通用圖片
├── assets/                         # 原始資源目錄（開發用）
└── simple-server.js                # HTTP 伺服器
```

## 🎮 場景檔案放置

### 📍 場景檔案位置
```
build/assets/scenes/
├── GamePlay.fire                   # 主遊戲場景
├── MainMenu.fire                   # 主選單場景
└── Settings.fire                   # 設定場景
```

### 🔧 如何放置場景檔案
1. **從 Cocos Creator 匯出**:
   - 在 Cocos Creator 中建置專案
   - 選擇 "Web Mobile" 平台
   - 建置完成後，場景檔案會自動生成在 `build/` 目錄

2. **手動放置**:
   - 將 `.fire` 場景檔案放在 `build/assets/scenes/` 目錄
   - 確保檔案名稱正確

## 🖼️ 圖片資源放置

### 📍 圖片檔案位置
```
build/assets/textures/
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

## 🔊 音效資源放置

### 📍 音效檔案位置
```
build/assets/audio/
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

## 📝 腳本檔案放置

### 📍 腳本檔案位置
```
build/assets/scripts/
├── components/                     # 組件腳本
│   ├── PlayerController.js        # 玩家控制器
│   ├── CameraFollow.js            # 相機跟隨
│   ├── ParallaxBackground.js      # 視差背景
│   └── PlatformGenerator.js       # 平台生成器
├── scenes/                         # 場景腳本
│   ├── GameScene.js               # 遊戲場景
│   ├── MapleStoryScene.js         # 楓之谷場景
│   └── MainMenuScene.js           # 主選單場景
├── managers/                       # 管理器腳本
│   ├── GameManager.js             # 遊戲管理器
│   ├── InputManager.js            # 輸入管理器
│   └── AudioManager.js            # 音效管理器
└── utils/                          # 工具腳本
    ├── SceneLoader.js             # 場景載入器
    └── MathUtils.js                # 數學工具
```

## 🎨 動畫資源放置

### 📍 動畫檔案位置
```
build/assets/animations/
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

## 🚀 如何正確放置檔案

### 方法 1: 使用 Cocos Creator 建置
1. 在 Cocos Creator 中開啟專案
2. 點擊 "專案" → "建置發布"
3. 選擇 "Web Mobile" 平台
4. 點擊 "建置" 按鈕
5. 建置完成後，所有檔案會自動放置在 `build/` 目錄

### 方法 2: 手動放置檔案
1. 將場景檔案複製到 `build/assets/scenes/`
2. 將圖片檔案複製到 `build/assets/textures/`
3. 將音效檔案複製到 `build/assets/audio/`
4. 將腳本檔案複製到 `build/assets/scripts/`

### 方法 3: 使用建置腳本
```bash
# 建立目錄結構
mkdir -p build/assets/{scenes,scripts,textures,audio,animations}

# 複製檔案
cp assets/scenes/*.fire build/assets/scenes/
cp assets/scripts/**/*.js build/assets/scripts/
cp assets/textures/**/*.png build/assets/textures/
cp assets/audio/**/*.mp3 build/assets/audio/
```

## 🔧 伺服器配置

### HTTP 伺服器設定
```javascript
// simple-server.js 中的 MIME 類型設定
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.fire': 'application/json'  // 場景檔案
};
```

## 📋 檢查清單

### ✅ 檔案放置檢查
- [ ] 場景檔案在 `build/assets/scenes/`
- [ ] 腳本檔案在 `build/assets/scripts/`
- [ ] 圖片檔案在 `build/assets/textures/`
- [ ] 音效檔案在 `build/assets/audio/`
- [ ] 動畫檔案在 `build/assets/animations/`
- [ ] 主頁面在 `build/index.html`
- [ ] 伺服器正常運行在 `http://localhost:8080`

### 🎯 最佳實踐
1. **使用相對路徑**: 所有資源使用相對路徑引用
2. **檔案命名**: 使用英文和數字，避免特殊字符
3. **檔案大小**: 圖片和音效檔案保持合理大小
4. **版本控制**: 重要資源檔案加入版本控制
5. **備份**: 定期備份重要的靜態檔案

## 🎮 現在開始！

你的靜態檔案結構已經準備就緒！🎉

- ✅ 目錄結構已建立
- ✅ 伺服器正在運行
- ✅ 遊戲可以正常載入

**立即開始**: http://localhost:8080
