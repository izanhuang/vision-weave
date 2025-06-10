import React, { useLayoutEffect } from "react";
import { Paper, Grid, TextField, MenuItem } from "@mui/material";
import { LayoutType, Photo } from "react-photo-album";
import { SliderControl } from "./SliderControl.tsx";
import { Filter } from "./Filter.tsx";
import { SettingsContext } from "../context/useSettings.tsx";

export default function Settings({ images, children }) {
  const [layout, setLayout] = React.useState<LayoutType>("rows");
  const [count, setCount] = React.useState(images.length);
  const [targetRowHeight, setTargetRowHeight] = React.useState(300);
  const [columns, setColumns] = React.useState(5);
  const [spacing, setSpacing] = React.useState(30);
  const [padding, setPadding] = React.useState(10);
  const [width, setWidth] = React.useState(100);

  useLayoutEffect(() => {
    const viewportSize = window.innerWidth;
    setColumns(viewportSize < 480 ? 2 : viewportSize < 900 ? 3 : 5);
    setSpacing(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
    setPadding(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
    setTargetRowHeight(
      viewportSize < 480 ? 100 : viewportSize < 900 ? 150 : 200
    );
  }, []);

  const settings = React.useMemo(
    () => ({
      photos: images.slice(0, count),
      layout,
      targetRowHeight,
      columns,
      spacing,
      padding,
      width,
    }),
    [layout, count, targetRowHeight, columns, spacing, padding, width]
  );

  return (
    <SettingsContext.Provider value={settings}>
      <Paper variant="outlined" sx={{ mb: 4, p: 2, textAlign: "left" }}>
        <Grid
          container
          columns={24}
          rowSpacing={2}
          columnSpacing={4}
          // flexDirection={"column"}
        >
          <Grid size={8}>
            <Filter>
              <TextField
                select
                fullWidth
                label="Layout"
                variant="standard"
                margin="none"
                value={layout}
                onChange={(event) =>
                  setLayout(event.target.value as LayoutType)
                }
              >
                {[
                  { value: "rows", title: "Rows" },
                  { value: "columns", title: "Columns" },
                  { value: "masonry", title: "Masonry" },
                ].map(({ value, title }) => (
                  <MenuItem key={value} value={value}>
                    {title}
                  </MenuItem>
                ))}
              </TextField>
            </Filter>
          </Grid>

          <Grid size={8}>
            <Filter>
              <SliderControl
                name="Photos"
                min={1}
                max={images.length}
                value={count}
                onChange={(_, value) => setCount(value)}
              />
            </Filter>
          </Grid>

          <Grid size={8}>
            <Filter>
              <SliderControl
                name="Spacing"
                min={0}
                max={50}
                value={spacing}
                onChange={(_, value) => setSpacing(value)}
              />
            </Filter>
          </Grid>

          <Grid size={8}>
            <Filter>
              <SliderControl
                name="Padding"
                min={0}
                max={50}
                value={padding}
                onChange={(_, value) => setPadding(value)}
              />
            </Filter>
          </Grid>

          <Grid size={8}>
            <Filter>
              <SliderControl
                name="Row height"
                min={50}
                max={500}
                step={5}
                value={targetRowHeight}
                disabled={layout !== "rows"}
                onChange={(_, value) => setTargetRowHeight(value)}
              />
            </Filter>
          </Grid>

          <Grid size={8}>
            <Filter>
              <SliderControl
                name="Columns"
                min={1}
                max={10}
                value={columns}
                disabled={layout === "rows"}
                onChange={(_, value) => setColumns(value)}
              />
            </Filter>
          </Grid>

          <Grid size={8}>
            <Filter>
              <SliderControl
                name="Width (%)"
                min={10}
                max={100}
                step={5}
                value={width}
                onChange={(_, value) => setWidth(value)}
              />
            </Filter>
          </Grid>
        </Grid>
      </Paper>

      {children}
    </SettingsContext.Provider>
  );
}
