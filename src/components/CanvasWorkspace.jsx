import React from 'react';
import { motion } from 'framer-motion';
import { Play, SkipBack, SkipForward, Heart, Music, MessageCircle, X } from 'lucide-react';
import SmartPhotoGrid from './SmartPhotoGrid';

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
  textAlign = 'center',
  bgColor,
  aspectRatio,
  stickers,
  onRemoveSticker,
  washiColor,
  activeFilter,
  sunbeamEffect,
  microRotate = true,
  zoomLevel = 100
}) {
  const ratioStyles = {
    '1:1': 'aspect-square max-w-[560px]',
    '4:5': 'aspect-[4/5] max-w-[500px]',
    '9:16': 'aspect-[9/16] max-w-[420px]',
    '16:9': 'aspect-[16/9] max-w-[650px]'
  };

  const currentRatioClass = ratioStyles[aspectRatio] || ratioStyles['4:5'];

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const textAlignClass = alignClasses[textAlign] || 'text-center';

  return (
    <main className="flex-1 min-h-[500px] lg:h-[calc(100vh-61px)] overflow-auto bg-slate-100/70 bg-dot-grid flex flex-col items-center justify-center p-4 lg:p-8">
      
      {/* Thanh thông tin kích thước Canvas trên đầu (Canva/Figma Status Bar) */}
      <div className="no-export mb-3 flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-slate-200/60 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Canvas HD</span>
        <span>•</span>
        <span>{aspectRatio}</span>
        <span>•</span>
        <span>{photos.length} ảnh trong khung</span>
      </div>

      {/* Vùng Bàn làm việc có Zoom Scale */}
      <div 
        className="transition-transform duration-200 flex items-center justify-center w-full"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
      >
        {/* Khung chụp Render (Toàn bộ phần này sẽ được xuất ra ảnh HD) */}
        <motion.div
          layout
          id="capture-canvas"
          style={{ backgroundColor: bgColor }}
          className={`w-full ${currentRatioClass} relative rounded-[28px] shadow-soft-3d p-5 sm:p-7 flex flex-col justify-between overflow-hidden transition-colors duration-300 select-none`}
        >

          {/* Lớp hiệu ứng Vệt Nắng Chiều (Sunbeam Overlay) */}
          {sunbeamEffect && (
            <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-amber-200/25 to-amber-100/40 mix-blend-screen" />
          )}

          {/* --- NỘI DUNG TỪNG TEMPLATE KHUNG ẢNH (ỨNG DỤNG THUẬT TOÁN ĐA ẢNH KHÔNG ĐÈ NHAU) --- */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            
            {/* 1. MẪU CANVA BLUR (KHUNG LỒNG NỀN MỜ ĐA ẢNH) */}
            {activeTemplate === 'canva_blur' && (
              <div className="relative w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden">
                {/* Nền mờ phía sau */}
                {photos[0] && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-125 opacity-75"
                    style={{ backgroundImage: `url(${photos[0].url})`, filter: activeFilter || 'blur(24px)' }}
                  />
                )}
                <div className="absolute inset-0 bg-white/35 backdrop-blur-sm" />

                {/* Tấm ảnh chính lồng ở giữa (Tự động chia lưới nếu có 1-6 ảnh) */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-2 sm:p-3">
                  <div className="w-[90%] h-[84%] rounded-2xl overflow-hidden bg-white p-2.5 shadow-popup-deep">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                      <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" filterStyle={activeFilter} />
                    </div>
                  </div>
                </div>

                {/* Thẻ chữ kính mờ Pop-up đè góc dưới */}
                <div className="relative z-20 px-3 pb-1">
                  <div className={`glass-card rounded-2xl p-3 sm:p-4 shadow-glass ${textAlignClass} border border-white/80`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none whitespace-pre-line`}
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

            {/* 2. MẪU POLAROID CẶP ĐÔI (SONG SONG - HOÀN TOÀN KHÔNG BỊ ĐÈ LÊN NHAU) */}
            {activeTemplate === 'polaroid_duo' && (
              <div className="relative w-full h-full flex flex-col justify-between">
                <div className="relative flex-1 w-full flex items-center justify-center gap-3 sm:gap-4 px-2">
                  {/* Tấm ảnh 1 (Trái) */}
                  <div className={`flex-1 h-[88%] bg-white p-2.5 sm:p-3 rounded-2xl shadow-polaroid ${microRotate ? 'rotate-[-1.8deg]' : ''} flex flex-col transition-transform hover:rotate-0`}>
                    <div className="flex-1 w-full rounded-xl overflow-hidden bg-slate-100">
                      <img 
                        src={photos[0]?.url} 
                        alt="Polaroid Left" 
                        style={{ filter: activeFilter || 'none' }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="h-6 flex items-center justify-center text-[10px] font-bold text-slate-400 mt-1">#1</div>
                  </div>

                  {/* Tấm ảnh 2 (Phải) */}
                  <div className={`flex-1 h-[88%] bg-white p-2.5 sm:p-3 rounded-2xl shadow-polaroid ${microRotate ? 'rotate-[1.8deg]' : ''} flex flex-col transition-transform hover:rotate-0`}>
                    <div className="flex-1 w-full rounded-xl overflow-hidden bg-slate-100">
                      <img 
                        src={photos[1]?.url || photos[0]?.url} 
                        alt="Polaroid Right" 
                        style={{ filter: activeFilter || 'none' }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="h-6 flex items-center justify-center text-[10px] font-bold text-slate-400 mt-1">#2</div>
                  </div>

                  {/* Miếng băng dính washi pastel ở giữa trên */}
                  <div 
                    className="absolute top-2 z-20 w-24 h-6 rotate-2 shadow-sm rounded-sm"
                    style={{ backgroundColor: washiColor }}
                  />
                </div>

                <div className={`pt-3 pb-1 ${textAlignClass}`}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line`}
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

            {/* 3. MẪU TRÌNH PHÁT NHẠC (MUSIC PLAYER WIDGET POP-UP) */}
            {activeTemplate === 'music_player' && (
              <div className="relative w-full h-full flex flex-col justify-between">
                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-white p-2.5 shadow-polaroid mb-2">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                    <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" filterStyle={activeFilter} />
                  </div>
                </div>

                {/* Widget phát nhạc Spotify/Apple Music kính mờ */}
                <div className="relative -mt-16 z-20 px-1 pb-1">
                  <div className="glass-card rounded-2xl p-3.5 shadow-popup-deep border border-white/90">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-sm">
                          <Music className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-800 leading-tight">Giai điệu an yên</div>
                          <div className="text-[10px] font-semibold text-slate-400">{authorText || 'Lời gửi trao'}</div>
                        </div>
                      </div>
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    </div>

                    <div className={`my-2 ${textAlignClass}`}>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setQuoteText(e.target.innerText)}
                        className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none whitespace-pre-line`}
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
                      <button className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200 hover:scale-105 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </button>
                      <SkipForward className="w-4 h-4 cursor-pointer hover:text-slate-900" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. MẪU POLAROID SINGLE & WASHI TAPE */}
            {activeTemplate === 'polaroid_single' && (
              <div className={`relative w-full h-full flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 shadow-polaroid ${microRotate ? 'rotate-[-1.2deg]' : ''} transition-transform hover:rotate-0`}>
                <div className="absolute -top-3 left-6 z-30 w-6 h-14 border-4 border-amber-400 rounded-full shadow-md" style={{ borderColor: '#D4AF37' }} />
                <div 
                  className="absolute -top-3 right-5 z-20 w-24 h-7 rotate-6 shadow-sm"
                  style={{ backgroundColor: washiColor }}
                />

                <div className="w-full flex-1 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" filterStyle={activeFilter} />
                </div>

                <div className={`pt-4 pb-2 ${textAlignClass}`}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold leading-relaxed cursor-text focus:outline-none whitespace-pre-line`}
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

            {/* 5. MẪU HÀN QUỐC BƠ SỮA (LIFE4CUTS PHOTOBOOTH) */}
            {activeTemplate === 'korean_life4cuts' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#FFF8E7] rounded-3xl p-4 sm:p-5 shadow-polaroid border-4 border-[#FFEABA]">
                <div className="flex-1 w-full rounded-2xl overflow-hidden p-1">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" borderClass="border border-amber-200/50" filterStyle={activeFilter} />
                </div>

                <div className={`pt-3 pb-1 border-t border-amber-200/60 mt-2 ${textAlignClass}`}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold leading-tight cursor-text focus:outline-none whitespace-pre-line`}
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

            {/* 6. MẪU GRID BENTO BOX (TỰ ĐỘNG CHIA LƯỚI KHÔNG ĐÈ NHAU) */}
            {activeTemplate === 'grid_bento' && (
              <div className="relative w-full h-full flex flex-col justify-between">
                <div className="flex-1 w-full rounded-2xl overflow-hidden p-1 mb-3">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-2xl" gapClass="gap-3" filterStyle={activeFilter} />
                </div>

                <div className={`bg-white/85 backdrop-blur-sm rounded-2xl p-3.5 shadow-sm border border-slate-200/60 ${textAlignClass}`}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line`}
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

            {/* 7. MẪU RETRO MAC OS WINDOW */}
            {activeTemplate === 'macos_retro' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-white rounded-2xl shadow-popup-deep overflow-hidden border border-slate-200">
                <div className="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-500">today_aesthetic.jpg</div>
                  <div className="w-10" />
                </div>

                <div className="flex-1 p-3.5 bg-slate-50/50">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" filterStyle={activeFilter} />
                </div>

                <div className={`p-3 bg-white border-t border-slate-100 ${textAlignClass}`}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line`}
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

            {/* 8. MẪU THÔNG BÁO TIN NHẮN IOS KÍNH MỜ */}
            {activeTemplate === 'ios_notify' && (
              <div className="relative w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden bg-white p-2.5 shadow-polaroid">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" filterStyle={activeFilter} />
                </div>

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
                      className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none ${textAlignClass} whitespace-pre-line`}
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
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-lg" filterStyle={activeFilter} />
                </div>

                <div className={`pt-2 ${textAlignClass}`}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line`}
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
                <div className="flex justify-between px-2 mb-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-3.5 h-5 bg-white/90 rounded-sm shadow-inner" />
                  ))}
                </div>

                <div className="flex-1 rounded-xl overflow-hidden bg-[#242220] p-2 border border-white/10">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-lg" borderClass="border border-white/10" filterStyle={activeFilter} />
                </div>

                <div className="mt-3">
                  <div className={`mb-2 ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line`}
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
      </div>
    </main>
  );
}
