import React from "react";

interface ThemeSelectorProps {
  current: string;
  onChange: (theme: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  current,
  onChange,
}) => (
  <div className="flex gap-2 mt-4">
    {["dreamy", "neutral", "cozy"].map((theme) => (
      <button
        key={theme}
        onClick={() => onChange(theme)}
        className={`px-3 py-1 rounded ${
          current === theme ? "bg-black text-white" : "bg-gray-200"
        }`}
      >
        {theme}
      </button>
    ))}
  </div>
);
