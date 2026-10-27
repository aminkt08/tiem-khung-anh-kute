import React from 'react';
import { motion } from 'framer-motion';
import { Play, SkipBack, SkipForward, Heart, Music, MessageCircle, X, Send, Bookmark } from 'lucide-react';
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

            {/* 11. MẪU PASSE-PARTOUT TRIỂN LÃM LỀ RỘNG (FINE-ART MAT BOARD) */}
            {activeTemplate === 'passe_partout' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#F7F6F2] p-5 sm:p-7 rounded-2xl shadow-polaroid border border-[#E8E6DF]">
                {/* Vùng mat board chừa lề 15-20% với viền vát nổi 3D */}
                <div className="flex-1 w-full flex items-center justify-center p-2 sm:p-3">
                  <div className="w-[88%] h-[88%] bg-white p-2.5 sm:p-3 rounded-lg shadow-[inset_0_2px_6px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.06)] border border-[#E5E3DC]">
                    <div className="w-full h-full rounded-sm overflow-hidden bg-slate-100">
                      <SmartPhotoGrid photos={photos} roundedClass="rounded-none" borderClass="" filterStyle={activeFilter} />
                    </div>
                  </div>
                </div>

                {/* Bảng tên triển lãm nghệ thuật (Gallery Exhibition Plaque) */}
                <div className={`pt-2.5 pb-1 ${textAlignClass}`}>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-8 h-[1px] bg-slate-300" />
                    <span className="font-playfair text-[10px] sm:text-xs uppercase tracking-[0.3em] font-extrabold text-slate-700">
                      EXHIBITION NO. 01 • FINE ART
                    </span>
                    <span className="w-8 h-[1px] bg-slate-300" />
                  </div>

                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setQuoteText(e.target.innerText)}
                    className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none whitespace-pre-line`}
                    style={{ fontSize: `${fontSize * 0.88}px`, color: textColor }}
                  >
                    {quoteText}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60 text-[9px] font-mono text-slate-400">
                    <span>ARCHIVAL PIGMENT PRINT • 1/25</span>
                    <span className="font-sans italic">{authorText ? `— ${authorText} —` : 'Gallery Collection'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 12. MẪU VIỀN ĐÔI MẢNH (GALLERY DOUBLE BORDER) */}
            {activeTemplate === 'thin_double_border' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#FAF9F6] p-4 sm:p-5 rounded-2xl shadow-polaroid border border-slate-200/70">
                {/* Viền ngoài thứ nhất (Outer Line) */}
                <div className="flex-1 w-full p-2.5 sm:p-3 border border-slate-800/80 rounded-lg flex flex-col justify-between">
                  {/* Khoảng hở 6-8px rồi tới Viền trong thứ hai (Inner Line) */}
                  <div className="flex-1 w-full p-1 sm:p-1.5 border border-slate-800/80 rounded-sm overflow-hidden flex flex-col">
                    <div className="flex-1 w-full rounded-none overflow-hidden bg-slate-100">
                      <SmartPhotoGrid photos={photos} roundedClass="rounded-none" borderClass="" filterStyle={activeFilter} />
                    </div>
                  </div>

                  {/* Chữ gallery thanh lịch giữa 2 viền */}
                  <div className={`pt-2.5 pb-0.5 ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line`}
                      style={{ fontSize: `${fontSize * 0.85}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                    <div className="text-[10px] tracking-[0.25em] text-slate-500 uppercase mt-1 font-playfair">
                      {authorText || 'AUTUMN MEMORIES'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 13. MẪU THÔNG SỐ EXIF MINIMAL (SHOT ON LEICA / SONY) */}
            {activeTemplate === 'exif_minimal' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-white rounded-2xl p-3 sm:p-4 shadow-polaroid border border-slate-200/80">
                {/* Tấm ảnh chính sắc nét */}
                <div className="flex-1 w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs mb-3">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-xl" filterStyle={activeFilter} />
                </div>

                {/* Thanh thông số EXIF nhiếp ảnh chuyên nghiệp */}
                <div className="pt-2 px-1 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {/* Bên trái: Logo đỏ Leica & Tên thiết bị */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#E3001B] text-white flex items-center justify-center font-serif font-black text-[10px] shadow-xs">
                        L
                      </div>
                      <div>
                        <div className="text-xs font-black tracking-wider text-slate-900 leading-tight">
                          LEICA M11
                        </div>
                        <div className="text-[10px] font-medium text-slate-400">
                          SUMMILUX-M 35mm f/1.4 ASPH.
                        </div>
                      </div>
                    </div>

                    {/* Đường kẻ dọc ngăn cách */}
                    <div className="hidden sm:block h-6 w-[1px] bg-slate-200" />

                    {/* Bên phải: 4 thông số chụp EXIF */}
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                      <span>35mm</span>
                      <span className="text-slate-300">•</span>
                      <span>f/1.4</span>
                      <span className="text-slate-300">•</span>
                      <span>1/1000s</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-rose-600">ISO 100</span>
                    </div>
                  </div>

                  {/* Dòng quote & Tọa độ */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px] text-slate-400">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold text-slate-700 cursor-text focus:outline-none whitespace-pre-line text-left flex-1`}
                      style={{ fontSize: `${fontSize * 0.82}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                    <span className="font-mono text-[9px] text-slate-400 shrink-0 ml-2">
                      21°01'40"N 105°51'08"E • 2026.10
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 14. MẪU KHUNG PHIM 120MM (MEDIUM FORMAT ANALOG 6x6) */}
            {activeTemplate === 'medium_format_120' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#141414] text-[#EFEBE4] rounded-2xl p-4 sm:p-5 shadow-popup-deep border-4 border-[#222]">
                {/* Viền trên của film cuộn 120mm */}
                <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] px-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span>▶ 12</span>
                    <span className="text-white/40">• • •</span>
                  </div>
                  <span className="text-amber-400">FUJIFILM PRO 400H • 120 FILM</span>
                  <div className="flex items-center gap-1">
                    <span>EXP 12</span>
                  </div>
                </div>

                {/* Khung ảnh chính với vệt loang sáng nhẹ (Analog Light Leak) */}
                <div className="relative flex-1 my-2 rounded-md overflow-hidden bg-[#1F1E1D] p-1.5 border border-white/10">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-sm" filterStyle={activeFilter} />

                  {/* Vệt loang sáng vàng cam analog ở góc viền */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-amber-500/20 via-rose-500/10 to-transparent mix-blend-screen" />
                </div>

                {/* Viền đáy của film cuộn 120mm */}
                <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
                  <div className={`px-1 ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line text-amber-100`}
                      style={{ fontSize: `${fontSize * 0.88}px`, color: textColor || '#FFF5E0' }}
                    >
                      {quoteText}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-white/50 px-2 pt-1 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-2.5 bg-white/20 flex gap-0.5 px-0.5 items-center">
                        <span className="w-0.5 h-full bg-black/60" />
                        <span className="w-1 h-full bg-black/60" />
                        <span className="w-0.5 h-full bg-black/60" />
                      </div>
                      <span>SAFETY FILM</span>
                    </div>
                    <span className="text-amber-500 font-bold">'26 10 27 • 12A</span>
                  </div>
                </div>
              </div>
            )}

            {/* 15. MẪU GIẤY XÉ THỦ CÔNG (TORN PAPER SCRAPBOOK) */}
            {activeTemplate === 'torn_paper_scrapbook' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#F4EEDD] p-4 sm:p-6 rounded-2xl shadow-polaroid border border-[#E3DAC5] overflow-hidden">
                {/* Ghim kẹp giấy kim loại ở góc trên trái */}
                <div className="absolute top-2 left-6 z-30 w-5 h-12 border-3 border-amber-500/80 rounded-full shadow-md rotate-[-8deg]" />
                
                {/* Miếng băng dính washi pastel dán góc phải */}
                <div 
                  className="absolute top-3 right-6 z-20 w-20 h-6 rotate-6 shadow-sm opacity-90"
                  style={{ backgroundColor: washiColor }}
                />

                {/* Tấm ảnh viền răng cưa giấy xé thủ công */}
                <div className={`relative flex-1 w-full bg-white p-3 shadow-md rounded-md ${microRotate ? 'rotate-[-1.5deg]' : ''} transition-transform flex flex-col justify-between border border-[#E8DFC8]`}>
                  <div className="flex-1 w-full rounded-sm overflow-hidden bg-slate-100 shadow-inner">
                    <SmartPhotoGrid photos={photos} roundedClass="rounded-none" filterStyle={activeFilter} />
                  </div>

                  {/* Dòng chữ viết tay kiểu nhật ký lưu bút */}
                  <div className={`pt-3 pb-1 ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line text-slate-800`}
                      style={{ fontSize: `${fontSize * 0.9}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                    <span className="block text-[11px] font-patrick text-slate-500 mt-1 italic">
                      — {authorText || 'Nhật ký thanh xuân 🍃'} —
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 16. MẪU GIAO DIỆN KÍNH NGẮM MÁY ẢNH (CAMERA VIEWFINDER) */}
            {activeTemplate === 'camera_viewfinder' && (
              <div className="relative w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden bg-black shadow-polaroid border-2 border-slate-800">
                {/* Ảnh nền phủ trọn khung hình */}
                <div className="absolute inset-0 z-0">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-none" borderClass="" filterStyle={activeFilter} />
                  <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                </div>

                {/* Lưới 1/3 bố cục vàng (Rule of Thirds Grid) */}
                <div className="absolute inset-0 z-10 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/10">
                  <div className="border-r border-b border-white/15" />
                  <div className="border-r border-b border-white/15" />
                  <div className="border-b border-white/15" />
                  <div className="border-r border-b border-white/15" />
                  <div className="border-r border-b border-white/15" />
                  <div className="border-b border-white/15" />
                  <div className="border-r border-b border-white/15" />
                  <div className="border-r border-b border-white/15" />
                  <div className="" />
                </div>

                {/* 4 Góc ngắm vuông (Corner Brackets) */}
                <div className="absolute inset-4 z-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/90 drop-shadow-md" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/90 drop-shadow-md" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/90 drop-shadow-md" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/90 drop-shadow-md" />
                </div>

                {/* Điểm lấy nét AF trung tâm [ + ] */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 border border-emerald-400/80 rounded-sm flex items-center justify-center shadow-xs">
                    <div className="w-2.5 h-0.5 bg-emerald-400/90" />
                    <div className="w-0.5 h-2.5 bg-emerald-400/90 -ml-1.5" />
                  </div>
                </div>

                {/* Thước đo sáng EV ở cạnh phải */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 font-mono text-[9px] font-bold text-white/80 bg-black/40 px-1 py-2 rounded-full border border-white/20">
                  <span>+2</span>
                  <span className="w-2 h-[1px] bg-white/40" />
                  <span>+1</span>
                  <span className="w-2 h-[1px] bg-white/40" />
                  <span className="text-emerald-400 font-black">0</span>
                  <span className="w-2 h-[1px] bg-white/40" />
                  <span>-1</span>
                  <span className="w-2 h-[1px] bg-white/40" />
                  <span>-2</span>
                </div>

                {/* Top HUD bar */}
                <div className="relative z-30 p-3 sm:p-4 flex items-center justify-between text-white font-mono text-[10px] sm:text-xs drop-shadow-md">
                  <div className="flex items-center gap-2 bg-black/50 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold">REC 00:14:28</span>
                  </div>

                  <div className="flex items-center gap-3 bg-black/50 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                    <span className="text-amber-400 font-bold">4K 60FPS</span>
                    <span>•</span>
                    <span>SD: 2420 RAW</span>
                    <span>•</span>
                    <span className="text-emerald-400">[▮▮▮▯] 85%</span>
                  </div>
                </div>

                {/* Bottom HUD bar & Quote */}
                <div className="relative z-30 p-3 sm:p-4 flex flex-col gap-2">
                  <div className={`p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line text-white drop-shadow-md`}
                      style={{ fontSize: `${fontSize * 0.85}px`, color: '#FFFFFF' }}
                    >
                      {quoteText}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-white font-mono text-[10px] sm:text-xs bg-black/50 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-xs">
                    <span>1/500s</span>
                    <span>F2.8</span>
                    <span className="text-amber-300">ISO 400</span>
                    <span className="text-emerald-300">AF-C</span>
                    <span>AWB</span>
                  </div>
                </div>
              </div>
            )}

            {/* 17. MẪU CỬA SỔ WINDOWS 95 RETRO */}
            {activeTemplate === 'windows_95_retro' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-[#C0C0C0] p-1.5 sm:p-2 rounded-sm shadow-2xl border-2 border-t-white border-l-white border-b-black border-r-black">
                {/* Thanh tiêu đề Windows 95 xanh navy gradient */}
                <div className="bg-gradient-to-r from-[#000080] via-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between text-white font-bold text-xs select-none shadow-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">📷</span>
                    <span className="font-mono text-[11px] truncate">Memories_Viewer.exe - [Ready]</span>
                  </div>

                  {/* 3 nút _ [] X cổ điển có viền 3D */}
                  <div className="flex items-center gap-1">
                    <button className="w-4 h-4 bg-[#C0C0C0] text-black font-mono font-bold text-[9px] flex items-center justify-center border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black">_</button>
                    <button className="w-4 h-4 bg-[#C0C0C0] text-black font-mono font-bold text-[9px] flex items-center justify-center border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black">□</button>
                    <button className="w-4 h-4 bg-[#C0C0C0] text-black font-mono font-bold text-[9px] flex items-center justify-center border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black">✕</button>
                  </div>
                </div>

                {/* Menu bar kinh điển: File Edit View Help */}
                <div className="flex items-center gap-3 px-2 py-0.5 text-[11px] font-mono text-black border-b border-slate-400">
                  <span className="underline decoration-slate-400">F</span>ile
                  <span className="underline decoration-slate-400">E</span>dit
                  <span className="underline decoration-slate-400">V</span>iew
                  <span className="underline decoration-slate-400">I</span>mage
                  <span className="underline decoration-slate-400">H</span>elp
                </div>

                {/* Vùng xem ảnh thụt vào trong (Sunken Viewport) */}
                <div className="flex-1 my-1.5 p-2 bg-[#2B2B2B] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white overflow-hidden flex flex-col justify-center">
                  <div className="w-full h-full rounded-none overflow-hidden bg-black">
                    <SmartPhotoGrid photos={photos} roundedClass="rounded-none" borderClass="" filterStyle={activeFilter} />
                  </div>
                </div>

                {/* Chữ quote và Thanh trạng thái Status Bar */}
                <div className="space-y-1">
                  <div className={`p-1.5 bg-white border border-t-[#808080] border-l-[#808080] border-b-white border-r-white ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line text-black`}
                      style={{ fontSize: `${fontSize * 0.82}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-1.5 text-[9px] font-mono text-slate-700">
                    <span>1 object(s) selected</span>
                    <span>100% Zoom</span>
                    <span>24-bit TrueColor</span>
                  </div>
                </div>
              </div>
            )}

            {/* 18. MẪU GIAO DIỆN INSTAGRAM POST MOCKUP */}
            {activeTemplate === 'instagram_mockup' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-white rounded-2xl shadow-polaroid border border-slate-200 overflow-hidden">
                {/* Instagram Header */}
                <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar vòng tròn Story gradient 7 màu */}
                    <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden">
                        <img src={photos[0]?.url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">tiem_khung_anh</div>
                      <div className="text-[10px] text-slate-400 font-medium">Saigon, Vietnam</div>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-700 text-sm font-bold tracking-widest">•••</button>
                </div>

                {/* Ảnh chính hiển thị trọn vẹn */}
                <div className="flex-1 w-full bg-slate-100 overflow-hidden">
                  <SmartPhotoGrid photos={photos} roundedClass="rounded-none" borderClass="" filterStyle={activeFilter} />
                </div>

                {/* Instagram Action Buttons & Caption */}
                <div className="p-3 bg-white border-t border-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5 text-slate-800">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500 cursor-pointer" />
                      <MessageCircle className="w-5 h-5 cursor-pointer hover:text-slate-500" />
                      <Send className="w-4 h-4 cursor-pointer hover:text-slate-500" />
                    </div>
                    <Bookmark className="w-4 h-4 text-slate-700 cursor-pointer hover:fill-slate-700" />
                  </div>

                  <div className="text-[11px] font-extrabold text-slate-900">
                    1,428 lượt thích
                  </div>

                  <div className="text-xs text-slate-800 text-left">
                    <span className="font-bold mr-1.5">tiem_khung_anh</span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-medium cursor-text focus:outline-none whitespace-pre-line`}
                      style={{ fontSize: `${fontSize * 0.8}px`, color: textColor }}
                    >
                      {quoteText}
                    </span>
                  </div>

                  <div className="text-[10px] text-sky-600 font-medium">
                    #aesthetic #photooftheday #vietnam #moment
                  </div>

                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                    2 GIỜ TRƯỚC • XEM TẤT CẢ 42 BÌNH LUẬN
                  </div>
                </div>
              </div>
            )}

            {/* 19. MẪU THẺ NỔI 3D MỀM (FLOATING CARD) */}
            {activeTemplate === 'floating_card' && (
              <div className="relative w-full h-full flex flex-col justify-between items-center p-3 sm:p-5">
                {/* Thẻ nổi đổ bóng đa tầng siêu mịn */}
                <div className="w-full flex-1 bg-white p-3 sm:p-4 rounded-[26px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.8)] border border-white/80 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01]">
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <SmartPhotoGrid photos={photos} roundedClass="rounded-2xl" filterStyle={activeFilter} />
                  </div>

                  {/* Chữ đặt trong card thanh lịch */}
                  <div className={`pt-3.5 pb-1 ${textAlignClass}`}>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold leading-snug cursor-text focus:outline-none whitespace-pre-line text-slate-800`}
                      style={{ fontSize: `${fontSize * 0.88}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                    {authorText && (
                      <span className="block text-[11px] font-semibold text-slate-400 mt-1 italic">
                        — {authorText} —
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 20. MẪU LƯỚI BẤT ĐỐI XỨNG (ASYMMETRIC GRID LOOKBOOK) */}
            {activeTemplate === 'asymmetric_grid' && (
              <div className="relative w-full h-full flex flex-col justify-between bg-white p-3.5 sm:p-5 rounded-2xl shadow-polaroid border border-slate-200/80">
                {/* Bố cục bất đối xứng: 1 ảnh lớn 60% + 2 ảnh nhỏ bên cạnh */}
                <div className="flex-1 w-full rounded-xl overflow-hidden mb-3">
                  {photos.length <= 1 ? (
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img src={photos[0]?.url} alt="Hero" style={{ filter: activeFilter || 'none' }} className="w-full h-full object-cover" />
                    </div>
                  ) : photos.length === 2 ? (
                    <div className="w-full h-full grid grid-cols-5 gap-2">
                      <div className="col-span-3 h-full rounded-xl overflow-hidden shadow-xs">
                        <img src={photos[0]?.url} alt="Hero" style={{ filter: activeFilter || 'none' }} className="w-full h-full object-cover" />
                      </div>
                      <div className="col-span-2 h-full rounded-xl overflow-hidden shadow-xs">
                        <img src={photos[1]?.url} alt="Side" style={{ filter: activeFilter || 'none' }} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full grid grid-cols-5 gap-2">
                      {/* Ảnh lớn chiếm 3/5 diện tích (60%) */}
                      <div className="col-span-3 h-full rounded-xl overflow-hidden shadow-xs">
                        <img src={photos[0]?.url} alt="Hero" style={{ filter: activeFilter || 'none' }} className="w-full h-full object-cover" />
                      </div>
                      {/* Các ảnh nhỏ xếp chồng cột bên phải */}
                      <div className="col-span-2 h-full grid grid-rows-2 gap-2">
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-xs">
                          <img src={photos[1]?.url} alt="Detail 1" style={{ filter: activeFilter || 'none' }} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-xs">
                          <img src={photos[2]?.url || photos[0]?.url} alt="Detail 2" style={{ filter: activeFilter || 'none' }} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thanh typography thời thượng kiểu Lookbook */}
                <div className={`pt-2 border-t border-slate-100 flex items-center justify-between gap-3 ${textAlignClass}`}>
                  <div className="flex-1">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setQuoteText(e.target.innerText)}
                      className={`${fontFamily} font-bold cursor-text focus:outline-none whitespace-pre-line text-left`}
                      style={{ fontSize: `${fontSize * 0.85}px`, color: textColor }}
                    >
                      {quoteText}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-playfair font-extrabold text-xs tracking-widest text-slate-800 uppercase">
                      LOOKBOOK
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {authorText || 'COLLECTION 2026'}
                    </div>
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
