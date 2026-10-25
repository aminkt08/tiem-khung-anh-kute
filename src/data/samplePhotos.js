// Tạo ảnh mẫu nghệ thuật nội bộ dạng SVG Data URL (An toàn 100% CORS & Không phụ thuộc mạng)
export const createSamplePhoto = (gradientColors, icon, text) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${gradientColors[0]}" />
        <stop offset="50%" stop-color="${gradientColors[1]}" />
        <stop offset="100%" stop-color="${gradientColors[2]}" />
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#g)" />
    <circle cx="400" cy="420" r="160" fill="white" opacity="0.45" />
    <text x="400" y="440" font-size="120" text-anchor="middle" dominant-baseline="middle">${icon}</text>
    <text x="400" y="650" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="bold" fill="#333333" text-anchor="middle" opacity="0.85">${text}</text>
    <text x="400" y="700" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" fill="#555555" text-anchor="middle" opacity="0.75">Bấm &quot;Tải ảnh lên&quot; để chọn ảnh của bạn</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
