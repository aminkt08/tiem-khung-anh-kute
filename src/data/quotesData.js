// Kho dữ liệu câu nói, danh ngôn, thơ ca & caption tiếng Việt chuẩn và phong phú

export const QUOTE_CATEGORIES = [
  { id: 'all', name: '✨ Tất Cả', icon: '✨' },
  { id: 'trending', name: '🔥 Bắt Trend & Gen Z', icon: '🔥' },
  { id: 'humor', name: '🧋 Hài Hước & Mặn Mòi', icon: '🧋' },
  { id: 'funny_poetry', name: '😜 Thơ Hài Vui Vẻ', icon: '😜' },
  { id: 'poetry', name: '📜 Thơ Ngắn & Thả Thính', icon: '📜' },
  { id: 'healing', name: '🌸 Yêu Đời & Chữa Lành', icon: '🌸' },
  { id: 'motivation', name: '🚀 Động Lực & Tỏa Sáng', icon: '🚀' },
  { id: 'chill_coffee', name: '☕ Cà Phê & Trà Sữa', icon: '☕' },
  { id: 'friendship', name: '🌻 Thanh Xuân & Bạn Bè', icon: '🌻' },
];

export const QUOTES_DATA = [
  // =========================================================================
  // --- 1. 🔥 BẮT TREND & GEN Z (TRENDING) ---
  // =========================================================================
  {
    id: 'tr1',
    category: 'trending',
    type: 'quote',
    text: 'Bật chế độ an nhàn, tắt chế độ lo toan ✨',
    author: 'Hệ chill 💅',
    tags: ['trend', 'genz', 'chill', 'an nhàn', 'yêu đời']
  },
  {
    id: 'tr2',
    category: 'trending',
    type: 'quote',
    text: 'Ngoan xinh yêu của chính mình, không cần ai phải duyệt cả!',
    author: 'Yêu bản thân 👑',
    tags: ['trend', 'ngoan xinh yeu', 'xinh', 'tự tin', 'genz']
  },
  {
    id: 'tr3',
    category: 'trending',
    type: 'quote',
    text: 'Xinh đẹp không cần cố gắng, vì sinh ra vốn đã thế rồi!',
    author: 'Visual đỉnh chóp 💄',
    tags: ['trend', 'xinh', 'visual', 'tự tin', 'hài hước']
  },
  {
    id: 'tr4',
    category: 'trending',
    type: 'quote',
    text: 'Mọi sự tùy duyên, nhưng ưu tiên tài khoản nhiều số 0.',
    author: 'Ưu tiên kinh tế 💸',
    tags: ['trend', 'tiền', 'tài chính', 'thực tế', 'hài hước']
  },
  {
    id: 'tr5',
    category: 'trending',
    type: 'quote',
    text: 'Trời sinh bản tính ngoan hiền, dòng đời xô đẩy toàn tiền với lương!',
    author: 'Gen Z đi làm 💵',
    tags: ['trend', 'tiền', 'lương', 'đi làm', 'hài hước']
  },
  {
    id: 'tr6',
    category: 'trending',
    type: 'quote',
    text: 'Người ta hướng nội, hướng ngoại, còn tôi hướng về đồ ăn ngon.',
    author: 'Tâm hồn ăn uống 🍕',
    tags: ['trend', 'ăn uống', 'hướng nội', 'hướng ngoại', 'đồ ăn']
  },
  {
    id: 'tr7',
    category: 'trending',
    type: 'quote',
    text: 'Status này không có gì nổi bật, chỉ có người trong ảnh là phát sáng!',
    author: 'Tỏa sáng ☀️',
    tags: ['trend', 'ảnh đẹp', 'tỏa sáng', 'caption', 'sống ảo']
  },
  {
    id: 'tr8',
    category: 'trending',
    type: 'quote',
    text: 'Không cần trở thành phiên bản hoàn hảo của ai, chỉ cần là phiên bản giới hạn của chính mình!',
    author: 'Limited Edition ✨',
    tags: ['trend', 'bản thân', 'độc bản', 'tự tin', 'truyền cảm hứng']
  },
  {
    id: 'tr9',
    category: 'trending',
    type: 'quote',
    text: 'Deadline dí thì ta chạy, chứ ai lại ngồi khóc!',
    author: 'Chiến thần deadline 🏃‍♀️',
    tags: ['trend', 'deadline', 'công việc', 'hài hước', 'genz']
  },
  {
    id: 'tr10',
    category: 'trending',
    type: 'quote',
    text: 'Đừng gọi em là thiếu nữ, hãy gọi em là người phụ nữ thiếu tiền!',
    author: 'Nỗi lòng Gen Z 💸',
    tags: ['trend', 'tiền', 'thiếu tiền', 'hài hước', 'genz']
  },
  {
    id: 'tr11',
    category: 'trending',
    type: 'quote',
    text: 'Gặp nhau là do duyên số, ở lại bên nhau là do hợp gu ăn uống!',
    author: 'Hội cạ cứng 👯‍♀️',
    tags: ['trend', 'bạn thân', 'ăn uống', 'duyên số', 'tình bạn']
  },
  {
    id: 'tr12',
    category: 'trending',
    type: 'quote',
    text: 'Ở đây có một chiếc visual siêu cấp đáng yêu đang nạp năng lượng.',
    author: 'Ngoan xinh yêu 💖',
    tags: ['trend', 'visual', 'đáng yêu', 'nạp năng lượng', 'cute']
  },
  {
    id: 'tr13',
    category: 'trending',
    type: 'quote',
    text: 'Cứ ngỡ là hoa đã có chủ, ai ngờ là chủ cả vườn hoa!',
    author: 'Độc thân kiêu kỳ 🌹',
    tags: ['trend', 'độc thân', 'hoa', 'kiêu kỳ', 'thả thính']
  },
  {
    id: 'tr14',
    category: 'trending',
    type: 'quote',
    text: 'Tâm bất biến giữa dòng đời vạn biến, nhưng ví tiền biến đổi thì tâm bất an.',
    author: 'Chân lý cuộc sống 💰',
    tags: ['trend', 'ví tiền', 'chân lý', 'hài hước']
  },
  {
    id: 'tr15',
    category: 'trending',
    type: 'quote',
    text: 'Đừng nhìn em lâu, coi chừng đậm sâu rồi không dứt ra được!',
    author: 'Thả thính sang chảnh 💋',
    tags: ['trend', 'thả thính', 'đậm sâu', 'sang chảnh']
  },
  {
    id: 'tr16',
    category: 'trending',
    type: 'quote',
    text: 'Cuộc sống có thể xô đẩy, nhưng dáng đứng chụp hình phải thật keo lỳ!',
    author: 'Keo lỳ tái châu 💅',
    tags: ['trend', 'keo lỳ', 'tạo dáng', 'chụp ảnh', 'sống ảo']
  },

  // =========================================================================
  // --- 2. 🧋 HÀI HƯỚC & MẶN MÒI (HUMOR) ---
  // =========================================================================
  {
    id: 'u1',
    category: 'humor',
    type: 'quote',
    text: 'Đừng buồn vì ví mình rỗng, ít nhất khuôn mặt mình vẫn siêu cấp đáng yêu!',
    author: 'Hội mê trà sữa 🧋',
    tags: ['hài hước', 'đáng yêu', 'ví rỗng', 'trà sữa']
  },
  {
    id: 'u2',
    category: 'humor',
    type: 'quote',
    text: 'Ăn no, ngủ kỹ, chăm chỉ yêu đời. Thế giới để người lớn lo, còn mình làm em bé!',
    author: 'Vô tư yêu đời 🍓',
    tags: ['hài hước', 'ăn no ngủ kỹ', 'yêu đời', 'em bé']
  },
  {
    id: 'u3',
    category: 'humor',
    type: 'quote',
    text: 'Người ta bảo cười là mười thang thuốc bổ. Nhìn mình cười là bổ ngửa luôn!',
    author: 'Cười thả ga 😂',
    tags: ['hài hước', 'nụ cười', 'thuốc bổ', 'vui vẻ']
  },
  {
    id: 'u4',
    category: 'humor',
    type: 'quote',
    text: 'Trời sinh tính nết dịu dàng, dòng đời xô đẩy lại thành đáng yêu!',
    author: 'Cute xỉu 💅',
    tags: ['hài hước', 'dịu dàng', 'đáng yêu', 'cute']
  },
  {
    id: 'u5',
    category: 'humor',
    type: 'quote',
    text: 'Cuộc sống ngắn lắm, hãy cười khi còn đủ răng và ăn khi bụng còn đói!',
    author: 'Đam mê ẩm thực 🍕',
    tags: ['hài hước', 'ăn uống', 'cười', 'cuộc sống']
  },
  {
    id: 'u6',
    category: 'humor',
    type: 'quote',
    text: 'Tự dặn lòng bớt dễ thương lại, nhưng gương soi bảo: Không sửa được đâu!',
    author: 'Tự tin có thừa ✨',
    tags: ['hài hước', 'dễ thương', 'gương', 'tự luyến']
  },
  {
    id: 'u7',
    category: 'humor',
    type: 'quote',
    text: 'Thức dậy với quyết tâm giảm cân, nhưng đồ ăn ngon lại bảo: Ngày mai hẵng tính!',
    author: 'Tâm hồn ăn uống 🧁',
    tags: ['hài hước', 'giảm cân', 'đồ ăn', 'ngày mai']
  },
  {
    id: 'u8',
    category: 'humor',
    type: 'quote',
    text: 'Tiền không mua được hạnh phúc, nhưng mua được trà sữa full topping!',
    author: 'Đạo trà sữa 🧋',
    tags: ['hài hước', 'tiền', 'trà sữa', 'topping']
  },
  {
    id: 'u9',
    category: 'humor',
    type: 'quote',
    text: 'Đẹp tự nhiên chứ không tự nhiên mà đẹp nha quý dzị!',
    author: 'Hoa hậu thân thiện 👑',
    tags: ['hài hước', 'đẹp', 'chăm sóc', 'nhan sắc']
  },
  {
    id: 'u10',
    category: 'humor',
    type: 'quote',
    text: 'Gọi em là cà phê sữa, vì ngọt ngào và khiến người ta mất ngủ!',
    author: 'Thả thính dạo ☕',
    tags: ['hài hước', 'cà phê sữa', 'thả thính', 'ngọt ngào']
  },
  {
    id: 'u11',
    category: 'humor',
    type: 'quote',
    text: 'Trời đổ mưa sao anh chưa đổ em? Hay tại vì em đổ anh trước rồi!',
    author: 'GenZ mặn mòi 🌧️',
    tags: ['hài hước', 'mưa', 'thả thính', 'đổ em']
  },
  {
    id: 'u12',
    category: 'humor',
    type: 'quote',
    text: 'Em không hề béo, em chỉ đang lưu trữ sự đáng yêu ở độ phân giải 4K!',
    author: 'Dung lượng khủng 🍰',
    tags: ['hài hước', 'đáng yêu', 'béo', '4K']
  },
  {
    id: 'u13',
    category: 'humor',
    type: 'quote',
    text: 'Thanh xuân như một tách trà, chụp hình chưa đẹp hết bà thanh xuân!',
    author: 'Nhiếp ảnh gia dạo 📸',
    tags: ['hài hước', 'thanh xuân', 'chụp hình', 'sống ảo']
  },
  {
    id: 'u14',
    category: 'humor',
    type: 'quote',
    text: 'Yêu màu hồng, ghét sự giả dối, nhưng cực kỳ mê sự giàu có!',
    author: 'Chân lý cuộc đời 💖',
    tags: ['hài hước', 'màu hồng', 'giàu có', 'thực tế']
  },
  {
    id: 'u15',
    category: 'humor',
    type: 'quote',
    text: 'Học không chơi đánh rơi tuổi trẻ, chơi mà không chụp ảnh lưu lại thì uổng thanh xuân!',
    author: 'Nghệ thuật sống ảo 📷',
    tags: ['hài hước', 'tuổi trẻ', 'chụp ảnh', 'kỷ niệm']
  },

  // =========================================================================
  // --- 3. 😜 THƠ HÀI VUI VẺ (FUNNY_POETRY) ---
  // =========================================================================
  {
    id: 'fp1',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Sáng ra ăn bát bún bò,\nTrưa ăn đĩa cơm sườn to ngập tràn.\nTối về nằm ngủ thênh thang,\nĐời vui như hội chẳng màng âu lo!',
    author: 'Thơ Bụng Bự 🍜',
    tags: ['thơ hài', 'bún bò', 'ăn uống', 'vui vẻ', 'thơ']
  },
  {
    id: 'fp2',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Trúc xinh trúc mọc đầu đình,\nEm xinh em đứng một mình cũng xinh.\nTrúc xinh trúc mọc bờ ao,\nEm xinh em chụp góc nào cũng keo!',
    author: 'Thơ Tự Luyến 😂',
    tags: ['thơ hài', 'trúc xinh', 'tự luyến', 'chụp ảnh', 'thơ']
  },
  {
    id: 'fp3',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Hoa hồng thì có màu đỏ,\nBầu trời thì có màu xanh.\nEm thì chẳng thích hoa hồng,\nEm chỉ thích tiền và thích ăn ngon!',
    author: 'Thơ Thực Tế 💸',
    tags: ['thơ hài', 'hoa hồng', 'tiền', 'ăn ngon', 'thơ']
  },
  {
    id: 'fp4',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Đầu tuần bận rộn kiếm tiền,\nCuối tuần rủ bạn đi liền cà phê.\nĐời người có mấy cơn mê,\nKhông đi trà sữa uổng bề thanh xuân!',
    author: 'Thơ Đi Chill ☕',
    tags: ['thơ hài', 'cuối tuần', 'cà phê', 'trà sữa', 'thanh xuân']
  },
  {
    id: 'fp5',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Bắc Đẩu thì ở phía bắc,\nCòn em thì thích lắc lư theo nhạc.\nĐời người sống được bao lâu,\nCứ cười thật đã qua cầu buồn vui!',
    author: 'Thơ Vui Tươi 🎵',
    tags: ['thơ hài', 'lạc quan', 'vui vẻ', 'cười', 'thơ']
  },
  {
    id: 'fp6',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Nắng mưa là chuyện của trời,\nĐi chơi ăn uống là đời của em.\nAi chê béo tốt mặc ai,\nEm xinh em khỏe em vui mỗi ngày!',
    author: 'Thơ Yêu Đời 🍰',
    tags: ['thơ hài', 'yêu đời', 'ăn uống', 'vui vẻ', 'thơ']
  },
  {
    id: 'fp7',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Đường vào tim em lắm lối,\nNên thôi em chọn lối vào quán ăn.\nĐồ ăn ngon tuyệt trần gian,\nChứ tim với óc mệt tàn cả thân!',
    author: 'Thơ Lầy Lội 🍔',
    tags: ['thơ hài', 'đồ ăn', 'tình yêu', 'lầy lội', 'thơ']
  },
  {
    id: 'fp8',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Gió đưa cành trúc la đà,\nEm đây chỉ thích ở nhà đắp chăn.\nLướt điện thoại ngắm ảnh xinh,\nĐời an yên thế tội tình gì đâu!',
    author: 'Thơ Thảnh Thơi 🛌',
    tags: ['thơ hài', 'ngủ nướng', 'ảnh xinh', 'an yên', 'thơ']
  },
  {
    id: 'fp9',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Chiều nay mây trắng nắng vàng,\nVí em thì rỗng nhưng lòng hân hoan.\nƯớc gì tiền rớt ào ào,\nCho em mua sắm ào ào cả năm!',
    author: 'Thơ Ước Nguyện 💸',
    tags: ['thơ hài', 'tiền', 'mua sắm', 'hân hoan', 'thơ']
  },
  {
    id: 'fp10',
    category: 'funny_poetry',
    type: 'poetry',
    text: 'Người ta mộng ước cao sang,\nEm đây chỉ ước ngày càng đẹp xinh.\nVí tiền rủng rỉnh rung rinh,\nCuối tuần lượn phố xập xình cùng anh!',
    author: 'Thơ Xập Xình 💃',
    tags: ['thơ hài', 'đẹp xinh', 'ví tiền', 'cuối tuần', 'thơ']
  },

  // =========================================================================
  // --- 4. 📜 THƠ NGẮN & THẢ THÍNH (POETRY) ---
  // =========================================================================
  {
    id: 'p1',
    category: 'poetry',
    type: 'poetry',
    text: 'Nắng mai rọi sáng hiên nhà,\nChúc em một sớm thật thà an vui.\nMuộn phiền gửi gió bay xuôi,\nNụ cười giữ lại cho đời thêm xinh.',
    author: 'Thơ Nắng Sớm ☀️',
    tags: ['thơ ngắn', 'nắng sớm', 'an vui', 'nụ cười', 'dịu dàng']
  },
  {
    id: 'p2',
    category: 'poetry',
    type: 'poetry',
    text: 'Trời xanh mây trắng nắng vàng,\nHôm nay bận rộn dịu dàng đáng yêu.',
    author: 'Thơ Ngày Xanh 🌿',
    tags: ['thơ ngắn', 'trời xanh', 'dịu dàng', 'đáng yêu', '2 câu']
  },
  {
    id: 'p3',
    category: 'poetry',
    type: 'poetry',
    text: 'Hôm nay em bận yêu đời,\nHẹn ngày hôm khác giận hờn trần gian.',
    author: 'Thơ Thả Thính 🌷',
    tags: ['thơ ngắn', 'yêu đời', 'thả thính', 'lạc quan', '2 câu']
  },
  {
    id: 'p4',
    category: 'poetry',
    type: 'poetry',
    text: 'Hoa vẫn nở bên đồi vắng,\nNgười vẫn cười trong nắng mai.\nDẫu cho đường xa muôn dặm,\nAn yên giữ mãi nụ cười.',
    author: 'An Nhiên 🌸',
    tags: ['thơ ngắn', 'hoa nở', 'an nhiên', 'nụ cười', 'bình yên']
  },
  {
    id: 'p5',
    category: 'poetry',
    type: 'poetry',
    text: 'Bình yên là một tách trà,\nThêm vài câu hát chan hòa niềm vui.',
    author: 'Trà Sớm 🍵',
    tags: ['thơ ngắn', 'bình yên', 'tách trà', 'niềm vui', '2 câu']
  },
  {
    id: 'p6',
    category: 'poetry',
    type: 'poetry',
    text: 'Gió mang hương cỏ mùa sang,\nBình yên gõ cửa ngỡ ngàng tim ai.',
    author: 'Gió Mùa 🍃',
    tags: ['thơ ngắn', 'gió mùa', 'bình yên', 'hương cỏ', '2 câu']
  },
  {
    id: 'p7',
    category: 'poetry',
    type: 'poetry',
    text: 'Một nhành hoa nhỏ ven đường,\nCũng làm bừng sáng yêu thương góc trời.',
    author: 'Hoa Ven Đường 🌼',
    tags: ['thơ ngắn', 'hoa nhỏ', 'yêu thương', 'bừng sáng', '2 câu']
  },
  {
    id: 'p8',
    category: 'poetry',
    type: 'poetry',
    text: 'Mong em sớm sớm an lành,\nNgày ngày rạng rỡ như cành hoa tươi.\nMiệng luôn hé nở nụ cười,\nBình an may mắn theo người muôn nơi.',
    author: 'Lời Chúc Dịu Dàng 💐',
    tags: ['thơ ngắn', 'chúc an lành', 'hoa tươi', 'may mắn', 'lời chúc']
  },
  {
    id: 'p9',
    category: 'poetry',
    type: 'poetry',
    text: 'Trăng lên đỉnh núi trăng tà,\nEm đây duyên dáng đậm đà dễ thương.',
    author: 'Thơ Ngọt Ngào 🌙',
    tags: ['thơ ngắn', 'trăng', 'duyên dáng', 'dễ thương', '2 câu']
  },
  {
    id: 'p10',
    category: 'poetry',
    type: 'poetry',
    text: 'Xuân qua hạ tới thu sang,\nĐông về lòng vẫn rộn ràng niềm vui.\nMỉm cười đón gió ngắm hoa,\nThấy đời đẹp tựa một bài thơ xinh.',
    author: 'Bốn Mùa An Vui 🍂',
    tags: ['thơ ngắn', 'bốn mùa', 'ngắm hoa', 'đời đẹp', 'an vui']
  },
  {
    id: 'p11',
    category: 'poetry',
    type: 'poetry',
    text: 'Nghe nói anh thích màu trời,\nCòn em thì thích trọn đời bên anh.',
    author: 'Thơ Tỏ Tình ☁️',
    tags: ['thơ ngắn', 'màu trời', 'tỏ tình', 'thả thính', '2 câu']
  },
  {
    id: 'p12',
    category: 'poetry',
    type: 'poetry',
    text: 'Nắng vàng đổ bóng nghiêng nghiêng,\nEm cười một cái ngả nghiêng lòng người.',
    author: 'Thơ Duyên Dáng ✨',
    tags: ['thơ ngắn', 'nắng vàng', 'nụ cười', 'thả thính', '2 câu']
  },

  // =========================================================================
  // --- 5. 🌸 YÊU ĐỜI & CHỮA LÀNH (HEALING) ---
  // =========================================================================
  {
    id: 'h1',
    category: 'healing',
    type: 'quote',
    text: 'Hãy dịu dàng với chính mình, bạn đang làm rất tốt hơn những gì bạn nghĩ.',
    author: 'Góc an yên 🍃',
    tags: ['chữa lành', 'dịu dàng', 'an yên', 'yêu thương']
  },
  {
    id: 'h2',
    category: 'healing',
    type: 'quote',
    text: 'Bình yên không phải là không có bão giông, mà là giữa bão giông lòng ta vẫn an nhiên.',
    author: 'Thì thầm chữa lành 🤍',
    tags: ['chữa lành', 'bình yên', 'an nhiên', 'vững vàng']
  },
  {
    id: 'h3',
    category: 'healing',
    type: 'quote',
    text: 'Cảm ơn bạn vì đã luôn kiên cường bước qua những ngày giông bão để có nụ cười hôm nay.',
    author: 'Ôm bạn một cái ✨',
    tags: ['chữa lành', 'kiên cường', 'nụ cười', 'ấm áp']
  },
  {
    id: 'h4',
    category: 'healing',
    type: 'quote',
    text: 'Cuộc đời này ngắn ngủi lắm, hãy yêu thương bản thân nhiều hơn mỗi ngày.',
    author: 'Trân quý hiện tại 🌷',
    tags: ['chữa lành', 'yêu bản thân', 'trân quý', 'hiện tại']
  },
  {
    id: 'h5',
    category: 'healing',
    type: 'quote',
    text: 'Mỗi bông hoa đều có mùa nở riêng, và bạn cũng vậy. Đừng vội vã.',
    author: 'Khu vườn tâm hồn 🌻',
    tags: ['chữa lành', 'hoa nở', 'đừng vội', 'kiên nhẫn']
  },
  {
    id: 'h6',
    category: 'healing',
    type: 'quote',
    text: 'Uống một ngụm trà ấm, ngắm một nhành cây xanh, tự khắc lòng thấy nhẹ nhõm.',
    author: 'Tách trà chiều ☕',
    tags: ['chữa lành', 'trà ấm', 'nhẹ nhõm', 'thư thái']
  },
  {
    id: 'h7',
    category: 'healing',
    type: 'quote',
    text: 'Bạn xứng đáng được yêu thương và nâng niu theo cách chân thành, dịu ngọt nhất.',
    author: 'Lời gửi bạn 🕊️',
    tags: ['chữa lành', 'xứng đáng', 'yêu thương', 'chân thành']
  },
  {
    id: 'h8',
    category: 'healing',
    type: 'quote',
    text: 'Hít vào bình an, thở ra nhẹ nhõm. Mọi muộn phiền rồi cũng sẽ trôi qua.',
    author: 'An nhiên tự tại 🌿',
    tags: ['chữa lành', 'hít thở', 'bình an', 'nhẹ nhõm']
  },
  {
    id: 'h9',
    category: 'healing',
    type: 'quote',
    text: 'Hôm nay trời xanh và nắng rất đẹp, mong trái tim bạn cũng trong trẻo như vậy.',
    author: 'Nắng sớm an lành ☀️',
    tags: ['chữa lành', 'trời xanh', 'trong trẻo', 'nắng sớm']
  },
  {
    id: 'h10',
    category: 'healing',
    type: 'quote',
    text: 'Đôi khi món quà tuyệt vời nhất bạn có thể tự tặng mình là một buổi chiều nghỉ ngơi.',
    author: 'Chậm lại một nhịp 🌙',
    tags: ['chữa lành', 'nghỉ ngơi', 'quà tặng', 'chậm lại']
  },
  {
    id: 'h11',
    category: 'healing',
    type: 'quote',
    text: 'Dù ngoài kia có vội vã đến đâu, hãy giữ cho tâm hồn một góc nhỏ bình yên.',
    author: 'Góc nhỏ dịu êm 🕯️',
    tags: ['chữa lành', 'bình yên', 'tâm hồn', 'góc nhỏ']
  },
  {
    id: 'h12',
    category: 'healing',
    type: 'quote',
    text: 'Mỗi sớm mai thức dậy là một khởi đầu mới, hãy để niềm vui dẫn đường cho bạn.',
    author: 'Khởi đầu tươi sáng 🌅',
    tags: ['chữa lành', 'sớm mai', 'khởi đầu mới', 'niềm vui']
  },
  {
    id: 'h13',
    category: 'healing',
    type: 'quote',
    text: 'Đừng quên mỉm cười với bản thân trong gương mỗi sáng nhé, bạn xinh đẹp và đáng mến lắm!',
    author: 'Thương mình một chút 🪞',
    tags: ['chữa lành', 'mỉm cười', 'gương', 'xinh đẹp']
  },

  // =========================================================================
  // --- 6. 🚀 ĐỘNG LỰC & TỎA SÁNG (MOTIVATION) ---
  // =========================================================================
  {
    id: 'm1',
    category: 'motivation',
    type: 'quote',
    text: 'Mỗi ngày mới là một cơ hội tuyệt vời để bạn tỏa sáng rực rỡ theo cách của riêng mình!',
    author: 'Năng lượng tích cực ☀️',
    tags: ['động lực', 'tỏa sáng', 'ngày mới', 'cơ hội']
  },
  {
    id: 'm2',
    category: 'motivation',
    type: 'quote',
    text: 'Như bông hoa hướng dương, luôn hướng về phía mặt trời và kiêu hãnh vươn cao.',
    author: 'Kiên định vươn xa 🌻',
    tags: ['động lực', 'hướng dương', 'mặt trời', 'vươn cao']
  },
  {
    id: 'm3',
    category: 'motivation',
    type: 'quote',
    text: 'Chỉ cần bạn không bỏ cuộc, mỗi bước đi nhỏ hôm nay đều đưa bạn tới thành công rực rỡ.',
    author: 'Vững bước tiến lên 🚀',
    tags: ['động lực', 'không bỏ cuộc', 'bước đi nhỏ', 'thành công']
  },
  {
    id: 'm4',
    category: 'motivation',
    type: 'quote',
    text: 'Bầu trời sau cơn mưa luôn xuất hiện cầu vồng rạng rỡ nhất.',
    author: 'Hy vọng ngày mai 🌈',
    tags: ['động lực', 'cầu vồng', 'sau mưa', 'hy vọng']
  },
  {
    id: 'm5',
    category: 'motivation',
    type: 'quote',
    text: 'Bạn mạnh mẽ hơn bạn nghĩ, dũng cảm hơn bạn tin và tuyệt vời hơn bạn tưởng!',
    author: 'Tự hào về bạn ⭐',
    tags: ['động lực', 'mạnh mẽ', 'dũng cảm', 'tuyệt vời']
  },
  {
    id: 'm6',
    category: 'motivation',
    type: 'quote',
    text: 'Hãy làm việc chăm chỉ trong im lặng và để thành công của bạn lên tiếng.',
    author: 'Bền bỉ nỗ lực 💎',
    tags: ['động lực', 'chăm chỉ', 'im lặng', 'thành công']
  },
  {
    id: 'm7',
    category: 'motivation',
    type: 'quote',
    text: 'Tương lai thuộc về những ai tin tưởng vào vẻ đẹp trong ước mơ của chính mình.',
    author: 'Khát vọng bay cao ✨',
    tags: ['động lực', 'tương lai', 'ước mơ', 'tin tưởng']
  },
  {
    id: 'm8',
    category: 'motivation',
    type: 'quote',
    text: 'Đừng so sánh mình với ai khác. Bông hoa nào cũng đẹp theo hương sắc của riêng nó.',
    author: 'Bản sắc riêng 🌸',
    tags: ['động lực', 'so sánh', 'bản sắc', 'tự tin']
  },
  {
    id: 'm9',
    category: 'motivation',
    type: 'quote',
    text: 'Thành công bắt đầu từ quyết định dám thử điều mới mẻ hôm nay.',
    author: 'Dám nghĩ dám làm 🔥',
    tags: ['động lực', 'dám thử', 'bắt đầu', 'mới mẻ']
  },
  {
    id: 'm10',
    category: 'motivation',
    type: 'quote',
    text: 'Hãy là phiên bản tốt nhất của chính bạn, chứ không phải bản sao của bất kỳ ai.',
    author: 'Tự tin tỏa sáng 👑',
    tags: ['động lực', 'phiên bản tốt nhất', 'bản sao', 'tự tin']
  },
  {
    id: 'm11',
    category: 'motivation',
    type: 'quote',
    text: 'Khó khăn chỉ là viên đá thử vàng trên con đường bạn chạm tới đỉnh vinh quang.',
    author: 'Bản lĩnh kiên cường 🏔️',
    tags: ['động lực', 'khó khăn', 'thử vàng', 'vinh quang']
  },
  {
    id: 'm12',
    category: 'motivation',
    type: 'quote',
    text: 'Không có áp lực thì không có kim cương. Cố lên nhé, thành công đang đợi bạn!',
    author: 'Ý chí kiên cường 💎',
    tags: ['động lực', 'áp lực', 'kim cương', 'cố lên']
  },

  // =========================================================================
  // --- 7. ☕ CÀ PHÊ & TRÀ SỮA (CHILL_COFFEE) ---
  // =========================================================================
  {
    id: 'c1',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Cuối tuần gác lại âu lo, đi tìm một góc nhỏ thưởng thức ly cà phê thơm lừng.',
    author: 'Góc Chill Chiều Thứ 7 ☕',
    tags: ['cà phê', 'cuối tuần', 'thơm lừng', 'góc nhỏ', 'chill']
  },
  {
    id: 'c2',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Một cốc trà đào cam sả, xua tan hết muộn phiền vất vả của cả tuần.',
    author: 'Hội Nghiện Trà Đào 🍑',
    tags: ['trà đào', 'cam sả', 'muộn phiền', 'chill', 'sảng khoái']
  },
  {
    id: 'c3',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Mùi cà phê sáng, giai điệu acoustic êm đềm và một ngày thật an vui.',
    author: 'Hương vị buổi sáng 🎵',
    tags: ['cà phê', 'acoustic', 'sáng sớm', 'an vui']
  },
  {
    id: 'c4',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Hẹn hò với sự bình yên bên ô cửa sổ nhỏ ngập tràn ánh nắng.',
    author: 'Góc Phố Dịu Êm 🪟',
    tags: ['cà phê', 'cửa sổ', 'ánh nắng', 'bình yên', 'hẹn hò']
  },
  {
    id: 'c5',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Nắng tắt, phố lên đèn, tự thưởng cho mình một ly trà sữa ngọt ngào.',
    author: 'Chữa lành sau giờ làm 🧋',
    tags: ['trà sữa', 'ngọt ngào', 'phố lên đèn', 'chữa lành']
  },
  {
    id: 'c6',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Cuộc sống cần những khoảng lặng, như tách espresso cần vị đắng để đượm hương sâu.',
    author: 'Hương vị cà phê ☕',
    tags: ['cà phê', 'espresso', 'khoảng lặng', 'chiêm nghiệm']
  },
  {
    id: 'c7',
    category: 'chill_coffee',
    type: 'quote',
    text: 'Hôm nay em không có gì để nói, ngoài việc muốn rủ ai đó đi cà phê chuyện trò!',
    author: 'Đi cafe không? 🥐',
    tags: ['cà phê', 'rủ đi chơi', 'trò chuyện', 'cuối tuần']
  },

  // =========================================================================
  // --- 8. 🌻 THANH XUÂN & BẠN BÈ (FRIENDSHIP) ---
  // =========================================================================
  {
    id: 'f1',
    category: 'friendship',
    type: 'quote',
    text: 'Thanh xuân đẹp nhất là khi có các bạn cùng điên, cùng cười, cùng lưu giữ khoảnh khắc này.',
    author: 'Hội Bạn Thân 👯‍♀️',
    tags: ['bạn bè', 'thanh xuân', 'hội bạn thân', 'kỷ niệm', 'nụ cười']
  },
  {
    id: 'f2',
    category: 'friendship',
    type: 'quote',
    text: 'Thời gian có thể trôi, nhưng tình bạn của chúng mình thì mãi mãi rạng rỡ như bức ảnh này.',
    author: 'Mãi là bạn tốt 🌟',
    tags: ['bạn bè', 'tình bạn', 'rạng rỡ', 'mãi mãi']
  },
  {
    id: 'f3',
    category: 'friendship',
    type: 'quote',
    text: 'Đi đâu không quan trọng, quan trọng là được đi cùng những người bạn yêu quý.',
    author: 'Chuyến đi thanh xuân 🎒',
    tags: ['bạn bè', 'đi du lịch', 'chuyến đi', 'thanh xuân']
  },
  {
    id: 'f4',
    category: 'friendship',
    type: 'quote',
    text: 'Cảm ơn vì đã xuất hiện và làm cho thanh xuân của tớ trở nên rực rỡ sắc màu.',
    author: 'Tri kỷ tuổi trẻ 💖',
    tags: ['bạn bè', 'tri kỷ', 'sắc màu', 'cảm ơn']
  },
  {
    id: 'f5',
    category: 'friendship',
    type: 'quote',
    text: 'Mỗi khoảnh khắc bên nhau đều là một trang ký ức vô giá của tuổi trẻ.',
    author: 'Kỷ niệm thanh xuân 📸',
    tags: ['bạn bè', 'ký ức', 'vô giá', 'tuổi trẻ']
  },
  {
    id: 'f6',
    category: 'friendship',
    type: 'quote',
    text: 'Bạn bè tốt là người thấy bạn chuẩn bị chụp ảnh sống ảo thì lập tức bay vào tạo dáng cùng!',
    author: 'Cạ cứng ăn ý ✌️',
    tags: ['bạn bè', 'sống ảo', 'tạo dáng', 'chụp ảnh', 'cạ cứng']
  }
];

// Hàm lấy câu ngẫu nhiên theo danh mục và loại (quote/poetry)
export function getRandomQuote(category = 'all', type = 'all') {
  let list = QUOTES_DATA;
  if (category && category !== 'all') {
    list = list.filter(q => q.category === category);
  }
  if (type && type !== 'all') {
    list = list.filter(q => q.type === type);
  }
  if (!list.length) list = QUOTES_DATA;
  return list[Math.floor(Math.random() * list.length)];
}

// Hàm tìm kiếm câu nói theo từ khóa
export function searchQuotes(query = '', category = 'all', type = 'all') {
  let list = QUOTES_DATA;
  
  if (category && category !== 'all') {
    list = list.filter(q => q.category === category);
  }
  
  if (type && type !== 'all') {
    list = list.filter(q => q.type === type);
  }
  
  if (!query.trim()) return list;
  
  const qLower = query.toLowerCase().trim();
  return list.filter(q => 
    q.text.toLowerCase().includes(qLower) ||
    q.author.toLowerCase().includes(qLower) ||
    (q.tags && q.tags.some(t => t.toLowerCase().includes(qLower)))
  );
}
