import html2canvas from "html2canvas";
import React, { useRef } from "react";
import photos from "./components.ts";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

interface BoardCanvasProps {
  images: string[];
  theme: any;
  width: number;
  height: number;
  onRandomize: () => void;
}

export const BoardCanvas = ({
  images,
  theme,
  width,
  height,
  onRandomize,
}): BoardCanvasProps => {
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
      <MasonryPhotoAlbum photos={images} />
      <div
        ref={boardRef}
        className={`relative flex flex-wrap justify-center gap-2 p-4 ${theme.bg} ${theme.font}`}
        style={{ width: "auto", height: "100%" }}
      >
        {/* {images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-xl ${theme.border}`}
            style={{
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
              width: "auto",
              height: "100%",
            }}
          >
            <img
              src={img}
              alt=""
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))} */}
      </div>
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
