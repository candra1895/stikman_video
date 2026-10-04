@echo off
if not exist renders mkdir renders
echo Rendering Stickman vs Web at 1080x1920 / 60 FPS...
npx hyperframes render --fps 60 --quality high --output renders\stickman-vs-web-60fps.mp4
echo.
echo Render complete: renders\stickman-vs-web-60fps.mp4
pause
