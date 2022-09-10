import React, { useState } from "react";
import { Button, Container, TextField, Box } from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { ContainerSize } from "../types/helperTypes";

import "../styles/SearchBar.css";
import { CustomPaginationActionsTable } from "./helpers/CustomPaginationActionsTable";

export const SearchBar = (props: ContainerSize) => {
  const [userInput, setUserInput] = useState("");

  return (
    <>
      <Container maxWidth={props.maxWidth}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            {/* Search Bar */}
            <Box
              component={TextField}
              boxShadow={2}
              id="search-bar-input"
              label={
                <>
                  <Stack direction="row" spacing={1}>
                    <SearchIcon />
                    <p>Search Value</p>
                  </Stack>
                </>
              }
              fullWidth={true}
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            />

            {/* Search Button */}
            <Button
              variant="contained"
              onClick={() => {
                // Send request to the backend
                console.log(userInput);

                // Reset text field value
                setUserInput("");
              }}
            >
              Search
            </Button>
          </Stack>

          <CustomPaginationActionsTable />
        </Stack>
      </Container>
    </>
  );
};
