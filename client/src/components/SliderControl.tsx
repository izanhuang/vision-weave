import * as React from "react";

import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export function SliderControl({
  name,
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}: {
  name: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (event: Event, value: number, activeThumb: number) => void;
  disabled?: boolean;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <FormControl margin="none" fullWidth>
      <InputLabel shrink variant="standard" focused={focused}>
        {name}
      </InputLabel>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        size="small"
        valueLabelDisplay="auto"
        marks={[
          { value: min, label: `${min}` },
          { value: max, label: `${max}` },
        ]}
        onChange={(e, value, activeThumb) =>
          onChange(e, typeof value === "number" ? value : value[0], activeThumb)
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{ mt: 2 }}
      />
    </FormControl>
  );
}
