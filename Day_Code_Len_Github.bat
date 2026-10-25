@echo off
chcp 65001 >nul
title ĐẨY CODE LÊN GITHUB - AMINKT08
echo ===================================================================
echo     🚀 ĐẨY MÃ NGUỒN LÊN GITHUB: aminkt08/tiem-khung-anh-kute
echo ===================================================================
echo.
echo ⚠️ Lưu ý quan trọng:
echo Bạn hãy đảm bảo đã tạo sẵn repository trống tên "tiem-khung-anh-kute"
echo trên trang GitHub của bạn tại: https://github.com/new
echo.
echo Nhấn phím bất kỳ để bắt đầu đẩy code lên...
pause >nul
echo.
echo Đang đẩy mã nguồn lên GitHub...
cd /d "%~dp0"
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================================
    echo  🎉 ĐẨY CODE LÊN GITHUB THÀNH CÔNG!
    echo  Link repository: https://github.com/aminkt08/tiem-khung-anh-kute
    echo ===================================================================
    echo.
    echo BƯỚC TIẾP THEO:
    echo 1. Vào https://vercel.com/new
    echo 2. Chọn dự án "tiem-khung-anh-kute" và bấm nút "Deploy"
    echo 3. Chờ 15 giây là trang web sẽ có link online công khai!
) else (
    echo ===================================================================
    echo  ❌ Chưa đẩy được code lên!
    echo  Vui lòng kiểm tra lại:
    echo  1. Bạn đã tạo repo "tiem-khung-anh-kute" trên https://github.com/new chưa?
    echo  2. Nếu có hộp thoại đăng nhập GitHub hiện lên, hãy bấm "Sign in with browser".
    echo ===================================================================
)
echo.
pause
exit
