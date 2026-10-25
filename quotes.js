// Kho câu nói, danh ngôn, thơ ca & lời chúc tích cực
const QUOTE_CATEGORIES = {
    ALL: 'all',
    DONG_LUC: 'dong_luc',
    HAI_HUOC: 'hai_huoc',
    THO_NGAN: 'tho_ngan',
    CAM_XUC: 'cam_xuc'
};

const QUOTES_DATABASE = [
    // --- 1. ĐỘNG LỰC & TƯƠI VUI ---
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Mỗi ngày mới là một cơ hội để bạn tỏa sáng rực rỡ theo cách của riêng mình!",
        author: "Năng lượng tích cực ✨"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Hãy mỉm cười với cuộc đời, bạn sẽ thấy cuộc đời nở hoa rực rỡ.",
        author: "Nụ cười tỏa nắng ☀️"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Như bông hoa hướng dương, luôn hướng về phía mặt trời và kiêu hãnh vươn cao.",
        author: "Tự tin rạng ngời 🌻"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Hôm nay là một ngày tuyệt vời để làm nên những điều kỳ diệu!",
        author: "Khởi đầu mới 🌈"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Đừng so sánh mình với ai khác. Bông hoa nào cũng đẹp theo hương sắc riêng của nó.",
        author: "Yêu chính mình 🌸"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Chỉ cần bạn không bỏ cuộc, mỗi bước đi đều đang đưa bạn tới thành công.",
        author: "Kiên định bước tiếp 🚀"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Cuộc sống tươi đẹp nhất khi trái tim bạn ngập tràn lòng biết ơn và sự lạc quan.",
        author: "Trái tim rực rỡ 💖"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Bầu trời sau cơn mưa luôn có cầu vồng rực rỡ nhất.",
        author: "Hy vọng ngày mai 🌈"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Hít một hơi thật sâu, mỉm cười thật tươi và đón nhận mọi điều tốt lành đang tới!",
        author: "Bình yên mỉm cười 🍀"
    },
    {
        category: QUOTE_CATEGORIES.DONG_LUC,
        text: "Bạn mạnh mẽ hơn bạn nghĩ, dũng cảm hơn bạn tin và tuyệt vời hơn bạn tưởng!",
        author: "Tự hào về bạn ⭐"
    },

    // --- 2. HÀI HƯỚC & YÊU ĐỜI ---
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Đừng buồn vì ví mình rỗng, vì ít nhất khuôn mặt mình vẫn siêu cấp đáng yêu!",
        author: "Hội mê trà sữa 🧋"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Ăn no, ngủ kỹ, chăm chỉ yêu đời. Thế giới để người lớn lo, còn mình làm em bé!",
        author: "Yêu đời vô tư 🍓"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Người ta bảo nụ cười là 10 thang thuốc bổ. Nhìn mình cười là bổ ngửa luôn!",
        author: "Cười thả ga 😂"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Trời sinh tính nết dịu dàng, nhưng dòng đời xô đẩy lại thành đáng yêu!",
        author: "Cute xỉu up xỉu down 🐱"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Cuộc sống ngắn lắm, hãy cười khi còn đủ răng và ăn khi bụng còn đói!",
        author: "Đam mê ẩm thực 🍕"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Tự dặn lòng bớt dễ thương lại, nhưng gương soi bảo: 'Thôi, không sửa được đâu!'",
        author: "Tự tin có thừa 💅"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Thức dậy với quyết tâm giảm cân, nhưng đồ ăn ngon lại bảo: 'Ngày mai hẵng tính!'",
        author: "Tâm hồn ăn uống 🧁"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Tiền không mua được hạnh phúc, nhưng mua được trà sữa trân châu full topping!",
        author: "Niềm vui đơn giản 🧋"
    },
    {
        category: QUOTE_CATEGORIES.HAI_HUOC,
        text: "Đẹp tự nhiên chứ không tự nhiên mà đẹp nha quý dzị!",
        author: "Hoa hậu thân thiện 👑"
    },

    // --- 3. THƠ NGẮN HAY & AN YÊN ---
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Nắng mai rọi sáng hiên nhà,\nChúc người một sớm thật thà an vui.\nMuộn phiền gửi gió bay xuôi,\nNụ cười giữ lại cho đời thêm xinh.",
        author: "Thơ Nắng Sớm ☀️"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Trời xanh mây trắng nắng vàng,\nHôm nay bận rộn dịu dàng đáng yêu.",
        author: "Thơ Ngày Xanh 🌿"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Hoa vẫn nở bên đồi vắng,\nNgười vẫn cười trong nắng mai.\nDẫu cho đường xa muôn dặm,\nAn yên giữ mãi nụ cười.",
        author: "An Nhiên Tự Tại 🌸"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Gió mang hương cỏ mùa sang,\nBình yên gõ cửa ngỡ ngàng tim ai.\nBỏ lại sau lưng thở dài,\nĐón ngày nắng ấm tương lai rạng ngời.",
        author: "Gió An Lành 🍃"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Hôm nay em bận yêu đời,\nHẹn ngày hôm khác giận hờn trần gian.",
        author: "Thơ Ngọt Ngào 🌷"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Một nhành hoa nhỏ ven đường,\nCũng làm bừng sáng yêu thương góc trời.\nMỉm cười đi nhé người ơi,\nĐời vui một nửa bởi lời bạn trao.",
        author: "Hương Hoa Đời 🌼"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Bình yên là một tách trà,\nThêm vài câu hát chan hòa niềm vui.\nBao nhiêu cay đắng ngọt bùi,\nNụ cười xua hết ngậm ngùi tan biến.",
        author: "Tách Trà Sớm 🍵"
    },
    {
        category: QUOTE_CATEGORIES.THO_NGAN,
        text: "Mong em sớm sớm an lành,\nNgày ngày rạng rỡ như cành hoa tươi.\nMiệng luôn hé nở nụ cười,\nBình an may mắn theo người muôn nơi.",
        author: "Lời Chúc Dịu Dàng 💐"
    },

    // --- 4. CHẠM CẢM XÚC & CHỮA LÀNH ---
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Cảm ơn bạn vì đã luôn kiên cường bước qua những ngày giông bão để có nụ cười hôm nay.",
        author: "Ôm bạn một cái 🤍"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Hãy dịu dàng với chính mình, bạn đang làm rất tốt hơn những gì bạn nghĩ rồi.",
        author: "Thì thầm chữa lành 🌿"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Bình yên không phải là không có bão giông, mà là giữa bão giông lòng ta vẫn an nhiên.",
        author: "Góc An Yên 🕊️"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Bạn xứng đáng được yêu thương và nâng niu theo cách chân thành và dịu ngọt nhất.",
        author: "Trân quý yêu thương 💖"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Cuộc đời có lúc thăng trầm, nhưng sau mỗi cơn mưa, bầu trời lại càng thêm trong xanh.",
        author: "Niềm tin dịu mát 🌧️"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Đôi khi, điều tuyệt vời nhất bạn có thể làm cho mình là nghỉ ngơi và tự thưởng một nụ cười.",
        author: "Thư thái tâm hồn ☕"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Mỗi khoảnh khắc hiện tại đều là món quà vô giá mà cuộc đời dành tặng riêng cho bạn.",
        author: "Hiện tại nhiệm màu 🎁"
    },
    {
        category: QUOTE_CATEGORIES.CAM_XUC,
        text: "Dù thế giới ngoài kia có vội vã thế nào, hãy luôn giữ cho mình một góc nhỏ bình yên.",
        author: "Chạm đáy tim 🌙"
    }
];

// Hàm lấy câu nói ngẫu nhiên theo danh mục
function getRandomQuote(category = QUOTE_CATEGORIES.ALL) {
    let filtered = QUOTES_DATABASE;
    if (category && category !== QUOTE_CATEGORIES.ALL) {
        filtered = QUOTES_DATABASE.filter(q => q.category === category);
    }
    if (filtered.length === 0) filtered = QUOTES_DATABASE;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}
