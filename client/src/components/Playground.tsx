import React, { forwardRef } from "react";
import Box from "@mui/material/Box";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import { useSettings } from "../context/useSettings.tsx";

export const Playground = forwardRef<HTMLDivElement>((_, ref) => {
  const { photos, layout, columns, targetRowHeight, spacing, padding, width } =
    useSettings();

  return (
    <Box sx={{ width: `${width}%`, mx: "auto" }} ref={ref}>
      <PhotoAlbum
        photos={photos}
        layout={layout}
        columns={columns}
        spacing={spacing}
        padding={padding}
        targetRowHeight={targetRowHeight}
        render={{
          wrapper: ({ style, ...rest }) => (
            <div
              style={{
                ...style,
                borderRadius: padding > 2 ? "4px" : 0,
                boxShadow:
                  spacing + padding > 0
                    ? "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                    : "none",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
              {...rest}
            />
          ),
        }}
      />
    </Box>
  );
});
