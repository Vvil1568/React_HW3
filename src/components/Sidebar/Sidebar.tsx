import React from 'react';
import {drawerWidth} from "../../App.tsx";
import {
    Button,
    Checkbox,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton, InputAdornment, InputLabel, MenuItem, Select,
    styled,
    useTheme
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchField from "./SearchField.tsx";
import { FilterData } from '../../types/FilterData.ts'
import ClearIcon from "@mui/icons-material/Clear";

interface SidebarProps {
    isOpen: boolean;
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
    filterData: FilterData;
    setFilterData:  React.Dispatch<React.SetStateAction<FilterData>>;
}

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpen, filterData, setFilterData }) => {
    const theme = useTheme();

    const handleSearchChange = (searchTerm: string) => {
        setFilterData({ ...filterData, searchTerm });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({ ...filterData, onlyAvailable: event.target.checked });
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({ ...filterData, category: event.target.value });
    };

    const handleResetFilters = () => {
        setFilterData({ searchTerm: '', onlyAvailable: false, category: '' });
    };

    const handleClearCategory = () => {
        setFilterData({ ...filterData, category: '' });
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                margin: '8px 16px'
            }}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <DrawerHeader>
                <IconButton onClick={()=>setOpen(false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <SearchField onChange={handleSearchChange} value={filterData.searchTerm}/>
            <FormGroup>
                <FormControlLabel sx={{mt:5}} control={<Checkbox checked={filterData.onlyAvailable} onChange={handleCheckboxChange}/>} label="Только товары в наличии" />
                <Divider/>
                <FormControl fullWidth sx={{marginTop:5}}>
                    <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                    <Select
                        variant="standard"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={filterData.category}
                        onChange={handleCategoryChange}
                        endAdornment={ // Add endAdornment
                            filterData.category ? ( // Conditionally render the ClearIcon
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClearCategory}
                                        edge="end"
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }
                    >
                        <MenuItem value={"Электроника"}>Электроника</MenuItem>
                        <MenuItem value={"Одежда"}>Одежда</MenuItem>
                        <MenuItem value={"Книги"}>Книги</MenuItem>
                        <MenuItem value={"Техника для кухни"}>Техника для кухни</MenuItem>
                    </Select>
                </FormControl>
            </FormGroup>
            <Button variant="contained" sx={{mt:5, margin: '8px 16px'}} onClick={handleResetFilters}>Сбросить все фильтры</Button>
            <Button variant="contained" sx={{mt:5, margin: '8px 16px'}} onClick = {()=>setOpen(false)}>Поиск</Button>
        </Drawer>
    );
};


export default Sidebar;