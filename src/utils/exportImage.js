import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

export async function downloadCanvasAsImage(elementId, customFilename) {
  const node = document.getElementById(elementId);
  if (!node) {
    alert('Không tìm thấy khung ảnh để xuất!');
    return;
  }

  try {
    // Ẩn tạm thời các nút điều khiển / viền chọn có class 'no-export'
    const noExportEls = node.querySelectorAll('.no-export');
    noExportEls.forEach(el => el.style.visibility = 'hidden');

    // Chờ 1 nhịp ngắn để layout ổn định
    await new Promise(r => setTimeout(r, 120));

    // Render ảnh PNG ở tỷ lệ Scale 2.5x siêu nét
    const dataUrl = await toPng(node, {
      quality: 0.98,
      pixelRatio: 2.5,
      cacheBust: true,
      filter: (domNode) => {
        return !domNode.classList || !domNode.classList.contains('no-export-strict');
      }
    });

    // Khôi phục hiển thị
    noExportEls.forEach(el => el.style.visibility = '');

    // Bắn pháo hoa ăn mừng
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    // Tạo link tải
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
    const filename = customFilename || `PhotoMagic_Studio_${timestamp}.png`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error('Lỗi khi xuất ảnh:', error);
    alert('Có lỗi khi tạo ảnh chất lượng cao. Vui lòng thử lại!');
    return false;
  }
}
