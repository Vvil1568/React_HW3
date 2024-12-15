import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFieldProps {
    onChange: (searchTerm: string) => void;
    value: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ onChange, value })  => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                placeholder="Поиск..."
                value={value}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={handleClear}
                            style={{ visibility: value ? 'visible' : 'hidden' }}
                        >
                            <ClearIcon />
                        </IconButton>
                    ),
                }}
                style={{ flexGrow: 1, margin: '8px 16px' }} // Сделать поле текстового ввода растягивающимся
            />
        </div>
    );
};

export default SearchField;