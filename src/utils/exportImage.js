import { toPng, toJpeg, toCanvas } from 'html-to-image';
import confetti from 'canvas-confetti';

/**
 * Xuất ảnh HD chất lượng cao (Scale 2.5x) tải về máy
 */
export async function downloadCanvasAsImage(elementId, customFilename, format = 'png') {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error('Không tìm thấy khung ảnh để xuất');
  }

  // Tạm ẩn các thành phần điều khiển
  const noExportEls = node.querySelectorAll('.no-export');
  noExportEls.forEach(el => {
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  });

  try {
    await new Promise(r => setTimeout(r, 120));

    const exportOptions = {
      quality: 0.98,
      pixelRatio: 2.5,
      cacheBust: false,
      skipFonts: true,
      filter: (domNode) => {
        if (!domNode.classList) return true;
        return !domNode.classList.contains('no-export-strict');
      }
    };

    let dataUrl = null;

    if (format === 'jpeg' || format === 'jpg') {
      try {
        dataUrl = await toJpeg(node, exportOptions);
      } catch {
        const canvas = await toCanvas(node, exportOptions);
        dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      }
    } else {
      try {
        dataUrl = await toPng(node, exportOptions);
      } catch {
        const canvas = await toCanvas(node, exportOptions);
        dataUrl = canvas.toDataURL('image/png');
      }
    }

    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('Dữ liệu ảnh rỗng');
    }

    // Khôi phục hiển thị
    noExportEls.forEach(el => {
      el.style.opacity = '';
      el.style.pointerEvents = '';
    });

    // Bắn pháo hoa ăn mừng
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    // Tải file về máy
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
    const ext = format === 'jpeg' || format === 'jpg' ? 'jpg' : 'png';
    const filename = customFilename || `PhotoStudio_3D_${timestamp}.${ext}`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true, filename };
  } catch (error) {
    noExportEls.forEach(el => {
      el.style.opacity = '';
      el.style.pointerEvents = '';
    });
    console.error('Lỗi khi xuất ảnh:', error);
    throw error;
  }
}

/**
 * Sao chép ảnh trực tiếp vào Clipboard (Clipboard API)
 * Người dùng có thể dán ngay (Ctrl+V) vào Zalo, Messenger, Facebook, Figma mà không cần lưu file
 */
export async function copyCanvasToClipboard(elementId) {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error('Không tìm thấy khung ảnh');
  }

  const noExportEls = node.querySelectorAll('.no-export');
  noExportEls.forEach(el => {
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  });

  try {
    await new Promise(r => setTimeout(r, 120));

    const exportOptions = {
      quality: 0.98,
      pixelRatio: 2,
      cacheBust: false,
      skipFonts: true
    };

    let blob = null;
    try {
      const canvas = await toCanvas(node, exportOptions);
      blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch {
      const dataUrl = await toPng(node, exportOptions);
      const res = await fetch(dataUrl);
      blob = await res.blob();
    }

    noExportEls.forEach(el => {
      el.style.opacity = '';
      el.style.pointerEvents = '';
    });

    if (!blob) throw new Error('Không thể tạo dữ liệu ảnh để sao chép');

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (_) {}

    return { success: true };
  } catch (error) {
    noExportEls.forEach(el => {
      el.style.opacity = '';
      el.style.pointerEvents = '';
    });
    console.error('Lỗi khi sao chép vào clipboard:', error);
    throw error;
  }
}
