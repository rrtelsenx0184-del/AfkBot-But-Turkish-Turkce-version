# 🚀 Gelişmiş Minecraft Aternos 7/24 AFK Botu

Bu proje; Aternos başta olmak üzere Minecraft sunucularınızın oyuncu yokluğundan dolayı kapanmasını önlemek, haritadaki chunkları (farm alanlarını) aktif olarak yüklü tutmak ve sunucuyu 7/24 açık tutmak amacıyla geliştirilmiş, açık kaynaklı bir **Mineflayer** botudur.

Herhangi bir program indirme zorunluluğu olmadan, tamamen **%100 güvenli** bir şekilde doğrudan GitHub Actions üzerinden veya alternatif olarak Render.com bulut servisiyle botu kesintisiz çalıştırabilirsiniz.

---

## ⚙️ Başlangıç Ayarları (`config.json`)

Projeyi hangi yöntemle çalıştırırsanız çalıştırın, öncelikle klasörde yer alan `config.json` dosyasını bir not defteri yardımıyla açıp kendi sunucu bilgilerinize göre düzenlemelisiniz:

{
  "ip": "sunucu_adresiniz.aternos.me:port",
  "name": "Bot_Kullanici_Adi"
}

⚠️ **Çok Önemli Gereksinimler:**
1. Sunucunuzun Aternos ayarlarından **Korsan (Cracked / Orijinal Olmayan)** modunun kesinlikle **AÇIK** olması gerekir. Aksi takdirde bot sunucuya bağlanamaz.
2. Sürüm karmaşası yaşamamak için sunucunuza **ViaVersion** eklentisini (pluginini) kurmanız şiddetle önerilir. Bot, entegre protokolü sayesinde kapıdan pürüzsüzce geçecektir.

---

## 🛠️ YÖNTEM 1: Doğrudan GitHub Üzerinde Çalıştırma (Önerilen)

Bilgisayarınıza hiçbir dosya indirmeden, bilgisayarınızı kapatsanız bile tamamen GitHub'ın kendi sunucu altyapısını kullanarak botu 7/24 aktif edebilirsiniz:

1. Bu deponun sağ üst köşesinde bulunan "Fork" butonuna basarak projeyi kendi GitHub hesabınıza kopyalayın.
2. Kendi hesabınıza geçen depodaki config.json dosyasına tıklayın, sağ üstteki kalem (düzenle) simgesine basarak kendi Minecraft sunucu IP ve portunuzu yazıp kaydedin (Commit changes).
3. Deponuzun üst menüsünde yer alan "Actions" sekmesine tıklayın.
4. Karşınıza çıkan yeşil uyarı butonuna basarak Actions özelliğini aktif edin.
5. Sol menüde beliren "7/24 Minecraft AFK Botu" seçeneğini tıklayın.
6. Sağ tarafta açılacak olan "Run workflow" butonuna basın ve botu tetikleyin. 
(Bot, GitHub Actions altyapısı sayesinde arka planda tamamen ücretsiz ve kesintisiz çalışmaya başlayacaktır).

---

## ☁️ YÖNTEM 2: Alternatif Bulut Kurulumu (Render.com)

**Neden bu yöntemi seçmelisiniz?** Eğer botun sunucuya girip girmediğini, hata verip vermediğini veya o an ne yaptığını **canlı canlı siyah ekrandan (Log ekranından) takip etmek istiyorsanız** bu yöntem tam size göre! GitHub Actions arka planda gizli ve sessiz çalışırken, Render size botun durumunu anlık izleme şansı sunar.

### 1. Adım: Render Hesabı ve Depo Bağlantısı
1. Render.com resmi web sitesine gidin ve GitHub hesabınızı seçerek kayıt olun (Sign Up).
2. Panelin sağ üst köşesinde bulunan yeşil "New +" butonuna tıklayın ve açılan menüden "Web Service" seçeneğini seçin.
3. "Build and deploy from a Git repository" seçeneğini işaretleyerek Next butonuna basın.
4. GitHub hesabınızdaki depolar listelenecektir. Bu AFK Botu deponuzu bulun ve yanındaki "Connect" butonuna tıklayın.

### 2. Adım: Kurulum Kontrol Paneli Ayarları
Açılan konfigürasyon sayfasındaki boşlukları tam olarak şu şekilde yapılandırın:
* Name: aternos-afk-bot
* Region: Frankfurt (EU) (Türkiye lokasyonuna en yakın ve en kararlı çalışan sunucudur)
* Branch: main
* Runtime: Node
* Build Command: npm install
* Start Command: npm start
* Instance Type: Sayfanın en altında bulunan "Free" ($0/month) seçeneğini işaretleyin.

Tüm ayarları yaptıktan sonra en alttaki "Deploy Web Service" butonuna tıklayın. Botunuz birkaç dakika içinde kurulacak ve siyah ekran (Log) kısmında sunucuya giriş yaptığı yazacaktır.

### 3. Adım: Uyku Modunu Engelleme (UptimeRobot Entegrasyonu)
Render platformunun ücretsiz sürümü, eğer servise 15 dakika boyunca dışarıdan hiçbir web isteği (ping) gelmezse botu otomatik olarak uyku moduna alır ve bot oyundan düşer. Bunu kalıcı olarak engellemek için:
1. Render paneline dönün. Projenizin sol üst köşesinde, ismin hemen altında yazan "https://... .onrender.com" şeklindeki size özel web URL adresini kopyalayın.
2. UptimeRobot.com sitesine giderek ücretsiz bir hesap oluşturun.
3. Giriş yaptıktan sonra sol üstteki "Add New Monitor" butonuna tıklayın.
4. Monitor ayarlarını tam olarak şu şekilde doldurun:
   * Monitor Type: HTTP(s)
   * Friendly Name: AFK Botu Canlı Tutucu
   * URL (or IP): Render sitesinden kopyaladığınız o uzun .onrender.com adresini buraya yapıştırın.
   * Monitoring Interval: Every 5 minutes (Her 5 dakikada bir)
5. Sağ alttaki "Create Monitor" butonuna basarak kaydedin. Artık sistem Render linkinizi her 5 dakikada bir tetikleyecek, botunuz asla uyumayacak ve 7/24 kesintisiz çalışacaktır!

---

## 💻 YÖNTEM 3: Kendi Bilgisayarınızda (Lokal) Çalıştırma

Botu GitHub'a yüklemeden önce kendi bilgisayarınızda test etmek ya da bilgisayarınız açık olduğu sürece arka planda çalıştırmak isterseniz:

1. Bilgisayarınızda Node.js (LTS sürümü) kurulu olduğundan emin olun.
2. Proje klasörünün içerisindeyken üstteki adres çubuğuna cmd yazıp Enter'a basarak siyah komut ekranını açın.
3. Gerekli altyapıyı indirmek için şu komutu yazıp Enter'a basın:
   npm install
4. İndirme işlemi bittikten sonra botu başlatmak için şu komutu çalıştırın:
   npm start

---

## 📌 Gelişmiş Teknik Özellikler

* **Otomatik Yeniden Bağlanma (Auto-Reconnect):** Sunucu anlık olarak çöktüğünde, yeniden başlatıldığında veya bot oyundan bir şekilde düştüğünde; sistem bunu algılar ve 10 saniye sonra hiçbir müdahale gerektirmeden sunucuya otomatik olarak tekrar bağlanmayı dener.
* **Anti-AFK Koruması (Anti-Kick):** Sunucu yönetiminin uyguladığı "AFK Oyuncuları Sunucudan Atma" filtresine takılmamak için bot, sunucuya bağlandığı andan itibaren her 10 saniyede bir düzenli olarak zıplama hareketi gerçekleştirir.
* **Gelişmiş Protokol Desteği:** Kod bloklarında optimize edilmiş kararlı protokol yapısı sayesinde sunucuda ViaVersion olduğu müddetçe alt veya üst sürüm fark etmeksizin tüm Minecraft sürümleriyle kusursuz bir eşleşme yakalar.