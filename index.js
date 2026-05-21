// Eğer Render ortamındaysak ve IP tanımlıysa soru sorma, direkt başlat
if (process.env.IP) {
    console.log("Render ortamı algılandı, ayarlar değişkenlerden alınıyor...");
    startBot({ ip: process.env.IP, name: process.env.NAME || "AFK_Botu", version: process.env.VERSION || false });
    return; // Fonksiyonu burada bitir, soru sorma kısmına geçme
}
const mineflayer = require('mineflayer');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin
});

function baslatBot(config) {
    const bot = mineflayer.createBot({
        host: config.ip.split(':')[0],
        port: parseInt(config.ip.split(':')[1]) || 25565,
        username: config.name,
        version: config.version || false // Kaydedilen sürümü kullan
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} başarıyla sunucuya giriş yaptı!`);
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 10000);
    });

    bot.on('end', () => {
        console.log('Bağlantı kesildi, 10 saniye sonra tekrar deneniyor...');
        setTimeout(() => baslatBot(config), 10000);
    });

    bot.on('error', (err) => console.log('Hata: ', err));
}

function setup() {
    let config = { ip: "", name: "AFK_Botu_724", version: "" };
    
    // Eğer dosya varsa eski bilgileri oku
    if (fs.existsSync('./config.json')) {
        config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    }

    console.log("--- Minecraft AFK Botu Kurulum ---");
    rl.question(`Sunucu IP'si (${config.ip || 'giriniz'}): `, (ip) => {
        rl.question(`Sunucu Sürümü (${config.version || 'otomatik'}): `, (ver) => {
            
            config.ip = ip || config.ip;
            config.version = ver || config.version || false;

            fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
            
            console.log("✅ Ayarlar kaydedildi. Bot başlıyor...");
            rl.close();
            baslatBot(config);
        });
    });
}

setup();
