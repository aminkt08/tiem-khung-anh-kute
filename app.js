// Logic chính của Tiệm Khung Ảnh & Thơ Kute - Phong cách Pop-up 3D & Aesthetic Tối Giản

const state = {
    image: null,
    imageLoaded: false,
    currentFrameId: 'popup_glass',
    overlayEffect: 'auto', // 'auto', 'glass_card', 'sunbeam', 'postal_stamp', 'sparkles_dust', 'none'
    currentQuote: null,
    quoteCategory: 'all',
    customQuoteText: '',
    customAuthorText: '',
    fontFamily: "'Quicksand', 'Nunito', sans-serif",
    fontSize: 27,
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
    renderOverlayGrid();
    renderStickerPalette();

    // Tự động load ảnh mẫu để người dùng thấy ngay thành quả
    loadSampleImage();
});

// Load ảnh mẫu ban đầu mang phong cách thẩm mỹ dịu dàng
function loadSampleImage() {
    const sampleImg = new Image();
    sampleImg.crossOrigin = 'anonymous';

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 900;
    tempCanvas.height = 1100;
    const tCtx = tempCanvas.getContext('2d');

    // Nền màu kem ấm / pastel Hàn Quốc
    const grad = tCtx.createLinearGradient(0, 0, 900, 1100);
    grad.addColorStop(0, '#EAE5D9');
    grad.addColorStop(0.5, '#F7F2E7');
    grad.addColorStop(1, '#DCE4DB');
    tCtx.fillStyle = grad;
    tCtx.fillRect(0, 0, 900, 1100);

    // Vòng tròn ánh sáng dịu
    tCtx.beginPath();
    tCtx.arc(450, 430, 200, 0, Math.PI * 2);
    tCtx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    tCtx.fill();

    // Biểu tượng nhánh lá tinh khôi
    tCtx.font = '150px sans-serif';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText('🌿', 450, 420);

    // Chữ minh họa
    tCtx.font = 'bold 38px "Nunito", sans-serif';
    tCtx.fillStyle = '#4A4A48';
    tCtx.shadowColor = 'rgba(0,0,0,0.15)';
    tCtx.shadowBlur = 8;
    tCtx.fillText('Ảnh Của Bạn Sẽ Nổi Bật Ở Đây ✨', 450, 680);
    tCtx.font = '600 23px "Nunito", sans-serif';
    tCtx.fillStyle = '#6E6E6A';
    tCtx.fillText('(Bấm "Tải Ảnh Của Bạn" ở trên để chọn ảnh nhé)', 450, 735);

    sampleImg.onload = () => {
        state.image = sampleImg;
        state.imageLoaded = true;
        magicAutoDecorate();
    };
    sampleImg.src = tempCanvas.toDataURL();
}

// Khởi tạo các sự kiện
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

    // Quick buttons
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
            showToast('Đã đổi kiểu khung pop-up mới! 🪟');
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
            showToast('✨ Đã phù phép hiệu ứng pop-up mới!');
        });
    }

    // Input text / quote
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

    // Photo filters
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
            showToast('Tải ảnh thành công! Đã tự động tạo hiệu ứng nổi 3D ✨');
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

// Tạo icon tối giản thanh lịch (Chỉ 2-3 điểm nhấn tinh tế, không lạm dụng)
function generateRandomStickers() {
    state.stickers = [];
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Điểm nhấn 1: Góc trên bên phải hoặc bên trái
    state.stickers.push({
        id: 's_1',
        emoji: randomPick(['✨', '🤍', '🌿', '🕊️', '⭐']),
        x: Math.round(w * 0.88),
        y: Math.round(h * 0.10),
        size: Math.round(w * 0.065),
        rotation: (Math.random() * 0.2) - 0.1
    });

    // Điểm nhấn 2: Lấp lánh tinh khôi cạnh thẻ chữ
    state.stickers.push({
        id: 's_2',
        emoji: randomPick(['✨', '🌷', '☕', '🌙', '🍃']),
        x: Math.round(w * 0.14),
        y: Math.round(h * 0.88),
        size: Math.round(w * 0.058),
        rotation: 0
    });
}

// 1 Chạm Tự Động Phù Phép
function magicAutoDecorate() {
    if (!state.imageLoaded) return;

    // Chọn khung ngẫu nhiên
    const randomFrame = FRAME_PRESETS[Math.floor(Math.random() * FRAME_PRESETS.length)];
    selectFrame(randomFrame.id);

    // Chọn câu nói mới
    pickNewQuote();

    // Render kích thước
    renderCanvas();

    // Đặt icon tối giản
    if (state.autoStickers) {
        generateRandomStickers();
    }

    renderCanvas();
}

// Chọn khung
function selectFrame(frameId) {
    state.currentFrameId = frameId;
    document.querySelectorAll('.frame-card').forEach(card => {
        card.classList.toggle('active', card.getAttribute('data-frame') === frameId);
    });
    renderCanvas();
}

// Render danh sách Khung
function renderFramesGrid() {
    const container = document.getElementById('framesGrid');
    if (!container) return;

    container.innerHTML = '';
    FRAME_PRESETS.forEach(f => {
        const card = document.createElement('div');
        card.className = `frame-card ${f.id === state.currentFrameId ? 'active' : ''}`;
        card.setAttribute('data-frame', f.id);
        card.innerHTML = `
            <div class="frame-thumb" style="background: ${f.bgColor}; border: 1.5px solid ${f.borderColor || '#DDD'}">
                ${f.name.split(' ')[0]}
            </div>
            <div class="frame-title">${f.name}</div>
        `;
        card.addEventListener('click', () => selectFrame(f.id));
        container.appendChild(card);
    });
}

// Render chọn hiệu ứng nổi trong ảnh
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

// Render bảng Icon Tinh Tế (Aesthetic Minimal Icons)
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

// ==========================================
// VẼ TOÀN BỘ CANVAS POP-UP NỔI 3D & NGHỆ THUẬT
// ==========================================
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

    // Xác định padding
    const isGlassPopup = (frame.style === 'popup_glass');
    const padTop = Math.round(frame.padding.top * targetPhotoW);
    const padLeft = Math.round(frame.padding.left * targetPhotoW);
    const padRight = Math.round(frame.padding.right * targetPhotoW);
    const padBottom = Math.round(frame.padding.bottom * targetPhotoW);

    const totalW = targetPhotoW + padLeft + padRight;
    const totalH = Math.round(targetPhotoH + padTop + padBottom);

    canvas.width = totalW;
    canvas.height = totalH;

    ctx.clearRect(0, 0, totalW, totalH);

    // 1. Nền canvas tổng thể
    ctx.fillStyle = frame.bgColor || '#FAF8F5';
    ctx.fillRect(0, 0, totalW, totalH);

    const photoX = padLeft;
    const photoY = padTop;

    // 2. HIỆU ỨNG ĐỔ BÓNG NỔI KHỐI 3D CHO ẢNH (DEEP 3D AMBIENT SHADOW)
    drawPhoto3DShadow(photoX, photoY, targetPhotoW, targetPhotoH);

    // 3. Vẽ bức ảnh (được crop & áp dụng bộ lọc màu)
    drawFilteredPhoto(state.image, photoX, photoY, targetPhotoW, targetPhotoH, frame);

    // 4. HIỆU ỨNG NỔI TRỰC TIẾP TRONG LÒNG ẢNH (IN-PHOTO OVERLAY POP-UP)
    drawInPhotoOverlays(photoX, photoY, targetPhotoW, targetPhotoH, frame);

    // 5. CÁC CHI TIẾT NỔI ĐÈ LÊN MÉP ẢNH (KẸP GIẤY 3D, TEM BƯU ĐIỆN, BĂNG DÍNH BÁN TRONG SUỐT)
    drawEdgeOverlapDecorations(photoX, photoY, targetPhotoW, targetPhotoH, frame, totalW, totalH);

    // 6. VẼ CÂU NÓI & THƠ:
    // Nếu là kiểu Popup Glass -> Thẻ kính mờ nổi đè lên góc dưới của ảnh
    // Nếu là kiểu thông thường -> Vẽ ở khoảng trống dưới ảnh
    if (isGlassPopup) {
        drawGlassmorphismQuoteBox(photoX, photoY, targetPhotoW, targetPhotoH);
    } else {
        const quoteBoxX = padLeft;
        const quoteBoxY = photoY + targetPhotoH;
        const quoteBoxW = targetPhotoW;
        const quoteBoxH = padBottom;
        drawStandardQuote(quoteBoxX, quoteBoxY, quoteBoxW, quoteBoxH, frame);
    }

    // 7. Vẽ biểu tượng Sticker tinh tế
    drawStickers();
}

// Đổ bóng nổi 3D đa tầng cho ảnh (tạo cảm giác ảnh bay nổi trên bề mặt)
function drawPhoto3DShadow(x, y, w, h) {
    ctx.save();
    
    // Tầng bóng 1: Bóng loang rộng mềm mại
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, x, y, w, h, 14);
    ctx.fill();

    // Tầng bóng 2: Bóng tiếp xúc gần sắc nét
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.fill();

    ctx.restore();
}

// Vẽ ảnh người dùng vào khung
function drawFilteredPhoto(img, x, y, w, h, frame) {
    ctx.save();

    const photoRadius = frame.borderRadius ? Math.round(frame.borderRadius * (w / 750)) : 12;
    drawRoundedRect(ctx, x, y, w, h, photoRadius);
    ctx.clip();

    // Áp dụng bộ lọc
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

    // Crop Cover
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

    // Viền trắng tinh khôi bo quanh ảnh
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
}

// ==========================================
// CÁC HIỆU ỨNG NỔI TRỰC TIẾP TRONG LÒNG BỨC ẢNH
// ==========================================
function drawInPhotoOverlays(px, py, pw, ph, frame) {
    const effect = (state.overlayEffect === 'auto') ? (frame.overlayType || 'none') : state.overlayEffect;
    if (effect === 'none') return;

    ctx.save();
    // Giới hạn trong phạm vi ảnh
    drawRoundedRect(ctx, px, py, pw, ph, 12);
    ctx.clip();

    if (effect === 'sunbeam') {
        // Vệt nắng ấm xiên qua ảnh từ góc trên trái
        const sunGrad = ctx.createLinearGradient(px, py, px + pw * 0.85, py + ph * 0.7);
        sunGrad.addColorStop(0, 'rgba(255, 240, 200, 0.42)');
        sunGrad.addColorStop(0.3, 'rgba(255, 225, 175, 0.22)');
        sunGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
        sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(px, py, pw, ph);

        // Bụi sao / hạt bụi nắng lơ lửng trong vệt nắng
        drawSunlightDust(px, py, pw, ph);

    } else if (effect === 'sparkles_dust') {
        // Bụi sao lấp lánh nhẹ nhàng
        drawSunlightDust(px, py, pw, ph);

    } else if (effect === 'film_leak') {
        // Vệt sáng rò phim (Film light leak) màu cam đỏ hoài niệm
        const leakGrad = ctx.createRadialGradient(px + pw, py + ph * 0.4, 10, px + pw, py + ph * 0.4, pw * 0.6);
        leakGrad.addColorStop(0, 'rgba(255, 120, 60, 0.35)');
        leakGrad.addColorStop(0.5, 'rgba(255, 180, 50, 0.15)');
        leakGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = leakGrad;
        ctx.fillRect(px, py, pw, ph);

        // Tem date hoài niệm góc phim
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#FFA500';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 6;
        ctx.fillText("'26 10 25", px + 24, py + ph - 24);
    }

    ctx.restore();
}

// Bụi nắng / sao lấp lánh trong ảnh
function drawSunlightDust(px, py, pw, ph) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowColor = 'rgba(255, 240, 200, 0.9)';
    ctx.shadowBlur = 8;

    const sparkles = [
        { x: 0.2, y: 0.18, r: 2.5 },
        { x: 0.35, y: 0.28, r: 1.8 },
        { x: 0.28, y: 0.42, r: 3.0 },
        { x: 0.45, y: 0.22, r: 2.0 },
        { x: 0.52, y: 0.38, r: 2.2 },
        { x: 0.68, y: 0.18, r: 1.6 }
    ];

    sparkles.forEach(s => {
        const sx = px + pw * s.x;
        const sy = py + ph * s.y;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Vẽ tia sao 4 cánh nhỏ
        if (s.r >= 2.2) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(sx - 7, sy);
            ctx.lineTo(sx + 7, sy);
            ctx.moveTo(sx, sy - 7);
            ctx.lineTo(sx, sy + 7);
            ctx.stroke();
        }
    });

    ctx.restore();
}

// ==========================================
// CHI TIẾT NỔI ĐÈ LÊN MÉP ẢNH (POP-UP 3D)
// ==========================================
function drawEdgeOverlapDecorations(px, py, pw, ph, frame, tw, th) {
    // 1. Kẹp giấy kim loại 3D (Paperclip) kẹp vào góc ảnh
    if (frame.hasPaperClip || frame.style === 'popup_glass') {
        drawMetallicPaperClip(px + 45, py - 12, 38, 92);
    }

    // 2. Băng dính Washi mờ dán đè mép ảnh (có thể nhìn xuyên thấu mép ảnh bên dưới)
    if (frame.hasWashiOverlap) {
        drawSemiTransparentTape(px + pw - 90, py - 12, 110, 34, 0.22);
    }

    // 3. Tem bưu chính vintage & Dấu bưu điện tròn đóng đè mép ảnh
    if (frame.overlayType === 'postal_stamp' || frame.style === 'postcard') {
        drawPostageStampWithCancel(px + pw - 105, py + 25, 90, 110);
    }
}

// Kẹp giấy kim loại 3D cao cấp (Metallic Paperclip)
function drawMetallicPaperClip(x, y, w, h) {
    ctx.save();
    
    // Bóng đổ của kẹp giấy xuống bề mặt ảnh
    ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.shadowOffsetX = 3;

    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Kim loại ánh vàng Champagne sang trọng
    const metalGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    metalGrad.addColorStop(0, '#E6C875');
    metalGrad.addColorStop(0.35, '#FFF2B2');
    metalGrad.addColorStop(0.7, '#C59E47');
    metalGrad.addColorStop(1, '#9E782F');
    ctx.strokeStyle = metalGrad;

    // Đường uốn lượn đặc trưng của kẹp ghim
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

// Băng dính bán trong suốt dán đè qua mép ảnh (Semi-transparent Washi Tape)
function drawSemiTransparentTape(x, y, w, h, angle) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(angle);

    // Bóng đổ nhẹ
    ctx.shadowColor = 'rgba(0, 0, 0, 0.14)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;

    // Màu kem/hồng pastel trong suốt (nhìn thấy được ảnh bên dưới)
    ctx.fillStyle = 'rgba(254, 243, 199, 0.78)';

    // Mép răng cưa
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2);
    ctx.lineTo(w / 2, -h / 2);
    ctx.lineTo(w / 2 - 3, 0);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.lineTo(-w / 2 + 3, 0);
    ctx.closePath();
    ctx.fill();

    // Họa tiết sọc chéo mờ
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    for (let i = -w / 2; i < w / 2; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, -h / 2);
        ctx.lineTo(i + 14, h / 2);
        ctx.stroke();
    }

    ctx.restore();
}

// Tem bưu chính vintage & Dấu hủy tròn (Postage Stamp)
function drawPostageStampWithCancel(x, y, w, h) {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;

    // Thân tem trắng kem
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(x, y, w, h);

    // Khung họa tiết bên trong tem
    ctx.fillStyle = '#E8E2D5';
    ctx.fillRect(x + 8, y + 8, w - 16, h - 16);

    // Biểu tượng bên trong tem (Cành hoa tulip hoặc bồ câu)
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌷', x + w / 2, y + h / 2 - 6);

    // Giá tem vintage
    ctx.font = 'bold 12px serif';
    ctx.fillStyle = '#7C7063';
    ctx.fillText('AIR MAIL 10c', x + w / 2, y + h - 18);

    // Dấu bưu điện tròn màu mực đen mờ đóng đè mép tem và mép ảnh
    ctx.strokeStyle = 'rgba(50, 45, 40, 0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x - 12, y + h / 2, 34, 0, Math.PI * 2);
    ctx.stroke();

    // Các đường gợn sóng bưu điện
    for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 15, y + h / 2 + (i * 7));
        ctx.bezierCurveTo(x + 35, y + h / 2 + (i * 7) - 4, x + 55, y + h / 2 + (i * 7) + 4, x + 75, y + h / 2 + (i * 7));
        ctx.stroke();
    }

    ctx.restore();
}

// ==========================================
// THẺ KÍNH MỜ POP-UP NỔI TRỰC TIẾP LÊN ẢNH (GLASSMORPHISM POP-UP)
// ==========================================
function drawGlassmorphismQuoteBox(px, py, pw, ph) {
    const text = state.customQuoteText || (state.currentQuote ? state.currentQuote.text : '');
    const author = state.customAuthorText || (state.currentQuote ? state.currentQuote.author : '');
    if (!text) return;

    ctx.save();

    // Kích thước thẻ kính mờ (nằm ở 1/3 dưới bức ảnh)
    const cardW = pw * 0.90;
    const cardH = ph * 0.28;
    const cardX = px + (pw - cardW) / 2;
    const cardY = py + ph - cardH - (ph * 0.04);
    const cardRadius = 20;

    // Đổ bóng 3D sâu cho thẻ kính mờ (tạo cảm giác bay nổi trên ảnh)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;

    // Nền kính mờ (Frosted glass) trắng kem thanh lịch
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
    ctx.fill();

    // Viền sáng kính tinh khôi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Tắt bóng đổ để chữ sắc nét
    ctx.shadowColor = 'transparent';

    // Vẽ câu nói vào giữa thẻ kính mờ
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

// Vẽ câu nói kiểu truyền thống ở đáy khung
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

        ctx.shadowColor = 'rgba(0, 0, 0, 0.16)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.fillText(s.emoji, 0, 0);
        ctx.restore();
    });
    ctx.restore();
}

// Kéo thả Sticker
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

// Tải ảnh về máy
function downloadProcessedPhoto() {
    if (!canvas || !state.imageLoaded) {
        alert('Vui lòng tải ảnh lên trước khi lưu!');
        return;
    }

    showToast('Đang xuất ảnh chất lượng cao...');

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const filename = `Anh_Popup_Art_${timestamp}.png`;

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
