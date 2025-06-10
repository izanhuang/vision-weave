import html2canvas from "html2canvas";
import React, { useRef } from "react";
import "react-photo-album/masonry.css";
import Settings from "./Settings.tsx";
import { Playground } from "./Playground.tsx";

interface BoardCanvasProps {
  images: string[];
}

export const BoardCanvas = ({ images }: BoardCanvasProps) => {
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
      <Settings images={images}>
        <Playground />
      </Settings>
      <div className="mt-4 flex gap-4">
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
