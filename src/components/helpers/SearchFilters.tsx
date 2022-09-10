import React, { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const prioritiesNames = [
  "root_symbol",
  "bbg",
  "symbol",
  "ric",
  "cusip",
  "isin",
  "bb_yellow",
  "bloomberg",
  "spn",
  "security_id",
  "sedol",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const SearchFilters = () => {
  const theme = useTheme();
  const [priorityName, setPriorityName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof priorityName>) => {
    const {
      target: { value },
    } = event;

    setPriorityName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handlePrioritiesChanages = () => {
    console.log("click");
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Set Priority</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={priorityName}
          onClick={handlePrioritiesChanages}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Set Priority" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {prioritiesNames.map((name) => (
            <MenuItem
              key={name}
              value={name.toUpperCase()}
              style={getStyles(name, priorityName, theme)}
            >
              {name.toUpperCase()}
              {/* <DialogSelect priorityName={name} /> */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
