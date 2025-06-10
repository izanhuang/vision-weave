import html2canvas from "html2canvas";
import React, { useRef } from "react";
import photos from "./components.ts";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Settings from "./Settings.tsx";
import { Playground } from "./Playground.tsx";

interface BoardCanvasProps {
  images: string[];
  theme: any;
  width: number;
  height: number;
  onRandomize: () => void;
}

export const BoardCanvas = ({ images, theme, width, height, onRandomize }) => {
  const boardRef = useRef(null);

  const handleDownload = async () => {
    if (!boardRef.current) return;
    const canvas = await html2canvas(boardRef.current as HTMLElement, {
      useCORS: true,
      scale: 2,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "vision-board.png";
    link.click();
  };

  return (
    <div>
      <Settings>
        <Playground />
      </Settings>
      <div className="mt-4 flex gap-4">
        <button
          onClick={onRandomize}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          🎲 Randomize
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          ⬇️ Download
        </button>
      </div>
    </div>
  );
};
