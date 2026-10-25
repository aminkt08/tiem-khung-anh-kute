import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CanvasWorkspace from './components/CanvasWorkspace';
import Toast from './components/Toast';
import { TEMPLATES_DATA, BACKGROUND_PALETTES, getBestTemplateForCount } from './data/templatesData';
import { getRandomQuote } from './data/quotesData';
import { WASHI_TAPE_COLORS, STICKER_ITEMS } from './data/stickersData';
import { createSamplePhoto } from './data/samplePhotos';
import { downloadCanvasAsImage, copyCanvasToClipboard } from './utils/exportImage';

const SAMPLE_PHOTO = createSamplePhoto(['#FCE7F3', '#FED7AA', '#E0E7FF'], '🌸', 'Khoảnh Khắc Xinh Đẹp ✨');
const SAMPLE_PHOTO_2 = createSamplePhoto(['#E0F2FE', '#EDE9FE', '#FCE7F3'], '🌿', 'An Nhiên & Dịu Dàng 🍃');

export default function App() {
  // Trạng thái ảnh (hỗ trợ tối đa 6 ảnh)
  const [photos, setPhotos] = useState([
    { id: 'sample_1', url: SAMPLE_PHOTO, name: 'Sample 1' },
    { id: 'sample_2', url: SAMPLE_PHOTO_2, name: 'Sample 2' }
  ]);

  // Trạng thái khung ảnh & tỉ lệ
  const [activeTemplate, setActiveTemplate] = useState('polaroid_duo');
  const [aspectRatio, setAspectRatio] = useState('4:5');
  const [bgColor, setBgColor] = useState('#FAF8F5');
  const [washiColor, setWashiColor] = useState('rgba(254, 205, 211, 0.85)');

  // Trạng thái câu nói & typography
  const initialQuote = getRandomQuote('healing');
  const [quoteCategory, setQuoteCategory] = useState('healing');
  const [quoteText, setQuoteText] = useState(initialQuote.text);
  const [authorText, setAuthorText] = useState(initialQuote.author);
  const [fontFamily, setFontFamily] = useState('font-quicksand');
  const [fontSize, setFontSize] = useState(26);
  const [textColor, setTextColor] = useState('#2D3748');
  const [textAlign, setTextAlign] = useState('center');
  const [textBgBadge, setTextBgBadge] = useState(false);

  // Hiệu ứng ảnh & Khung
  const [activeFilter, setActiveFilter] = useState('none');
  const [sunbeamEffect, setSunbeamEffect] = useState(false);
  const [microRotate, setMicroRotate] = useState(true);

  // Zoom bàn làm việc
  const [zoomLevel, setZoomLevel] = useState(100);

  // Sticker & Decor
  const [autoDecor, setAutoDecor] = useState(true);
  const [stickers, setStickers] = useState([
    { id: 'stk_1', emoji: '✨', x: 82, y: 8 },
    { id: 'stk_2', emoji: '🤍', x: 8, y: 86 }
  ]);

  // Toast & Export
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  };

  // Keyboard Shortcuts (Ctrl+S, Ctrl+Shift+C)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleDownload('png');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Upload ảnh + Thuật toán Auto Layout
  const handleUploadPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPhotos = files.slice(0, 6).map((file, i) => ({
      id: `photo_${Date.now()}_${i}`,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPhotos(newPhotos);

    // Thuật toán tự động chọn khung theo số lượng ảnh
    const bestTemplate = getBestTemplateForCount(newPhotos.length);
    setActiveTemplate(bestTemplate);
    showToast(`Đã tải ${newPhotos.length} ảnh & tự động chọn khung tối ưu!`, 'success');
  };

  const handleRemovePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    if (updated.length > 0) {
      setActiveTemplate(getBestTemplateForCount(updated.length));
    }
    showToast('Đã xóa ảnh khỏi khung', 'info');
  };

  const handleSwapPhotos = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= photos.length) return;
    const updated = [...photos];
    const temp = updated[fromIdx];
    updated[fromIdx] = updated[toIdx];
    updated[toIdx] = temp;
    setPhotos(updated);
    showToast('Đã hoán đổi vị trí ảnh!', 'info');
  };

  // Nút "Đổi phong cách ngẫu nhiên" (Magic Shuffle)
  const handleMagicShuffle = () => {
    const randomTemplate = TEMPLATES_DATA[Math.floor(Math.random() * TEMPLATES_DATA.length)];
    setActiveTemplate(randomTemplate.id);

    const randomQuote = getRandomQuote();
    setQuoteText(randomQuote.text);
    setAuthorText(randomQuote.author);

    const randomBg = BACKGROUND_PALETTES[Math.floor(Math.random() * BACKGROUND_PALETTES.length)];
    setBgColor(randomBg.color);

    const randomWashi = WASHI_TAPE_COLORS[Math.floor(Math.random() * WASHI_TAPE_COLORS.length)];
    setWashiColor(randomWashi.color);

    if (autoDecor) {
      const randomItems = [...STICKER_ITEMS].sort(() => 0.5 - Math.random()).slice(0, 2);
      setStickers([
        { id: `s_${Date.now()}_1`, emoji: randomItems[0].emoji, x: Math.floor(Math.random() * 20) + 75, y: Math.floor(Math.random() * 15) + 6 },
        { id: `s_${Date.now()}_2`, emoji: randomItems[1].emoji, x: Math.floor(Math.random() * 20) + 6, y: Math.floor(Math.random() * 15) + 78 }
      ]);
    }

    showToast('✨ Đã phù phép phối phong cách mới!', 'success');
  };

  // Sticker handlers
  const handleAddSticker = (emoji) => {
    setStickers(prev => [
      ...prev,
      {
        id: `sticker_${Date.now()}`,
        emoji,
        x: Math.floor(Math.random() * 50) + 25,
        y: Math.floor(Math.random() * 50) + 25
      }
    ]);
    showToast(`Đã thêm biểu tượng ${emoji}`, 'info');
  };

  const handleRemoveSticker = (id) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  const handleClearStickers = () => {
    setStickers([]);
    showToast('Đã dọn sạch stickers', 'info');
  };

  // Tải ảnh về máy (PNG / JPG)
  const handleDownload = async (format = 'png') => {
    setIsExporting(true);
    try {
      await downloadCanvasAsImage('capture-canvas', null, format);
      showToast('🎉 Đã xuất và tải ảnh HD thành công!', 'success');
    } catch {
      showToast('Không thể xuất ảnh. Vui lòng thử lại!', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Sao chép trực tiếp vào Clipboard
  const handleCopyToClipboard = async () => {
    setIsExporting(true);
    try {
      await copyCanvasToClipboard('capture-canvas');
      showToast('📋 Đã sao chép ảnh vào Clipboard! Bạn có thể dán (Ctrl+V) vào Zalo, FB ngay.', 'success');
    } catch {
      showToast('Trình duyệt chưa cấp quyền sao chép ảnh. Hãy bấm Tải Ảnh!', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#2D3748]">
      {/* Header bar */}
      <Header
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        onMagicShuffle={handleMagicShuffle}
        onDownload={handleDownload}
        onCopyToClipboard={handleCopyToClipboard}
        isExporting={isExporting}
        zoomLevel={zoomLevel}
        onZoomIn={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
        onZoomOut={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
        onZoomReset={() => setZoomLevel(100)}
      />

      {/* Main Studio Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar điều khiển */}
        <Sidebar
          photos={photos}
          onUploadPhotos={handleUploadPhotos}
          onRemovePhoto={handleRemovePhoto}
          onSwapPhotos={handleSwapPhotos}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          quoteText={quoteText}
          setQuoteText={setQuoteText}
          authorText={authorText}
          setAuthorText={setAuthorText}
          quoteCategory={quoteCategory}
          setQuoteCategory={setQuoteCategory}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
          textColor={textColor}
          setTextColor={setTextColor}
          textAlign={textAlign}
          setTextAlign={setTextAlign}
          textBgBadge={textBgBadge}
          setTextBgBadge={setTextBgBadge}
          bgColor={bgColor}
          setBgColor={setBgColor}
          stickers={stickers}
          onAddSticker={handleAddSticker}
          onClearStickers={handleClearStickers}
          autoDecor={autoDecor}
          setAutoDecor={setAutoDecor}
          washiColor={washiColor}
          setWashiColor={setWashiColor}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sunbeamEffect={sunbeamEffect}
          setSunbeamEffect={setSunbeamEffect}
          microRotate={microRotate}
          setMicroRotate={setMicroRotate}
        />

        {/* Canvas Workspace */}
        <CanvasWorkspace
          photos={photos}
          activeTemplate={activeTemplate}
          quoteText={quoteText}
          setQuoteText={setQuoteText}
          authorText={authorText}
          setAuthorText={setAuthorText}
          fontFamily={fontFamily}
          fontSize={fontSize}
          textColor={textColor}
          textAlign={textAlign}
          bgColor={bgColor}
          aspectRatio={aspectRatio}
          stickers={stickers}
          onRemoveSticker={handleRemoveSticker}
          washiColor={washiColor}
          activeFilter={activeFilter}
          sunbeamEffect={sunbeamEffect}
          microRotate={microRotate}
          zoomLevel={zoomLevel}
        />
      </div>

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(prev => ({ ...prev, show: false }))} />
    </div>
  );
}
