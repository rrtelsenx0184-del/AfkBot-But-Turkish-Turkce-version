const mineflayer = require('mineflayer');
const fs = require('fs');
const readline = require('readline');

// 1. Önce "startBot" fonksiyonunu tanımlayalım (JavaScript bunu yukarıda bilmeli)
function startBot(config) {
    console.log(`Bot başlatılıyor: ${config.ip}`);
    const bot = mineflayer.createBot({
        host: config.ip.split(':')[0],
        port: parseInt(config.ip.split(':')[1]) || 25565,
        username: config.name,
        version: config.version || false 
    });

    bot.on('spawn', () => {
        console.log(`✅ ${bot.username} sunucuya giriş yaptı!`);
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 10000);
    });

    bot.on('end', () => {
        console.log('⚠️ Bağlantı koptu, 10 saniye sonra tekrar bağlanıyor...');
        setTimeout(() => startBot(config), 10000);
    });

    bot.on('error', (err) => console.log('❌ Hata: ', err));
}

// 2. Şimdi Render kontrolünü yap
if (process.env.IP) {
    console.log("Render ortamı algılandı, ayarlar değişkenlerden alınıyor...");
    startBot({ 
        ip: process.env.IP, 
        name: process.env.NAME || "AFK_Botu", 
        version: process.env.VERSION || false 
    });
} else {
    // Lokal ortamda çalışıyorsak kurulumu başlat
    console.log("Lokal ortam algılandı.");
    // (Buraya eski readline/setup kodunu koyabilirsin ama 
    // şimdilik sadece config.json'dan okuyarak test etmen daha güvenli)
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    startBot(config);
}
