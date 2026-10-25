import { toPng, toCanvas } from 'html-to-image';
import confetti from 'canvas-confetti';

export async function downloadCanvasAsImage(elementId, customFilename) {
  const node = document.getElementById(elementId);
  if (!node) {
    alert('Không tìm thấy khung ảnh để xuất!');
    return false;
  }

  // 1. Tạm ẩn các nút điều khiển / icon xóa có class 'no-export'
  const noExportEls = node.querySelectorAll('.no-export');
  noExportEls.forEach(el => {
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  });

  try {
    // Chờ 1 chút để DOM và ảnh ổn định
    await new Promise(r => setTimeout(r, 150));

    // Cấu hình tối ưu tuyệt đối:
    // - cacheBust: false (bắt buộc để không làm hỏng URL blob: của ảnh tải lên)
    // - skipFonts: true (bắt buộc để tránh lỗi SecurityError / CORS khi đọc stylesheet Google Fonts)
    // - pixelRatio: 2 (chuẩn sắc nét cao mà không bị tràn bộ nhớ mobile/desktop)
    const exportOptions = {
      quality: 0.98,
      pixelRatio: 2,
      cacheBust: false,
      skipFonts: true,
      filter: (domNode) => {
        if (!domNode.classList) return true;
        return !domNode.classList.contains('no-export-strict');
      }
    };

    let dataUrl = null;

    try {
      // Cách 1: Xuất PNG chuẩn
      dataUrl = await toPng(node, exportOptions);
    } catch (pngError) {
      console.warn('toPng gặp sự cố, chuyển sang toCanvas fallback...', pngError);
      // Cách 2: Fallback qua toCanvas rồi lấy dataUrl
      const canvas = await toCanvas(node, exportOptions);
      dataUrl = canvas.toDataURL('image/png');
    }

    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('Dữ liệu ảnh rỗng');
    }

    // Khôi phục hiển thị các nút điều khiển
    noExportEls.forEach(el => {
      el.style.opacity = '';
      el.style.pointerEvents = '';
    });

    // Bắn pháo hoa ăn mừng
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    // Tải ảnh về máy
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const filename = customFilename || `PhotoMagic_Studio_${timestamp}.png`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Lỗi chi tiết khi xuất ảnh:', error);

    // Khôi phục hiển thị
    noExportEls.forEach(el => {
      el.style.opacity = '';
      el.style.pointerEvents = '';
    });

    alert('Có lỗi khi tạo ảnh chất lượng cao (' + (error.message || 'Lỗi bộ nhớ/CORS') + '). Hãy thử thu nhỏ khung hình hoặc đổi sang ảnh khác nhé!');
    return false;
  }
}
