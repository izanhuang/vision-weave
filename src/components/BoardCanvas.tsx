import React, { useRef } from "react";
import "react-photo-album/masonry.css";
import Settings from "./Settings.tsx";
import { Playground } from "./Playground.tsx";
import { toPng } from "html-to-image";

interface BoardCanvasProps {
  images: string[];
}

export const BoardCanvas = ({ images }: BoardCanvasProps) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!boardRef.current) return;

    try {
      const dataUrl = await toPng(boardRef.current, {
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = "vision-board.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Image generation failed:", err);
    }
  };

  return (
    <div>
      <Settings images={images}>
        <Playground ref={boardRef} />
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
