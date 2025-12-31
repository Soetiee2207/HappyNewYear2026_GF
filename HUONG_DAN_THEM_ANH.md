# 🌸☀️🍂❄️ HƯỚNG DẪN THÊM ẢNH THEO MÙA

## 📁 Cấu trúc folder hiện tại:

```
HappyNewYearApp/
└── images/
    ├── xuan/     ← MÙA XUÂN (Spring) - Tháng 1-3
    ├── ha/       ← MÙA HẠ (Summer) - Tháng 4-6
    ├── thu/      ← MÙA THU (Fall) - Tháng 7-9
    └── dong/     ← MÙA ĐÔNG (Winter) - Tháng 10-12
```

---

## 📸 CÁCH THÊM ẢNH:

### Mỗi mùa cần **10 ảnh**, đặt tên như sau:

### 🌸 **Folder `xuan/` (Mùa Xuân):**
```
1.jpg
2.jpg
3.jpg
4.jpg
5.jpg
6.jpg
7.jpg
8.jpg
9.jpg
10.jpg
```

###  ☀️ **Folder `ha/` (Mùa Hạ):**
```
1.jpg
2.jpg
3.jpg
...
10.jpg
```

### 🍂 **Folder `thu/` (Mùa Thu):**
```
1.jpg
2.jpg
3.jpg
...
10.jpg
```

### ❄️ **Folder `dong/` (Mùa Đông):**
```
1.jpg
2.jpg
3.jpg
...
10.jpg
```

---

## 🎯 QUAN TRỌNG:

1. **Tên file PHẢI là số từ 1 đến 10** với đuôi `.jpg`
2. **Đặt đúng folder** theo mùa
3. **Mỗi mùa 10 ảnh** (có thể ít hơn nhưng không được quá 10)
4. **Định dạng:** JPG/JPEG (khuyến nghị)

---

## 🔧 NẾU BẠN MUỐN THAY ĐỔI SỐ ẢNH:

Mở file `script.js` → tìm `momentsData` → thay đổi `imageCount`:

```javascript
xuan: {
    ...
    imageCount: 15  // Thay 10 thành 15 nếu muốn 15 ảnh
}
```

---

## ✅ SAU KHI THÊM ẢNH:

1. **Refresh** trang web (Ctrl + F5)
2. **Click vào mỗi mùa** trong Best Moments
3. **Modal sẽ hiện** với 10 ảnh carousel
4. **Dùng nút ◀ / ▶** để xem qua các ảnh
5. **Click dots** ở dưới để nhảy đến ảnh cụ thể

---

## 📝 LƯU Ý:

- Ảnh nên có **kích thước tương đương** để đẹp (khuyến nghị: 1080x1080px hoặc 1920x1080px)
- **Nén ảnh** trước khi upload để web load nhanh hơn
- Nếu thiếu ảnh (ví dụ chỉ có 5 ảnh thay vì 10), website vẫn chạy nhưng sẽ báo lỗi 404 cho ảnh thiếu

---

## 🎨 Nội dung từng mùa:

### 🌸 Mùa Xuân (Tháng 1-3):
- Tết, đầu năm mới
- Hoa nở, mai vàng
- Đi chơi xuân
- Gia đình, bạn bè

### ☀️ Mùa Hạ (Tháng 4-6):
- Đi biển, du lịch
- Ánh nắng, hoàng hôn
- Kem, trà đá
- Hoạt động ngoài trời

### 🍂 Mùa Thu (Tháng 7-9):
- Lá vàng, lá rơi
- Cà phê, sách
- Tản bộ lãng mạn
- Áo len, khăn quàng

### ❄️ Mùa Đông (Tháng 10-12):
- Giáng sinh, năm mới
- Ấm áp bên nhau
- Áo khoác, khăn ấm
- Kỷ niệm cuối năm

---

## 🚀 BẮT ĐẦU NGAY:

1. Mở folder dự án: `E:/Studying Document/A_2026_Work/Happynewyear/HappyNewYearApp/images/`
2. Chọn ảnh cho mỗi mùa
3. Đổi tên thành `1.jpg`, `2.jpg`, ... `10.jpg`
4. Copy vào folder tương ứng (`xuan/`, `ha/`, `thu/`, `dong/`)
5. Refresh website và test!

---

**Chúc bạn thành công! 💕✨**
