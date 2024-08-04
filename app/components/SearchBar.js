// components/SearchBar.js
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) =>
{
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search items..."
      onChange={ (e) => onSearch(e.target.value) }
      InputProps={ {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      } }
    />
  );
};

export default SearchBar;