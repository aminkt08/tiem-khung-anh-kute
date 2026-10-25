// Kho dữ liệu câu nói, danh ngôn, thơ ca & caption tiếng Việt chuẩn

export const QUOTE_CATEGORIES = [
  { id: 'healing', name: '🌸 Yêu Đời & Chữa Lành' },
  { id: 'motivation', name: '🔥 Động Lực & Tích Cực' },
  { id: 'poetry', name: '📜 Thơ Ngắn 2-4 Câu' },
  { id: 'humor', name: '🧋 Hài Hước & Mặn Mà' },
];

export const QUOTES_DATA = [
  // --- 1. YÊU ĐỜI & CHỮA LÀNH (HEALING) ---
  {
    id: 'h1',
    category: 'healing',
    text: 'Hãy dịu dàng với chính mình, bạn đang làm rất tốt hơn những gì bạn nghĩ.',
    author: 'Góc an yên 🍃'
  },
  {
    id: 'h2',
    category: 'healing',
    text: 'Bình yên không phải là không có bão giông, mà là giữa bão giông lòng ta vẫn an nhiên.',
    author: 'Thì thầm chữa lành 🤍'
  },
  {
    id: 'h3',
    category: 'healing',
    text: 'Cảm ơn bạn vì đã luôn kiên cường bước qua những ngày giông bão để có nụ cười hôm nay.',
    author: 'Ôm bạn một cái ✨'
  },
  {
    id: 'h4',
    category: 'healing',
    text: 'Cuộc đời này ngắn ngủi lắm, hãy yêu thương bản thân nhiều hơn mỗi ngày.',
    author: 'Trân quý hiện tại 🌷'
  },
  {
    id: 'h5',
    category: 'healing',
    text: 'Mỗi bông hoa đều có mùa nở riêng, và bạn cũng vậy. Đừng vội vã.',
    author: 'Khu vườn tâm hồn 🌻'
  },
  {
    id: 'h6',
    category: 'healing',
    text: 'Uống một ngụm trà ấm, ngắm một nhành cây xanh, tự khắc lòng thấy nhẹ nhõm.',
    author: 'Tách trà chiều ☕'
  },
  {
    id: 'h7',
    category: 'healing',
    text: 'Bạn xứng đáng được yêu thương và nâng niu theo cách chân thành, dịu ngọt nhất.',
    author: 'Lời gửi bạn 🕊️'
  },
  {
    id: 'h8',
    category: 'healing',
    text: 'Hít vào bình an, thở ra nhẹ nhõm. Mọi muộn phiền rồi cũng sẽ trôi qua.',
    author: 'An nhiên tự tại 🌿'
  },
  {
    id: 'h9',
    category: 'healing',
    text: 'Hôm nay trời xanh và nắng rất đẹp, mong trái tim bạn cũng trong trẻo như vậy.',
    author: 'Nắng sớm an lành ☀️'
  },
  {
    id: 'h10',
    category: 'healing',
    text: 'Đôi khi món quà tuyệt vời nhất bạn có thể tự tặng mình là một buổi chiều nghỉ ngơi.',
    author: 'Chậm lại một nhịp 🌙'
  },
  {
    id: 'h11',
    category: 'healing',
    text: 'Dù ngoài kia có vội vã đến đâu, hãy giữ cho tâm hồn một góc nhỏ bình yên.',
    author: 'Góc nhỏ dịu êm 🕯️'
  },

  // --- 2. ĐỘNG LỰC & TÍCH CỰC (MOTIVATION) ---
  {
    id: 'm1',
    category: 'motivation',
    text: 'Mỗi ngày mới là một cơ hội tuyệt vời để bạn tỏa sáng rực rỡ theo cách của riêng mình!',
    author: 'Năng lượng tích cực ☀️'
  },
  {
    id: 'm2',
    category: 'motivation',
    text: 'Như bông hoa hướng dương, luôn hướng về phía mặt trời và kiêu hãnh vươn cao.',
    author: 'Kiên định vươn xa 🌻'
  },
  {
    id: 'm3',
    category: 'motivation',
    text: 'Chỉ cần bạn không bỏ cuộc, mỗi bước đi nhỏ hôm nay đều đưa bạn tới thành công rực rỡ.',
    author: 'Vững bước tiến lên 🚀'
  },
  {
    id: 'm4',
    category: 'motivation',
    text: 'Bầu trời sau cơn mưa luôn xuất hiện cầu vồng rạng rỡ nhất.',
    author: 'Hy vọng ngày mai 🌈'
  },
  {
    id: 'm5',
    category: 'motivation',
    text: 'Bạn mạnh mẽ hơn bạn nghĩ, dũng cảm hơn bạn tin và tuyệt vời hơn bạn tưởng!',
    author: 'Tự hào về bạn ⭐'
  },
  {
    id: 'm6',
    category: 'motivation',
    text: 'Hãy làm việc chăm chỉ trong im lặng và để thành công của bạn lên tiếng.',
    author: 'Bền bỉ nỗ lực 💎'
  },
  {
    id: 'm7',
    category: 'motivation',
    text: 'Tương lai thuộc về những ai tin tưởng vào vẻ đẹp trong ước mơ của chính mình.',
    author: 'Khát vọng bay cao ✨'
  },
  {
    id: 'm8',
    category: 'motivation',
    text: 'Đừng so sánh mình với ai khác. Bông hoa nào cũng đẹp theo hương sắc của riêng nó.',
    author: 'Bản sắc riêng 🌸'
  },
  {
    id: 'm9',
    category: 'motivation',
    text: 'Thành công bắt đầu từ quyết định dám thử điều mới mẻ hôm nay.',
    author: 'Dám nghĩ dám làm 🔥'
  },
  {
    id: 'm10',
    category: 'motivation',
    text: 'Hãy là phiên bản tốt nhất của chính bạn, chứ không phải bản sao của bất kỳ ai.',
    author: 'Tự tin tỏa sáng 👑'
  },
  {
    id: 'm11',
    category: 'motivation',
    text: 'Khó khăn chỉ là viên đá thử vàng trên con đường bạn chạm tới đỉnh vinh quang.',
    author: 'Bản lĩnh kiên cường 🏔️'
  },

  // --- 3. THƠ NGẮN 2-4 CÂU (POETRY) ---
  {
    id: 'p1',
    category: 'poetry',
    text: 'Nắng mai rọi sáng hiên nhà,\nChúc em một sớm thật thà an vui.\nMuộn phiền gửi gió bay xuôi,\nNụ cười giữ lại cho đời thêm xinh.',
    author: 'Thơ Nắng Sớm ☀️'
  },
  {
    id: 'p2',
    category: 'poetry',
    text: 'Trời xanh mây trắng nắng vàng,\nHôm nay bận rộn dịu dàng đáng yêu.',
    author: 'Thơ Ngày Xanh 🌿'
  },
  {
    id: 'p3',
    category: 'poetry',
    text: 'Hôm nay em bận yêu đời,\nHẹn ngày hôm khác giận hờn trần gian.',
    author: 'Thơ Thả Thính 🌷'
  },
  {
    id: 'p4',
    category: 'poetry',
    text: 'Hoa vẫn nở bên đồi vắng,\nNgười vẫn cười trong nắng mai.\nDẫu cho đường xa muôn dặm,\nAn yên giữ mãi nụ cười.',
    author: 'An Nhiên 🌸'
  },
  {
    id: 'p5',
    category: 'poetry',
    text: 'Bình yên là một tách trà,\nThêm vài câu hát chan hòa niềm vui.',
    author: 'Trà Sớm 🍵'
  },
  {
    id: 'p6',
    category: 'poetry',
    text: 'Gió mang hương cỏ mùa sang,\nBình yên gõ cửa ngỡ ngàng tim ai.',
    author: 'Gió Mùa 🍃'
  },
  {
    id: 'p7',
    category: 'poetry',
    text: 'Một nhành hoa nhỏ ven đường,\nCũng làm bừng sáng yêu thương góc trời.',
    author: 'Hoa Ven Đường 🌼'
  },
  {
    id: 'p8',
    category: 'poetry',
    text: 'Mong em sớm sớm an lành,\nNgày ngày rạng rỡ như cành hoa tươi.\nMiệng luôn hé nở nụ cười,\nBình an may mắn theo người muôn nơi.',
    author: 'Lời Chúc Dịu Dàng 💐'
  },
  {
    id: 'p9',
    category: 'poetry',
    text: 'Trăng lên đỉnh núi trăng tà,\nEm đây duyên dáng đậm đà dễ thương.',
    author: 'Thơ Ngọt Ngào 🌙'
  },
  {
    id: 'p10',
    category: 'poetry',
    text: 'Xuân qua hạ tới thu sang,\nĐông về lòng vẫn rộn ràng niềm vui.',
    author: 'Bốn Mùa An Vui 🍂'
  },
  {
    id: 'p11',
    category: 'poetry',
    text: 'Mỉm cười đón gió ngắm hoa,\nThấy đời đẹp tựa một bài thơ xinh.',
    author: 'Thơ Tự Tại ✨'
  },

  // --- 4. HÀI HƯỚC & MẶN MÀ (HUMOR) ---
  {
    id: 'u1',
    category: 'humor',
    text: 'Đừng buồn vì ví mình rỗng, ít nhất khuôn mặt mình vẫn siêu cấp đáng yêu!',
    author: 'Hội mê trà sữa 🧋'
  },
  {
    id: 'u2',
    category: 'humor',
    text: 'Ăn no, ngủ kỹ, chăm chỉ yêu đời. Thế giới để người lớn lo, còn mình làm em bé!',
    author: 'Vô tư yêu đời 🍓'
  },
  {
    id: 'u3',
    category: 'humor',
    text: 'Người ta bảo cười là mười thang thuốc bổ. Nhìn mình cười là bổ ngửa luôn!',
    author: 'Cười thả ga 😂'
  },
  {
    id: 'u4',
    category: 'humor',
    text: 'Trời sinh tính nết dịu dàng, dòng đời xô đẩy lại thành đáng yêu!',
    author: 'Cute xỉu up xỉu down 💅'
  },
  {
    id: 'u5',
    category: 'humor',
    text: 'Cuộc sống ngắn lắm, hãy cười khi còn đủ răng và ăn khi bụng còn đói!',
    author: 'Đam mê ẩm thực 🍕'
  },
  {
    id: 'u6',
    category: 'humor',
    text: 'Tự dặn lòng bớt dễ thương lại, nhưng gương soi bảo: Không sửa được đâu!',
    author: 'Tự tin có thừa ✨'
  },
  {
    id: 'u7',
    category: 'humor',
    text: 'Thức dậy với quyết tâm giảm cân, nhưng đồ ăn ngon lại bảo: Ngày mai hẵng tính!',
    author: 'Tâm hồn ăn uống 🧁'
  },
  {
    id: 'u8',
    category: 'humor',
    text: 'Tiền không mua được hạnh phúc, nhưng mua được trà sữa full topping!',
    author: 'Đạo trà sữa 🧋'
  },
  {
    id: 'u9',
    category: 'humor',
    text: 'Đẹp tự nhiên chứ không tự nhiên mà đẹp nha quý dzị!',
    author: 'Hoa hậu thân thiện 👑'
  },
  {
    id: 'u10',
    category: 'humor',
    text: 'Gọi em là cà phê sữa, vì ngọt ngào và khiến người ta mất ngủ!',
    author: 'Thả thính dạo ☕'
  },
  {
    id: 'u11',
    category: 'humor',
    text: 'Trời đổ mưa sao anh chưa đổ em? Hay tại vì em đổ anh trước rồi!',
    author: 'GenZ mặn mòi 🌧️'
  }
];

export function getRandomQuote(category = 'all') {
  let list = QUOTES_DATA;
  if (category && category !== 'all') {
    list = QUOTES_DATA.filter(q => q.category === category);
  }
  if (!list.length) list = QUOTES_DATA;
  return list[Math.floor(Math.random() * list.length)];
}
