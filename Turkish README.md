# Türkçe Bomb Party 💣💣

[[English]]

## Genel Bakış
Bu proje, kelime oyunu "Bomb Party"nin Türkçeye çevrilmiş versiyonu. Süre dolmadan önce verilen bir heceyle eşleşen kelimeyi bulmanız gerekir. Bomb Party'nin eğlencesinin daha falza kişiye ulaşması için bu yazılım yapılmıştır. Kelime haznenizi geliştirmeniz için birçok farklı hece içerir ve ve hızlı düşünebilme kabiliyetinizin için vaktiniz kısıtlıdır.

## Özellikler
- **Kısıtlı Süre**: Yeni bir hece görüntülendiğinde geri sayım saati başlar ve sıfıra ulaştığında oyun biter.
- **Puanlama Sistemi**: Oyuncular doğru tahmin ettikleri her kelime için bir puan kazanır ve puanlarını yerel olarak karşılaştırabilir.
- **Dinamik Kullanıcı Arayüzü**: Oyun, oyunculara performansınızı ve kelime bilginizi geliştirmek için faydalı ipuçları sunar.

## Başlarken
1. Depoyu klonlayın: `git clone https://github.com/your-username/bomb-party-clone.git`
2. Tercih ettiğiniz kod düzenleyicide açın.
3. Kelime listesini isteğinize göre biçimlendirmek için `turkish word fixer.py` dosyasını çalıştırın.
4. Oyunda kullanılacak JSON dosyasını oluşturmak için `syllable finder.py` dosyasını çalıştırın. Dosya konumlarını doğru belirlediğinizden emin olun.
5. Tercihlerinze göre, `script.js` dosyasının en üstünde bulunan zamanlayıcı süresi ve hece listesi gibi oyun ayarlarını özelleştirin.
6. Oyunu oynamak için `index.html` dosyasını bir web tarayıcısında açın.

## Kullanım
- Oyun başladığında, bir hece görüntülenir ve saat geri saymaya başlar.
- Metin alanına, ekranın ortasındaki bulunan heceyle eşleşen bir kelime girin ve enter (giriş) tuşuna (veya ekrandaki gönder düğmesine) basın.
- Eğer tahminiz doğru ise, bir puan kazanırsınız ve yeni bir hece görüntülenir.
- Tahminiz yanlış ise, sizi uyaran ufak bir bildirim gelir ve tekrar deneme şansınız olur.
- Oyun, saat sıfıra ulaşıncaya kadar devam eder ve ardından son puanınızı gösterir.

## Katkıda Bulunma
Eğer oyunu beğenip katkıda bulunmak isterseniz hiç çekinmeyin! Bu yardımlarınız sayesinde oyunu geliştirip daha fazla kişiye ulaşabiliriz! Düzeltmeler veya yeni özellikler için herhangi bir fikriniz varsa, "issue" veya "pull request" gönderebilirsiniz.

## Lisans
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
