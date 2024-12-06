// import React, { useState } from "react";
// import { Box, TextField, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import { changeSearchValue } from "../../redux/products/slice";

// const SearchBar: React.FC = () => {
//   const [value, setValue] = useState<string>("");
//   const dispatch = useDispatch<AppDispatch>();

//   const handleSearch = () => {
//     dispatch(changeSearchValue(value));
//   };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       gap={2}
//       sx={{ margin: "10px 0" }}
//     >
//       <TextField
//         variant="outlined"
//         placeholder="Search..."
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         size="small"
//         sx={{
//           width: "300px",
//           "& .MuiOutlinedInput-root": {
//             height: "37px",
//           },
//         }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSearch}
//         sx={{
//           minWidth: "80px",
//           height: "37px",
//           fontSize: "0.875rem",
//           padding: "0 16px",
//         }}
//       >
//         Search
//       </Button>
//     </Box>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "../../icons/Icon";
import { changeSearchValue } from "../../redux/products/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const SearchBar: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    dispatch(changeSearchValue(value));
  };

  const clearInput = () => {
    setValue("");
    dispatch(changeSearchValue(""));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{ margin: "20px 0" }}
    >
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="small"
        fullWidth
        InputProps={{
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={clearInput}
                edge="end"
                size="small"
              >
                <Icon id="close" className="clear_value" size={20} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "300px",
          "& .MuiOutlinedInput-root": {
            height: "37px",
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          minWidth: "80px",
          height: "37px",
          fontSize: "0.875rem",
          padding: "0 16px",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
