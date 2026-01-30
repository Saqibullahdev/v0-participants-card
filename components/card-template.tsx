"use client";

import { forwardRef, useImperativeHandle, useEffect, useState } from "react";

interface CardTemplateProps {
  userName: string;
  onTextureReady: (dataUrl: string) => void;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
}

const CANVAS_SIZE = 512;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, onTextureReady }, ref) => {
    const [iconImage, setIconImage] = useState<HTMLImageElement | null>(null);

    // Preload the icon image
    useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setIconImage(img);
      img.src = "/icon.svg";
    }, []);

    const captureTexture = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      // Background - black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw icon in center
      if (iconImage) {
        const iconSize = 128;
        const iconX = (CANVAS_SIZE - iconSize) / 2;
        const iconY = (CANVAS_SIZE - iconSize) / 2 - 40; // Slightly above center
        ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
      }

      // Draw user name at bottom
      const displayName = userName || "YOUR NAME";
      ctx.fillStyle = "#ffffff";
      ctx.font = 'bold 28px "Geist Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "4px";
      
      const textY = CANVAS_SIZE - 80;
      ctx.fillText(displayName.toUpperCase(), CANVAS_SIZE / 2, textY);

      const dataUrl = canvas.toDataURL("image/png");
      onTextureReady(dataUrl);
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
    }));

    // This component doesn't render anything visible
    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;
