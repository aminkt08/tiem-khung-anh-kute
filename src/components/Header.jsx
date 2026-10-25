import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Shuffle, 
  Copy, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { ASPECT_RATIOS } from '../data/templatesData';

export default function Header({
  aspectRatio,
  setAspectRatio,
  onMagicShuffle,
  onDownload,
  onCopyToClipboard,
  isExporting,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset
}) {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await onCopyToClipboard();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Handled in parent
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-3 flex-wrap">
        
        {/* Logo & App Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-200/60 ring-2 ring-rose-100">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base lg:text-lg bg-gradient-to-r from-rose-600 via-purple-600 to-amber-500 bg-clip-text text-transparent leading-none">
                Photo Studio 3D
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-extrabold text-[10px] border border-rose-200">
                PRO v2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block mt-0.5 font-medium">
              Khung Lồng Canva & Pop-up Nghệ Thuật
            </p>
          </div>
        </div>

        {/* Tỉ lệ khung hình (Aspect Ratio Switcher) */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 overflow-x-auto text-xs">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => setAspectRatio(ratio.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                aspectRatio === ratio.id
                  ? 'bg-white text-rose-600 shadow-sm scale-100'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {ratio.id}
            </button>
          ))}
        </div>

        {/* Công cụ Zoom bàn làm việc (Figma / Canva style) */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-xl border border-slate-200/60 text-xs text-slate-600 font-bold">
          <button
            onClick={onZoomOut}
            className="p-1 hover:bg-white rounded-lg transition-colors"
            title="Thu nhỏ bàn làm việc"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center font-mono text-[11px]">{zoomLevel}%</span>
          <button
            onClick={onZoomIn}
            className="p-1 hover:bg-white rounded-lg transition-colors"
            title="Phóng to bàn làm việc"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomReset}
            className="p-1 hover:bg-white rounded-lg transition-colors ml-1 text-slate-400 hover:text-slate-700"
            title="Khôi phục kích thước 100%"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Cụm Action Buttons Chính */}
        <div className="flex items-center gap-2">
          {/* Nút Magic Shuffle */}
          <button
            onClick={onMagicShuffle}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all hover:scale-[1.03] active:scale-95 shadow-sm"
            title="Phối ngẫu nhiên toàn bộ: Khung + Màu + Thơ + Sticker (Phím tắt: Space)"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Phù Phép</span>
          </button>

          {/* Nút Sao Chép vào Clipboard (Dán ngay vào Zalo/FB) */}
          <button
            onClick={handleCopy}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/70 transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-50"
            title="Sao chép ảnh vào clipboard để dán (Ctrl+V) ngay"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
            <span className="hidden md:inline">{copied ? 'Đã chép!' : 'Sao Chép'}</span>
          </button>

          {/* Nút Tải ảnh về máy (Download PNG & JPG) */}
          <div className="relative">
            <div className="inline-flex rounded-xl shadow-md shadow-rose-300/40">
              <button
                onClick={() => onDownload('png')}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-l-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Đang xuất...' : 'Tải Ảnh HD'}</span>
              </button>
              <button
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                disabled={isExporting}
                className="px-2 py-2 rounded-r-xl border-l border-white/25 text-white bg-pink-500 hover:bg-pink-600 transition-all disabled:opacity-50"
                title="Tùy chọn định dạng tải"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dropdown định dạng */}
            {downloadMenuOpen && (
              <div 
                className="absolute right-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-50 text-xs font-semibold"
                onClick={() => setDownloadMenuOpen(false)}
              >
                <button
                  onClick={() => onDownload('png')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-between"
                >
                  <span>PNG Siêu Nét (Khuyên dùng)</span>
                  <span className="text-[10px] text-rose-500 font-bold">2.5x</span>
                </button>
                <button
                  onClick={() => onDownload('jpg')}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 flex items-center justify-between"
                >
                  <span>JPG Chuẩn Nhẹ</span>
                  <span className="text-[10px] text-slate-400">Nhanh</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
