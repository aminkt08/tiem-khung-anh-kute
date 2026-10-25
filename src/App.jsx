import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CanvasWorkspace from './components/CanvasWorkspace';
import { TEMPLATES_DATA, BACKGROUND_PALETTES } from './data/templatesData';
import { getRandomQuote } from './data/quotesData';
import { WASHI_TAPE_COLORS, STICKER_ITEMS } from './data/stickersData';
import { createSamplePhoto } from './data/samplePhotos';
import { downloadCanvasAsImage } from './utils/exportImage';

// Ảnh mẫu nội bộ dạng Data URL: Không phụ thuộc mạng ngoài, 100% không bị lỗi CORS khi xuất ảnh
const SAMPLE_PHOTO = createSamplePhoto(['#FCE7F3', '#FED7AA', '#E0E7FF'], '🌸', 'Khoảnh Khắc Xinh Đẹp ✨');
const SAMPLE_PHOTO_2 = createSamplePhoto(['#E0F2FE', '#EDE9FE', '#FCE7F3'], '🌿', 'An Nhiên & Dịu Dàng 🍃');

export default function App() {
  // Trạng thái ảnh (hỗ trợ tối đa 6 ảnh)
  const [photos, setPhotos] = useState([
    { id: 'sample_1', url: SAMPLE_PHOTO, name: 'Sample 1' },
    { id: 'sample_2', url: SAMPLE_PHOTO_2, name: 'Sample 2' }
  ]);

  // Trạng thái khung ảnh & tỉ lệ
  const [activeTemplate, setActiveTemplate] = useState('canva_blur');
  const [aspectRatio, setAspectRatio] = useState('4:5');
  const [bgColor, setBgColor] = useState('#FAF8F5');
  const [washiColor, setWashiColor] = useState('rgba(254, 205, 211, 0.85)');

  // Trạng thái câu nói & kiểu chữ
  const initialQuote = getRandomQuote('healing');
  const [quoteCategory, setQuoteCategory] = useState('healing');
  const [quoteText, setQuoteText] = useState(initialQuote.text);
  const [authorText, setAuthorText] = useState(initialQuote.author);
  const [fontFamily, setFontFamily] = useState('font-quicksand');
  const [fontSize, setFontSize] = useState(26);
  const [textColor, setTextColor] = useState('#2D3748');

  // Trạng thái Sticker & Decor
  const [autoDecor, setAutoDecor] = useState(true);
  const [stickers, setStickers] = useState([
    { id: 'stk_1', emoji: '✨', x: 82, y: 8 },
    { id: 'stk_2', emoji: '🤍', x: 8, y: 86 }
  ]);

  const [isExporting, setIsExporting] = useState(false);

  // Xử lý upload ảnh (1 đến 6 ảnh) + Auto Layout thông minh
  const handleUploadPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPhotos = files.slice(0, 6).map((file, i) => ({
      id: `photo_${Date.now()}_${i}`,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPhotos(newPhotos);

    // Tự động thông minh: Dựa vào số lượng ảnh để chọn layout vừa vặn nhất
    if (newPhotos.length === 1) {
      setActiveTemplate('canva_blur');
    } else if (newPhotos.length === 2) {
      setActiveTemplate('polaroid_duo');
    } else if (newPhotos.length >= 3 && newPhotos.length <= 4) {
      setActiveTemplate('korean_life4cuts');
    } else {
      setActiveTemplate('grid_bento');
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Nút "Đổi phong cách ngẫu nhiên" (Magic Shuffle)
  const handleMagicShuffle = () => {
    // 1. Random Template
    const randomTemplate = TEMPLATES_DATA[Math.floor(Math.random() * TEMPLATES_DATA.length)];
    setActiveTemplate(randomTemplate.id);

    // 2. Random Quote
    const randomQuote = getRandomQuote();
    setQuoteText(randomQuote.text);
    setAuthorText(randomQuote.author);

    // 3. Random Background Color
    const randomBg = BACKGROUND_PALETTES[Math.floor(Math.random() * BACKGROUND_PALETTES.length)];
    setBgColor(randomBg.color);

    // 4. Random Washi Tape
    const randomWashi = WASHI_TAPE_COLORS[Math.floor(Math.random() * WASHI_TAPE_COLORS.length)];
    setWashiColor(randomWashi.color);

    // 5. Random Stickers nếu bật autoDecor
    if (autoDecor) {
      const randomItems = [...STICKER_ITEMS].sort(() => 0.5 - Math.random()).slice(0, 2);
      setStickers([
        { id: `s_${Date.now()}_1`, emoji: randomItems[0].emoji, x: Math.floor(Math.random() * 20) + 75, y: Math.floor(Math.random() * 15) + 6 },
        { id: `s_${Date.now()}_2`, emoji: randomItems[1].emoji, x: Math.floor(Math.random() * 20) + 6, y: Math.floor(Math.random() * 15) + 78 }
      ]);
    }
  };

  // Thêm sticker
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
  };

  const handleRemoveSticker = (id) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  const handleClearStickers = () => {
    setStickers([]);
  };

  // Tải ảnh về máy
  const handleDownload = async () => {
    setIsExporting(true);
    await downloadCanvasAsImage('capture-canvas');
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#2D3748]">
      {/* Header bar */}
      <Header
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        onMagicShuffle={handleMagicShuffle}
        onDownload={handleDownload}
        isExporting={isExporting}
      />

      {/* Main Studio Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar điều khiển */}
        <Sidebar
          photos={photos}
          onUploadPhotos={handleUploadPhotos}
          onRemovePhoto={handleRemovePhoto}
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
          bgColor={bgColor}
          setBgColor={setBgColor}
          stickers={stickers}
          onAddSticker={handleAddSticker}
          onClearStickers={handleClearStickers}
          autoDecor={autoDecor}
          setAutoDecor={setAutoDecor}
          washiColor={washiColor}
          setWashiColor={setWashiColor}
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
          bgColor={bgColor}
          aspectRatio={aspectRatio}
          stickers={stickers}
          onRemoveSticker={handleRemoveSticker}
          washiColor={washiColor}
          autoDecor={autoDecor}
        />
      </div>
    </div>
  );
}
