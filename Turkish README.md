# Hecele! 💣💣

[English](https://github.com/berkcan25/Turkish-Bomb-Party-Game/blob/main/README.md)

## Genel Bakış
Bu proje, kelime oyunu "Bomb Party"nin Türkçeye çevrilmiş versiyonu. Süre dolmadan önce verilen bir heceyle eşleşen kelimeyi bulmanız gerekir. Bomb Party'nin eğlencesinin daha falza kişiye ulaşması için bu yazılım yapılmıştır. Kelime haznenizi geliştirmeniz için birçok farklı hece içerir ve ve hızlı düşünebilme kabiliyetinizin için vaktiniz kısıtlıdır.

![SS1](https://github.com/berkcan25/Turkish-Bomb-Party-Game/assets/103621562/21d3e274-111d-4190-9fef-e12b709631a2)

## Özellikler
- **Kelime Bilgisi**: Binlerce kelime ile kelime haznenizi genişletip tazeleyin!
- **Kısıtlı Süre**: Yeni bir hece görüntülendiğinde geri sayım saati başlar ve sıfıra ulaştığında oyun biter.
- **Puanlama Sistemi**: Oyuncular doğru tahmin ettikleri her kelime için bir puan kazanır ve puanlarını yerel olarak karşılaştırabilir.
- **Canlar**: Bilemediğiniz zaman oynamaya devam edin! Canla kaybettikten sonra devam etme hakkın olur. Canlar, tüm harfleri toplayarak geri alınabilir! Bir harfi kazanmak için o harfi tahmin ederken kullanın. Ama dikkatli olun, bütün canlarınızı kaybederseniz oyun biter!
- **Dinamik Kullanıcı Arayüzü**: Oyun, oyunculara performansınızı ve kelime bilginizi geliştirmek için faydalı ipuçları sunar.

## Yükleyiş
1. Depoyu klonlayın: `git clone https://github.com/your-username/bomb-party-clone.git`
2. Tercih ettiğiniz kod düzenleyicide açın.
3. Kelime listesini isteğinize göre biçimlendirmek için `turkish word fixer.py` dosyasını çalıştırın.
4. Oyunda kullanılacak JSON dosyasını oluşturmak için `syllable finder.py` dosyasını çalıştırın. Dosya konumlarını doğru belirlediğinizden emin olun.
5. Tercihlerinze göre, `script.js` dosyasının en üstünde bulunan zamanlayıcı süresi ve hece listesi gibi oyun ayarlarını özelleştirin.
6. Oyunu oynamak için `index.html` dosyasını bir web tarayıcısında açın.

## Oynayış
- Oyun başladığında, bir hece görüntülenir ve saat geri saymaya başlar.
- Metin alanına, ekranın ortasındaki bulunan heceyle eşleşen bir kelime girin ve enter (giriş) tuşuna (veya ekrandaki gönder düğmesine) basın.
- Eğer tahminiz doğru ise, bir puan kazanırsınız ve yeni bir hece görüntülenir.
- Tahminiz yanlış ise, sizi uyaran ufak bir bildirim gelir ve tekrar deneme şansınız olur.
- Oyun, saat sıfıra ulaşıncaya kadar devam eder ve ardından son puanınızı gösterir.

## Resimler
![SS3](https://github.com/berkcan25/Turkish-Bomb-Party-Game/assets/103621562/8112ec9a-1d58-4b58-9295-b9dbc406714a)
![SS2](https://github.com/berkcan25/Turkish-Bomb-Party-Game/assets/103621562/046ed3b9-71ad-424d-b9e5-b3889561670e)
![SS4](https://github.com/berkcan25/Turkish-Bomb-Party-Game/assets/103621562/7fe1f070-ed20-45f4-972d-94fc88840796)

## Katkıda Bulunma
Eğer oyunu beğenip katkıda bulunmak isterseniz hiç çekinmeyin! Bu yardımlarınız sayesinde oyunu geliştirip daha fazla kişiye ulaşabiliriz! Düzeltmeler veya yeni özellikler için herhangi bir fikriniz varsa, "issue" veya "pull request" gönderebilirsiniz.

## Lisans
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
