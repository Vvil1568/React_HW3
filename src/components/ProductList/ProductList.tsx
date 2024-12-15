import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/Product.ts';
import Grid from '@mui/material/Grid2';
import {Pagination, Stack} from '@mui/material';

interface ProductListProps {
    products: Product[];
}

export const pageSize = 15;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const [page, setPage] = React.useState(1);
    const handleChange = (_: unknown, value: number) => {
        setPage(value);
    };
    const productsToShow = products.slice((page-1)*pageSize, page*pageSize)
    return (
        <Stack sx={{mt:3}}>
            <Grid container columns={20} spacing={2} style={{ padding: '16px' }}>
                {productsToShow.map((product, index) => (
                    <Grid key={index}  size={{ xs: 5, sm: 4, md: 4 }}>
                        <ProductCard key={product.name} product={product} />
                    </Grid>
                ))}
            </Grid>
            <Pagination count={Math.ceil(products.length/pageSize)} page={page} onChange={handleChange}/>
        </Stack>
    );
};


export default ProductList;