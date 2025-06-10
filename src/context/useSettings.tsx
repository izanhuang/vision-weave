import { LayoutType, Photo } from "react-photo-album";
import React from "react";

export type SettingsProps = {
  photos: Photo[];
  layout: LayoutType;
  targetRowHeight: number;
  columns: number;
  spacing: number;
  padding: number;
  width: number;
};

export const SettingsContext = React.createContext(
  null as SettingsProps | null
);

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsContext");
  return context;
}
