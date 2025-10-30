const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8080;

// MIME 類型對應
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
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // 解析 URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // 預設首頁
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // 建立檔案路徑
    const filePath = path.join(__dirname, 'build', pathname);
    
    // 檢查檔案是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 檔案不存在，回傳 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - 檔案未找到</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #e74c3c; }
                        p { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>404 - 檔案未找到</h1>
                    <p>請求的檔案: ${pathname}</p>
                    <p>請確認檔案路徑是否正確</p>
                </body>
                </html>
            `);
            return;
        }
        
        // 讀取檔案
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - 伺服器錯誤</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                            p { color: #666; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - 伺服器錯誤</h1>
                        <p>讀取檔案時發生錯誤</p>
                    </body>
                    </html>
                `);
                return;
            }
            
            // 設定 Content-Type
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            
            // 設定 CORS 標頭
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(port, () => {
    console.log(`🚀 簡單 HTTP 伺服器已啟動！`);
    console.log(`📱 本地預覽地址: http://localhost:${port}`);
    console.log(`🌐 網路預覽地址: http://0.0.0.0:${port}`);
    console.log(`📁 服務目錄: ${path.join(__dirname, 'build')}`);
    console.log(`⏹️  按 Ctrl+C 停止伺服器`);
    console.log(`\n🎮 如果 build 目錄不存在，請先在 Cocos Creator 中建置專案`);
});

// 優雅關閉
process.on('SIGINT', () => {
    console.log('\n🛑 正在關閉伺服器...');
    server.close(() => {
        console.log('✅ 伺服器已關閉');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 正在關閉伺服器...');
    server.close(() => {
        console.log('✅ 伺服器已關閉');
        process.exit(0);
    });
});
