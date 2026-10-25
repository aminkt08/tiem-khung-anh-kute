// Danh mục các Mẫu Khung Ảnh 3D Pop-up & Khung Lồng Canva

export const TEMPLATES_DATA = [
  {
    id: 'canva_blur',
    name: '🖼️ Khung Lồng Canva (Nền Mờ)',
    category: 'canva',
    desc: 'Bức ảnh phóng to làm nền mờ ảo diệu, ảnh chính lồng ở giữa đổ bóng 3D',
    minPhotos: 1,
    maxPhotos: 1,
    bgColor: '#FAF8F5',
    hasGlassCard: true
  },
  {
    id: 'music_player',
    name: '🎵 Trình Phát Nhạc Pop-up',
    category: 'popup',
    desc: 'Widget Spotify/Apple Music kính mờ nổi đè lên ảnh, thanh timeline bài hát',
    minPhotos: 1,
    maxPhotos: 1,
    bgColor: '#F5F3EF',
    hasMusicWidget: true
  },
  {
    id: 'polaroid_single',
    name: '📸 Polaroid Classic & Washi',
    category: 'polaroid',
    desc: 'Khung ảnh lấy liền kinh điển, kẹp kim loại vàng và băng dính washi pastel',
    minPhotos: 1,
    maxPhotos: 1,
    bgColor: '#FAF7F2',
    hasPaperclip: true,
    hasWashi: true
  },
  {
    id: 'polaroid_duo',
    name: '📑 Polaroid Cặp Đôi Xếp Nghiêng',
    category: 'polaroid',
    desc: 'Hai tấm ảnh xếp lồng so le nghiêng nghệ thuật (-3° và +2°), hiệu ứng scrapbook',
    minPhotos: 2,
    maxPhotos: 2,
    bgColor: '#FDFBF7',
    hasWashi: true
  },
  {
    id: 'korean_life4cuts',
    name: '🧈 Hàn Quốc Bơ Sữa (Life4Cuts)',
    category: 'korean',
    desc: 'Khung ảnh máy chụp tự động Seoul màu vàng bơ, viền bo dày tối giản, tem studio',
    minPhotos: 1,
    maxPhotos: 4,
    bgColor: '#FFF8E7',
    brandText: 'PHOTOISM STUDIO • SEOUL'
  },
  {
    id: 'macos_retro',
    name: '💻 Cửa Sổ Retro Mac OS',
    category: 'popup',
    desc: 'Cửa sổ ứng dụng Apple Mac retro với 3 chấm tròn đỏ-vàng-xanh và tiêu đề nổi',
    minPhotos: 1,
    maxPhotos: 1,
    bgColor: '#EAE6DF',
    hasMacWindow: true
  },
  {
    id: 'ios_notify',
    name: '💬 Tin Nhắn iOS Kính Mờ',
    category: 'popup',
    desc: 'Bong bóng thông báo iPhone kính mờ nổi đè lên ảnh với thông điệp ngọt ngào',
    minPhotos: 1,
    maxPhotos: 1,
    bgColor: '#F0EFEB',
    hasIOSMessage: true
  },
  {
    id: 'grid_bento',
    name: '🍱 Grid Bento Box Hiện Đại',
    category: 'collage',
    desc: 'Bố cục Bento phân ô bo góc tròn mềm mại, khoảng cách thoáng đãng phong cách Canva',
    minPhotos: 2,
    maxPhotos: 6,
    bgColor: '#F8F6F0'
  },
  {
    id: 'magazine_editorial',
    name: '📰 Tạp Chí Editorial Kinfolk',
    category: 'korean',
    desc: 'Bìa tạp chí nghệ thuật với tiêu đề typography lớn sang trọng, phong cách Seoul',
    minPhotos: 1,
    maxPhotos: 3,
    bgColor: '#FAF9F6'
  },
  {
    id: 'film_strip',
    name: '🎞️ Cuộn Phim Hoài Niệm',
    category: 'polaroid',
    desc: 'Dải phim điện ảnh cổ điển với lỗ đục phim trên dưới và tem date màu hổ phách',
    minPhotos: 1,
    maxPhotos: 3,
    bgColor: '#161514',
    textColor: '#FFF6E0'
  }
];

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
  { id: 'bg_cream', color: '#FAF8F5', name: 'Kem Yến Mạch' },
  { id: 'bg_butter', color: '#FFF8E7', name: 'Vàng Bơ Sữa' },
  { id: 'bg_blush', color: '#FDF2F4', name: 'Hồng Phấn Mơ' },
  { id: 'bg_sky', color: '#EEF5FC', name: 'Xanh Da Trời' },
  { id: 'bg_sage', color: '#F0F4EC', name: 'Xanh Lá Xô Thơm' },
  { id: 'bg_dark', color: '#1A1918', name: 'Đen Huyền Bí' },
];
