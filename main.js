/* ─────────────────────────────────────────────
   MAIN.JS — Personal Marketing Website
───────────────────────────────────────────── */

/* ── NAV scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.project-card, .blog-card, .vb-item, .kpi-card, .skill-tag, .section-title, .section-sub'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.stat-num').forEach(animateCounter);
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });
heroObserver.observe(document.getElementById('hero'));

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */
const DASHBOARD_PASSWORD = 'admin2025'; // ← đổi mật khẩu tại đây

function unlockDashboard() {
  const pw = document.getElementById('dash-password').value;
  const err = document.getElementById('pw-error');
  if (pw === DASHBOARD_PASSWORD) {
    document.getElementById('dashboard-lock').style.display = 'none';
    document.getElementById('dashboard-content').style.display = 'block';
    err.style.display = 'none';
    setTimeout(initCharts, 100);
  } else {
    err.style.display = 'block';
    document.getElementById('dash-password').value = '';
    document.getElementById('dash-password').focus();
  }
}

// Enter key support
document.getElementById('dash-password').addEventListener('keydown', e => {
  if (e.key === 'Enter') unlockDashboard();
});

function lockDashboard() {
  document.getElementById('dashboard-lock').style.display = 'block';
  document.getElementById('dashboard-content').style.display = 'none';
  document.getElementById('dash-password').value = '';
  chartsInitialized = false;
}

function showDash(platform) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('dash-' + platform).classList.add('active');
}

/* ── Chart.js shared config ── */
Chart.defaults.color = '#888';
Chart.defaults.borderColor = 'rgba(255,255,255,.06)';
Chart.defaults.font.family = "'JetBrains Mono', monospace";
Chart.defaults.font.size = 11;

const months = ['T11', 'T12', 'T1', 'T2', 'T3', 'T4'];
const goldColor = '#c9a84c';
const goldFill  = 'rgba(201,168,76,.12)';

let chartsInitialized = false;

function initCharts() {
  if (chartsInitialized) return;
  chartsInitialized = true;

  // Shopee — Revenue bar
  new Chart(document.getElementById('chart-shopee'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Doanh thu (triệu VNĐ)',
        data: [180, 210, 195, 240, 265, 284],
        backgroundColor: goldFill,
        borderColor: goldColor,
        borderWidth: 1.5,
        borderRadius: 4,
      }]
    },
    options: chartOptions('Doanh thu (triệu VNĐ)')
  });

  // TikTok — Line chart
  new Chart(document.getElementById('chart-tiktok'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Impressions (K)',
          data: [680, 820, 910, 1050, 1200, 1350],
          borderColor: goldColor, backgroundColor: goldFill,
          borderWidth: 2, fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: goldColor,
        },
        {
          label: 'Clicks (K)',
          data: [32, 42, 48, 58, 68, 78],
          borderColor: '#4ade80', backgroundColor: 'rgba(74,222,128,.06)',
          borderWidth: 2, fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: '#4ade80',
        }
      ]
    },
    options: chartOptions()
  });

  // Facebook — CPA trend (line going down = good)
  new Chart(document.getElementById('chart-facebook'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'CPA (nghìn VNĐ)',
        data: [82, 74, 68, 61, 55, 42],
        borderColor: goldColor, backgroundColor: goldFill,
        borderWidth: 2, fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: goldColor,
      }]
    },
    options: chartOptions('CPA (nghìn VNĐ)')
  });

  // Google — Doughnut by campaign type
  new Chart(document.getElementById('chart-google'), {
    type: 'doughnut',
    data: {
      labels: ['Search', 'Shopping', 'PMax', 'YouTube', 'Display'],
      datasets: [{
        data: [38, 28, 18, 10, 6],
        backgroundColor: [
          'rgba(201,168,76,.9)',
          'rgba(201,168,76,.6)',
          'rgba(201,168,76,.4)',
          'rgba(201,168,76,.25)',
          'rgba(201,168,76,.12)',
        ],
        borderColor: 'var(--bg2)',
        borderWidth: 3,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right', labels: { color: '#888', boxWidth: 12, padding: 16 } },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw}%` } }
      },
      cutout: '65%',
    }
  });

  // Zalo — Followers growth
  new Chart(document.getElementById('chart-zalo'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Followers mới',
        data: [9200, 12000, 14500, 17800, 20200, 22000],
        backgroundColor: goldFill,
        borderColor: goldColor,
        borderWidth: 1.5,
        borderRadius: 4,
      }]
    },
    options: chartOptions('Followers mới')
  });
}

function chartOptions(yLabel = '') {
  return {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: '#888', boxWidth: 12 } },
      tooltip: { backgroundColor: '#18181d', borderColor: 'rgba(255,255,255,.08)', borderWidth: 1 }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#555' } },
      y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#555' }, title: { display: !!yLabel, text: yLabel, color: '#555' } }
    }
  };
}

/* ─────────────────────────────────────────────
   BLOG CONTENT
───────────────────────────────────────────── */
const blogContent = {
  fb: {
    tag: 'Facebook Ads',
    title: 'Hướng dẫn chạy Facebook Ads hiệu quả từ A–Z năm 2025',
    lead: 'Sau hàng trăm chiến dịch thực chiến, đây là những gì thực sự tạo ra kết quả — không phải lý thuyết từ course online.',
    body: `
      <h3>1. Cấu trúc Campaign chuẩn</h3>
      <p>Sai lầm phổ biến nhất là nhồi nhét quá nhiều Ad Sets vào một Campaign. Nguyên tắc vàng: <strong>1 Campaign = 1 Mục tiêu kinh doanh</strong>. Đừng mix Conversion và Awareness trong cùng một campaign.</p>
      <p>Cấu trúc tôi dùng: Campaign (Objective) → Ad Set (Audience + Budget) → Ads (3-5 creatives). Mỗi Ad Set test 1 biến số duy nhất — audience hoặc placement, không cả hai.</p>

      <h3>2. Chọn Objective đúng</h3>
      <p>Nếu bạn bán hàng online: <strong>Sales → Purchase</strong>. Nếu thu thập lead: <strong>Leads → Instant Form hoặc Website</strong>. Tuyệt đối tránh dùng Reach/Engagement khi mục tiêu là doanh số — Meta sẽ optimize sai tệp.</p>
      <div class="tip-box"><p>💡 <strong>Tip:</strong> Dùng Advantage+ Shopping Campaign (ASC) nếu bạn có pixel đủ dữ liệu (≥50 conversion/tuần). ROAS của ASC thường cao hơn manual 20-40%.</p></div>

      <h3>3. Audience Strategy</h3>
      <p>3 lớp audience cần chạy song song:</p>
      <ul>
        <li><strong>Prospecting (Top Funnel):</strong> Broad audience + Interest, Lookalike 1-3% từ tệp purchase</li>
        <li><strong>Retargeting (Mid Funnel):</strong> Người xem video 75%, visit website, add to cart</li>
        <li><strong>Retention (Bottom Funnel):</strong> Khách đã mua, upsell/cross-sell</li>
      </ul>

      <h3>4. Creative Testing Framework</h3>
      <p>Creative chiếm 70% hiệu quả của ad. Test theo thứ tự: Hook (3 giây đầu) → Body → CTA. Không test nhiều yếu tố cùng lúc.</p>
      <p>Format hiệu quả nhất năm 2025: <strong>Reels vertical 9:16</strong> kết hợp UGC style. CTR thường cao hơn static image 2-3 lần.</p>

      <h3>5. Scale ngân sách đúng cách</h3>
      <p>Rule: Chỉ tăng budget khi ad set đã có <strong>đủ 50 conversion</strong> trong tuần và CPA ≤ target. Tăng tối đa 20% mỗi 3 ngày. Tăng đột ngột sẽ khiến Meta reset learning phase.</p>
      <div class="tip-box"><p>💡 <strong>Tip nâng cao:</strong> Dùng Automated Rules để tự động tăng/giảm budget dựa trên CPA threshold. Tiết kiệm hàng giờ optimize thủ công.</p></div>
    `
  },
  google: {
    tag: 'Google Ads',
    title: 'Tối ưu CPA cho Google Ads: Chiến lược từ người thực chiến',
    lead: 'CPA cao không phải lúc nào cũng do bid cao. 80% vấn đề đến từ cấu trúc account, quality score và negative keywords.',
    body: `
      <h3>1. Hiểu Quality Score để giảm CPC</h3>
      <p>Quality Score (QS) gồm 3 yếu tố: Expected CTR, Ad Relevance, Landing Page Experience. QS tăng 1 điểm có thể giảm CPC tới 16%. Tập trung cải thiện QS trước khi tăng bid.</p>
      <p>Cách nâng QS: Chia nhỏ Ad Group (1 chủ đề = 1 Ad Group), viết ad copy match với keyword, đảm bảo landing page load nhanh và nội dung relevant.</p>

      <h3>2. Negative Keywords — Vũ khí bí mật</h3>
      <p>Đây là lý do số 1 khiến CPA cao nhưng ít người chú ý. Chạy Search Term Report hàng tuần và loại bỏ các từ khóa không liên quan. Tôi thường tiết kiệm được 15-25% ngân sách bằng cách này.</p>
      <div class="tip-box"><p>💡 <strong>Tip:</strong> Tạo Negative Keyword List dùng chung cho toàn account. Bao gồm: tên đối thủ (nếu không chạy competitor campaigns), các từ "free", "download", "học", "tự làm"...</p></div>

      <h3>3. Smart Bidding Strategy</h3>
      <p>Lộ trình bidding tối ưu:</p>
      <ol>
        <li><strong>Giai đoạn 1 (0-50 conv):</strong> Manual CPC hoặc Maximize Clicks — để thu thập data</li>
        <li><strong>Giai đoạn 2 (50-200 conv):</strong> Target CPA với CPA target cao hơn thực tế 30%</li>
        <li><strong>Giai đoạn 3 (200+ conv):</strong> Target ROAS hoặc Maximize Conversion Value</li>
      </ol>

      <h3>4. Performance Max — Dùng đúng cách</h3>
      <p>PMax hiệu quả khi bạn cung cấp đầy đủ asset (text, image, video) và audience signal chất lượng. Không nên dùng PMax khi account còn mới và thiếu data conversion.</p>
      <p>Luôn chạy PMax <strong>kết hợp</strong> với Search campaign, không thay thế. PMax thường cannibal traffic của Search nếu không setup đúng asset group exclusion.</p>

      <h3>5. Tracking chính xác với GA4</h3>
      <p>Nhiều account có CPA ảo cao vì tracking lỗi. Checklist cần kiểm tra: GA4 linked với Google Ads, conversion actions import đúng, không đếm micro-conversion làm primary goal, cross-device tracking enabled.</p>
      <div class="tip-box"><p>💡 <strong>Tip:</strong> Luôn đặt conversion window phù hợp với sales cycle của sản phẩm. Sản phẩm xung động (thời trang, FMCG): 7 ngày. Sản phẩm cân nhắc (bất động sản, B2B): 30-90 ngày.</p></div>
    `
  },
  zalo: {
    tag: 'Zalo Ads',
    title: 'Bắt đầu với Zalo Ads như thế nào? Toàn tập 2025',
    lead: 'Zalo có 74 triệu người dùng Việt Nam mà hầu hết các marketer đang bỏ qua. Đây là cơ hội bạn không nên bỏ lỡ.',
    body: `
      <h3>1. Tại sao Zalo Ads đang bị underrated?</h3>
      <p>Trong khi mọi người đang chạy đua trên Facebook và Google, chi phí quảng cáo Zalo vẫn ở mức thấp. <strong>CPM trên Zalo thường rẻ hơn 40-60% so với Facebook</strong> với tệp audience rất nội địa và có khả năng mua cao (đặc biệt nhóm 25-45 tuổi).</p>

      <h3>2. Setup tài khoản Zalo Ads</h3>
      <p>Các bước cần thiết để bắt đầu:</p>
      <ol>
        <li>Tạo Zalo Official Account (OA) — bắt buộc trước khi chạy ads</li>
        <li>Verify OA với giấy phép kinh doanh (mất 3-5 ngày làm việc)</li>
        <li>Truy cập <strong>ads.zalo.me</strong> và kết nối OA</li>
        <li>Nạp tiền tối thiểu 200.000 VNĐ để bắt đầu</li>
        <li>Cài đặt Zalo Pixel trên website để tracking</li>
      </ol>
      <div class="tip-box"><p>💡 <strong>Tip:</strong> Đầu tư content cho OA trước khi chạy ads. OA có nhiều follower và bài viết tương tác cao sẽ giúp giảm chi phí và tăng trust với người dùng click vào ad.</p></div>

      <h3>3. Các loại Zalo Ads phổ biến</h3>
      <p><strong>Follow Ads:</strong> Quảng cáo tăng follow OA. Hiệu quả khi muốn xây dựng tệp để broadcast sau này. Chi phí ~500-2000 VNĐ/follow tùy ngành.</p>
      <p><strong>Tin nhắn quảng cáo (ZNS):</strong> Gửi tin nhắn trực tiếp đến SĐT có trong hệ thống Zalo. Open rate cao nhất trong các kênh (30-50%). Cần có template được duyệt trước.</p>
      <p><strong>Display Ads:</strong> Banner hiển thị trong feed Zalo và các app đối tác. Phù hợp cho awareness campaign.</p>

      <h3>4. Targeting trên Zalo</h3>
      <p>Zalo có targeting theo: Địa lý (tỉnh/quận/huyện), Độ tuổi & Giới tính, Sở thích & Hành vi, Custom Audience (upload SĐT), Lookalike Audience. Targeting địa lý của Zalo rất mạnh vì dùng data GPS thực của người dùng Việt Nam.</p>

      <h3>5. Chiến lược content cho OA</h3>
      <p>Nội dung hiệu quả nhất trên Zalo OA theo thứ tự: Video ngắn 30-60s, bài viết hướng dẫn/tips, minigame/voucher, thông tin khuyến mãi. Đăng 3-5 lần/tuần để duy trì reach organic.</p>
      <div class="tip-box"><p>💡 <strong>Tip nâng cao:</strong> Kết hợp ZNS broadcast với chiến dịch Flash Sale. Gửi ZNS 2-4 giờ trước khi sale kết thúc — đây là thời điểm conversion rate cao nhất. Một broadcast tốt có thể mang lại doanh thu gấp 5-10 lần chi phí.</p></div>
    `
  }
};

function openBlog(key) {
  const content = blogContent[key];
  document.getElementById('blog-modal-content').innerHTML = `
    <div class="blog-tag">${content.tag}</div>
    <h2>${content.title}</h2>
    <p class="lead">${content.lead}</p>
    ${content.body}
  `;
  document.getElementById('blog-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeBlog() {
  document.getElementById('blog-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('blog-modal').addEventListener('click', function(e) {
  if (e.target === this) closeBlog();
});

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBlog();
});

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = 'Đang gửi...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Gửi tin nhắn →';
    btn.disabled = false;
    document.getElementById('form-success').style.display = 'block';
    // Clear fields
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => el.value = '');
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'none';
    }, 5000);
  }, 1200);
}
