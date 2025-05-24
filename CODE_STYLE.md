# 🧼 DENKLEM - React Native Kodlama Kuralları

Bu projede yapay zekâ ya da geliştiriciler tarafından yazılacak tüm kodlarda aşağıdaki kurallar dikkate alınmalıdır.

---

## 📁 1. Dosya ve Klasör Yapısı

- `src/` altında modüler yapı:
  - `screens/`, `components/`, `constants/`, `logic/`, `models/`, `navigation/`, `utils/`, `theme/`
- Her bileşen için ayrı dosya oluşturulmalı
- Bileşen adları PascalCase (`StartScreen.tsx`, `FeeCard.tsx`)

---

## 💡 2. TypeScript Kuralları

- Her `props` için `interface` veya `type` tanımlanmalı
- Fonksiyonlara dönüş tipi yazılmalı: `(): void`, `(): string`
- `any` tipi kullanılmamalı
- `models/` altında ortak tip tanımları yapılmalı

---

## 🎨 3. Stil Yönetimi

- `StyleSheet.create()` kullanılmalı
- Renkler ve yazı stilleri `theme/colors.ts`, `theme/fonts.ts` içinde tanımlanmalı
- Inline stil kullanılmamalı

---

## 🧱 4. Component Tasarımı

- Her bileşen tek bir sorumluluğa sahip olmalı (SRP)
- Props’lar destructure edilmeli
- Fonksiyonel component yapısı kullanılmalı
- Bileşenler dışarıdan veri alacak şekilde tasarlanmalı

---

## 🧼 5. Clean Code Prensipleri

- Fonksiyonlar kısa tutulmalı (maksimum 30–40 satır)
- Kod tekrarından kaçınılmalı (DRY)
- Gereksiz yorum kullanılmamalı
- Değişken ve fonksiyon adları anlamlı ve İngilizce yazılmalı

---

## 🔄 6. Navigasyon Kuralları

- Navigasyon yapısı `navigation/` klasöründe tutulmalı
- Route adları sabitler dosyasında (`constants/routes.ts`)
- Her ekran `screens/` altında yer almalı

---

## 🧩 7. Reusable Yapılar

- Ortak bileşenler `components/` klasöründe tutulmalı
- Yardımcı fonksiyonlar `utils/` klasörüne yazılmalı
- Form işlemlerinde `Formik` ve `Yup` tercih edilebilir

---

## ⚙️ 8. Geliştirme Araçları

- `ESLint` + `Prettier` yapılandırılmalı
- `console.log` sadece debug için kullanılmalı
- Gerekirse `husky` ile commit öncesi kontrol eklenmeli

---

## ✅ Yapay Zekâya Komut Örneği

> "React Native'de kod yazarken şu kuralları uygula: dosyalar `src/` altında modüler olsun, `StyleSheet.create` kullanılsın, `props` tipleri belirtilsin, `colors.ts` dosyasındaki renkler kullanılsın, yorumlar sade olsun, reusable component mantığına uygun kod yazılsın."