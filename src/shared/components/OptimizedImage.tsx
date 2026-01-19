"use client";

import { useEffect, useMemo, useState } from "react";
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  effort?: number;
  className?: string;
  style?: object;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  quality = 80,
  effort = 5,
  className = "",
  loading = "lazy",
  style,
  onLoad,
}: OptimizedImageProps) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  const optimizedSrc = useMemo(() => {
    if (!src) return "/placeholder.png";
    if (src.startsWith("/api/resize")) return src;
    return `/api/resize?url=${encodeURIComponent(src)}&width=${Math.round(
      width * dpr
    )}&height=${Math.round(height * dpr)}&quality=${quality}&effort=${effort}`;
  }, [src, width, height, quality, effort, dpr]);

  return (
    <img
      style={style}
      loading={loading}
      width={width}
      height={height}
      srcSet={`${optimizedSrc}&dpr=1 1x, ${optimizedSrc}&dpr=2 2x, ${optimizedSrc}&dpr=3 3x`}
      sizes={`${width}px`}
      src={optimizedSrc}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder.png";
      }}
    />
  );
}
