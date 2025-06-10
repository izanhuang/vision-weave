import React, { useState } from "react";
import { getPinterestImages } from "../lib/getPinterestImages.ts";
import { SidebarControls } from "../components/SidebarControls.tsx";
import { BoardCanvas } from "../components/BoardCanvas.tsx";
export default function Home() {
  const [rssUrl, setRssUrl] = useState("");
  const [images, setImages] = useState<any[]>([]);

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
    </div>
  );
}
