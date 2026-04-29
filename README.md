# 🚀 Personal Marketing Website

Website cá nhân cho Digital Growth Marketer — built với HTML, CSS, JavaScript thuần (không framework).

## 📁 Cấu trúc thư mục

```
/
├── index.html          # Trang chính (tất cả sections)
├── css/
│   └── style.css       # Toàn bộ styles
├── js/
│   └── main.js         # Tương tác, charts, blog modal
└── README.md
```

## ✏️ Cách tùy chỉnh trước khi deploy

### 1. Thay thông tin cá nhân
Mở `index.html` và tìm + thay:
- `Nguyễn Văn A` → Tên thật của bạn
- `NVA` → Viết tắt tên bạn (hiện ở logo nav)
- `contact@example.com` → Email thật
- `+84 xxx xxx xxx` → SĐT thật
- Cập nhật LinkedIn URL

### 2. Thay số liệu metrics
Trong `index.html`, tìm các thẻ `.pc-metrics` trong từng project card và thay số liệu thực.

Trong `js/main.js`, tìm phần `initCharts()` và thay các mảng `data: [...]` bằng số liệu thực của bạn.

### 3. Đổi mật khẩu dashboard
Trong `js/main.js`, dòng đầu phần DASHBOARD:
```javascript
const DASHBOARD_PASSWORD = 'admin2025'; // ← đổi tại đây
```

### 4. Thêm ảnh cá nhân
Thay thẻ `.about-photo-placeholder` trong `index.html`:
```html
<!-- Xóa div placeholder, thay bằng: -->
<img src="images/your-photo.jpg" alt="Tên bạn" style="width:220px;height:280px;object-fit:cover;border-radius:12px;" />
```

### 5. Cập nhật Hero stats
Tìm `.hero-stats` trong `index.html` và thay `data-target` cho từng số:
```html
<span class="stat-num" data-target="5">0</span>  <!-- số nền tảng -->
<span class="stat-num" data-target="200">0</span> <!-- ROAS % -->
<span class="stat-num" data-target="48">0</span>  <!-- số chiến dịch -->
```

---

## 🚀 Deploy lên GitHub Pages

### Bước 1: Tạo repository mới trên GitHub
1. Vào [github.com](https://github.com) → New Repository
2. Đặt tên: `your-username.github.io` (thay `your-username` bằng username GitHub của bạn)
3. Chọn **Public**
4. Click **Create repository**

### Bước 2: Upload code lên GitHub

**Cách 1 — Dùng Git (khuyên dùng):**
```bash
git init
git add .
git commit -m "Initial commit: personal marketing website"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

**Cách 2 — Upload trực tiếp:**
1. Vào repo vừa tạo trên GitHub
2. Click **uploading an existing file**
3. Kéo thả tất cả files vào
4. Click **Commit changes**

### Bước 3: Bật GitHub Pages
1. Vào **Settings** của repo
2. Tìm mục **Pages** (thanh bên trái)
3. Source: chọn **Deploy from a branch**
4. Branch: chọn **main** / **(root)**
5. Click **Save**

### Bước 4: Truy cập website
Sau 1-3 phút, website sẽ live tại:
```
https://your-username.github.io
```

---

## 🔧 Tùy chỉnh nâng cao

### Đổi tên miền riêng (custom domain)
1. Mua domain tại Inet, Nhân Hòa, hoặc Namecheap
2. Tạo file `CNAME` trong root thư mục, nội dung là domain của bạn:
   ```
   yourdomain.com
   ```
3. Trỏ DNS: Thêm A record → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Trong GitHub Pages Settings → Custom domain → nhập domain

### Thêm Google Analytics
Trước thẻ `</head>` trong `index.html`, thêm:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Contact Form thực sự gửi được (dùng Formspree)
1. Đăng ký [formspree.io](https://formspree.io)
2. Tạo form, lấy endpoint (dạng `https://formspree.io/f/xxxxxxxx`)
3. Trong `js/main.js`, trong hàm `submitForm()`, thay phần setTimeout bằng:
```javascript
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: document.querySelector('.contact-form input[type="text"]').value,
    email: document.querySelector('.contact-form input[type="email"]').value,
    message: document.querySelector('.contact-form textarea').value
  })
}).then(() => {
  document.getElementById('form-success').style.display = 'block';
});
```

---

## 📝 Notes

- **Mật khẩu dashboard mặc định:** `admin2025` (nhớ đổi trước khi deploy!)
- Website responsive đầy đủ trên mobile
- Không cần server/backend — chạy hoàn toàn client-side
- Tương thích với tất cả trình duyệt hiện đại

## 🎨 Font & Dependencies (tự động load)

- **DM Serif Display** — Tiêu đề serif sang trọng
- **JetBrains Mono** — Code/label monospace
- **Instrument Sans** — Body text
- **Chart.js 4.4** — Biểu đồ dashboard (CDN)
- Google Fonts (CDN)

---

Made with ❤️ — Ready to deploy on GitHub Pages
