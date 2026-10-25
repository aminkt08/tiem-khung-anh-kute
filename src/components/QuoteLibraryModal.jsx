import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Shuffle, 
  BookOpen, 
  Smile, 
  Flame, 
  Heart,
  Quote
} from 'lucide-react';
import { QUOTE_CATEGORIES, QUOTES_DATA, searchQuotes } from '../data/quotesData';

export default function QuoteLibraryModal({ 
  isOpen, 
  onClose, 
  onSelectQuote, 
  currentText = '',
  showToast 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'poetry' | 'quote'
  const [copiedId, setCopiedId] = useState(null);

  // Lọc danh sách câu nói
  const filteredQuotes = useMemo(() => {
    return searchQuotes(searchTerm, selectedCategory, selectedType);
  }, [searchTerm, selectedCategory, selectedType]);

  // Sao chép nội dung vào Clipboard
  const handleCopy = (quote, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(quote.text).then(() => {
      setCopiedId(quote.id);
      if (showToast) showToast('Đã sao chép câu nói vào bộ nhớ tạm! 📋', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Chọn ngẫu nhiên 1 câu từ danh sách đang lọc
  const handlePickRandom = () => {
    if (!filteredQuotes.length) return;
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    onSelectQuote(quote);
    if (showToast) showToast(`Đã áp dụng: "${quote.text.slice(0, 30)}..." ✨`, 'success');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop mờ phủ kín màn hình */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          {/* Header Modal */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50/40 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                  Kho Thơ Ngắn & Câu Nói Bắt Trend
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-200">
                    {QUOTES_DATA.length}+ câu
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Bấm vào bất kỳ câu nào để áp dụng trực tiếp lên khung ảnh nghệ thuật
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePickRandom}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all shadow-sm active:scale-95"
                title="Chọn ngẫu nhiên 1 câu trong danh sách lọc"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Ngẫu nhiên
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thanh công cụ: Tìm kiếm & Lọc Thể loại */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
            {/* Thanh Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm câu nói, thơ theo từ khóa (vd: trà sữa, xinh, tiền, hoa, cười, genz, thả thính)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 outline-none transition-all shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills: Thể loại */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {QUOTE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Sub-filter: Loại nội dung (Tất cả / Thơ / Caption) */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedType === 'all' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Tất cả ({QUOTES_DATA.length})
                </button>
                <button
                  onClick={() => setSelectedType('poetry')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedType === 'poetry' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  📜 Bài thơ ngắn
                </button>
                <button
                  onClick={() => setSelectedType('quote')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedType === 'quote' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  💬 Câu nói / Caption
                </button>
              </div>

              <div className="hidden sm:block font-medium">
                Tìm thấy <span className="font-bold text-rose-600">{filteredQuotes.length}</span> câu phù hợp
              </div>
            </div>
          </div>

          {/* Danh sách Câu nói / Thơ hiển thị dạng thẻ Grid */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {filteredQuotes.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center text-2xl mb-3">
                  🔍
                </div>
                <h4 className="text-sm font-bold text-slate-700">Không tìm thấy câu nói phù hợp</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Thử tìm kiếm từ khóa khác như "tiền", "xinh", "trà sữa", "thơ" hoặc chọn lại danh mục "Tất cả".
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedType('all');
                  }}
                  className="mt-4 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredQuotes.map((q) => {
                  const isCurrent = currentText.trim() === q.text.trim();

                  return (
                    <motion.div
                      key={q.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group relative p-4 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                        isCurrent
                          ? 'bg-rose-50/70 border-rose-500 shadow-md shadow-rose-100 ring-2 ring-rose-200'
                          : 'bg-white border-slate-200/80 hover:border-rose-300 hover:shadow-md'
                      }`}
                      onClick={() => {
                        onSelectQuote(q);
                        if (showToast) showToast(`Đã áp dụng câu nói lên khung ảnh! ✨`, 'success');
                      }}
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          q.type === 'poetry'
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {q.type === 'poetry' ? '📜 Thơ ngắn' : '💬 Caption'}
                        </span>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={(e) => handleCopy(q, e)}
                            className="p-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-all text-xs"
                            title="Sao chép câu này"
                          >
                            {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Main Quote / Poetry Content */}
                      <div className="flex-1 my-1">
                        <p className={`text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-line ${
                          q.type === 'poetry' ? 'italic font-serif' : ''
                        }`}>
                          {q.text}
                        </p>
                      </div>

                      {/* Bottom Footer of Card */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          {q.author}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectQuote(q);
                            if (showToast) showToast(`Đã áp dụng câu nói lên khung ảnh! ✨`, 'success');
                          }}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                            isCurrent
                              ? 'bg-rose-500 text-white'
                              : 'bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white'
                          }`}
                        >
                          {isCurrent ? (
                            <>
                              <Check className="w-3 h-3" />
                              Đang dùng
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              Dùng câu này
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Modal */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Quote className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Mẹo: Bạn cũng có thể nhấp trực tiếp vào chữ trên khung ảnh để chỉnh sửa theo ý thích!</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all text-xs w-full sm:w-auto"
            >
              Đóng thư viện
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
