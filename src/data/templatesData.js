// Danh mục các Mẫu Khung Ảnh 3D Pop-up, Khung Lồng Canva, Retro, Minimalist & Collage

export const FRAME_CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'recommended', name: '⭐ Tối ưu cho ảnh', isSpecial: true },
  { id: 'minimalist', name: '🎨 Tối Giản & Fine-Art' },
  { id: 'retro', name: '🎞️ Retro & Analog' },
  { id: 'tech_ui', name: '💻 Tech & Giao Diện' },
  { id: 'collage', name: '📐 Bố Cục & Ghép Ảnh' },
  { id: 'korean_pop', name: '🧈 Hàn Quốc & Cute' },
];

export const TEMPLATES_DATA = [
  // =========================================================================
  // --- NHÓM 1: KHUNG TỐI GIẢN & NGHỆ THUẬT (MINIMALIST & FINE-ART) ---
  // =========================================================================
  {
    id: 'passe_partout',
    name: '🖼️ Passe-partout (Lề Rộng Triển Lãm)',
    category: 'minimalist',
    desc: 'Chừa lề 15-20% diện tích, viền vát nổi 3D (mat board) chuẩn bảo tàng nghệ thuật',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 2],
    bgColor: '#F6F5F2',
    textColor: '#2D2B28'
  },
  {
    id: 'thin_double_border',
    name: '📐 Viền Đôi Mảnh (Gallery Double Line)',
    category: 'minimalist',
    desc: '1 viền sát mép và 1 viền mảnh cách đều, trang nhã, sang trọng cho ảnh chân dung & kiến trúc',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1],
    bgColor: '#FAF9F6',
    textColor: '#1F1E1D'
  },
  {
    id: 'exif_minimal',
    name: '📷 Khung Thông Số EXIF (Shot on...)',
    category: 'minimalist',
    desc: 'Viền trắng đáy rộng in tên thiết bị Leica/Sony, tiêu cự, khẩu độ, ISO và tọa độ chuẩn nhiếp ảnh gia',
    minPhotos: 1,
    maxPhotos: 2,
    recommendedCounts: [1],
    bgColor: '#FFFFFF',
    textColor: '#1A1A1A'
  },
  {
    id: 'magazine_editorial',
    name: '📰 Tạp Chí Editorial Kinfolk',
    category: 'minimalist',
    desc: 'Bìa tạp chí nghệ thuật với tiêu đề typography lớn sang trọng, phong cách Seoul & Tokyo',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 3],
    bgColor: '#FAF9F6',
    textColor: '#222222'
  },

  // =========================================================================
  // --- NHÓM 2: KHUNG RETRO / VINTAGE & ANALOG ---
  // =========================================================================
  {
    id: 'polaroid_single',
    name: '📸 Polaroid Classic & Washi Tape',
    category: 'retro',
    desc: 'Khung ảnh lấy liền kinh điển, kẹp kim loại vàng và băng dính washi pastel',
    minPhotos: 1,
    maxPhotos: 2,
    recommendedCounts: [1],
    bgColor: '#FAF7F2',
    textColor: '#333333'
  },
  {
    id: 'polaroid_duo',
    name: '📑 Polaroid Cặp Đôi (Song Song)',
    category: 'retro',
    desc: 'Hai tấm ảnh đặt song song cân đối, xoay nhẹ nghệ thuật mà không bị đè che khuất nhau',
    minPhotos: 2,
    maxPhotos: 2,
    recommendedCounts: [2],
    bgColor: '#FDFBF7',
    textColor: '#333333'
  },
  {
    id: 'film_strip',
    name: '🎞️ Cuộn Phim 35mm (Film Strip)',
    category: 'retro',
    desc: 'Dải phim 35mm viền đen có lỗ răng cưa (sprocket holes), mã vạch Kodak Portra và tem date',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [2, 3],
    bgColor: '#141414',
    textColor: '#FFF6E0'
  },
  {
    id: 'medium_format_120',
    name: '🎞️ Phim 120mm (Medium Format 6x6)',
    category: 'retro',
    desc: 'Viền đen dày vuông vức, ký hiệu film 120 Hasselblad, mép loang sáng hoài niệm',
    minPhotos: 1,
    maxPhotos: 2,
    recommendedCounts: [1],
    bgColor: '#161514',
    textColor: '#F5E6CA'
  },
  {
    id: 'torn_paper_scrapbook',
    name: '📜 Giấy Xé Thủ Công (Torn Scrapbook)',
    category: 'retro',
    desc: 'Mép viền răng cưa xơ sợi giấy thủ công, chất giấy vintage dán sổ nhật ký ký ức',
    minPhotos: 1,
    maxPhotos: 3,
    recommendedCounts: [1, 2],
    bgColor: '#F4EEDD',
    textColor: '#4A3B32'
  },

  // =========================================================================
  // --- NHÓM 3: KHUNG TƯƠNG TÁC KỸ THUẬT SỐ & GIAO DIỆN (TECH / UI) ---
  // =========================================================================
  {
    id: 'camera_viewfinder',
    name: '🎯 Giao Diện Kính Ngắm (Viewfinder)',
    category: 'tech_ui',
    desc: 'Khung ngắm máy ảnh với vạch AF trung tâm, lưới 1/3, thanh thước đo sáng EV, pin và REC',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 2],
    bgColor: '#0A0A0A',
    textColor: '#FFFFFF'
  },
  {
    id: 'windows_95_retro',
    name: '💾 Cửa Sổ Windows 95 Cổ Điển',
    category: 'tech_ui',
    desc: 'Giao diện Windows 95 retro viền xám nổi 3D, thanh tiêu đề xanh navy, nút Minimize/Maximize/Close',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 2],
    bgColor: '#008080',
    textColor: '#000000'
  },
  {
    id: 'macos_retro',
    name: '💻 Cửa Sổ Retro Mac OS',
    category: 'tech_ui',
    desc: 'Cửa sổ ứng dụng Apple Mac retro với 3 chấm tròn đỏ-vàng-xanh và tiêu đề nổi',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 2, 4],
    bgColor: '#EAE6DF',
    textColor: '#2E2D2B'
  },
  {
    id: 'instagram_mockup',
    name: '📱 Giao Diện Instagram Post',
    category: 'tech_ui',
    desc: 'Bài đăng mạng xã hội chân thực: Avatar vòng story, tim đỏ, comment, share, bookmark và caption',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1],
    bgColor: '#FAFAFA',
    textColor: '#1A1A1A'
  },
  {
    id: 'music_player',
    name: '🎵 Trình Phát Nhạc Pop-up',
    category: 'tech_ui',
    desc: 'Widget Spotify/Apple Music kính mờ nổi đè lên ảnh, thanh timeline bài hát & nút điều khiển',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 2],
    bgColor: '#F5F3EF',
    textColor: '#262626'
  },
  {
    id: 'ios_notify',
    name: '💬 Tin Nhắn iOS Kính Mờ',
    category: 'tech_ui',
    desc: 'Bong bóng thông báo iPhone kính mờ nổi đè lên ảnh với thông điệp ngọt ngào',
    minPhotos: 1,
    maxPhotos: 3,
    recommendedCounts: [1, 2],
    bgColor: '#F0EFEB',
    textColor: '#262626'
  },

  // =========================================================================
  // --- NHÓM 4: KHUNG HÌNH HỌC & BỐ CỤC GHÉP NHIỀU ẢNH (COLLAGE) ---
  // =========================================================================
  {
    id: 'floating_card',
    name: '🃏 Thẻ Nổi 3D Mềm (Floating Card)',
    category: 'collage',
    desc: 'Viền trắng mỏng bo góc lớn, đổ bóng đa tầng siêu mịn lơ lửng trên nền trung tính hiện đại',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [1, 2],
    bgColor: '#F2F2F5',
    textColor: '#1D1D1F'
  },
  {
    id: 'asymmetric_grid',
    name: '📐 Lưới Bất Đối Xứng (Asymmetric Grid)',
    category: 'collage',
    desc: '1 ảnh lớn 2/3 diện tích làm tâm điểm + các ảnh nhỏ bổ trợ sát bên, rãnh phân cách mảnh',
    minPhotos: 2,
    maxPhotos: 6,
    recommendedCounts: [2, 3, 4],
    bgColor: '#FFFFFF',
    textColor: '#2B2B2B'
  },
  {
    id: 'canva_blur',
    name: '🖼️ Khung Mờ Nền (Gaussian Blur Border)',
    category: 'collage',
    desc: 'Phóng to ảnh chính làm nền mờ sâu, đặt ảnh gốc sắc nét ở giữa, giải quyết triệt để hụt ảnh',
    minPhotos: 1,
    maxPhotos: 6,
    recommendedCounts: [1, 2, 3, 4],
    bgColor: '#FAF8F5',
    textColor: '#2D2D2D'
  },
  {
    id: 'grid_bento',
    name: '🍱 Grid Bento Box Đa Ảnh',
    category: 'collage',
    desc: 'Thuật toán chia lưới thông minh từ 2 đến 6 ảnh, bo góc tròn thoáng đãng không đè nhau',
    minPhotos: 2,
    maxPhotos: 6,
    recommendedCounts: [4, 5, 6],
    bgColor: '#F8F6F0',
    textColor: '#2D2D2D'
  },

  // =========================================================================
  // --- NHÓM 5: HÀN QUỐC & CUTE ---
  // =========================================================================
  {
    id: 'korean_life4cuts',
    name: '🧈 Hàn Quốc Bơ Sữa (Life4Cuts)',
    category: 'korean_pop',
    desc: 'Bố cục máy chụp ảnh lấy liền Seoul màu vàng bơ, phân ô đối xứng, logo studio độc quyền',
    minPhotos: 1,
    maxPhotos: 4,
    recommendedCounts: [3, 4],
    bgColor: '#FFF8E7',
    textColor: '#5C4A28'
  }
];

// Thuật toán tự động chọn khung ảnh tối ưu nhất theo số lượng ảnh tải lên
export function getBestTemplateForCount(count) {
  switch (count) {
    case 1:
      return 'passe_partout'; // 1 ảnh: Khung Passe-partout lề rộng hoặc Canva blur
    case 2:
      return 'asymmetric_grid'; // 2 ảnh: Lưới bất đối xứng hoặc Polaroid cặp đôi
    case 3:
      return 'asymmetric_grid'; // 3 ảnh: 1 ảnh lớn + 2 ảnh nhỏ tâm điểm
    case 4:
      return 'korean_life4cuts'; // 4 ảnh: Photobooth 4 ô Seoul chuẩn chỉnh
    case 5:
    case 6:
      return 'grid_bento'; // 5-6 ảnh: Lưới Bento Box đa ô hoàn hảo
    default:
      return 'canva_blur';
  }
}

export const ASPECT_RATIOS = [
  { id: '1:1', name: '1:1 Vuông (Instagram / Avatar)', width: 800, height: 800, aspectClass: 'aspect-square' },
  { id: '4:5', name: '4:5 Dọc (Facebook / Insta Post)', width: 800, height: 1000, aspectClass: 'aspect-[4/5]' },
  { id: '9:16', name: '9:16 Dọc (Story / TikTok / Reels)', width: 720, height: 1280, aspectClass: 'aspect-[9/16]' },
  { id: '16:9', name: '16:9 Ngang (Banner / Desktop)', width: 1280, height: 720, aspectClass: 'aspect-[16/9]' },
];

export const FONT_OPTIONS = [
  { id: 'dancing', name: 'Chữ Viết Tay Nghệ Thuật (Dancing Script)', fontClass: 'font-dancing' },
  { id: 'patrick', name: 'Chữ Vẽ Tay Mộc Mạc (Patrick Hand)', fontClass: 'font-patrick' },
  { id: 'comfortaa', name: 'Chữ Bo Tròn Kute (Comfortaa)', fontClass: 'font-comfortaa' },
  { id: 'vietnam', name: 'Thanh Lịch Hiện Đại (Be Vietnam Pro)', fontClass: 'font-vietnam' },
  { id: 'playfair', name: 'Cổ Điển Sang Trọng (Playfair Display)', fontClass: 'font-playfair' },
  { id: 'quicksand', name: 'Dễ Thương Tự Nhiên (Quicksand)', fontClass: 'font-quicksand' },
];

export const BACKGROUND_PALETTES = [
  { id: 'bg-cream', name: 'Kem Sữa Pastel', color: '#FAF7F2' },
  { id: 'bg-gallery', name: 'Trắng Triển Lãm', color: '#F6F5F2' },
  { id: 'bg-rose', name: 'Hồng Phấn Mơ Màng', color: '#FFF0F5' },
  { id: 'bg-mint', name: 'Xanh Mint Dịu Dàng', color: '#F0FDF4' },
  { id: 'bg-butter', name: 'Vàng Bơ Hàn Quốc', color: '#FFFBEB' },
  { id: 'bg-lavender', name: 'Tím Oải Hương Nhẹ', color: '#F5F3FF' },
  { id: 'bg-sky', name: 'Xanh Trời Trong Trẻo', color: '#F0F9FF' },
  { id: 'bg-charcoal', name: 'Đen Than Analog', color: '#161514' },
  { id: 'bg-win95', name: 'Xanh Teal Windows 95', color: '#008080' },
  { id: 'bg-white', name: 'Trắng Tinh Khiết', color: '#FFFFFF' }
];
