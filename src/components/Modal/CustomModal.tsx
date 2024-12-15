import React from 'react';
import { Product } from '../../types/Product.ts';
import placeholderImage from '../../assets/placeholder.png';
import {Box, Modal, Typography} from "@mui/material";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description" sx={{ maxHeight: '80%',overflowY: 'auto', mt:10}}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {product.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {product.description}
                    <br/>
                    <br/>
                    Категория: {product.category}
                    <br/>
                    <br/>
                    Количество: {product.quantity} {product.unit}
                </Typography>
                <img src={product.image || placeholderImage} alt={product.name} style={{width:'100%'}} />
            </Box>
        </Modal>
    );
};

export default CustomModal;