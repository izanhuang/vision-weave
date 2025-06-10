import React from "react";

interface Props {
  rssUrl: string;
  setRssUrl: (url: string) => void;
  width: number;
  setWidth: (w: number) => void;
  height: number;
  setHeight: (h: number) => void;
  onGenerate: () => void;
}

export const SidebarControls: React.FC<Props> = ({
  rssUrl,
  setRssUrl,
  width,
  setWidth,
  height,
  setHeight,
  onGenerate,
}) => (
  <div className="flex flex-col gap-4 w-64 p-4 border-r border-gray-200">
    <input
      type="text"
      placeholder="Pinterest RSS URL"
      value={rssUrl}
      onChange={(e) => setRssUrl(e.target.value)}
      className="p-2 border rounded"
    />
    <input
      type="number"
      placeholder="Width (px)"
      value={width}
      onChange={(e) => setWidth(Number(e.target.value))}
      className="p-2 border rounded"
    />
    <input
      type="number"
      placeholder="Height (px)"
      value={height}
      onChange={(e) => setHeight(Number(e.target.value))}
      className="p-2 border rounded"
    />
    <button
      onClick={onGenerate}
      className="px-4 py-2 rounded bg-green-500 text-white"
    >
      Generate
    </button>
  </div>
);
