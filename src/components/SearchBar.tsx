import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Box } from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { ContainerSize } from "../types/helperTypes";

import "../styles/SearchBar.css";
import { CustomPaginationActionsTable } from "./CustomPaginationActionsTable";
import { Data } from "../types/customPaginationTypes";

export const SearchBar = (props: ContainerSize) => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState(Array<Data>);

  async function searchData(userInputData: String) {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "React Hooks POST Request Example",
      }),
    };

    // GET request using fetch inside useEffect React hook
    const response = await fetch(
      `http://127.0.0.1:5001/searchName/${userInputData}`,
      requestOptions
    );
    const data = await response.json();
    setData(data.data);

    // Reset text field value
    setUserInput("");
  }

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
                // Get data
                if (userInput.length !== 0) {
                  searchData(userInput);
                  console.log(data);
                }
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
