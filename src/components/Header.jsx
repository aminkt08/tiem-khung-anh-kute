import React from 'react';
import { Sparkles, Download, Shuffle, Image as ImageIcon } from 'lucide-react';
import { ASPECT_RATIOS } from '../data/templatesData';

export default function Header({
  aspectRatio,
  setAspectRatio,
  onMagicShuffle,
  onDownload,
  isExporting
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4 flex-wrap">
        
        {/* Logo & App Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg lg:text-xl bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
              Photo Studio 3D
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Ghép ảnh nghệ thuật, Khung lồng Canva & Pop-up Hàn Quốc
            </p>
          </div>
        </div>

        {/* Tỉ lệ khung hình (Aspect Ratio Switcher) */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 overflow-x-auto text-xs">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => setAspectRatio(ratio.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                aspectRatio === ratio.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ratio.id}
            </button>
          ))}
        </div>

        {/* Nút tác vụ chính */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onMagicShuffle}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/80 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Tự động phối ngẫu nhiên khung, sticker & câu nói"
          >
            <Shuffle className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Phù Phép</span> Ngẫu Nhiên
          </button>

          <button
            onClick={onDownload}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-300/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Đang xuất...' : 'Tải Ảnh HD'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
