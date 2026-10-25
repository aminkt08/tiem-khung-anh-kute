// Hệ thống Khung ảnh Lồng, Pop-up Canva & Khung Hàn Quốc Đa Dạng

// Bộ icon tối giản tinh tế (Aesthetic Minimal)
const STICKER_LIBRARY = [
    { id: 'sparkle_pure', emoji: '✨', name: 'Lấp lánh' },
    { id: 'heart_white', emoji: '🤍', name: 'Trái tim trắng' },
    { id: 'leaf_branch', emoji: '🌿', name: 'Cành khuynh diệp' },
    { id: 'tulip_soft', emoji: '🌷', name: 'Hoa tulip' },
    { id: 'coffee_cup', emoji: '☕', name: 'Tách cà phê' },
    { id: 'dove_peace', emoji: '🕊️', name: 'Bồ câu an yên' },
    { id: 'crescent_moon', emoji: '🌙', name: 'Trăng khuyết' },
    { id: 'candle_warm', emoji: '🕯️', name: 'Nến thơm' },
    { id: 'open_book', emoji: '📖', name: 'Trang sách' },
    { id: 'letter_envelope', emoji: '✉️', name: 'Phong thư' },
    { id: 'camera_retro', emoji: '📷', name: 'Máy ảnh' },
    { id: 'music_note', emoji: '🎵', name: 'Giai điệu' },
    { id: 'tag_label', emoji: '🏷️', name: 'Nhãn vintage' },
    { id: 'soft_cloud', emoji: '☁️', name: 'Mây an nhiên' },
    { id: 'sun_warm', emoji: '☀️', name: 'Nắng sớm' },
    { id: 'four_leaf', emoji: '🍀', name: 'Cỏ 4 lá' },
    { id: 'star_aesthetic', emoji: '⭐', name: 'Ngôi sao nhỏ' },
    { id: 'butter_toast', emoji: '🍞', name: 'Bánh mì nướng' }
];

// Bộ sưu tập 12+ Khung Lồng, Pop-up Canva & Khung Ảnh Hàn Quốc
const FRAME_PRESETS = [
    // --- 1. POP-UP CANVA & WIDGET NỔI ---
    {
        id: 'music_player_popup',
        name: '🎵 Trình Phát Nhạc Pop-up',
        category: 'popup',
        desc: 'Widget máy nghe nhạc Spotify/Apple Music kính mờ nổi đè lên ảnh (Hot trend Canva)',
        padding: { top: 0.04, left: 0.04, right: 0.04, bottom: 0.04 },
        bgColor: '#F5F3EF',
        style: 'music_player'
    },
    {
        id: 'ios_notify_popup',
        name: '💬 Tin Nhắn iOS Kính Mờ',
        desc: 'Bong bóng thông báo iPhone kính mờ nổi đè lên ảnh với thông điệp ngọt ngào',
        padding: { top: 0.04, left: 0.04, right: 0.04, bottom: 0.04 },
        bgColor: '#F0EFEB',
        style: 'ios_notify'
    },
    {
        id: 'macos_window_popup',
        name: '💻 Cửa Sổ Retro Mac Pop-up',
        desc: 'Cửa sổ ứng dụng Apple Mac tối giản với 3 nút màu và tiêu đề nổi',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.18 },
        bgColor: '#EAE6DF',
        style: 'macos_window'
    },
    {
        id: 'popup_glass',
        name: '🪟 Thẻ Kính Mờ 3D (Glassmorphism)',
        category: 'popup',
        desc: 'Thẻ kính mờ nổi bồng bềnh đè lên ảnh kèm kẹp ghim mạ vàng Champagne',
        padding: { top: 0.04, left: 0.04, right: 0.04, bottom: 0.04 },
        bgColor: '#F7F5F0',
        hasPaperClip: true,
        style: 'popup_glass'
    },

    // --- 2. KHUNG LỒNG (NESTED & COLLAGE CANVA) ---
    {
        id: 'canva_blur_nested',
        name: '🖼️ Khung Lồng Canva (Nền Mờ)',
        category: 'nested',
        desc: 'Nền là chính bức ảnh phóng to làm mờ huyền ảo, ảnh chính lồng nổi bật ở giữa',
        padding: { top: 0.08, left: 0.08, right: 0.08, bottom: 0.22 },
        style: 'canva_blur'
    },
    {
        id: 'double_tilt_nested',
        name: '📑 Khung Lồng Xếp Chồng (Double Layer)',
        category: 'nested',
        desc: 'Hai tấm ảnh xếp lồng so le nghiêng nghệ thuật, đổ bóng 3D scrapbook',
        padding: { top: 0.08, left: 0.08, right: 0.08, bottom: 0.24 },
        bgColor: '#FDFBF7',
        style: 'double_tilt'
    },
    {
        id: 'postcard_scrapbook',
        name: '✉️ Bưu Thiếp Lồng & Tem Bưu Điện',
        category: 'nested',
        desc: 'Khung bưu thiếp vintage, tem thư và băng keo dán lồng đè mép ảnh',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.22 },
        bgColor: '#F8F5EE',
        hasWashiOverlap: true,
        style: 'postcard'
    },

    // --- 3. KHUNG ẢNH HÀN QUỐC (KOREAN AESTHETIC) ---
    {
        id: 'korean_fourcut_butter',
        name: '🧈 Hàn Quốc Bơ Sữa (Life4Cuts)',
        category: 'korean',
        desc: 'Khung máy chụp ảnh lấy liền Seoul màu vàng bơ ấm áp, bo tròn dày tối giản',
        padding: { top: 0.07, left: 0.07, right: 0.07, bottom: 0.22 },
        bgColor: '#FFF7E6',
        borderColor: '#FFE8B8',
        brandText: 'PHOTOISM STUDIO • SEOUL',
        style: 'korean_photobooth'
    },
    {
        id: 'korean_fourcut_blue',
        name: '🫐 Hàn Quốc Xanh Pastel (Haru Film)',
        category: 'korean',
        desc: 'Khung xanh da trời pastel trong trẻo phong cách Haru Film nổi tiếng Hàn Quốc',
        padding: { top: 0.07, left: 0.07, right: 0.07, bottom: 0.22 },
        bgColor: '#EEF5FC',
        borderColor: '#D4E5F7',
        brandText: 'HARU FILM • MEMORIES IN SEOUL',
        style: 'korean_photobooth'
    },
    {
        id: 'korean_magazine',
        name: '📰 Tạp Chí Hàn Quốc (Editorial Cover)',
        category: 'korean',
        desc: 'Bìa tạp chí phong cách sống tối giản Kinfolk/Cereal, ảnh lồng thanh lịch',
        padding: { top: 0.12, left: 0.06, right: 0.06, bottom: 0.16 },
        bgColor: '#FAF9F6',
        style: 'korean_magazine'
    },
    {
        id: 'polaroid_korean_film',
        name: '📸 Polaroid Hàn Quốc & Kẹp Vàng',
        category: 'korean',
        desc: 'Polaroid màu kem yến mạch, đáy rộng chữ viết tay và kẹp kim loại 3D',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.24 },
        bgColor: '#FFFFFF',
        borderColor: '#EDE7DC',
        hasPaperClip: true,
        style: 'polaroid'
    },
    {
        id: 'film_nostalgia',
        name: '🎞️ Cuộn Phim Cổ Điển & Dấu Đè',
        category: 'korean',
        desc: 'Cuộn phim nghệ thuật với vệt sáng film leak và tem timestamp hổ phách',
        padding: { top: 0.08, left: 0.05, right: 0.05, bottom: 0.20 },
        bgColor: '#161514',
        borderColor: '#302E2B',
        textColor: '#FFF7EB',
        style: 'film'
    }
];

// Hiệu ứng nổi phủ trong ảnh (Overlay Effects)
const OVERLAY_EFFECTS = [
    { id: 'auto', name: 'Tự động theo khung' },
    { id: 'glass_card', name: 'Thẻ kính mờ (Glass Pop-up)' },
    { id: 'sunbeam', name: 'Vệt nắng ấm xiên qua ảnh' },
    { id: 'sparkles_dust', name: 'Bụi sao lấp lánh trong ảnh' },
    { id: 'none', name: 'Không dùng hiệu ứng phủ' }
];

// Bộ lọc ảnh màu sắc nghệ thuật nhẹ nhàng
const PHOTO_FILTERS = [
    { id: 'none', name: 'Màu gốc tự nhiên' },
    { id: 'bright_sweet', name: 'Trong trẻo Hàn Quốc' },
    { id: 'warm_vintage', name: 'Ấm áp hoài niệm' },
    { id: 'dreamy_pink', name: 'Ánh hồng thơ mộng' },
    { id: 'film_nostalgia', name: 'Màu phim điện ảnh' },
    { id: 'bw_classic', name: 'Trắng đen tối giản' }
];
