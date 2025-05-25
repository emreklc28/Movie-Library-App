# MovieLibraryApp

MovieLibraryApp, React Native kullanılarak geliştirilmiş, kullanıcıların popüler filmleri keşfedebileceği, favorilerine ekleyebileceği ve detaylı film bilgilerine ulaşabileceği kapsamlı bir mobil uygulamadır. Firebase ile kullanıcı kimlik doğrulaması yapılmakta ve TMDb (The Movie Database) API’si ile güncel film verileri sağlanmaktadır.

---

## Görseller
<p float="left">
  <img src="https://github.com/emreklc28/MovieLibraryApp/blob/97401623dc6c87c0bac7f4879dba621d6a1e0814/home.png" width="200" />
  <img src="https://github.com/emreklc28/MovieLibraryApp/blob/97401623dc6c87c0bac7f4879dba621d6a1e0814/search.png" width="200" />
  <img src="https://github.com/emreklc28/MovieLibraryApp/blob/97401623dc6c87c0bac7f4879dba621d6a1e0814/fav.png" width="200" />
</p>



---

## Özellikler

- Kullanıcı kaydı ve giriş (Firebase Authentication)  
- Popüler filmlerin listelenmesi (TMDb API)  
- Film detaylarının gösterimi (özeti, oyuncular, puanlar vb.)  
- Film arama ve filtreleme  
- Favorilere film ekleyip çıkarabilme (Firebase veritabanı ile)  
- Kullanıcı profili yönetimi  
- Modern ve kullanıcı dostu arayüz  

---

## Teknolojiler

- React Native (CLI)  
- React Navigation (Stack ve Tab Navigator)  
- Firebase Authentication & Firestore  
- TMDb API (The Movie Database)  
- Axios (API istekleri için)  
- Context API (global durum yönetimi)  
- ESLint & Prettier (kod standartları)  

---
## Proje Yapısı

```bash
/src
  /api         # TMDb API çağrılarının yapıldığı fonksiyonlar
  /components  # Tekrar kullanılabilir arayüz bileşenleri (Button, InputField, MovieCard, vs.)
  /context     # Uygulama genelinde kullanılan global state (Context API ile)
  /screens     # Tüm ekranlar (Home, Details, Login, Register, Profile vb.)
  /config      # Firebase ve TMDb gibi dış servislerin konfigürasyon dosyaları
  /navigation  # Stack ve Tab navigasyon yapılandırmaları
  /utils       # Yardımcı fonksiyonlar ve sabitler
/App.tsx       # Uygulamanın giriş noktası (navigasyon ve sağlayıcıların başlatıldığı yer)



## Kurulum

Projeyi kendi cihazınızda çalıştırmak için aşağıdaki adımları izleyin:


# Depoyu klonlayın
git clone https://github.com/emreklc28/MovieLibraryApp.git

# Proje dizinine gidin
cd MovieLibraryApp

# Bağımlılıkları yükleyin
npm install
# veya
yarn install

# Firebase config dosyasını (firebaseConfig.js) oluşturun ve kendi projenize ait ayarları ekleyin.

# Android veya iOS cihazınızda projeyi başlatın
npx react-native run-android
# veya
npx react-native run-ios
