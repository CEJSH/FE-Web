const cropAndResizeImage = async (
  imageUrl: string,
  canvasWidth: number,
  canvasHeight: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: false }); // alpha 비활성화로 성능 향상

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      // 레티나 디스플레이 대응을 위한 크기 조정
      const scale = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * scale;
      canvas.height = canvasHeight * scale;

      // CSS 크기 설정
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";

      // 이미지 렌더링 품질 설정
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const imageAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let sourceWidth, sourceHeight, sourceX, sourceY;

      if (imageAspectRatio > canvasAspectRatio) {
        sourceHeight = img.height;
        sourceWidth = canvasAspectRatio * sourceHeight;
        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
      } else {
        sourceWidth = img.width;
        sourceHeight = sourceWidth / canvasAspectRatio;
        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // 배경을 흰색으로 설정 (선택사항)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // 고품질 PNG로 변환 (1.0은 최대 품질)
      resolve(canvas.toDataURL("image/png", 1.0));

      // 또는 JPEG를 사용하고 싶다면 (0.95는 95% 품질)
      // resolve(canvas.toDataURL("image/jpeg", 0.95));
    };

    img.onerror = (error) => reject(error);
  });
};
export default cropAndResizeImage;
