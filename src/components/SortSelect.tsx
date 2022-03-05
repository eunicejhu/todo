import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";

export interface Option<T> {
  text: string;
  value: string;
  sort: (a: T[]) => T[];
}
interface iSortSelect<T> {
  sort: string;
  options: Option<T>[];
  onChange: (event: SelectChangeEvent) => void;
}

export type { SelectChangeEvent };

function SortSelect<T>(props: iSortSelect<T>) {
  const { sort, options, onChange } = props;
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={sort}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Sort by" }}
        data-testid="sort-select"
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Sort By</FormHelperText>
    </FormControl>
  );
}
export default SortSelect;
