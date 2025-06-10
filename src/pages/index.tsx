import React, { useState } from "react";
import { getPinterestImages } from "../lib/getPinterestImages.ts";
import { themes } from "../lib/themes.ts";
import { SidebarControls } from "../components/SidebarControls.tsx";
import { BoardCanvas } from "../components/BoardCanvas.tsx";
import { ThemeSelector } from "../components/ThemeSelector.tsx";
import { MasonryPhotoAlbum } from "react-photo-album";
import photos from "../components/components.ts";

export default function Home() {
  const [rssUrl, setRssUrl] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [themeKey, setThemeKey] = useState(
    "dreamy" as "dreamy" | "neutral" | "cozy"
  );
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const generateBoard = async () => {
    const result = await getPinterestImages(rssUrl);
    setImages(result);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarControls
        rssUrl={rssUrl}
        setRssUrl={setRssUrl}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        onGenerate={generateBoard}
      />

      <div className="flex-1 overflow-auto p-6">
        <ThemeSelector
          current={themeKey}
          onChange={(theme) =>
            setThemeKey(theme as "dreamy" | "neutral" | "cozy")
          }
        />
        <BoardCanvas
          images={images}
          theme={themes[themeKey]}
          width={width}
          height={height}
          onRandomize={generateBoard}
        />
      </div>
    </div>
  );
}
