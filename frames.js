// Hệ thống Khung ảnh Pop-up 3D & Sticker Tối Giản Dễ Thương (Aesthetic & Minimal)

// Bảng icon phong cách đơn giản, tinh tế, nhẹ nhàng (Bỏ các icon hoạt hình trẻ con)
const STICKER_LIBRARY = [
    { id: 'sparkle_pure', emoji: '✨', name: 'Lấp lánh tinh khôi' },
    { id: 'heart_white', emoji: '🤍', name: 'Trái tim trắng' },
    { id: 'leaf_branch', emoji: '🌿', name: 'Cành lá khuynh diệp' },
    { id: 'tulip_soft', emoji: '🌷', name: 'Hoa tulip dịu dàng' },
    { id: 'coffee_cup', emoji: '☕', name: 'Tách cà phê ấm' },
    { id: 'dove_peace', emoji: '🕊️', name: 'Bồ câu an yên' },
    { id: 'crescent_moon', emoji: '🌙', name: 'Trăng khuyết' },
    { id: 'candle_warm', emoji: '🕯️', name: 'Nến thơm' },
    { id: 'open_book', emoji: '📖', name: 'Trang sách nhỏ' },
    { id: 'letter_envelope', emoji: '✉️', name: 'Phong thư gửi trao' },
    { id: 'camera_retro', emoji: '📷', name: 'Máy ảnh mộc mạc' },
    { id: 'music_note', emoji: '🎵', name: 'Giai điệu nhẹ nhàng' },
    { id: 'tag_label', emoji: '🏷️', name: 'Nhãn tag vintage' },
    { id: 'soft_cloud', emoji: '☁️', name: 'Mây trôi an nhiên' },
    { id: 'sun_warm', emoji: '☀️', name: 'Ánh nắng ban mai' },
    { id: 'four_leaf', emoji: '🍀', name: 'Cỏ may mắn' },
    { id: 'star_aesthetic', emoji: '⭐', name: 'Ngôi sao nhỏ' },
    { id: 'butterfly_soft', emoji: '🦋', name: 'Cánh bướm dịu êm' }
];

// Khung ảnh phong cách Pop-up 3D & Layer đa tầng
const FRAME_PRESETS = [
    {
        id: 'popup_glass',
        name: '🪟 Kính Mờ Pop-up 3D',
        desc: 'Thẻ chữ kính mờ (Glassmorphism) nổi bồng bềnh đè lên góc ảnh, đổ bóng sâu 3D',
        padding: { top: 0.04, left: 0.04, right: 0.04, bottom: 0.04 },
        bgColor: '#F8F6F2',
        overlayType: 'glass_card',
        hasPaperClip: true,
        style: 'popup_glass'
    },
    {
        id: 'postcard_stamp',
        name: '✉️ Bưu Thiếp & Tem Dán Đè',
        desc: 'Ảnh nổi 3D kèm tem bưu điện và băng keo mờ dán đè trực tiếp lên mép ảnh',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.22 },
        bgColor: '#FAF7F2',
        borderColor: '#E8DFD3',
        overlayType: 'postal_stamp',
        hasWashiOverlap: true,
        style: 'postcard'
    },
    {
        id: 'sunbeam_prism',
        name: '☀️ Vệt Nắng Chiều & Lăng Kính',
        desc: 'Vệt nắng xiên nhẹ ấm áp và bụi sao lấp lánh phản chiếu trực tiếp trong lòng bức ảnh',
        padding: { top: 0.05, left: 0.05, right: 0.05, bottom: 0.20 },
        bgColor: '#FFFDF9',
        borderColor: '#F3E9DA',
        overlayType: 'sunbeam',
        style: 'sunbeam'
    },
    {
        id: 'polaroid_clip',
        name: '📎 Polaroid & Kẹp Kim Loại 3D',
        desc: 'Khung ảnh lấy liền với kẹp tài liệu kim loại sang trọng kẹp trực tiếp vào góc ảnh',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.24 },
        bgColor: '#FFFFFF',
        borderColor: '#EDE6DD',
        hasPaperClip: true,
        hasWashiOverlap: true,
        style: 'polaroid'
    },
    {
        id: 'film_nostalgia',
        name: '🎞️ Phim Cổ Điển & Dấu Đè',
        desc: 'Cuộn phim nghệ thuật với vệt sáng film leak và tem timestamp hổ phách',
        padding: { top: 0.08, left: 0.05, right: 0.05, bottom: 0.20 },
        bgColor: '#161514',
        borderColor: '#302E2B',
        textColor: '#FFF7EB',
        overlayType: 'film_leak',
        style: 'film'
    },
    {
        id: 'minimal_gallery',
        name: '✨ Tranh Triển Lãm Nổi Khối',
        desc: 'Viền tranh tinh giản cao cấp, ảnh nổi khối 3D với typography thanh lịch',
        padding: { top: 0.07, left: 0.07, right: 0.07, bottom: 0.20 },
        bgColor: '#FAF9F6',
        borderColor: '#D8D3C8',
        borderWidth: 1.5,
        style: 'minimal'
    }
];

// Hiệu ứng nổi bổ sung trong lòng ảnh (Overlay Effects)
const OVERLAY_EFFECTS = [
    { id: 'auto', name: 'Tự động theo khung' },
    { id: 'glass_card', name: 'Thẻ kính mờ nổi (Glass Pop-up)' },
    { id: 'sunbeam', name: 'Vệt nắng ấm xiên qua ảnh' },
    { id: 'postal_stamp', name: 'Tem bưu chính dán đè' },
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
