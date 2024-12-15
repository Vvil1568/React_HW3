import React, {useState} from 'react';
import ProductList from './components/ProductList/ProductList';
import Navigation from './components/Navigation/Navigation.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import {Product} from './types/Product.ts';
import {FilterData} from './types/FilterData';
import productData from './data/products.json';
import {styled} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {red} from '@mui/material/colors'; // Import red color palette

export const drawerWidth = 280;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    variants: [
        {
            props: ({open}) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: `${drawerWidth}px`,
            },
        },
    ],
}));


const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState<FilterData>({searchTerm: "", onlyAvailable: false, category: ""});
    const [products] = useState<Product[]>(productData);

    const redTheme = createTheme({
        palette: {
            primary: {
                main: red[500],
                light: red[200],
                dark: red[700],
            },
            secondary: {
                main: red[300],
                light: red[100],
            },
            error: {
                main: red[900],
            },
        },
    });

    const filteredProducts = products.filter((product) => {
        if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
            return false;
        }
        if (filters.onlyAvailable && product.quantity <= 0) {
            return false;
        }
        if (filters.category && product.category !== filters.category) {
            return false;
        }
        return true;
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <ThemeProvider theme={redTheme}>
            <div className="app">
                <Navigation toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
                <div className="main-content">
                    <Sidebar isOpen={isSidebarOpen} setOpen={setIsSidebarOpen} filterData={filters}
                             setFilterData={setFilters}/>
                    <Main open={isSidebarOpen}>
                        <ProductList products={filteredProducts}/>
                    </Main>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;