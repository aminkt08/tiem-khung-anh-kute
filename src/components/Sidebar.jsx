import React, { useState, useMemo } from 'react';
import { 
  Images, 
  LayoutTemplate, 
  Quote, 
  Smile, 
  Palette, 
  Upload, 
  Trash2, 
  Sparkles, 
  Shuffle, 
  RotateCw, 
  CheckCircle2, 
  Sliders, 
  Sun, 
  Contrast, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Layers, 
  ArrowLeftRight,
  BookOpen,
  Search,
  Check,
  X,
  FileText
} from 'lucide-react';
import { TEMPLATES_DATA, FRAME_CATEGORIES, FONT_OPTIONS, BACKGROUND_PALETTES } from '../data/templatesData';
import { QUOTE_CATEGORIES, QUOTES_DATA, getRandomQuote, searchQuotes } from '../data/quotesData';
import { STICKER_ITEMS, WASHI_TAPE_COLORS } from '../data/stickersData';
import QuoteLibraryModal from './QuoteLibraryModal';

export default function Sidebar({
  photos,
  onUploadPhotos,
  onRemovePhoto,
  onRotatePhoto,
  onSwapPhotos,
  activeTemplate,
  setActiveTemplate,
  quoteText,
  setQuoteText,
  authorText,
  setAuthorText,
  quoteCategory,
  setQuoteCategory,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  textAlign,
  setTextAlign,
  textBgBadge,
  setTextBgBadge,
  bgColor,
  setBgColor,
  stickers,
  onAddSticker,
  onClearStickers,
  autoDecor,
  setAutoDecor,
  washiColor,
  setWashiColor,
  activeFilter,
  setActiveFilter,
  sunbeamEffect,
  setSunbeamEffect,
  microRotate,
  setMicroRotate,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('templates');
  const [frameFilter, setFrameFilter] = useState('all');

  // Modal và bộ lọc kho câu nói
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSearchTerm, setQuoteSearchTerm] = useState('');
  const [quoteTypeFilter, setQuoteTypeFilter] = useState('all'); // 'all' | 'poetry' | 'quote'

  // Danh sách preview câu nói nhanh trong sidebar
  const quickQuotes = useMemo(() => {
    let list = searchQuotes(quoteSearchTerm, quoteCategory, quoteTypeFilter);
    return list.slice(0, 5);
  }, [quoteSearchTerm, quoteCategory, quoteTypeFilter]);

  // Lọc danh sách khung
  const filteredTemplates = TEMPLATES_DATA.filter(t => {
    if (frameFilter === 'all') return true;
    if (frameFilter === 'recommended') {
      return t.recommendedCounts && t.recommendedCounts.includes(photos.length);
    }
    return t.category === frameFilter;
  });

  // Bộ lọc màu ảnh nghệ thuật
  const PHOTO_FILTERS = [
    { id: 'none', name: 'Gốc', filter: 'none' },
    { id: 'bright', name: 'Trong trẻo', filter: 'brightness(1.08) contrast(1.04) saturate(1.18)' },
    { id: 'warm', name: 'Ấm áp', filter: 'sepia(0.24) contrast(1.06) brightness(1.02) saturate(1.1)' },
    { id: 'dreamy', name: 'Mộng mơ', filter: 'brightness(1.05) contrast(1.02) saturate(1.18) hue-rotate(-8deg)' },
    { id: 'film', name: 'Phim Cổ', filter: 'sepia(0.32) contrast(1.14) brightness(0.96) saturate(0.92)' },
    { id: 'bw', name: 'Trắng đen', filter: 'grayscale(1) contrast(1.18) brightness(1.02)' }
  ];

  return (
    <aside className="w-full lg:w-[390px] bg-white border-r border-slate-200/80 flex flex-col h-auto lg:h-[calc(100vh-61px)] shadow-sm">
      
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1 overflow-x-auto text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex-1 min-w-[62px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'images' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Images className="w-4 h-4" />
          <span>Ảnh ({photos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 min-w-[62px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'templates' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <LayoutTemplate className="w-4 h-4" />
          <span>Khung</span>
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex-1 min-w-[62px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'quotes' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Quote className="w-4 h-4" />
          <span>Chữ & Thơ</span>
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex-1 min-w-[62px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'stickers' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>Sticker</span>
        </button>

        <button
          onClick={() => setActiveTab('background')}
          className={`flex-1 min-w-[62px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'background' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Nền & Hiệu Ứng</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        {/* ============================================================ */}
        {/* TAB 1: ẢNH & BỘ LỌC NGHỆ THUẬT (IMAGES & PHOTO FILTERS)      */}
        {/* ============================================================ */}
        {activeTab === 'images' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Tải ảnh lên (Hỗ trợ 1 đến 6 ảnh)
              </label>

              <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50/70 transition-all rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer group text-center">
                <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-rose-500 mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700">Kéo thả hoặc bấm để chọn ảnh</span>
                <span className="text-xs text-slate-400 mt-1">Tối đa 6 ảnh cùng lúc</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onUploadPhotos}
                  className="hidden"
                />
              </label>
            </div>

            {/* Bộ lọc màu ảnh nghệ thuật (Photo Filters) */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Bộ lọc màu ảnh (6 Presets)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {PHOTO_FILTERS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.filter)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all ${
                      activeFilter === f.filter
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Danh sách ảnh đã tải kèm tính năng Xoay & Hoán đổi vị trí */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Ảnh trong khung ({photos.length}/6)</span>
                {photos.length > 1 && (
                  <span className="text-[11px] text-slate-400 font-medium">Bấm mũi tên để đổi vị trí</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {photos.map((photo, index) => (
                  <div key={photo.id || index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <img 
                      src={photo.url} 
                      alt={`Upload ${index + 1}`} 
                      style={{ filter: activeFilter || 'none' }}
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Action buttons over photo thumbnail */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                      {photos.length > 1 && index > 0 && (
                        <button
                          onClick={() => onSwapPhotos(index, index - 1)}
                          className="bg-white/90 hover:bg-white text-slate-800 p-1 rounded-md"
                          title="Chuyển sang trước"
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={() => onRemovePhoto(index)}
                        className="bg-rose-500 hover:bg-rose-600 text-white p-1 rounded-md"
                        title="Xóa ảnh này"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Thông báo thuật toán chia lưới */}
            <div className="p-3 bg-emerald-50 border border-emerald-200/70 rounded-2xl flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div className="text-xs text-emerald-800 leading-relaxed">
                <span className="font-bold">Thuật toán phân bố:</span> Các bức ảnh luôn được phân chia diện tích đối xứng hoặc song song, <span className="font-semibold underline">tuyệt đối không bị đè che mất mặt hay chủ thể</span>!
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: KHUNG ẢNH & HIỆU ỨNG POP-UP (TEMPLATES)               */}
        {/* ============================================================ */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            {/* Lọc danh mục khung (4 nhóm chính: Tối giản, Retro, Tech UI, Collage & Hàn Quốc) */}
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 text-xs scrollbar-thin">
              {FRAME_CATEGORIES.map(cat => {
                const isSelected = frameFilter === cat.id;
                const isSpecial = cat.isSpecial;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setFrameFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                      isSelected
                        ? (isSpecial ? 'bg-amber-500 text-white shadow-sm' : 'bg-rose-500 text-white shadow-sm')
                        : (isSpecial ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                    }`}
                  >
                    {isSpecial && <Sparkles className="w-3.5 h-3.5" />}
                    <span>{cat.id === 'recommended' ? `⭐ Tối ưu cho ${photos.length} ảnh` : cat.name}</span>
                    {cat.id === 'all' && (
                      <span className="text-[10px] opacity-75">({TEMPLATES_DATA.length})</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grid danh sách khung */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTemplates.map((t) => {
                const isRecommended = t.recommendedCounts && t.recommendedCounts.includes(photos.length);

                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveTemplate(t.id)}
                    className={`relative p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      activeTemplate === t.id
                        ? 'border-rose-500 bg-rose-50/50 shadow-md shadow-rose-100 scale-[1.02]'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {isRecommended && (
                      <span className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-amber-300/60">
                        ⭐ Tối ưu {photos.length} ảnh
                      </span>
                    )}

                    <div className="text-2xl mb-1.5">{t.name.split(' ')[0]}</div>
                    <div className="font-bold text-xs text-slate-800 leading-tight">{t.name.replace(/^.+?\s/, '')}</div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Tùy chỉnh hiệu ứng xoay nghiêng tự nhiên */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <div className="text-xs font-bold text-slate-800">Xoay nghiêng tự nhiên (Micro-rotation)</div>
                  <div className="text-[11px] text-slate-500">Tạo cảm giác ảnh thật dán trên bàn làm việc</div>
                </div>
                <input
                  type="checkbox"
                  checked={microRotate}
                  onChange={(e) => setMicroRotate(e.target.checked)}
                  className="w-4 h-4 accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: CÂU NÓI & TYPOGRAPHY CHUYÊN NGHIỆP                    */}
        {/* ============================================================ */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {/* Nút to mở Kho câu nói & thơ */}
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-rose-200 flex items-center justify-between transition-all hover:scale-[1.01] active:scale-98 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-extrabold text-xs">Mở Kho Thơ & Câu Nói Bắt Trend</div>
                  <div className="text-[10px] text-rose-100 font-normal">Hơn 80+ câu hài hước, thả thính, chữa lành</div>
                </div>
              </div>
              <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {QUOTES_DATA.length}+ câu
              </span>
            </button>

            {/* Chủ đề câu nói & Nút đổi ngẫu nhiên */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Chủ đề ({QUOTE_CATEGORIES.length})
                </label>
                <button
                  onClick={() => {
                    const q = getRandomQuote(quoteCategory, quoteTypeFilter);
                    setQuoteText(q.text);
                    setAuthorText(q.author);
                    if (showToast) showToast(`Đã đổi câu ngẫu nhiên: "${q.author}" ✨`, 'info');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600"
                  title="Đổi câu nói ngẫu nhiên trong chủ đề đang chọn"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Đổi ngẫu nhiên
                </button>
              </div>

              {/* Grid các danh mục */}
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-0.5 scrollbar-thin">
                {QUOTE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setQuoteCategory(cat.id);
                      const q = getRandomQuote(cat.id, quoteTypeFilter);
                      setQuoteText(q.text);
                      setAuthorText(q.author);
                    }}
                    className={`p-2 rounded-xl text-xs font-bold text-left transition-all truncate flex items-center gap-1.5 ${
                      quoteCategory === cat.id
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lọc loại nội dung (Tất cả / Thơ ngắn / Caption) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setQuoteTypeFilter('all')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  quoteTypeFilter === 'all' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setQuoteTypeFilter('poetry')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  quoteTypeFilter === 'poetry' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                📜 Thơ ngắn
              </button>
              <button
                onClick={() => setQuoteTypeFilter('quote')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  quoteTypeFilter === 'quote' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                💬 Caption
              </button>
            </div>

            {/* Danh sách chọn nhanh (Quick Pick Cards) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-500">Gợi ý chọn nhanh (Bấm để dùng)</span>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="text-[11px] font-bold text-rose-500 hover:underline"
                >
                  Xem thêm...
                </button>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5 scrollbar-thin">
                {quickQuotes.map((q) => {
                  const isCurrent = quoteText.trim() === q.text.trim();
                  return (
                    <div
                      key={q.id}
                      onClick={() => {
                        setQuoteText(q.text);
                        setAuthorText(q.author);
                        if (showToast) showToast('Đã chọn: ' + q.author, 'success');
                      }}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-rose-500 bg-rose-50/70 shadow-xs font-semibold'
                          : 'border-slate-200/80 bg-white hover:border-rose-300 hover:bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                          q.type === 'poetry' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {q.type === 'poetry' ? '📜 Thơ' : '💬 Caption'}
                        </span>
                        {isCurrent && (
                          <span className="text-rose-600 font-bold text-[10px] flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Đang dùng
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 text-slate-700 leading-snug whitespace-pre-line text-[11px]">
                        {q.text}
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1 font-medium">{q.author}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Textarea chỉnh sửa nội dung trực tiếp */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Nội dung tùy chỉnh (Hoặc nhấp trên ảnh để gõ)
              </label>
              <textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                rows={3}
                className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 resize-none"
                placeholder="Nhập câu nói hoặc bài thơ ngọt ngào..."
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Chữ ký / Lời gửi
              </label>
              <input
                type="text"
                value={authorText}
                onChange={(e) => setAuthorText(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400"
                placeholder="Ví dụ: Năng lượng tích cực ✨"
              />
            </div>

            {/* Chọn Kiểu Chữ Nghệ Thuật */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Kiểu chữ nghệ thuật
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-rose-400"
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f.id} value={f.fontClass}>{f.name}</option>
                ))}
              </select>
            </div>

            {/* Căn lề & Bật Thẻ Kính Mờ Đọc Rõ Chữ */}
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Căn lề chữ</label>
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setTextAlign('left')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${
                      textAlign === 'left' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setTextAlign('center')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${
                      textAlign === 'center' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setTextAlign('right')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${
                      textAlign === 'right' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Màu chữ</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                  />
                  <span className="text-xs font-mono text-slate-600">{textColor}</span>
                </div>
              </div>
            </div>

            {/* Cỡ chữ */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Cỡ chữ</span>
                <span>{fontSize}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="44"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: STICKERS & TRANG TRÍ (DECOR)                          */}
        {/* ============================================================ */}
        {activeTab === 'stickers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/60 border border-rose-100">
              <div>
                <div className="text-xs font-bold text-rose-900">Tự động gắn sticker tinh tế</div>
                <div className="text-[11px] text-rose-600">Đính 2-3 họa tiết ở các góc khung ảnh</div>
              </div>
              <input
                type="checkbox"
                checked={autoDecor}
                onChange={(e) => setAutoDecor(e.target.checked)}
                className="w-4 h-4 accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Màu băng dính Washi Tape */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Màu băng dính Washi Tape
              </label>
              <div className="flex gap-2">
                {WASHI_TAPE_COLORS.map(w => (
                  <button
                    key={w.id}
                    onClick={() => setWashiColor(w.color)}
                    style={{ backgroundColor: w.color }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      washiColor === w.color ? 'border-slate-800 scale-110 shadow-sm' : 'border-transparent'
                    }`}
                    title={w.name}
                  />
                ))}
              </div>
            </div>

            {/* Bảng Sticker Palette */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Bấm để thêm sticker lên ảnh
                </label>
                {stickers.length > 0 && (
                  <button
                    onClick={onClearStickers}
                    className="text-xs text-rose-500 font-bold hover:underline"
                  >
                    Xóa hết ({stickers.length})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                {STICKER_ITEMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onAddSticker(s.emoji)}
                    className="text-2xl p-2 rounded-xl bg-white hover:bg-rose-50 hover:scale-125 transition-all shadow-sm border border-slate-200/50 flex items-center justify-center"
                    title={s.name}
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 italic">
                💡 Dùng chuột kéo thả trực tiếp sticker trên khung ảnh để đổi vị trí.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: MÀU NỀN & HIỆU ỨNG (BACKGROUND & EFFECTS)            */}
        {/* ============================================================ */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Bảng màu Pastel dịu mát
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BACKGROUND_PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setBgColor(p.color)}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                      bgColor === p.color ? 'border-rose-500 shadow-md scale-105' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: p.color }}
                  >
                    <span className="w-5 h-5 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: p.color }} />
                    <span className="text-[11px] font-bold text-slate-700">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Tùy chọn màu tùy ý
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono font-bold text-slate-700">{bgColor}</span>
              </div>
            </div>

            {/* Hiệu ứng Vệt Nắng Chiều (Sunbeam Light Leak) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                <div>
                  <div className="text-xs font-bold text-amber-900">Vệt nắng chiều ấm áp (Sunbeam)</div>
                  <div className="text-[11px] text-amber-700">Ánh nắng xiên nhẹ nhàng tạo chiều sâu</div>
                </div>
                <input
                  type="checkbox"
                  checked={sunbeamEffect}
                  onChange={(e) => setSunbeamEffect(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal Thư Viện Kho Câu Nói & Thơ Ngắn */}
      <QuoteLibraryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSelectQuote={(q) => {
          setQuoteText(q.text);
          setAuthorText(q.author);
          setQuoteCategory(q.category);
          setIsQuoteModalOpen(false);
        }}
        currentText={quoteText}
        showToast={showToast}
      />
    </aside>
  );
}
