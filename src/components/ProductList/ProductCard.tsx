import React, { useState } from 'react';
import { Product } from '../../types/Product.ts';
import CustomModal from '../Modal/CustomModal.tsx';
import placeholderImage from '../../assets/placeholder.png';
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    styled,
    Tooltip, tooltipClasses, TooltipProps,
    Typography
} from '@mui/material';

interface ProductCardProps {
    product: Product;
}

const StyledCard = styled(Card)(() => ({
    transition: 'transform 0.3s ease', // Плавный переход
    '&:hover': {
        transform: 'scale(1.1)', // Увеличение при наведении
    },
}));

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const imageSrc = product.image || placeholderImage;

    const LimitedTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '250px',
        },
    });

    return (
        <>
        <StyledCard sx={{ minWidth: 275,
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            cursor: "pointer",
            width: "calc(33.33% - 20px)",
            boxSizing: "border-box",
            backgroundColor: "#fff",
            display: "inline-block",
            verticalAlign: "top",
            height: "400px"
        }} onClick={openModal}>
            <CardContent>
                <CardHeader titleTypographyProps={{fontWeight: "5pt"}}
                    title={<Typography variant="h6" sx={{ fontSize: '1rem', fontWeight:'bold' }}>{product.name}</Typography>}
                            subheader={"Категория: "+product.category}
                />
                <LimitedTooltip title={product.description} sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={imageSrc}
                        alt={product.name}
                    />
                </LimitedTooltip>
                <Typography variant="body2" sx={{mt:2}}>
                    Количество: {product.quantity} {product.unit}
                </Typography>
            </CardContent>
        </StyledCard>
        <CustomModal isOpen={isModalOpen} onClose={closeModal} product={product} />
        </>
    );
};

export default ProductCard;