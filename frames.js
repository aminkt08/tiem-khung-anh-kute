// Hệ thống Khung ảnh nghệ thuật & Sticker Kute

const STICKER_LIBRARY = [
    { id: 'cat', emoji: '🐱', name: 'Mèo con' },
    { id: 'bunny', emoji: '🐰', name: 'Thỏ xinh' },
    { id: 'bear', emoji: '🐻', name: 'Gấu con' },
    { id: 'sparkles', emoji: '✨', name: 'Lấp lánh' },
    { id: 'heart_pink', emoji: '💖', name: 'Trái tim' },
    { id: 'sunflower', emoji: '🌻', name: 'Hướng dương' },
    { id: 'cherry_blossom', emoji: '🌸', name: 'Hoa anh đào' },
    { id: 'rainbow', emoji: '🌈', name: 'Cầu vồng' },
    { id: 'boba', emoji: '🧋', name: 'Trà sữa' },
    { id: 'strawberry', emoji: '🍓', name: 'Dâu tây' },
    { id: 'cloud', emoji: '☁️', name: 'Mây hồng' },
    { id: 'ribbon', emoji: '🎀', name: 'Nơ hồng' },
    { id: 'sun', emoji: '☀️', name: 'Nắng sớm' },
    { id: 'coffee', emoji: '☕', name: 'Tách trà/cà phê' },
    { id: 'clover', emoji: '🍀', name: 'Cỏ 4 lá' },
    { id: 'cake', emoji: '🍰', name: 'Bánh ngọt' },
    { id: 'butterfly', emoji: '🦋', name: 'Bướm xuân' },
    { id: 'sparkle_stars', emoji: '⭐', name: 'Ngôi sao' }
];

// Tỉ lệ viền padding tính theo tỉ lệ phần trăm của chiều rộng ảnh
const FRAME_PRESETS = [
    {
        id: 'polaroid_classic',
        name: '📸 Polaroid Cổ Điển',
        desc: 'Khung ảnh máy ảnh lấy liền, đáy rộng viết lời chúc ngọt ngào',
        padding: { top: 0.05, left: 0.05, right: 0.05, bottom: 0.24 },
        bgColor: '#FFFDF9',
        borderColor: '#EFE3D3',
        borderRadius: 12,
        shadow: true,
        style: 'polaroid'
    },
    {
        id: 'pastel_pink',
        name: '🌸 Pastel Kẹo Ngọt',
        desc: 'Viền hồng phấn kem bơ, bo tròn mềm mại và dịu dàng',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.22 },
        bgColor: '#FFF0F5',
        borderColor: '#FFB6C1',
        borderRadius: 28,
        style: 'pastel'
    },
    {
        id: 'washi_tape',
        name: '📌 Scrapbook & Băng Keo',
        desc: 'Khung dán băng keo washi họa tiết ở các góc cực kute',
        padding: { top: 0.07, left: 0.06, right: 0.06, bottom: 0.24 },
        bgColor: '#FDFBF7',
        borderColor: '#E2D5BE',
        borderRadius: 16,
        style: 'washi'
    },
    {
        id: 'vintage_film',
        name: '🎞️ Cuộn Phim Hoài Niệm',
        desc: 'Dải phim điện ảnh cổ điển với viền đục lỗ nghệ thuật',
        padding: { top: 0.09, left: 0.06, right: 0.06, bottom: 0.24 },
        bgColor: '#1A1918',
        borderColor: '#383533',
        textColor: '#FFF6E0',
        borderRadius: 14,
        style: 'film'
    },
    {
        id: 'cloud_dream',
        name: '☁️ Mây Hồng Gradient',
        desc: 'Viền chuyển màu hoàng hôn mộng mơ, hiện đại lung linh',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.22 },
        gradient: ['#FFE5EC', '#F0E6FF', '#E8F0FE'],
        borderRadius: 30,
        style: 'gradient'
    },
    {
        id: 'mint_fresh',
        name: '🌿 Bạc Hà Xanh Mát',
        desc: 'Viền xanh pastel tự nhiên mang lại cảm giác bình yên',
        padding: { top: 0.06, left: 0.06, right: 0.06, bottom: 0.22 },
        bgColor: '#F0FDF4',
        borderColor: '#86EFAC',
        borderRadius: 24,
        style: 'mint'
    },
    {
        id: 'minimal_chic',
        name: '✨ Tối Giản Nghệ Thuật',
        desc: 'Viền mỏng thanh thoát, tinh tế và chuẩn gu sang chảnh',
        padding: { top: 0.05, left: 0.05, right: 0.05, bottom: 0.20 },
        bgColor: '#FFFFFF',
        borderColor: '#718096',
        borderWidth: 2,
        borderRadius: 8,
        style: 'minimal'
    }
];

// Bộ lọc ảnh (Photo Filters)
const PHOTO_FILTERS = [
    { id: 'none', name: 'Gốc (Tự nhiên)' },
    { id: 'bright_sweet', name: 'Tươi Sáng Pastel' },
    { id: 'warm_vintage', name: 'Ấm Áp Vintage' },
    { id: 'dreamy_pink', name: 'Mộng Mơ Ánh Hồng' },
    { id: 'film_nostalgia', name: 'Phim Hoài Niệm' },
    { id: 'bw_classic', name: 'Trắng Đen Nghệ Thuật' }
];
