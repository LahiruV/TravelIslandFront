// SearchBar.js
import React from 'react';
import { TextField, InputAdornment, Button, Grid } from '@mui/material';

const SearchBar = ({ search, onSearchChange, onSearch }) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onSearch}
                                >
                                    Search
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    style={{ marginBottom: '20px' }}
                />
            </Grid>
        </Grid>
    );
};

export default SearchBar;
