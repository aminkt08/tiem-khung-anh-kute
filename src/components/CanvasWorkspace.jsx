import React from 'react';
import { motion } from 'framer-motion';
import { Play, SkipBack, SkipForward, Heart, Music, MessageCircle, X } from 'lucide-react';

export default function CanvasWorkspace({
  photos,
  activeTemplate,
  quoteText,
  setQuoteText,
  authorText,
  setAuthorText,
  fontFamily,
  fontSize,
  textColor,
  bgColor,
  aspectRatio,
  stickers,
  onUpdateStickerPos,
  onRemoveSticker,
  washiColor,
  autoDecor
}) {
  // Tìm kích thước tỉ lệ
  const ratioStyles = {
    '1:1': 'aspect-square max-w-[560px]',
    '4:5': 'aspect-[4/5] max-w-[500px]',
    '9:16': 'aspect-[9/16] max-w-[420px]',
    '16:9': 'aspect-[16/9] max-w-[650px]'
  };

  const currentRatioClass = ratioStyles[aspectRatio] || ratioStyles['4:5'];

  return (
    <main className="flex-1 min-h-[500px] lg:h-[calc(100vh-65px)] overflow-y-auto bg-slate-100/70 bg-dot-grid flex items-center justify-center p-4 lg:p-8">
      
      {/* Khung chụp Render (Toàn bộ phần này sẽ được xuất ra ảnh HD) */}
      <motion.div
        layout
        id="capture-canvas"
        style={{ backgroundColor: bgColor }}
        className={`w-full ${currentRatioClass} relative rounded-[28px] shadow-soft-3d p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-300 select-none`}
      >

        {/* --- NỘI DUNG TỪNG TEMPLATE KHUNG ẢNH --- */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          
          {/* 1. MẪU CANVA BLUR (KHUNG LỒNG NỀN MỜ) */}
          {activeTemplate === 'canva_blur' && (
            <div className="relative w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden">
              {/* Nền mờ phía sau */}
              {photos[0] && (
                <div 
                  className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-125 opacity-75"
                  style={{ backgroundImage: `url(${photos[0].url})` }}
                />
              )}
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

              {/* Tấm ảnh chính lồng ở giữa */}
              <div className="relative z-10 flex-1 flex items-center justify-center p-3">
                <div className="w-[85%] h-[82%] rounded-2xl overflow-hidden bg-white p-2.5 shadow-popup-deep transform hover:scale-[1.01] transition-transform">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                    {photos[0] ? (
                      <img src={photos[0].url} alt="Main" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa có ảnh</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thẻ chữ kính mờ Pop-up đè góc dưới */}
              <div className="relative z-20 px-4 pb-2">
                <div className="glass-card rounded-2xl p-4 shadow-glass text-center border border-white/80">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none`}
                    style={{ fontSize: `${fontSize * 0.9}px`, color: textColor }}
                  >
                    {quoteText}
                  </p>
                  {authorText && (
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setAuthorText(e.target.innerText)}
                      className="block text-xs font-semibold text-slate-500 mt-1 cursor-text focus:outline-none"
                    >
                      — {authorText} —
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. MẪU TRÌNH PHÁT NHẠC (MUSIC PLAYER WIDGET POP-UP) */}
          {activeTemplate === 'music_player' && (
            <div className="relative w-full h-full flex flex-col justify-between">
              {/* Ảnh chính */}
              <div className="flex-1 w-full rounded-2xl overflow-hidden bg-white p-2.5 shadow-polaroid">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                  {photos[0] ? (
                    <img src={photos[0].url} alt="Music" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa có ảnh</div>
                  )}
                </div>
              </div>

              {/* Widget phát nhạc Spotify/Apple Music kính mờ */}
              <div className="relative -mt-16 z-20 px-2 pb-1">
                <div className="glass-card rounded-2xl p-4 shadow-popup-deep border border-white/90">
                  {/* Header widget */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-sm">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-800 leading-tight">Giai điệu an yên</div>
                        <div className="text-[10px] font-semibold text-slate-400">{authorText || 'Lời gửi trao'}</div>
                      </div>
                    </div>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>

                  {/* Lời trích dẫn bài thơ */}
                  <div className="text-center my-2.5">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none`}
                      style={{ fontSize: `${fontSize * 0.85}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                  </div>

                  {/* Thanh thời lượng */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div className="w-[65%] h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                      <span>1:28</span>
                      <span>3:45</span>
                    </div>
                  </div>

                  {/* Nút điều khiển */}
                  <div className="flex items-center justify-center gap-6 mt-1 text-slate-600">
                    <SkipBack className="w-4 h-4 cursor-pointer hover:text-slate-900" />
                    <button className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200 hover:scale-105 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </button>
                    <SkipForward className="w-4 h-4 cursor-pointer hover:text-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MẪU POLAROID CLASSIC & WASHI TAPE */}
          {activeTemplate === 'polaroid_single' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 shadow-polaroid rotate-[-1.2deg] transition-transform hover:rotate-0">
              {/* Kẹp giấy kim loại mạ vàng ở góc trên trái */}
              <div className="absolute -top-3 left-6 z-30 w-6 h-14 border-4 border-amber-400 rounded-full shadow-md" style={{ borderColor: '#D4AF37' }} />
              
              {/* Miếng băng dính washi pastel ở góc trên phải */}
              <div 
                className="absolute -top-3 right-5 z-20 w-24 h-7 rotate-6 shadow-sm"
                style={{ backgroundColor: washiColor }}
              />

              {/* Khung ảnh */}
              <div className="w-full flex-1 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                {photos[0] ? (
                  <img src={photos[0].url} alt="Polaroid" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa có ảnh</div>
                )}
              </div>

              {/* Khoảng đáy Polaroid viết chữ */}
              <div className="pt-4 pb-2 text-center">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setQuoteText(e.target.innerText)}
                  className={`${fontFamily} font-bold leading-relaxed cursor-text focus:outline-none`}
                  style={{ fontSize: `${fontSize}px`, color: textColor }}
                >
                  {quoteText}
                </p>
                {authorText && (
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setAuthorText(e.target.innerText)}
                    className="block text-xs font-semibold text-slate-400 mt-1 cursor-text focus:outline-none italic"
                  >
                    — {authorText} —
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 4. MẪU POLAROID DUO (2 ẢNH XẾP LỒNG NGHIÊNG) */}
          {activeTemplate === 'polaroid_duo' && (
            <div className="relative w-full h-full flex flex-col justify-between">
              <div className="relative flex-1 w-full flex items-center justify-center">
                {/* Ảnh sau: Nghiêng -4deg */}
                <div className="absolute w-[68%] aspect-[4/5] bg-white p-3 rounded-2xl shadow-polaroid -rotate-6 transform -translate-x-6 -translate-y-2">
                  <div className="w-full h-[80%] rounded-xl overflow-hidden bg-slate-100">
                    <img src={photos[1]?.url || photos[0]?.url} alt="Duo 1" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Ảnh trước: Nghiêng +3deg */}
                <div className="relative z-10 w-[72%] aspect-[4/5] bg-white p-3.5 rounded-2xl shadow-popup-deep rotate-3 transform translate-x-4 translate-y-3">
                  <div className="w-full h-[80%] rounded-xl overflow-hidden bg-slate-100">
                    <img src={photos[0]?.url} alt="Duo 2" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Băng dính kẹp giữa */}
                <div 
                  className="absolute top-2 z-20 w-24 h-7 -rotate-3 shadow-sm"
                  style={{ backgroundColor: washiColor }}
                />
              </div>

              {/* Lời chúc ở chân */}
              <div className="text-center pt-3 pb-1">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setQuoteText(e.target.innerText)}
                  className={`${fontFamily} font-bold cursor-text focus:outline-none`}
                  style={{ fontSize: `${fontSize * 0.9}px`, color: textColor }}
                >
                  {quoteText}
                </p>
                {authorText && (
                  <span className="block text-xs text-slate-400 mt-0.5 italic">— {authorText} —</span>
                )}
              </div>
            </div>
          )}

          {/* 5. MẪU HÀN QUỐC BƠ SỮA (LIFE4CUTS PHOTOBOOTH) */}
          {activeTemplate === 'korean_life4cuts' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#FFF8E7] rounded-3xl p-5 shadow-polaroid border-4 border-[#FFEABA]">
              {/* Grid 1 đến 4 ảnh phong cách photobooth */}
              <div className={`flex-1 grid gap-2.5 ${photos.length >= 4 ? 'grid-cols-2 grid-rows-2' : photos.length === 2 ? 'grid-rows-2' : 'grid-cols-1'}`}>
                {(photos.slice(0, 4).length > 0 ? photos.slice(0, 4) : [{ url: '' }]).map((p, idx) => (
                  <div key={idx} className="w-full h-full rounded-2xl overflow-hidden bg-white p-1.5 shadow-sm">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-amber-50/50">
                      {p.url ? (
                        <img src={p.url} alt={`K-Cut ${idx}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-300 text-xs">Chưa có ảnh</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phần chân Life4Cuts Seoul */}
              <div className="pt-4 pb-1 text-center border-t border-amber-200/60 mt-3">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setQuoteText(e.target.innerText)}
                  className={`${fontFamily} font-bold leading-tight cursor-text focus:outline-none`}
                  style={{ fontSize: `${fontSize * 0.88}px`, color: textColor }}
                >
                  {quoteText}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 text-[10px] font-bold text-amber-800/60 uppercase tracking-widest border-t border-amber-200/30">
                  <span>PHOTOISM STUDIO</span>
                  <span>인생네컷 • SEOUL</span>
                  <span>2026.10</span>
                </div>
              </div>
            </div>
          )}

          {/* 6. MẪU RETRO MAC OS WINDOW */}
          {activeTemplate === 'macos_retro' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-white rounded-2xl shadow-popup-deep overflow-hidden border border-slate-200">
              {/* Mac Title Bar */}
              <div className="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-xs font-mono font-bold text-slate-500">today_aesthetic.jpg</div>
                <div className="w-10" />
              </div>

              {/* Thân cửa sổ Mac */}
              <div className="flex-1 p-3.5 bg-slate-50/50">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-200 shadow-inner">
                  {photos[0] ? (
                    <img src={photos[0].url} alt="Mac Window" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa có ảnh</div>
                  )}
                </div>
              </div>

              {/* Status bar */}
              <div className="p-3 bg-white border-t border-slate-100 text-center">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setQuoteText(e.target.innerText)}
                  className={`${fontFamily} font-bold cursor-text focus:outline-none`}
                  style={{ fontSize: `${fontSize * 0.9}px`, color: textColor }}
                >
                  {quoteText}
                </p>
                {authorText && (
                  <span className="block text-[11px] text-slate-400 mt-0.5">— {authorText} —</span>
                )}
              </div>
            </div>
          )}

          {/* 7. MẪU THÔNG BÁO TIN NHẮN IOS KÍNH MỜ */}
          {activeTemplate === 'ios_notify' && (
            <div className="relative w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden bg-white p-2.5 shadow-polaroid">
              {/* Ảnh nền */}
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                {photos[0] ? (
                  <img src={photos[0].url} alt="iOS Notify" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa có ảnh</div>
                )}
              </div>

              {/* Bong bóng thông báo iPhone kính mờ */}
              <div className="absolute inset-x-5 bottom-6 z-20">
                <div className="glass-card rounded-2xl p-4 shadow-popup-deep border border-white/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center">
                        <MessageCircle className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">TIN NHẮN YÊU THƯƠNG</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">bây giờ</span>
                  </div>

                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none`}
                    style={{ fontSize: `${fontSize * 0.88}px`, color: textColor }}
                  >
                    {quoteText}
                  </p>

                  {authorText && (
                    <div className="text-right text-[11px] font-semibold text-slate-500 mt-1">
                      — {authorText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 8. MẪU BENTO GRID (CANVA BENTO BOX) */}
          {activeTemplate === 'grid_bento' && (
            <div className="relative w-full h-full flex flex-col justify-between">
              <div className="flex-1 grid grid-cols-2 gap-3 mb-3">
                {(photos.length > 0 ? photos.slice(0, 4) : [{ url: '' }, { url: '' }]).map((p, idx) => (
                  <div key={idx} className="w-full h-full rounded-2xl overflow-hidden bg-white p-2 shadow-sm border border-slate-200/60">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                      {p.url ? (
                        <img src={p.url} alt={`Bento ${idx}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Ảnh #{idx + 1}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3.5 text-center shadow-sm border border-slate-200/60">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setQuoteText(e.target.innerText)}
                  className={`${fontFamily} font-bold cursor-text focus:outline-none`}
                  style={{ fontSize: `${fontSize * 0.9}px`, color: textColor }}
                >
                  {quoteText}
                </p>
                {authorText && (
                  <span className="block text-xs text-slate-400 mt-0.5">— {authorText} —</span>
                )}
              </div>
            </div>
          )}

          {/* 9. MẪU TẠP CHÍ EDITORIAL KINFOLK */}
          {activeTemplate === 'magazine_editorial' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#FAF9F6] p-4 sm:p-6 rounded-2xl shadow-polaroid">
              <div className="text-center pb-3 border-b border-slate-200">
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold tracking-[0.25em] text-slate-800 uppercase">
                  A E S T H E T I C
                </h2>
                <div className="text-[10px] tracking-widest text-slate-400 uppercase mt-0.5">
                  ISSUE NO. 10 • AUTUMN LIFE & MEMORIES
                </div>
              </div>

              <div className="flex-1 my-3 rounded-xl overflow-hidden bg-white p-2 shadow-sm border border-slate-200/60">
                <div className="w-full h-full rounded-lg overflow-hidden bg-slate-100">
                  {photos[0] ? (
                    <img src={photos[0].url} alt="Editorial" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chưa có ảnh</div>
                  )}
                </div>
              </div>

              <div className="text-center pt-2">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setQuoteText(e.target.innerText)}
                  className={`${fontFamily} font-bold cursor-text focus:outline-none`}
                  style={{ fontSize: `${fontSize * 0.9}px`, color: textColor }}
                >
                  {quoteText}
                </p>
                {authorText && (
                  <span className="block text-xs text-slate-400 mt-1 italic">— {authorText} —</span>
                )}
              </div>
            </div>
          )}

          {/* 10. MẪU CUỘN PHIM HOÀI NIỆM (FILM STRIP) */}
          {activeTemplate === 'film_strip' && (
            <div className="relative w-full h-full flex flex-col justify-between bg-[#161514] text-[#FFF7EB] rounded-2xl p-4 sm:p-5 shadow-popup-deep">
              {/* Lỗ đục phim trên */}
              <div className="flex justify-between px-2 mb-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-3.5 h-5 bg-white/90 rounded-sm shadow-inner" />
                ))}
              </div>

              {/* Khung ảnh phim */}
              <div className="flex-1 rounded-xl overflow-hidden bg-[#242220] p-2 border border-white/10">
                <div className="w-full h-full rounded-lg overflow-hidden bg-black/40">
                  {photos[0] ? (
                    <img src={photos[0].url} alt="Film" className="w-full h-full object-cover brightness-95 contrast-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">Chưa có ảnh</div>
                  )}
                </div>
              </div>

              {/* Lỗ đục phim dưới & Date stamp */}
              <div className="mt-3">
                <div className="text-center mb-2">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold cursor-text focus:outline-none`}
                    style={{ fontSize: `${fontSize * 0.9}px`, color: '#FFF7EB' }}
                  >
                    {quoteText}
                  </p>
                  <div className="text-right font-mono text-amber-500 text-xs font-bold mt-1">
                    '26 10 25 • KODAK 400
                  </div>
                </div>

                <div className="flex justify-between px-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-3.5 h-5 bg-white/90 rounded-sm shadow-inner" />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* --- LỚP STICKERS NỔI (DRAGGABLE WITH FRAMER MOTION) --- */}
        {stickers.map((s) => (
          <motion.div
            key={s.id}
            drag
            dragMomentum={false}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute z-40 cursor-grab active:cursor-grabbing text-3xl sm:text-4xl filter drop-shadow-md group select-none"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <span>{s.emoji}</span>
            <button
              onClick={() => onRemoveSticker(s.id)}
              className="no-export absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Xóa sticker này"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </motion.div>
        ))}

      </motion.div>
    </main>
  );
}
