import React, { useState } from "react";
import { getPinterestImages } from "../lib/getPinterestImages.ts";
import { SidebarControls } from "../components/SidebarControls.tsx";
import { BoardCanvas } from "../components/BoardCanvas.tsx";
import { Photo } from "react-photo-album";
import photos from "../components/components.ts";

export default function Home() {
  const [rssUrl, setRssUrl] = useState("");
  const [images, setImages] = useState<Photo[]>([]);

  const generateBoard = async () => {
    const result = await getPinterestImages(rssUrl);
    setImages(result);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <SidebarControls
        rssUrl={rssUrl}
        setRssUrl={setRssUrl}
        onGenerate={generateBoard}
      />
      {images.length > 0 && <BoardCanvas images={images} />}
      {/* <BoardCanvas images={photos} /> */}
    </div>
  );
}
