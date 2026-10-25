// Logic chính của Tiệm Khung Ảnh & Thơ Kute

const state = {
    image: null,
    imageLoaded: false,
    currentFrameId: 'polaroid_classic',
    currentQuote: null,
    quoteCategory: 'all',
    customQuoteText: '',
    customAuthorText: '',
    fontFamily: "'Quicksand', 'Nunito', sans-serif",
    fontSize: 28,
    textColor: '#2D3748',
    aspectRatio: 'original', // 'original', '1:1', '4:5', '9:16'
    currentFilter: 'none',
    stickers: [], // [{ id, emoji, x, y, size, rotation }]
    autoStickers: true
};

// Canvas elements
let canvas, ctx;
let isDragging = false;
let draggedStickerIndex = -1;
let dragStartX = 0;
let dragStartY = 0;

// Khởi tạo ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('photoCanvas');
    ctx = canvas.getContext('2d');

    // Khởi tạo kho câu nói ngẫu nhiên
    pickNewQuote();
    
    // Khởi tạo các sự kiện giao diện
    initEvents();
    renderFramesGrid();
    renderStickerPalette();

    // Tự động load ảnh mẫu để người dùng thấy ngay thành quả
    loadSampleImage();
});

// Load ảnh mẫu ban đầu
function loadSampleImage() {
    const sampleImg = new Image();
    sampleImg.crossOrigin = 'anonymous';

    // Tạo ảnh mẫu nghệ thuật ngọt ngào
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 900;
    tempCanvas.height = 1100;
    const tCtx = tempCanvas.getContext('2d');

    // Nền gradient ngọt ngào
    const grad = tCtx.createLinearGradient(0, 0, 900, 1100);
    grad.addColorStop(0, '#FFAAA6');
    grad.addColorStop(0.5, '#FFD3B6');
    grad.addColorStop(1, '#D4F0F0');
    tCtx.fillStyle = grad;
    tCtx.fillRect(0, 0, 900, 1100);

    // Vầng sáng ấm áp
    tCtx.beginPath();
    tCtx.arc(450, 420, 180, 0, Math.PI * 2);
    tCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    tCtx.fill();

    // Biểu tượng hoa anh đào lớn
    tCtx.font = '160px sans-serif';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText('🌸', 450, 410);

    // Chữ minh họa
    tCtx.font = 'bold 42px "Nunito", sans-serif';
    tCtx.fillStyle = '#FFFFFF';
    tCtx.shadowColor = 'rgba(0,0,0,0.25)';
    tCtx.shadowBlur = 10;
    tCtx.fillText('Bức Ảnh Của Bạn Sẽ Ở Đây ✨', 450, 680);
    tCtx.font = '600 24px "Nunito", sans-serif';
    tCtx.fillText('(Bấm "Tải Ảnh Của Bạn" ở trên để chọn ảnh nhé!)', 450, 740);

    sampleImg.onload = () => {
        state.image = sampleImg;
        state.imageLoaded = true;
        magicAutoDecorate();
    };
    sampleImg.src = tempCanvas.toDataURL();
}

// Hàm khởi tạo sự kiện
function initEvents() {
    // Xử lý upload ảnh
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

    // Drag & Drop ảnh
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

    // Lọc chủ đề câu nói
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.quoteCategory = chip.getAttribute('data-cat');
            pickNewQuote();
            renderCanvas();
        });
    });

    // Nút đổi câu ngẫu nhiên
    const randomQuoteBtn = document.getElementById('randomQuoteBtn');
    if (randomQuoteBtn) {
        randomQuoteBtn.addEventListener('click', () => {
            pickNewQuote();
            renderCanvas();
            showToast('Đã đổi câu nói mới! ✨');
        });
    }

    // Nút đổi khung ngẫu nhiên
    const randomFrameBtn = document.getElementById('randomFrameBtn');
    if (randomFrameBtn) {
        randomFrameBtn.addEventListener('click', () => {
            const randomIdx = Math.floor(Math.random() * FRAME_PRESETS.length);
            selectFrame(FRAME_PRESETS[randomIdx].id);
            showToast('Đã đổi kiểu khung ảnh mới! 🖼️');
        });
    }

    // Nút đổi sticker ngẫu nhiên
    const randomStickersBtn = document.getElementById('randomStickersBtn');
    if (randomStickersBtn) {
        randomStickersBtn.addEventListener('click', () => {
            generateRandomStickers();
            renderCanvas();
            showToast('Đã đổi các sticker kute! 🎀');
        });
    }

    // Nút "Phù phép tất cả" (Magic All)
    const magicAllBtn = document.getElementById('magicAllBtn');
    if (magicAllBtn) {
        magicAllBtn.addEventListener('click', () => {
            magicAutoDecorate();
            showToast('✨ Đã phù phép ảnh siêu kute!');
        });
    }

    // Chỉnh sửa trực tiếp nội dung câu nói
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

    // Đổi font chữ
    const fontSelect = document.getElementById('fontFamilySelect');
    if (fontSelect) {
        fontSelect.addEventListener('change', (e) => {
            state.fontFamily = e.target.value;
            renderCanvas();
        });
    }

    // Kích thước font
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeVal = document.getElementById('fontSizeValue');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', (e) => {
            state.fontSize = parseInt(e.target.value);
            if (fontSizeVal) fontSizeVal.textContent = state.fontSize + 'px';
            renderCanvas();
        });
    }

    // Màu chữ
    const textColorPicker = document.getElementById('textColorPicker');
    if (textColorPicker) {
        textColorPicker.addEventListener('input', (e) => {
            state.textColor = e.target.value;
            renderCanvas();
        });
    }

    // Tỉ lệ khung hình
    const aspectSelect = document.getElementById('aspectRatioSelect');
    if (aspectSelect) {
        aspectSelect.addEventListener('change', (e) => {
            state.aspectRatio = e.target.value;
            renderCanvas();
        });
    }

    // Bộ lọc ảnh
    renderFilterButtons();

    // Nút xóa tất cả sticker
    const clearStickersBtn = document.getElementById('clearStickersBtn');
    if (clearStickersBtn) {
        clearStickersBtn.addEventListener('click', () => {
            state.stickers = [];
            renderCanvas();
            showToast('Đã xóa sạch stickers.');
        });
    }

    // Tải ảnh về máy
    const downloadBtn = document.getElementById('downloadPhotoBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadProcessedPhoto);
    }

    // Tương tác kéo thả sticker trên Canvas
    setupCanvasInteractivity();
}

// Xử lý file ảnh được tải lên
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
            showToast('Tải ảnh thành công! Đã tự động tạo khung kute ✨');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Chọn câu nói mới
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

// Tạo sticker ngẫu nhiên hài hòa với vị trí khung ảnh
function generateRandomStickers() {
    state.stickers = [];
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    // Chọn 3 đến 4 sticker kute ngẫu nhiên
    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Sticker 1: Góc trên bên trái
    state.stickers.push({
        id: 's_1',
        emoji: randomPick(['✨', '🌸', '🐱', '🎀', '☀️']),
        x: Math.round(w * 0.12),
        y: Math.round(h * 0.08),
        size: Math.round(w * 0.075),
        rotation: (Math.random() * 0.3) - 0.15
    });

    // Sticker 2: Góc trên bên phải
    state.stickers.push({
        id: 's_2',
        emoji: randomPick(['🐰', '💖', '🌈', '⭐', '🍓']),
        x: Math.round(w * 0.88),
        y: Math.round(h * 0.08),
        size: Math.round(w * 0.08),
        rotation: (Math.random() * 0.3) - 0.15
    });

    // Sticker 3: Điểm xuyết ở góc dưới gần câu nói
    state.stickers.push({
        id: 's_3',
        emoji: randomPick(['🧋', '🌻', '☕', '🍀', '🍰', '🦋']),
        x: Math.round(w * 0.87),
        y: Math.round(h * 0.92),
        size: Math.round(w * 0.07),
        rotation: (Math.random() * 0.3) - 0.15
    });

    // Sticker 4: Nhỏ lấp lánh cạnh chữ
    state.stickers.push({
        id: 's_4',
        emoji: '✨',
        x: Math.round(w * 0.13),
        y: Math.round(h * 0.92),
        size: Math.round(w * 0.06),
        rotation: 0
    });
}

// 1 Chạm Tự Động Phù Phép Tất Cả
function magicAutoDecorate() {
    if (!state.imageLoaded) return;

    // 1. Chọn khung ngẫu nhiên hợp ảnh
    const randomFrame = FRAME_PRESETS[Math.floor(Math.random() * FRAME_PRESETS.length)];
    selectFrame(randomFrame.id);

    // 2. Chọn câu nói ngẫu nhiên
    pickNewQuote();

    // 3. Render canvas trước để tính kích thước khung
    renderCanvas();

    // 4. Tạo sticker ngẫu nhiên theo canvas thực tế
    if (state.autoStickers) {
        generateRandomStickers();
    }

    // 5. Render lại toàn bộ
    renderCanvas();
}

// Chọn khung ảnh
function selectFrame(frameId) {
    state.currentFrameId = frameId;
    document.querySelectorAll('.frame-card').forEach(card => {
        card.classList.toggle('active', card.getAttribute('data-frame') === frameId);
    });
    renderCanvas();
}

// Render danh sách chọn khung
function renderFramesGrid() {
    const container = document.getElementById('framesGrid');
    if (!container) return;

    container.innerHTML = '';
    FRAME_PRESETS.forEach(f => {
        const card = document.createElement('div');
        card.className = `frame-card ${f.id === state.currentFrameId ? 'active' : ''}`;
        card.setAttribute('data-frame', f.id);
        card.innerHTML = `
            <div class="frame-thumb" style="background: ${f.bgColor || 'linear-gradient(135deg, #FFE5EC, #F0E6FF)'}; color: ${f.textColor || '#FF6B8B'}; border: 2px dashed ${f.borderColor || '#FED7E2'};">
                ${f.name.split(' ')[0]}
            </div>
            <div class="frame-title">${f.name}</div>
        `;
        card.addEventListener('click', () => selectFrame(f.id));
        container.appendChild(card);
    });
}

// Render bảng chọn Sticker
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
            showToast(`Đã thêm sticker ${s.emoji}`);
        });
        container.appendChild(item);
    });
}

// Thêm sticker cụ thể vào canvas
function addStickerToCanvas(emoji) {
    const w = canvas.width || 800;
    const h = canvas.height || 1000;
    state.stickers.push({
        id: 's_' + Date.now(),
        emoji: emoji,
        x: Math.round(w * (0.35 + Math.random() * 0.3)),
        y: Math.round(h * (0.35 + Math.random() * 0.3)),
        size: Math.round(w * 0.08),
        rotation: (Math.random() * 0.4) - 0.2
    });
    renderCanvas();
}

// Render bộ lọc ảnh
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
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCanvas();
        });
        container.appendChild(btn);
    });
}

// VẼ TOÀN BỘ CANVAS NGHỆ THUẬT (FRAME + IMAGE + QUOTE + STICKERS)
function renderCanvas() {
    if (!state.imageLoaded || !state.image) return;

    const frame = FRAME_PRESETS.find(f => f.id === state.currentFrameId) || FRAME_PRESETS[0];

    // Chiều rộng cơ bản chất lượng cao
    const origW = state.image.width;
    const origH = state.image.height;
    let targetPhotoW = 900;
    let targetPhotoH = (origH / origW) * targetPhotoW;

    // Tỉ lệ khung hình tùy chọn
    if (state.aspectRatio === '1:1') {
        targetPhotoH = targetPhotoW;
    } else if (state.aspectRatio === '4:5') {
        targetPhotoH = targetPhotoW * (5 / 4);
    } else if (state.aspectRatio === '9:16') {
        targetPhotoH = targetPhotoW * (16 / 9);
    }

    // Tính kích thước viền và không gian khung ảnh
    const padTop = Math.round(frame.padding.top * targetPhotoW);
    const padLeft = Math.round(frame.padding.left * targetPhotoW);
    const padRight = Math.round(frame.padding.right * targetPhotoW);
    const padBottom = Math.round(frame.padding.bottom * targetPhotoW);

    const totalW = targetPhotoW + padLeft + padRight;
    const totalH = Math.round(targetPhotoH + padTop + padBottom);

    canvas.width = totalW;
    canvas.height = totalH;

    ctx.clearRect(0, 0, totalW, totalH);

    // 1. Vẽ nền khung ảnh
    drawFrameBackground(frame, totalW, totalH);

    // 2. Vẽ ảnh kèm bộ lọc
    const photoX = padLeft;
    const photoY = padTop;
    drawFilteredPhoto(state.image, photoX, photoY, targetPhotoW, targetPhotoH, frame);

    // 3. Vẽ trang trí viền khung nghệ thuật
    drawFrameDecorations(frame, photoX, photoY, targetPhotoW, targetPhotoH, totalW, totalH);

    // 4. Vẽ câu nói & Thơ ngọt ngào
    const quoteBoxX = padLeft;
    const quoteBoxY = photoY + targetPhotoH;
    const quoteBoxW = targetPhotoW;
    const quoteBoxH = padBottom;
    drawQuoteAndPoem(quoteBoxX, quoteBoxY, quoteBoxW, quoteBoxH, frame);

    // 5. Vẽ Stickers kute
    drawStickers();
}

// Vẽ nền khung
function drawFrameBackground(frame, w, h) {
    ctx.save();

    if (frame.style === 'gradient' && frame.gradient) {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, frame.gradient[0]);
        grad.addColorStop(0.5, frame.gradient[1]);
        grad.addColorStop(1, frame.gradient[2]);
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = frame.bgColor || '#FFFDF9';
    }

    // Bo tròn viền nếu có
    const radius = frame.borderRadius ? Math.round(frame.borderRadius * (w / 700)) : 0;
    if (radius > 0) {
        drawRoundedRect(ctx, 0, 0, w, h, radius);
        ctx.fill();
    } else {
        ctx.fillRect(0, 0, w, h);
    }

    // Viền nhẹ
    if (frame.borderColor) {
        ctx.strokeStyle = frame.borderColor;
        ctx.lineWidth = frame.borderWidth || 3;
        if (radius > 0) {
            drawRoundedRect(ctx, 0, 0, w, h, radius);
            ctx.stroke();
        } else {
            ctx.strokeRect(0, 0, w, h);
        }
    }

    ctx.restore();
}

// Vẽ ảnh kèm crop đúng tỉ lệ và bộ lọc màu
function drawFilteredPhoto(img, x, y, w, h, frame) {
    ctx.save();

    // Clip theo bo góc
    const photoRadius = frame.borderRadius ? Math.max(0, Math.round((frame.borderRadius - 6) * (w / 700))) : 8;
    drawRoundedRect(ctx, x, y, w, h, photoRadius);
    ctx.clip();

    // Áp dụng bộ lọc ảnh
    let filterString = '';
    switch (state.currentFilter) {
        case 'bright_sweet':
            filterString = 'brightness(1.08) contrast(1.05) saturate(1.25)';
            break;
        case 'warm_vintage':
            filterString = 'sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.15)';
            break;
        case 'dreamy_pink':
            filterString = 'brightness(1.05) contrast(1.02) saturate(1.2) hue-rotate(-10deg)';
            break;
        case 'film_nostalgia':
            filterString = 'sepia(0.35) contrast(1.15) brightness(0.95) saturate(0.9)';
            break;
        case 'bw_classic':
            filterString = 'grayscale(1) contrast(1.2) brightness(1.02)';
            break;
        default:
            filterString = 'none';
    }
    ctx.filter = filterString;

    // Crop căn giữa (Cover)
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

    // Viền mỏng phân cách ảnh
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
}

// Vẽ trang trí đặc biệt cho từng loại khung
function drawFrameDecorations(frame, px, py, pw, ph, tw, th) {
    ctx.save();

    if (frame.style === 'washi') {
        // Băng dính Washi Pastel 2 góc trên
        drawWashiTape(px - 15, py - 10, 110, 36, -0.22, '#FFC6D9');
        drawWashiTape(px + pw - 95, py - 10, 110, 36, 0.18, '#BAE6FD');
    } else if (frame.style === 'film') {
        // Các lỗ đục cuộn phim trên và dưới
        ctx.fillStyle = '#FFFFFF';
        const holeW = 16;
        const holeH = 22;
        const gap = 36;
        for (let x = 20; x < tw - 24; x += gap) {
            drawRoundedRect(ctx, x, 14, holeW, holeH, 4);
            ctx.fill();
            drawRoundedRect(ctx, x, th - 34, holeW, holeH, 4);
            ctx.fill();
        }
        // Tem date hoài niệm góc phim
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#FF9F1C';
        ctx.fillText('🎞️ ' + new Date().toISOString().slice(0, 10).replace(/-/g, '.'), px + 10, py + ph + 38);
    } else if (frame.style === 'polaroid') {
        // Miếng dán washi pastel trung tâm trên cùng
        drawWashiTape(tw / 2 - 55, 12, 110, 32, 0.02, 'rgba(254, 215, 226, 0.9)');
    } else if (frame.style === 'pastel') {
        // Viền chấm bi pastel xinh xắn
        ctx.strokeStyle = 'rgba(255, 182, 193, 0.65)';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 8]);
        drawRoundedRect(ctx, 16, 16, tw - 32, th - 32, 22);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    ctx.restore();
}

// Hàm vẽ băng dính Washi Tape
function drawWashiTape(x, y, w, h, angle, color) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;

    // Răng cưa 2 đầu băng keo
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2);
    ctx.lineTo(w / 2, -h / 2);
    ctx.lineTo(w / 2 - 4, 0);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.lineTo(-w / 2 + 4, 0);
    ctx.closePath();
    ctx.fill();

    // Họa tiết sọc chéo mờ
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    for (let i = -w / 2; i < w / 2; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, -h / 2);
        ctx.lineTo(i + 15, h / 2);
        ctx.stroke();
    }

    ctx.restore();
}

// Vẽ câu nói và thơ chạm cảm xúc
function drawQuoteAndPoem(boxX, boxY, boxW, boxH, frame) {
    const text = state.customQuoteText || (state.currentQuote ? state.currentQuote.text : '');
    const author = state.customAuthorText || (state.currentQuote ? state.currentQuote.author : '');
    if (!text) return;

    ctx.save();

    const textColor = frame.textColor || state.textColor || '#2D3748';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const baseFontSize = Math.round(state.fontSize * (boxW / 900));
    ctx.font = `600 ${baseFontSize}px ${state.fontFamily}`;

    // Tách dòng
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

    // Tự động căn chỉnh kích thước font để không tràn
    const totalLines = wrappedLines.length + (author ? 1.5 : 0);
    const lineHeight = baseFontSize * 1.45;
    const totalTextH = totalLines * lineHeight;

    let adjustedFontSize = baseFontSize;
    if (totalTextH > boxH * 0.8) {
        adjustedFontSize = Math.round(baseFontSize * ((boxH * 0.8) / totalTextH));
        ctx.font = `600 ${adjustedFontSize}px ${state.fontFamily}`;
    }
    const finalLineHeight = adjustedFontSize * 1.45;

    // Tọa độ bắt đầu vẽ
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

// Vẽ stickers
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

        ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.fillText(s.emoji, 0, 0);
        ctx.restore();
    });
    ctx.restore();
}

// Xử lý tương tác kéo thả Stickers trên Canvas
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

// TẢI ẢNH VỀ MÁY TÍNH
function downloadProcessedPhoto() {
    if (!canvas || !state.imageLoaded) {
        alert('Vui lòng tải ảnh lên trước khi lưu!');
        return;
    }

    showToast('Đang chuẩn bị file ảnh chất lượng cao...');

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const filename = `Anh_Kute_${timestamp}.png`;

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
        showToast('🎉 Đã tải ảnh kute về máy thành công!');
    }, 'image/png');
}

// Tiện ích: Vẽ hình chữ nhật bo góc
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

// Thông báo Toast nhỏ góc dưới
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
