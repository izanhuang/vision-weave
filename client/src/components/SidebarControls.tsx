import React from "react";

interface Props {
  rssUrl: string;
  setRssUrl: (url: string) => void;
  onGenerate: () => void;
}

export const SidebarControls: React.FC<Props> = ({
  rssUrl,
  setRssUrl,
  onGenerate,
}) => (
  <div className="flex flex-col self-center gap-4 p-8  border-r border-gray-200">
    <p>If your Pinterest board is public, you can paste the RSS URL here:</p>
    <input
      type="text"
      placeholder="https://www.pinterest.com/username/boardname.rss"
      value={rssUrl}
      onChange={(e) => setRssUrl(e.target.value)}
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
