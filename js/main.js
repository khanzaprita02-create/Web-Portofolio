/**
 * DIGITAL CV & PORTOFOLIO - SISWI SMK RPL
 * Khanza Prita Asyafica — Junior Frontend Developer & UI/UX Enthusiast
 * SMK N 6 Surakarta (Lulusan 2024)
 */

document.addEventListener('DOMContentLoaded', () => {
  initClipboardHandlers();
  initTerminalWidget();
  initDownloadCv();
  initModalHandlers();
});

/* ==========================================================================
   1. CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopyText(text, successMessage);
    });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    showToast('Gagal menyalin teks secara otomatis.');
  }
  document.body.removeChild(textArea);
}

function initClipboardHandlers() {
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      copyToClipboard('khanza.prita.dev@gmail.com', '✓ Email khanza.prita.dev@gmail.com disalin ke clipboard!');
    });
  }

  const btnCopyPhone = document.getElementById('btnCopyPhone');
  if (btnCopyPhone) {
    btnCopyPhone.addEventListener('click', () => {
      copyToClipboard('+6281298765432', '✓ Nomor WhatsApp +62 812-9876-5432 disalin!');
    });
  }

  const btnCopyTerminal = document.getElementById('btnCopyTerminal');
  if (btnCopyTerminal) {
    btnCopyTerminal.addEventListener('click', () => {
      const notes = `Catatan untuk HR & Tech Recruiter:\nNama: Khanza Prita Asyafica (SMK N 6 Surakarta - RPL 2024)\nStatus: Siap Kerja / Full-time & Internship\nPengalaman: 6 Bulan PKL di Software House (PT Solusi Digital Nusantara)\nNilai UKK: 94/100 | Nilai PKL: A\nKontak: khanza.prita.dev@gmail.com | +62 812-9876-5432`;
      copyToClipboard(notes, '✓ Catatan untuk HR berhasil disalin!');
    });
  }
}

/* ==========================================================================
   2. UNDUH CV LENGKAP (PDF) / CETAK ATS
   ========================================================================== */
function initDownloadCv() {
  const btnDownloadCv = document.getElementById('btnDownloadCv');
  if (btnDownloadCv) {
    btnDownloadCv.addEventListener('click', () => {
      showToast('📄 Membuka pratinjau cetak PDF CV standar industri...');
      setTimeout(() => {
        window.print();
      }, 400);
    });
  }
}

/* ==========================================================================
   3. INTERACTIVE DEVELOPER TERMINAL WIDGET
   ========================================================================== */
function initTerminalWidget() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalHistory = document.getElementById('terminalHistory');
  const terminalScreen = document.getElementById('terminalScreen');

  if (!terminalInput || !terminalHistory || !terminalScreen) return;

  const commands = {
    help: `
<div style="color: #818cf8; font-weight: bold; margin-bottom: 0.3rem;">Daftar Perintah Terminal yang Tersedia:</div>
• <span style="color:#6ee7b7;">help</span>      : Menampilkan panduan perintah terminal ini
• <span style="color:#6ee7b7;">skills</span>    : Ringkasan mendalam tentang keahlian & tech stack
• <span style="color:#6ee7b7;">projects</span>  : Ikhtisar 3 proyek unggulan berskala produksi
• <span style="color:#6ee7b7;">contact</span>   : Informasi kontak cepat, email, dan WhatsApp
• <span style="color:#6ee7b7;">about</span>     : Latar belakang sekolah & pengalaman magang PKL
• <span style="color:#6ee7b7;">hire</span>      : Format cepat untuk menjadwalkan interview kerja
• <span style="color:#6ee7b7;">clear</span>     : Membersihkan layar riwayat terminal
• <span style="color:#6ee7b7;">cat notes_for_hr.txt</span> : Menampilkan kembali catatan untuk HR
`,
    skills: `
<div style="color: #38bdf8; font-weight: bold; margin-bottom: 0.3rem;">Tech Stack & Kemampuan Teknis:</div>
1. <strong style="color: #fff;">Frontend:</strong> HTML5 Semantic, Modern CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Component-Driven Design.
2. <strong style="color: #fff;">Tools & DB:</strong> Git/GitHub, Supabase, MySQL, VS Code, Postman, Figma Slicing.
3. <strong style="color: #fff;">Standar Industri:</strong> Agile/Scrum, Git Flow, Google Lighthouse Optimization (+25% boost), Clean Code.
`,
    projects: `
<div style="color: #fbbf24; font-weight: bold; margin-bottom: 0.3rem;">3 Proyek Unggulan Khanza Prita:</div>
1. <strong>POSFlow UMKM:</strong> Sistem Kasir & Inventaris Toko Retail (React, Tailwind, Supabase)
2. <strong>PresensiSMK:</strong> E-Presensi Siswa Geofencing GPS & Face Verification (JS, Node.js, MySQL)
3. <strong>TechMuda Jakarta:</strong> Landing Page Komunitas Developer (Lighthouse 99/100, Glassmorphism)
<div style="color: #94a3b8; font-size: 0.78rem; margin-top: 0.3rem;">Ketik 'hire' atau klik tombol 'Live Demo' pada kartu proyek untuk melihat detail lengkap.</div>
`,
    contact: `
<div style="color: #34d399; font-weight: bold; margin-bottom: 0.3rem;">Informasi Kontak Langsung:</div>
• Email    : <a href="mailto:khanza.prita.dev@gmail.com" style="color: #818cf8; text-decoration: underline;">khanza.prita.dev@gmail.com</a>
• WhatsApp : <a href="https://wa.me/6281298765432" target="_blank" style="color: #4ade80; text-decoration: underline;">+62 812-9876-5432</a>
• Lokasi   : Surakarta / Solo, Jawa Tengah (Terbuka untuk WFO / WFH / Hybrid)
• GitHub   : github.com/khanzaprita
• LinkedIn : linkedin.com/in/khanzaprita
`,
    about: `
<div style="color: #c084fc; font-weight: bold; margin-bottom: 0.3rem;">Profil Singkat Khanza:</div>
Siswi berprestasi lulusan SMK N 6 Surakarta jurusan Rekayasa Perangkat Lunak (RPL) tahun 2024.
Telah menyelesaikan magang industri (PKL) selama 6 bulan di PT Solusi Digital Nusantara dengan predikat 'A'.
Memiliki sertifikasi resmi BNSP Junior Web Developer dan Juara 2 LKS Web Technologies Kota Surakarta.
Fokus karir: Junior Frontend Developer yang adaptif, komunikatif, dan siap kerja!
`,
    hire: `
<div style="background: rgba(99, 102, 241, 0.15); border: 1px solid #6366f1; border-radius: 6px; padding: 0.75rem; margin: 0.4rem 0;">
  <div style="color: #818cf8; font-weight: bold; font-size: 0.95rem;">🎉 Terima kasih atas apresiasi Anda!</div>
  <p style="margin-top: 0.3rem; color: #f8fafc; font-size: 0.82rem;">
    Khanza sangat antusias untuk bergabung dan memberikan kontribusi nyata di tim engineering perusahaan Anda.
  </p>
  <div style="margin-top: 0.5rem; font-size: 0.82rem;">
    👉 <a href="https://wa.me/6281298765432?text=Halo%20Khanza,%20kami%20dari%20tim%20HRD%20ingin%20mengundang%20Anda%20interview" target="_blank" style="color: #4ade80; font-weight: bold; text-decoration: underline;">Klik di sini untuk langsung chat WhatsApp</a>
  </div>
</div>
`,
    'cat notes_for_hr.txt': `
<div class="t-card-hr" style="margin: 0.4rem 0;">
  <div class="t-hr-greeting">
    <span>Halo Bapak/Ibu HR & Tech Recruiter! 👋</span>
  </div>
  <p style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.2rem;">
    ✔ Terbiasa dengan kultur kerja Agile/Scrum & daily standup.<br>
    ✔ Menguasai fundamental JavaScript & React.<br>
    ✔ Siap langsung berkontribusi (no hand-holding needed).<br>
    ✔ Status: Siap Interview & Technical Test segera.
  </p>
</div>
`,
    matrix: `
<div style="color: #22c55e; font-family: monospace; font-size: 0.75rem; line-height: 1.4;">
01001011 01101000 01100001 01101110 01111010 01100001 00100000 01010010 01010000 01001100<br>
Wake up, Recruiter... The Matrix has the best Junior Frontend Dev ready for you! ⚡
</div>
`
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawVal = terminalInput.value.trim();
      const val = rawVal.toLowerCase();

      if (!val) return;

      // Handle 'clear' command
      if (val === 'clear') {
        terminalHistory.innerHTML = '';
        terminalInput.value = '';
        return;
      }

      // Create command echo element
      const echoDiv = document.createElement('div');
      echoDiv.className = 'terminal-command-line';
      echoDiv.style.marginTop = '0.75rem';
      echoDiv.innerHTML = `<span class="t-prompt">khanza@workstation</span>:<span class="t-path">~</span>$&nbsp;<span class="t-command">${escapeHtml(rawVal)}</span>`;
      terminalHistory.appendChild(echoDiv);

      // Create output element
      const outputDiv = document.createElement('div');
      outputDiv.className = 't-output';

      if (commands[val]) {
        outputDiv.innerHTML = commands[val];
      } else {
        outputDiv.innerHTML = `<span style="color: #f43f5e;">Perintah tidak dikenali: '${escapeHtml(rawVal)}'.</span> Ketik <code style="color:#6ee7b7;">help</code> untuk melihat daftar perintah.`;
      }

      terminalHistory.appendChild(outputDiv);
      terminalInput.value = '';

      // Auto scroll to bottom
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/* ==========================================================================
   4. MODAL HANDLERS FOR PROJECT SHOWCASE
   ========================================================================== */
const projectData = {
  pos: {
    title: 'Sistem Kasir & Inventaris Toko UMKM (POSFlow App)',
    category: 'Fullstack Point of Sale & Inventory',
    img: './assets/images/pos_umkm.jpg',
    desc: 'POSFlow dirancang khusus untuk memecahkan problem pencatatan manual pada toko retail UMKM yang rentan salah hitung dan antrean panjang. Mengadopsi arsitektur offline-first, scanner barcode instan, cetak struk via bluetooth thermal printer, serta analitik omzet dan grafik penjualan real-time.',
    features: [
      'Pencatatan transaksi super cepat (<15 detik per transaksi)',
      'Deteksi barcode otomatis via kamera laptop/ponsel',
      'Peringatan otomatis saat stok barang di bawah batas minimum (Restock Alert)',
      'Grafik omzet harian & laporan laba-rugi otomatis diekspor ke PDF/Excel',
      'Penyimpanan lokal IndexedDB dengan sinkronisasi cloud Supabase'
    ],
    stack: 'React.js, Tailwind CSS, Supabase PostgreSQL, Chart.js, HTML5 Web Audio API',
    metric: 'Menghilangkan selisih pembukuan hingga 99% pada tahap uji coba di 2 toko mitra SMK N 6 Surakarta.',
    github: 'https://github.com',
    demo: 'https://demo-posflow.example.com'
  },
  presensi: {
    title: 'E-Presensi & Manajemen Izin Siswa (PresensiSMK)',
    category: 'EdTech & Smart School Platform',
    img: './assets/images/presensi_siswa.jpg',
    desc: 'Platform presensi cerdas untuk sekolah yang menuntaskan kendala titip absen dan keterlambatan. Dilengkapi verifikasi radius GPS (geofencing 50 meter dari gerbang SMK N 6 Surakarta) dan kamera selfie liveness. Dilengkapi modul digital untuk pengajuan izin sakit siswa yang terverifikasi wali kelas.',
    features: [
      'Validasi geofencing akurat menggunakan Haversine formula di sisi server',
      'Selfie verification secara instan tanpa memperlambat performa ponsel siswa',
      'Portal wali kelas & guru BK dengan notifikasi real-time siswa alpa/terlambat',
      'Pengunggahan bukti surat dokter dalam format digital terenkripsi',
      'Rekap bulanan format standar Dapodik Kemendikbud'
    ],
    stack: 'JavaScript ES6+, Geolocation API, HTML5 Camera Stream, Node.js, Express, MySQL',
    metric: 'Menghemat 3 jam waktu kerja harian staf tata usaha dan guru piket dalam mengompilasi kehadiran 1.200+ siswa.',
    github: 'https://github.com',
    demo: 'https://demo-presensi.example.com'
  },
  techmuda: {
    title: 'Landing Page TechMuda Jakarta (Community Hub)',
    category: 'UI/UX Design & High-Performance Landing Page',
    img: './assets/images/techmuda.jpg',
    desc: 'Landing page berestetika dark glassmorphism modern untuk TechMuda Jakarta, komunitas talenta teknologi muda di ibu kota. Dibangun dengan fokus utama pada rasio konversi tinggi, animasi mikro yang halus pada 60 FPS, dan aksesibilitas ramah pengguna.',
    features: [
      'Performa optimal: Skor audit Google Lighthouse 99/100',
      'Live Countdown timer untuk event seminar & hackathon terdekat',
      'Komponen tiket reservasi interaktif dengan feedback visual langsung',
      'Desain ultra-responsif dari ponsel hingga monitor resolusi 4K',
      'Memenuhi standar aksesibilitas WCAG AA (kontras teks tinggi & keyboard navigasi)'
    ],
    stack: 'Semantic HTML5, Vanilla CSS3 (Custom Variables), JavaScript ES6+, IntersectionObserver, AOS.js',
    metric: 'Tingkat konversi registrasi peserta workshop meningkat sebesar +38% dan sukses menampung 450+ peserta.',
    github: 'https://github.com',
    demo: 'https://demo-techmuda.example.com'
  }
};

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const modalHeading = document.getElementById('modalHeading');
  const modalBody = document.getElementById('modalBody');

  if (!modal || !modalHeading || !modalBody) return;

  modalHeading.textContent = data.title;

  const featuresListHtml = data.features.map(f => `<li><i class="ph-bold ph-check" style="color: #6ee7b7; margin-right: 6px;"></i>${f}</li>`).join('');

  modalBody.innerHTML = `
    <img src="${data.img}" alt="${data.title}" class="modal-preview-img">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
      <span class="project-category" style="font-size: 0.78rem;">${data.category}</span>
      <span class="project-status" style="font-size: 0.75rem;"><span class="project-status-dot"></span> Status: Production Ready</span>
    </div>
    <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.25rem;">
      ${data.desc}
    </p>

    <div class="modal-specs-grid">
      <div class="modal-spec-card">
        <div class="modal-spec-title">Teknologi Utama</div>
        <div class="modal-spec-val">${data.stack}</div>
      </div>
      <div class="modal-spec-card">
        <div class="modal-spec-title">Dampak & Metrik Nyata</div>
        <div class="modal-spec-val">${data.metric}</div>
      </div>
    </div>

    <div style="margin: 1.25rem 0;">
      <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--indigo-400); margin-bottom: 0.5rem;">Fitur Kunci & Keunggulan:</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.85rem; color: var(--text-secondary);">
        ${featuresListHtml}
      </ul>
    </div>

    <div class="modal-actions">
      <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
        <i class="ph-bold ph-arrow-square-out"></i>
        <span>Buka Live Preview</span>
      </a>
      <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1;">
        <i class="ph-bold ph-github-logo"></i>
        <span>Buka Repository GitHub</span>
      </a>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// Attach globally for inline onclick
window.openProjectModal = openProjectModal;

function initModalHandlers() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal || !closeBtn) return;

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
