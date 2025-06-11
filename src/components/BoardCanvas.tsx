import React, { useCallback, useRef } from "react";
import "react-photo-album/masonry.css";
import Settings from "./Settings.tsx";
import { Playground } from "./Playground.tsx";
import { toJpeg, toPng } from "html-to-image";
import { Photo } from "react-photo-album";

interface BoardCanvasProps {
  images: Photo[];
}

export const BoardCanvas = ({ images }: BoardCanvasProps) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    if (boardRef.current === null) {
      return;
    }

    toJpeg(boardRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "vision-board.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardRef]);

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
