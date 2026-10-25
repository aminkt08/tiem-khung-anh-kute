import React, { useState } from 'react';
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
  Plus, 
  Type
} from 'lucide-react';
import { TEMPLATES_DATA, FONT_OPTIONS, BACKGROUND_PALETTES } from '../data/templatesData';
import { QUOTE_CATEGORIES, getRandomQuote } from '../data/quotesData';
import { STICKER_ITEMS, WASHI_TAPE_COLORS } from '../data/stickersData';

export default function Sidebar({
  photos,
  onUploadPhotos,
  onRemovePhoto,
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
  bgColor,
  setBgColor,
  stickers,
  onAddSticker,
  onClearStickers,
  autoDecor,
  setAutoDecor,
  washiColor,
  setWashiColor
}) {
  const [activeTab, setActiveTab] = useState('templates');
  const [frameFilter, setFrameFilter] = useState('all');

  // Lọc danh sách khung
  const filteredTemplates = frameFilter === 'all'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter(t => t.category === frameFilter);

  return (
    <aside className="w-full lg:w-[380px] bg-white border-r border-slate-200/80 flex flex-col h-auto lg:h-[calc(100vh-65px)] shadow-sm">
      
      {/* Tab Navigation Icons */}
      <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1 overflow-x-auto text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex-1 min-w-[64px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'images' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Images className="w-4 h-4" />
          <span>Ảnh ({photos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 min-w-[64px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'templates' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <LayoutTemplate className="w-4 h-4" />
          <span>Khung</span>
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex-1 min-w-[64px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'quotes' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Quote className="w-4 h-4" />
          <span>Lời Chúc</span>
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex-1 min-w-[64px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'stickers' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>Sticker</span>
        </button>

        <button
          onClick={() => setActiveTab('background')}
          className={`flex-1 min-w-[64px] py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
            activeTab === 'background' ? 'bg-white text-rose-500 shadow-sm' : 'hover:bg-slate-200/50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Nền</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        {/* --- TAB 1: ẢNH (IMAGES) --- */}
        {activeTab === 'images' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Tải ảnh lên (Hỗ trợ 1 đến 6 ảnh)
              </label>

              <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50/70 transition-all rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer group text-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-rose-500 mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700">Kéo thả hoặc bấm để chọn ảnh</span>
                <span className="text-xs text-slate-400 mt-1">Hỗ trợ JPG, PNG, WEBP (Tối đa 6 ảnh)</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onUploadPhotos}
                  className="hidden"
                />
              </label>
            </div>

            {/* Danh sách ảnh đã tải */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Ảnh đã chọn ({photos.length}/6)</span>
                {photos.length > 0 && (
                  <span className="text-xs text-rose-500 font-semibold">Tự động chọn bố cục đẹp nhất</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {photos.map((photo, index) => (
                  <div key={photo.id || index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={photo.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => onRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      title="Xóa ảnh này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: KHUNG ẢNH (TEMPLATES) --- */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            {/* Lọc danh mục khung */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', name: 'Tất cả' },
                { id: 'popup', name: 'Pop-up Canva' },
                { id: 'canva', name: 'Khung Lồng' },
                { id: 'korean', name: 'Hàn Quốc' },
                { id: 'polaroid', name: 'Polaroid' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFrameFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    frameFilter === cat.id
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Grid danh sách khung */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveTemplate(t.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeTemplate === t.id
                      ? 'border-rose-500 bg-rose-50/50 shadow-md shadow-rose-100 scale-[1.02]'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{t.name.split(' ')[0]}</div>
                  <div className="font-bold text-xs text-slate-800 leading-tight">{t.name.replace(/^.+?\s/, '')}</div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: CÂU NÓI & THƠ (QUOTES) --- */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {/* Chủ đề */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chủ đề câu nói</label>
                <button
                  onClick={() => {
                    const q = getRandomQuote(quoteCategory);
                    setQuoteText(q.text);
                    setAuthorText(q.author);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Đổi ngẫu nhiên
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {QUOTE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setQuoteCategory(cat.id);
                      const q = getRandomQuote(cat.id);
                      setQuoteText(q.text);
                      setAuthorText(q.author);
                    }}
                    className={`p-2 rounded-xl text-xs font-bold text-left transition-all ${
                      quoteCategory === cat.id
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Nội dung câu nói */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Nội dung (Có thể sửa trực tiếp trên ảnh)
              </label>
              <textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                rows={3}
                className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 resize-none"
                placeholder="Nhập câu nói hoặc bài thơ ngọt ngào..."
              />
            </div>

            {/* Tác giả / Lời gửi */}
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

            {/* Chọn Font chữ */}
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

            {/* Cỡ chữ & Màu chữ */}
            <div className="grid grid-cols-2 gap-3 items-center">
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
          </div>
        )}

        {/* --- TAB 4: STICKERS & DECOR --- */}
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

            {/* Băng dính Washi Tape Color */}
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
                💡 Bạn có thể dùng chuột kéo thả trực tiếp sticker trên khung ảnh để đổi vị trí.
              </p>
            </div>
          </div>
        )}

        {/* --- TAB 5: MÀU NỀN (BACKGROUND) --- */}
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
          </div>
        )}

      </div>
    </aside>
  );
}
