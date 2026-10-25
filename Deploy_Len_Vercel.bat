@echo off
chcp 65001 >nul
title ĐẨY WEB LÊN VERCEL - TIỆM KHUNG ẢNH & THƠ KUTE
echo ===================================================================
echo     🚀 HƯỚNG DẪN ĐẨY TRANG WEB LÊN VERCEL (HOÀN TOÀN MIỄN PHÍ)
echo ===================================================================
echo.
echo Hệ thống sẽ dùng công cụ Vercel CLI để đưa trang web lên mạng.
echo.
echo Các bước diễn ra như sau:
echo 1. Nếu là lần đầu, Vercel sẽ mở trình duyệt để bạn đăng nhập (bằng GitHub, Google hoặc Email).
echo 2. Sau khi đăng nhập, quay lại cửa sổ này và bấm Enter theo các mặc định.
echo 3. Sau khoảng 15 giây, bạn sẽ nhận được đường dẫn (Link web) để gửi cho mọi người!
echo.
pause
echo.
echo Đang tiến hành kết nối Vercel...
cd /d "%~dp0"
call npx vercel
echo.
echo ===================================================================
echo Đang triển khai lên bản chính thức (Production)...
call npx vercel --prod
echo ===================================================================
echo.
echo Hoàn tất! Nhấn phím bất kỳ để thoát.
pause >nul
exit
