// Logic chính của Tiệm Khung Ảnh & Thơ Kute - Khung Lồng Canva, Pop-up 3D & Hàn Quốc

const state = {
    image: null,
    imageLoaded: false,
    currentFrameId: 'music_player_popup',
    currentFrameCategory: 'all', // 'all', 'popup', 'nested', 'korean'
    overlayEffect: 'auto',
    currentQuote: null,
    quoteCategory: 'all',
    customQuoteText: '',
    customAuthorText: '',
    fontFamily: "'Quicksand', 'Nunito', sans-serif",
    fontSize: 26,
    textColor: '#2D3748',
    aspectRatio: 'original', // 'original', '1:1', '4:5', '9:16'
    currentFilter: 'none',
    stickers: [],
    autoStickers: true
};

// Canvas elements
let canvas, ctx;
let isDragging = false;
let draggedStickerIndex = -1;
let dragStartX = 0;
let dragStartY = 0;

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('photoCanvas');
    ctx = canvas.getContext('2d');

    pickNewQuote();
    initEvents();
    renderFramesGrid();
    renderOverlayGrid();
    renderStickerPalette();

    loadSampleImage();
});

// Load ảnh mẫu ban đầu
function loadSampleImage() {
    const sampleImg = new Image();
    sampleImg.crossOrigin = 'anonymous';

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 900;
    tempCanvas.height = 1100;
    const tCtx = tempCanvas.getContext('2d');

    // Nền màu kem ấm Hàn Quốc
    const grad = tCtx.createLinearGradient(0, 0, 900, 1100);
    grad.addColorStop(0, '#E8E3D7');
    grad.addColorStop(0.5, '#F7F3EA');
    grad.addColorStop(1, '#DCE4DB');
    tCtx.fillStyle = grad;
    tCtx.fillRect(0, 0, 900, 1100);

    tCtx.beginPath();
    tCtx.arc(450, 430, 200, 0, Math.PI * 2);
    tCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    tCtx.fill();

    tCtx.font = '150px sans-serif';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText('🌿', 450, 420);

    tCtx.font = 'bold 38px "Nunito", sans-serif';
    tCtx.fillStyle = '#4A4A48';
    tCtx.shadowColor = 'rgba(0,0,0,0.15)';
    tCtx.shadowBlur = 8;
    tCtx.fillText('Ảnh Của Bạn Sẽ Nổi Bật Ở Đây ✨', 450, 680);
    tCtx.font = '600 23px "Nunito", sans-serif';
    tCtx.fillStyle = '#6E6E6A';
    tCtx.fillText('(Bấm "Tải Ảnh Của Bạn" ở trên để chọn ảnh)', 450, 735);

    sampleImg.onload = () => {
        state.image = sampleImg;
        state.imageLoaded = true;
        magicAutoDecorate();
    };
    sampleImg.src = tempCanvas.toDataURL();
}

// Khởi tạo các sự kiện giao diện
function initEvents() {
    const fileInput = document.getElementById('imageFileInput');
    const uploadBtn = document.getElementById('uploadPhotoBtn');
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const dropzone = document.getElementById('uploadDropzone');

    if (uploadBtn) uploadBtn.addEventListener('click', () => fileInput.click());
    if (changePhotoBtn) changePhotoBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    });

    if (dropzone) {
        ['dragenter', 'dragover'].forEach(name => {
            dropzone.addEventListener(name, (e) => {
                e.preventDefault();
                dropzone.style.borderColor = '#FF6B8B';
                dropzone.style.background = '#FFF5F7';
            });
        });
        ['dragleave', 'drop'].forEach(name => {
            dropzone.addEventListener(name, (e) => {
                e.preventDefault();
                dropzone.style.borderColor = '#E5E7EB';
                dropzone.style.background = '';
            });
        });
        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });
    }

    // Tabs navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Lọc thể loại khung ảnh (Tất cả, Pop-up Canva, Khung Lồng, Hàn Quốc)
    document.querySelectorAll('.frame-filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.frame-filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.currentFrameCategory = chip.getAttribute('data-frame-cat');
            renderFramesGrid();
        });
    });

    // Lọc chủ đề câu nói
    document.querySelectorAll('.quote-filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.quote-filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.quoteCategory = chip.getAttribute('data-cat');
            pickNewQuote();
            renderCanvas();
        });
    });

    // Nút Quick action
    const randomQuoteBtn = document.getElementById('randomQuoteBtn');
    if (randomQuoteBtn) {
        randomQuoteBtn.addEventListener('click', () => {
            pickNewQuote();
            renderCanvas();
            showToast('Đã đổi câu nói mới! ✨');
        });
    }

    const randomFrameBtn = document.getElementById('randomFrameBtn');
    if (randomFrameBtn) {
        randomFrameBtn.addEventListener('click', () => {
            const randomIdx = Math.floor(Math.random() * FRAME_PRESETS.length);
            selectFrame(FRAME_PRESETS[randomIdx].id);
            showToast('Đã đổi kiểu khung mới! 🪟');
        });
    }

    const randomStickersBtn = document.getElementById('randomStickersBtn');
    if (randomStickersBtn) {
        randomStickersBtn.addEventListener('click', () => {
            generateRandomStickers();
            renderCanvas();
            showToast('Đã thêm các biểu tượng tinh tế! ✨');
        });
    }

    const magicAllBtn = document.getElementById('magicAllBtn');
    if (magicAllBtn) {
        magicAllBtn.addEventListener('click', () => {
            magicAutoDecorate();
            showToast('✨ Đã phù phép kiểu khung lồng & pop-up mới!');
        });
    }

    // Input text
    const quoteInput = document.getElementById('quoteTextInput');
    const authorInput = document.getElementById('authorTextInput');
    if (quoteInput) {
        quoteInput.addEventListener('input', (e) => {
            state.customQuoteText = e.target.value;
            renderCanvas();
        });
    }
    if (authorInput) {
        authorInput.addEventListener('input', (e) => {
            state.customAuthorText = e.target.value;
            renderCanvas();
        });
    }

    // Font select
    const fontSelect = document.getElementById('fontFamilySelect');
    if (fontSelect) {
        fontSelect.addEventListener('change', (e) => {
            state.fontFamily = e.target.value;
            renderCanvas();
        });
    }

    // Font size
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeVal = document.getElementById('fontSizeValue');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', (e) => {
            state.fontSize = parseInt(e.target.value);
            if (fontSizeVal) fontSizeVal.textContent = state.fontSize + 'px';
            renderCanvas();
        });
    }

    // Text color
    const textColorPicker = document.getElementById('textColorPicker');
    if (textColorPicker) {
        textColorPicker.addEventListener('input', (e) => {
            state.textColor = e.target.value;
            renderCanvas();
        });
    }

    // Aspect ratio
    const aspectSelect = document.getElementById('aspectRatioSelect');
    if (aspectSelect) {
        aspectSelect.addEventListener('change', (e) => {
            state.aspectRatio = e.target.value;
            renderCanvas();
        });
    }

    renderFilterButtons();

    // Clear stickers
    const clearStickersBtn = document.getElementById('clearStickersBtn');
    if (clearStickersBtn) {
        clearStickersBtn.addEventListener('click', () => {
            state.stickers = [];
            renderCanvas();
            showToast('Đã xóa sạch icons.');
        });
    }

    // Download
    const downloadBtn = document.getElementById('downloadPhotoBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadProcessedPhoto);
    }

    setupCanvasInteractivity();
}

// Xử lý upload ảnh
function handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn một file hình ảnh (JPG, PNG, WEBP,...)');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            state.image = img;
            state.imageLoaded = true;
            magicAutoDecorate();
            showToast('Tải ảnh thành công! Đã tự động tạo hiệu ứng Canva & Hàn Quốc ✨');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Lấy câu nói ngẫu nhiên
function pickNewQuote() {
    const q = getRandomQuote(state.quoteCategory);
    state.currentQuote = q;
    state.customQuoteText = q.text;
    state.customAuthorText = q.author;

    const qInput = document.getElementById('quoteTextInput');
    const aInput = document.getElementById('authorTextInput');
    if (qInput) qInput.value = q.text;
    if (aInput) aInput.value = q.author;
}

// Tạo icon tối giản tinh tế (chỉ 2 điểm nhấn nhẹ nhàng)
function generateRandomStickers() {
    state.stickers = [];
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    state.stickers.push({
        id: 's_1',
        emoji: randomPick(['✨', '🤍', '🌿', '🕊️', '⭐', '🍞']),
        x: Math.round(w * 0.88),
        y: Math.round(h * 0.10),
        size: Math.round(w * 0.065),
        rotation: (Math.random() * 0.2) - 0.1
    });

    state.stickers.push({
        id: 's_2',
        emoji: randomPick(['✨', '🌷', '☕', '🌙', '🍃', '✉️']),
        x: Math.round(w * 0.14),
        y: Math.round(h * 0.88),
        size: Math.round(w * 0.058),
        rotation: 0
    });
}

// 1 Chạm Tự Động Phù Phép
function magicAutoDecorate() {
    if (!state.imageLoaded) return;

    const randomFrame = FRAME_PRESETS[Math.floor(Math.random() * FRAME_PRESETS.length)];
    selectFrame(randomFrame.id);
    pickNewQuote();
    renderCanvas();

    if (state.autoStickers) {
        generateRandomStickers();
    }

    renderCanvas();
}

function selectFrame(frameId) {
    state.currentFrameId = frameId;
    document.querySelectorAll('.frame-card').forEach(card => {
        card.classList.toggle('active', card.getAttribute('data-frame') === frameId);
    });
    renderCanvas();
}

function renderFramesGrid() {
    const container = document.getElementById('framesGrid');
    if (!container) return;

    let frames = FRAME_PRESETS;
    if (state.currentFrameCategory && state.currentFrameCategory !== 'all') {
        frames = FRAME_PRESETS.filter(f => f.category === state.currentFrameCategory);
    }

    container.innerHTML = '';
    frames.forEach(f => {
        const card = document.createElement('div');
        card.className = `frame-card ${f.id === state.currentFrameId ? 'active' : ''}`;
        card.setAttribute('data-frame', f.id);
        card.innerHTML = `
            <div class="frame-thumb" style="background: ${f.bgColor || '#F7F4EE'}; border: 1.5px solid ${f.borderColor || '#DDD'}">
                ${f.name.split(' ')[0]}
            </div>
            <div class="frame-title">${f.name}</div>
        `;
        card.addEventListener('click', () => selectFrame(f.id));
        container.appendChild(card);
    });
}

function renderOverlayGrid() {
    const container = document.getElementById('overlaysGrid');
    if (!container) return;

    container.innerHTML = '';
    OVERLAY_EFFECTS.forEach(eff => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${eff.id === state.overlayEffect ? 'active' : ''}`;
        btn.textContent = eff.name;
        btn.addEventListener('click', () => {
            state.overlayEffect = eff.id;
            document.querySelectorAll('#overlaysGrid .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCanvas();
        });
        container.appendChild(btn);
    });
}

function renderStickerPalette() {
    const container = document.getElementById('stickerPalette');
    if (!container) return;

    container.innerHTML = '';
    STICKER_LIBRARY.forEach(s => {
        const item = document.createElement('div');
        item.className = 'sticker-item';
        item.textContent = s.emoji;
        item.title = s.name;
        item.addEventListener('click', () => {
            addStickerToCanvas(s.emoji);
            showToast(`Đã thêm biểu tượng ${s.emoji}`);
        });
        container.appendChild(item);
    });
}

function addStickerToCanvas(emoji) {
    const w = canvas.width || 800;
    const h = canvas.height || 1000;
    state.stickers.push({
        id: 's_' + Date.now(),
        emoji: emoji,
        x: Math.round(w * (0.35 + Math.random() * 0.3)),
        y: Math.round(h * (0.35 + Math.random() * 0.3)),
        size: Math.round(w * 0.07),
        rotation: (Math.random() * 0.3) - 0.15
    });
    renderCanvas();
}

function renderFilterButtons() {
    const container = document.getElementById('filtersGrid');
    if (!container) return;

    container.innerHTML = '';
    PHOTO_FILTERS.forEach(fil => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${fil.id === state.currentFilter ? 'active' : ''}`;
        btn.textContent = fil.name;
        btn.addEventListener('click', () => {
            state.currentFilter = fil.id;
            document.querySelectorAll('#filtersGrid .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCanvas();
        });
        container.appendChild(btn);
    });
}

// =========================================================================
// VẼ CANVAS: KHUNG LỒNG CANVA, POP-UP WIDGET & PHONG CÁCH HÀN QUỐC
// =========================================================================
function renderCanvas() {
    if (!state.imageLoaded || !state.image) return;

    const frame = FRAME_PRESETS.find(f => f.id === state.currentFrameId) || FRAME_PRESETS[0];

    const origW = state.image.width;
    const origH = state.image.height;
    let targetPhotoW = 920;
    let targetPhotoH = (origH / origW) * targetPhotoW;

    if (state.aspectRatio === '1:1') {
        targetPhotoH = targetPhotoW;
    } else if (state.aspectRatio === '4:5') {
        targetPhotoH = targetPhotoW * (5 / 4);
    } else if (state.aspectRatio === '9:16') {
        targetPhotoH = targetPhotoW * (16 / 9);
    }

    const padTop = Math.round(frame.padding.top * targetPhotoW);
    const padLeft = Math.round(frame.padding.left * targetPhotoW);
    const padRight = Math.round(frame.padding.right * targetPhotoW);
    const padBottom = Math.round(frame.padding.bottom * targetPhotoW);

    const totalW = targetPhotoW + padLeft + padRight;
    const totalH = Math.round(targetPhotoH + padTop + padBottom);

    canvas.width = totalW;
    canvas.height = totalH;
    ctx.clearRect(0, 0, totalW, totalH);

    const photoX = padLeft;
    const photoY = padTop;

    // --- PHÂN NHÁNH RENDER THEO TỪNG PHONG CÁCH ---

    if (frame.style === 'canva_blur') {
        // 1. KHUNG LỒNG CANVA: NỀN LÀ ẢNH PHÓNG TO MỜ HUYỀN ẢO
        drawCanvaBlurNested(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'double_tilt') {
        // 2. KHUNG LỒNG XẾP CHỒNG 2 LỚP SO LE NGHIÊNG
        drawDoubleTiltNested(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'music_player') {
        // 3. POP-UP TRÌNH PHÁT NHẠC SPOTIFY / APPLE MUSIC
        drawMusicPlayerPopUp(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'ios_notify') {
        // 4. POP-UP TIN NHẮN THÔNG BÁO IPHONE KÍNH MỜ
        drawIOSNotificationPopUp(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'macos_window') {
        // 5. CỬA SỔ RETRO MAC OS POP-UP
        drawMacOSWindowPopUp(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'korean_photobooth') {
        // 6. KHUNG MÁY CHỤP ẢNH LẤY LIỀN HÀN QUỐC (LIFE4CUTS / HARU FILM)
        drawKoreanPhotobooth(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'korean_magazine') {
        // 7. BÌA TẠP CHÍ EDITORIAL HÀN QUỐC KINFOLK
        drawKoreanMagazine(photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH, frame);

    } else if (frame.style === 'popup_glass') {
        // 8. THẺ KÍNH MỜ POP-UP 3D GLASSMORPHISM
        drawStandardFrameBackground(totalW, totalH, frame);
        drawPhoto3DShadow(photoX, photoY, targetPhotoW, targetPhotoH);
        drawFilteredPhoto(state.image, photoX, photoY, targetPhotoW, targetPhotoH, 14);
        drawMetallicPaperClip(photoX + 45, photoY - 12, 38, 92);
        drawGlassmorphismQuoteBox(photoX, photoY, targetPhotoW, targetPhotoH);

    } else {
        // 9. CÁC KHUNG POSTCARD / POLAROID / FILM
        drawStandardFrameBackground(totalW, totalH, frame);
        drawPhoto3DShadow(photoX, photoY, targetPhotoW, targetPhotoH);
        drawFilteredPhoto(state.image, photoX, photoY, targetPhotoW, targetPhotoH, 12);
        drawEdgeDecorations(photoX, photoY, targetPhotoW, targetPhotoH, frame);
        drawStandardQuote(photoX, photoY + targetPhotoH, targetPhotoW, padBottom, frame);
    }

    // Hiệu ứng nắng / bụi sao nếu có bật
    drawInPhotoOverlays(photoX, photoY, targetPhotoW, targetPhotoH, frame);

    // Vẽ sticker icon tinh tế
    drawStickers();
}

// -------------------------------------------------------------
// 1. KHUNG LỒNG CANVA (Nền mờ ảo diệu + Ảnh chính lồng ở giữa nổi khối)
// -------------------------------------------------------------
function drawCanvaBlurNested(px, py, pw, ph, tw, th, frame) {
    ctx.save();

    // Bước 1: Vẽ nền phóng to bằng chính ảnh người dùng với hiệu ứng Blur cực mượt
    ctx.filter = 'blur(28px) brightness(0.88) saturate(1.25)';
    ctx.drawImage(state.image, -50, -50, tw + 100, th + 100);
    ctx.filter = 'none';

    // Phủ lớp màn mờ trắng kem sang trọng
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(0, 0, tw, th);

    // Bước 2: Khung lồng ảnh chính ở giữa với viền trắng và bóng đổ 3D sâu
    const innerW = pw * 0.90;
    const innerH = ph * 0.90;
    const innerX = (tw - innerW) / 2;
    const innerY = py + 20;

    // Đổ bóng 3D sâu cho tấm ảnh lồng
    ctx.shadowColor = 'rgba(0, 0, 0, 0.32)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, innerX - 10, innerY - 10, innerW + 20, innerH + 20, 18);
    ctx.fill();

    // Tắt shadow để vẽ ảnh sắc nét
    ctx.shadowColor = 'transparent';
    drawFilteredPhoto(state.image, innerX, innerY, innerW, innerH, 12);

    // Thẻ chữ kính mờ đè nhẹ lên góc dưới của ảnh lồng
    drawGlassmorphismQuoteBox(innerX, innerY, innerW, innerH);

    ctx.restore();
}

// -------------------------------------------------------------
// 2. KHUNG LỒNG XẾP CHỒNG (Double Offset Layered Frame)
// -------------------------------------------------------------
function drawDoubleTiltNested(px, py, pw, ph, tw, th, frame) {
    ctx.save();
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, tw, th);

    // Tấm lồng bên dưới (Tấm 1: Nghiêng nhẹ -3.5° màu kem pastel)
    ctx.save();
    ctx.translate(tw / 2, th * 0.42);
    ctx.rotate(-0.06);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = '#FFF8EE';
    drawRoundedRect(ctx, -pw * 0.48, -ph * 0.48, pw * 0.96, ph * 0.96, 16);
    ctx.fill();
    ctx.strokeStyle = '#EADECF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Tấm ảnh chính ở trên (Tấm 2: Nghiêng nhẹ +1.2° nổi khối)
    ctx.save();
    ctx.translate(tw / 2, th * 0.42);
    ctx.rotate(0.02);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, -pw * 0.47, -ph * 0.47, pw * 0.94, ph * 0.94, 14);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawFilteredPhoto(state.image, -pw * 0.47 + 10, -ph * 0.47 + 10, pw * 0.94 - 20, ph * 0.94 - 20, 10);
    ctx.restore();

    // Miếng băng dính Washi kẹp giữ mép trên của 2 tấm ảnh
    drawSemiTransparentTape(tw / 2 - 55, py + 10, 110, 36, 0.05);

    // Câu nói bên dưới
    const quoteBoxY = py + ph + 10;
    const quoteBoxH = th - quoteBoxY - 20;
    drawStandardQuote(px, quoteBoxY, pw, quoteBoxH, frame);

    ctx.restore();
}

// -------------------------------------------------------------
// 3. POP-UP TRÌNH PHÁT NHẠC (Spotify / Apple Music Glass Widget)
// -------------------------------------------------------------
function drawMusicPlayerPopUp(px, py, pw, ph, tw, th, frame) {
    ctx.save();
    ctx.fillStyle = '#F5F3EF';
    ctx.fillRect(0, 0, tw, th);

    // Ảnh chính đổ bóng 3D
    drawPhoto3DShadow(px, py, pw, ph);
    drawFilteredPhoto(state.image, px, py, pw, ph, 14);

    // Widget trình phát nhạc kính mờ nổi đè lên 1/3 dưới ảnh
    const widgetW = pw * 0.92;
    const widgetH = ph * 0.35;
    const widgetX = px + (pw - widgetW) / 2;
    const widgetY = py + ph - widgetH - 24;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 14;

    // Nền kính mờ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    drawRoundedRect(ctx, widgetX, widgetY, widgetW, widgetH, 22);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowColor = 'transparent';

    // Nội dung bài hát: Tựa đề & Tác giả
    const text = state.customQuoteText || (state.currentQuote ? state.currentQuote.text : '');
    const author = state.customAuthorText || (state.currentQuote ? state.currentQuote.author : 'Giai điệu bình yên');

    // Icon đĩa nhạc hoặc trái tim nhỏ ở góc trái
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎵', widgetX + 24, widgetY + 40);

    ctx.font = 'bold 22px "Nunito", sans-serif';
    ctx.fillStyle = '#1A202C';
    ctx.fillText(author, widgetX + 75, widgetY + 32);

    ctx.font = '500 16px "Nunito", sans-serif';
    ctx.fillStyle = '#718096';
    ctx.fillText('Đang phát thông điệp yêu thương ✨', widgetX + 75, widgetY + 54);

    // Trích dẫn câu nói / bài thơ ở giữa widget
    ctx.font = `600 ${Math.round(state.fontSize * 0.85)}px ${state.fontFamily}`;
    ctx.fillStyle = '#2D3748';
    ctx.textAlign = 'center';
    
    const lines = text.split('\n');
    const firstLine = lines[0] || '';
    const secondLine = lines[1] || '';
    ctx.fillText(firstLine, widgetX + widgetW / 2, widgetY + widgetH * 0.48);
    if (secondLine) {
        ctx.fillText(secondLine, widgetX + widgetW / 2, widgetY + widgetH * 0.62);
    }

    // Thanh thời lượng bài hát (Timeline Progress Bar)
    const barX = widgetX + 28;
    const barW = widgetW - 56;
    const barY = widgetY + widgetH * 0.74;

    ctx.fillStyle = '#E2E8F0';
    drawRoundedRect(ctx, barX, barY, barW, 6, 3);
    ctx.fill();

    // Đoạn đã phát (màu hồng cam pastel gradient)
    const progressW = barW * 0.62;
    ctx.fillStyle = '#FF6B8B';
    drawRoundedRect(ctx, barX, barY, progressW, 6, 3);
    ctx.fill();

    // Nút tròn kéo bài hát (Scrub knob)
    ctx.beginPath();
    ctx.arc(barX + progressW, barY + 3, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#FF4071';
    ctx.fill();

    // Giờ hiển thị
    ctx.font = '600 13px monospace';
    ctx.fillStyle = '#A0AEC0';
    ctx.textAlign = 'left';
    ctx.fillText('1:42', barX, barY + 18);
    ctx.textAlign = 'right';
    ctx.fillText('3:58', barX + barW, barY + 18);

    // Cụm nút Play / Pause / Next ở dưới
    const btnY = widgetY + widgetH * 0.88;
    ctx.textAlign = 'center';
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#4A5568';
    ctx.fillText('⏮', widgetX + widgetW / 2 - 60, btnY);
    ctx.fillText('⏭', widgetX + widgetW / 2 + 60, btnY);

    // Nút Play tròn nổi bật
    ctx.beginPath();
    ctx.arc(widgetX + widgetW / 2, btnY, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B8B';
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px sans-serif';
    ctx.fillText('▶', widgetX + widgetW / 2 + 1, btnY + 1);

    ctx.restore();
}

// -------------------------------------------------------------
// 4. POP-UP THÔNG BÁO IPHONE KÍNH MỜ (iOS Notification Banner)
// -------------------------------------------------------------
function drawIOSNotificationPopUp(px, py, pw, ph, tw, th, frame) {
    ctx.save();
    ctx.fillStyle = '#F0EFEB';
    ctx.fillRect(0, 0, tw, th);

    drawPhoto3DShadow(px, py, pw, ph);
    drawFilteredPhoto(state.image, px, py, pw, ph, 16);

    // Khung thông báo iPhone kính mờ nổi đè lên ảnh
    const bannerW = pw * 0.90;
    const bannerH = ph * 0.28;
    const bannerX = px + (pw - bannerW) / 2;
    const bannerY = py + ph - bannerH - 28;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    drawRoundedRect(ctx, bannerX, bannerY, bannerW, bannerH, 24);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.shadowColor = 'transparent';

    // Header thông báo: Icon + App Name + Thời gian
    ctx.font = '26px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('💌', bannerX + 22, bannerY + 34);

    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.fillStyle = '#4A5568';
    ctx.fillText('THÔNG ĐIỆP HÔM NAY', bannerX + 62, bannerY + 34);

    ctx.font = '500 13px -apple-system, sans-serif';
    ctx.fillStyle = '#A0AEC0';
    ctx.textAlign = 'right';
    ctx.fillText('bây giờ', bannerX + bannerW - 24, bannerY + 34);

    // Nội dung thông điệp
    const text = state.customQuoteText || (state.currentQuote ? state.currentQuote.text : '');
    const author = state.customAuthorText || (state.currentQuote ? state.currentQuote.author : 'Gửi bạn 🤍');

    ctx.font = `600 ${Math.round(state.fontSize * 0.9)}px ${state.fontFamily}`;
    ctx.fillStyle = '#1A202C';
    ctx.textAlign = 'center';

    const lines = text.split('\n');
    const startY = bannerY + 78;
    lines.slice(0, 2).forEach((l, i) => {
        ctx.fillText(l, bannerX + bannerW / 2, startY + (i * 30));
    });

    ctx.font = 'italic 500 15px -apple-system, sans-serif';
    ctx.fillStyle = '#718096';
    ctx.fillText(`— ${author} —`, bannerX + bannerW / 2, bannerY + bannerH - 24);

    ctx.restore();
}

// -------------------------------------------------------------
// 5. CỬA SỔ RETRO MAC OS POP-UP (Canva Retro Mac Window)
// -------------------------------------------------------------
function drawMacOSWindowPopUp(px, py, pw, ph, tw, th, frame) {
    ctx.save();
    ctx.fillStyle = '#EAE6DF';
    ctx.fillRect(0, 0, tw, th);

    const winW = pw + 20;
    const winH = ph + 130;
    const winX = px - 10;
    const winY = py - 40;

    // Đổ bóng 3D của cửa sổ Mac
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 16;

    // Thân cửa sổ
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, winX, winY, winW, winH, 16);
    ctx.fill();

    // Thanh tiêu đề (Title Bar)
    ctx.fillStyle = '#F5F5F7';
    drawRoundedRect(ctx, winX, winY, winW, 46, 16);
    ctx.fill();
    ctx.fillRect(winX, winY + 30, winW, 16); // làm phẳng góc dưới của thanh tiêu đề

    ctx.strokeStyle = '#E5E5EA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(winX, winY + 46);
    ctx.lineTo(winX + winW, winY + 46);
    ctx.stroke();

    // 3 nút Mac OS: Đỏ, Vàng, Xanh
    const dots = [
        { color: '#FF5F56', x: winX + 22 },
        { color: '#FFBD2E', x: winX + 42 },
        { color: '#27C93F', x: winX + 62 }
    ];
    dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, winY + 23, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
    });

    // Tiêu đề cửa sổ
    ctx.font = '600 15px -apple-system, monospace';
    ctx.fillStyle = '#6E6E73';
    ctx.textAlign = 'center';
    ctx.fillText('today_aesthetic_moment.jpg', winX + winW / 2, winY + 24);

    ctx.shadowColor = 'transparent';

    // Vẽ ảnh bên trong cửa sổ
    drawFilteredPhoto(state.image, px, py + 16, pw, ph - 20, 8);

    // Câu nói ở chân cửa sổ
    const quoteY = py + ph + 8;
    drawStandardQuote(px, quoteY, pw, 70, frame);

    ctx.restore();
}

// -------------------------------------------------------------
// 6. KHUNG MÁY CHỤP ẢNH LẤY LIỀN HÀN QUỐC (Life4Cuts / Haru Film)
// -------------------------------------------------------------
function drawKoreanPhotobooth(px, py, pw, ph, tw, th, frame) {
    ctx.save();

    // Nền màu pastel bơ sữa / xanh pastel đặc trưng của Hàn Quốc
    ctx.fillStyle = frame.bgColor || '#FFF7E6';
    ctx.fillRect(0, 0, tw, th);

    // Bo tròn viền ảnh dày và mềm mại
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, px - 6, py - 6, pw + 12, ph + 12, 18);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Ảnh chính bo góc tròn ngọt ngào
    drawFilteredPhoto(state.image, px, py, pw, ph, 16);

    // Khu vực đáy phong cách Seoul Photobooth
    const botY = py + ph;
    const botH = th - botY;

    // Câu nói / Thơ ngắn
    drawStandardQuote(px, botY + 10, pw, botH * 0.65, frame);

    // Logo thương hiệu Studio Hàn Quốc ở góc dưới
    ctx.font = 'bold 15px "Nunito", sans-serif';
    ctx.fillStyle = '#A0AEC0';
    ctx.textAlign = 'center';
    ctx.fillText(frame.brandText || 'STUDIO PHOTOISM SEOUL • 인생네컷', tw / 2, th - 26);

    // Tem barcode mini phong cách Hàn Quốc ở góc phải
    drawMiniBarcode(tw - 100, th - 40, 65, 22);

    ctx.restore();
}

// -------------------------------------------------------------
// 7. BÌA TẠP CHÍ EDITORIAL HÀN QUỐC (Kinfolk / Cereal Cover)
// -------------------------------------------------------------
function drawKoreanMagazine(px, py, pw, ph, tw, th, frame) {
    ctx.save();
    ctx.fillStyle = '#FAF9F6';
    ctx.fillRect(0, 0, tw, th);

    // Tiêu đề tạp chí lớn trên cùng (Kinfolk style)
    ctx.font = 'bold 36px "Playfair Display", serif';
    ctx.fillStyle = '#1A202C';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('A E S T H E T I C', tw / 2, py - 40);

    // Số phát hành
    ctx.font = '500 13px -apple-system, sans-serif';
    ctx.fillStyle = '#A0AEC0';
    ctx.fillText('ISSUE NO. 10 • AUTUMN MOMENTS', tw / 2, py - 16);

    // Ảnh lồng viền mỏng thanh lịch
    drawPhoto3DShadow(px, py, pw, ph);
    drawFilteredPhoto(state.image, px, py, pw, ph, 8);

    // Trích dẫn phong cách bài viết tạp chí
    const quoteY = py + ph + 14;
    const quoteH = th - quoteY - 20;
    drawStandardQuote(px, quoteY, pw, quoteH, frame);

    ctx.restore();
}

// -------------------------------------------------------------
// CÁC HÀM TIỆN ÍCH VẼ NỀN & DECOR
// -------------------------------------------------------------

function drawStandardFrameBackground(tw, th, frame) {
    ctx.fillStyle = frame.bgColor || '#FAF8F5';
    ctx.fillRect(0, 0, tw, th);

    if (frame.borderColor) {
        ctx.strokeStyle = frame.borderColor;
        ctx.lineWidth = frame.borderWidth || 2;
        ctx.strokeRect(10, 10, tw - 20, th - 20);
    }
}

function drawPhoto3DShadow(x, y, w, h) {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.16)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, x, y, w, h, 14);
    ctx.fill();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.fill();
    ctx.restore();
}

function drawFilteredPhoto(img, x, y, w, h, radius = 12) {
    ctx.save();
    drawRoundedRect(ctx, x, y, w, h, radius);
    ctx.clip();

    let filterString = '';
    switch (state.currentFilter) {
        case 'bright_sweet':
            filterString = 'brightness(1.06) contrast(1.03) saturate(1.15)';
            break;
        case 'warm_vintage':
            filterString = 'sepia(0.22) contrast(1.08) brightness(1.02) saturate(1.1)';
            break;
        case 'dreamy_pink':
            filterString = 'brightness(1.04) contrast(1.02) saturate(1.15) hue-rotate(-8deg)';
            break;
        case 'film_nostalgia':
            filterString = 'sepia(0.3) contrast(1.12) brightness(0.96) saturate(0.92)';
            break;
        case 'bw_classic':
            filterString = 'grayscale(1) contrast(1.15) brightness(1.02)';
            break;
        default:
            filterString = 'none';
    }
    ctx.filter = filterString;

    const imgRatio = img.width / img.height;
    const targetRatio = w / h;

    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (imgRatio > targetRatio) {
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
    } else {
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.filter = 'none';

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
}

// Băng dính mờ Washi
function drawSemiTransparentTape(x, y, w, h, angle) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(angle);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.14)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = 'rgba(254, 243, 199, 0.78)';
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2);
    ctx.lineTo(w / 2, -h / 2);
    ctx.lineTo(w / 2 - 3, 0);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.lineTo(-w / 2 + 3, 0);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    for (let i = -w / 2; i < w / 2; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, -h / 2);
        ctx.lineTo(i + 14, h / 2);
        ctx.stroke();
    }
    ctx.restore();
}

// Kẹp kim loại 3D
function drawMetallicPaperClip(x, y, w, h) {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.shadowOffsetX = 3;

    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const metalGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    metalGrad.addColorStop(0, '#E6C875');
    metalGrad.addColorStop(0.35, '#FFF2B2');
    metalGrad.addColorStop(0.7, '#C59E47');
    metalGrad.addColorStop(1, '#9E782F');
    ctx.strokeStyle = metalGrad;

    ctx.beginPath();
    ctx.moveTo(x + 10, y + h - 18);
    ctx.lineTo(x + 10, y + 20);
    ctx.arcTo(x + 10, y, x + w - 10, y, 14);
    ctx.arcTo(x + w, y, x + w, y + 20, 14);
    ctx.lineTo(x + w, y + h - 10);
    ctx.arcTo(x + w, y + h, x + 20, y + h, 14);
    ctx.arcTo(x, y + h, x, y + h - 20, 14);
    ctx.lineTo(x, y + 36);
    ctx.arcTo(x, y + 16, x + 16, y + 16, 12);
    ctx.arcTo(x + w - 10, y + 16, x + w - 10, y + 36, 12);
    ctx.lineTo(x + w - 10, y + h - 30);
    ctx.stroke();

    ctx.restore();
}

// Mã vạch mini cho phong cách Hàn Quốc
function drawMiniBarcode(x, y, w, h) {
    ctx.save();
    ctx.fillStyle = '#CBD5E1';
    for (let i = 0; i < w; i += 4) {
        const barWidth = (i % 8 === 0) ? 2 : 1;
        ctx.fillRect(x + i, y, barWidth, h);
    }
    ctx.restore();
}

// Thẻ kính mờ Pop-up 3D Glassmorphism
function drawGlassmorphismQuoteBox(px, py, pw, ph) {
    const text = state.customQuoteText || (state.currentQuote ? state.currentQuote.text : '');
    const author = state.customAuthorText || (state.currentQuote ? state.currentQuote.author : '');
    if (!text) return;

    ctx.save();
    const cardW = pw * 0.90;
    const cardH = ph * 0.28;
    const cardX = px + (pw - cardW) / 2;
    const cardY = py + ph - cardH - (ph * 0.04);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 20);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = state.textColor || '#2D3748';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const baseFontSize = Math.round(state.fontSize * (pw / 920));
    ctx.font = `600 ${baseFontSize}px ${state.fontFamily}`;

    const rawLines = text.split('\n');
    let wrappedLines = [];
    const maxLineW = cardW * 0.86;

    rawLines.forEach(rawL => {
        const words = rawL.split(' ');
        let currentL = '';
        words.forEach(w => {
            const testL = currentL ? (currentL + ' ' + w) : w;
            const metrics = ctx.measureText(testL);
            if (metrics.width > maxLineW && currentL) {
                wrappedLines.push(currentL);
                currentL = w;
            } else {
                currentL = testL;
            }
        });
        if (currentL) wrappedLines.push(currentL);
    });

    const totalLines = wrappedLines.length + (author ? 1.4 : 0);
    const lineHeight = baseFontSize * 1.4;
    const totalTextH = totalLines * lineHeight;

    let adjustedFontSize = baseFontSize;
    if (totalTextH > cardH * 0.82) {
        adjustedFontSize = Math.round(baseFontSize * ((cardH * 0.82) / totalTextH));
        ctx.font = `600 ${adjustedFontSize}px ${state.fontFamily}`;
    }
    const finalLineHeight = adjustedFontSize * 1.4;

    const startY = cardY + (cardH - (wrappedLines.length * finalLineHeight)) / 2 - (author ? finalLineHeight * 0.45 : 0);
    const centerX = cardX + cardW / 2;

    wrappedLines.forEach((line, idx) => {
        const y = startY + (idx * finalLineHeight);
        ctx.fillText(line, centerX, y);
    });

    if (author) {
        const authorY = startY + (wrappedLines.length * finalLineHeight) + (finalLineHeight * 0.55);
        ctx.font = `italic 500 ${Math.round(adjustedFontSize * 0.75)}px ${state.fontFamily}`;
        ctx.fillStyle = '#718096';
        ctx.fillText(`— ${author} —`, centerX, authorY);
    }
    ctx.restore();
}

function drawEdgeDecorations(px, py, pw, ph, frame) {
    if (frame.hasPaperClip) {
        drawMetallicPaperClip(px + 45, py - 12, 38, 92);
    }
    if (frame.hasWashiOverlap) {
        drawSemiTransparentTape(px + pw - 90, py - 12, 110, 34, 0.22);
    }
}

function drawInPhotoOverlays(px, py, pw, ph, frame) {
    const effect = (state.overlayEffect === 'auto') ? (frame.overlayType || 'none') : state.overlayEffect;
    if (effect === 'none') return;

    ctx.save();
    drawRoundedRect(ctx, px, py, pw, ph, 12);
    ctx.clip();

    if (effect === 'sunbeam') {
        const sunGrad = ctx.createLinearGradient(px, py, px + pw * 0.85, py + ph * 0.7);
        sunGrad.addColorStop(0, 'rgba(255, 240, 200, 0.42)');
        sunGrad.addColorStop(0.3, 'rgba(255, 225, 175, 0.22)');
        sunGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
        sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(px, py, pw, ph);
    }
    ctx.restore();
}

function drawStandardQuote(boxX, boxY, boxW, boxH, frame) {
    const text = state.customQuoteText || (state.currentQuote ? state.currentQuote.text : '');
    const author = state.customAuthorText || (state.currentQuote ? state.currentQuote.author : '');
    if (!text) return;

    ctx.save();
    const textColor = frame.textColor || state.textColor || '#2D3748';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const baseFontSize = Math.round(state.fontSize * (boxW / 920));
    ctx.font = `600 ${baseFontSize}px ${state.fontFamily}`;

    const rawLines = text.split('\n');
    let wrappedLines = [];
    const maxLineW = boxW * 0.88;

    rawLines.forEach(rawL => {
        const words = rawL.split(' ');
        let currentL = '';
        words.forEach(w => {
            const testL = currentL ? (currentL + ' ' + w) : w;
            const metrics = ctx.measureText(testL);
            if (metrics.width > maxLineW && currentL) {
                wrappedLines.push(currentL);
                currentL = w;
            } else {
                currentL = testL;
            }
        });
        if (currentL) wrappedLines.push(currentL);
    });

    const totalLines = wrappedLines.length + (author ? 1.5 : 0);
    const lineHeight = baseFontSize * 1.45;
    const totalTextH = totalLines * lineHeight;

    let adjustedFontSize = baseFontSize;
    if (totalTextH > boxH * 0.8) {
        adjustedFontSize = Math.round(baseFontSize * ((boxH * 0.8) / totalTextH));
        ctx.font = `600 ${adjustedFontSize}px ${state.fontFamily}`;
    }
    const finalLineHeight = adjustedFontSize * 1.45;

    const startY = boxY + (boxH - (wrappedLines.length * finalLineHeight)) / 2 - (author ? finalLineHeight * 0.45 : 0);
    const centerX = boxX + boxW / 2;

    wrappedLines.forEach((line, idx) => {
        const y = startY + (idx * finalLineHeight);
        ctx.fillText(line, centerX, y);
    });

    if (author) {
        const authorY = startY + (wrappedLines.length * finalLineHeight) + (finalLineHeight * 0.55);
        ctx.font = `italic 500 ${Math.round(adjustedFontSize * 0.75)}px ${state.fontFamily}`;
        ctx.fillStyle = frame.textColor ? 'rgba(255, 255, 255, 0.78)' : '#718096';
        ctx.fillText(`— ${author} —`, centerX, authorY);
    }
    ctx.restore();
}

function drawStickers() {
    if (!state.stickers || state.stickers.length === 0) return;

    ctx.save();
    state.stickers.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation || 0);

        ctx.font = `${s.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = 'rgba(0, 0, 0, 0.16)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.fillText(s.emoji, 0, 0);
        ctx.restore();
    });
    ctx.restore();
}

function setupCanvasInteractivity() {
    if (!canvas) return;

    const getCanvasCoords = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches[0]) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const onPointerDown = (e) => {
        const pos = getCanvasCoords(e);
        for (let i = state.stickers.length - 1; i >= 0; i--) {
            const s = state.stickers[i];
            const dist = Math.hypot(pos.x - s.x, pos.y - s.y);
            if (dist <= s.size * 0.8) {
                isDragging = true;
                draggedStickerIndex = i;
                dragStartX = pos.x - s.x;
                dragStartY = pos.y - s.y;
                canvas.style.cursor = 'grabbing';
                break;
            }
        }
    };

    const onPointerMove = (e) => {
        const pos = getCanvasCoords(e);
        if (isDragging && draggedStickerIndex >= 0) {
            state.stickers[draggedStickerIndex].x = pos.x - dragStartX;
            state.stickers[draggedStickerIndex].y = pos.y - dragStartY;
            renderCanvas();
        } else {
            let hovering = false;
            for (let i = state.stickers.length - 1; i >= 0; i--) {
                const s = state.stickers[i];
                if (Math.hypot(pos.x - s.x, pos.y - s.y) <= s.size * 0.8) {
                    hovering = true;
                    break;
                }
            }
            canvas.style.cursor = hovering ? 'grab' : 'default';
        }
    };

    const onPointerUp = () => {
        if (isDragging) {
            isDragging = false;
            draggedStickerIndex = -1;
            canvas.style.cursor = 'default';
        }
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
}

function downloadProcessedPhoto() {
    if (!canvas || !state.imageLoaded) {
        alert('Vui lòng tải ảnh lên trước khi lưu!');
        return;
    }

    showToast('Đang xuất ảnh chất lượng cao...');

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const filename = `Canva_Korean_Art_${timestamp}.png`;

    canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('🎉 Đã tải ảnh nghệ thuật về máy!');
    }, 'image/png');
}

function drawRoundedRect(c, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    c.beginPath();
    c.moveTo(x + radius, y);
    c.arcTo(x + width, y, x + width, y + height, radius);
    c.arcTo(x + width, y + height, x, y + height, radius);
    c.arcTo(x, y + height, x, y, radius);
    c.arcTo(x, y, x + width, y, radius);
    c.closePath();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}
