import React from 'react';

/**
 * Thuật toán sắp xếp đa ảnh tự động (Smart Non-Overlapping Grid Algorithm)
 * Đảm bảo 1 đến 6 ảnh luôn được phân chia không gian cân đối, KHÔNG BỊ ĐÈ LÊN NHAU.
 */
export default function SmartPhotoGrid({ 
  photos = [], 
  roundedClass = 'rounded-xl',
  gapClass = 'gap-2.5',
  borderClass = 'border border-white/60'
}) {
  const count = Math.min(Math.max(photos.length, 1), 6);
  const items = photos.slice(0, 6);

  // Helper render 1 ô ảnh
  const renderItem = (photo, index, extraClass = '') => (
    <div 
      key={photo?.id || index} 
      className={`relative w-full h-full overflow-hidden bg-slate-100 shadow-sm ${roundedClass} ${borderClass} ${extraClass}`}
    >
      {photo?.url ? (
        <img 
          src={photo.url} 
          alt={`Photo ${index + 1}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
          Ảnh #{index + 1}
        </div>
      )}
    </div>
  );

  // 1 ẢNH: Chiếm trọn khung hình
  if (count === 1) {
    return (
      <div className="w-full h-full">
        {renderItem(items[0], 0)}
      </div>
    );
  }

  // 2 ẢNH: Chia đôi đối xứng 50% - 50% song song (Không che đè lên nhau)
  if (count === 2) {
    return (
      <div className={`w-full h-full grid grid-cols-2 ${gapClass}`}>
        {renderItem(items[0], 0)}
        {renderItem(items[1], 1)}
      </div>
    );
  }

  // 3 ẢNH: Bố cục 1 Ảnh Lớn Tiêu Điểm (Trái 60%) + 2 Ảnh Phụ Xếp Cột (Phải 40%)
  if (count === 3) {
    return (
      <div className={`w-full h-full grid grid-cols-5 ${gapClass}`}>
        <div className="col-span-3 h-full">
          {renderItem(items[0], 0)}
        </div>
        <div className={`col-span-2 h-full grid grid-rows-2 ${gapClass}`}>
          {renderItem(items[1], 1)}
          {renderItem(items[2], 2)}
        </div>
      </div>
    );
  }

  // 4 ẢNH: Lưới Bento 2x2 Cân Đối Tuyệt Đối
  if (count === 4) {
    return (
      <div className={`w-full h-full grid grid-cols-2 grid-rows-2 ${gapClass}`}>
        {renderItem(items[0], 0)}
        {renderItem(items[1], 1)}
        {renderItem(items[2], 2)}
        {renderItem(items[3], 3)}
      </div>
    );
  }

  // 5 ẢNH: 2 Ảnh Hàng Trên (50% mỗi ảnh) + 3 Ảnh Hàng Dưới (33.3% mỗi ảnh)
  if (count === 5) {
    return (
      <div className={`w-full h-full flex flex-col ${gapClass}`}>
        <div className={`flex-1 grid grid-cols-2 ${gapClass}`}>
          {renderItem(items[0], 0)}
          {renderItem(items[1], 1)}
        </div>
        <div className={`flex-1 grid grid-cols-3 ${gapClass}`}>
          {renderItem(items[2], 2)}
          {renderItem(items[3], 3)}
          {renderItem(items[4], 4)}
        </div>
      </div>
    );
  }

  // 6 ẢNH: Lưới Bento 3 Cột x 2 Hàng Thoáng Đãng
  return (
    <div className={`w-full h-full grid grid-cols-3 grid-rows-2 ${gapClass}`}>
      {items.map((p, idx) => renderItem(p, idx))}
    </div>
  );
}
