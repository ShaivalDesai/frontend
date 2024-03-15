import React from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  Card,
  styled,
  Grid,
  Box,
} from "@mui/material";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  photo: string[]; // Assuming photo is an array of image URLs
}

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight: 650,
  width: "100%",
  margin: "auto",
  transition: "0.3s",
  borderRadius: "10px",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[20],
  },
}));

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({
  product,
  onClick,
}) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CustomCard>
          <CardActionArea onClick={onClick}>
            {product.photo.map((photoUrl, index) => (
              <CardMedia
                key={index}
                component="img"
                height="500"
                src={`data:image/jpeg;base64,${photoUrl}`} // Fixing photo URL
                alt={`${product.brand} - ${index}`} // Add index to make alt text unique
              />
            ))}
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {product.brand}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Product Type: {product.product_type}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Price: ₹{product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </CustomCard>
      </Grid>
    </Box>
  );
};

export default ProductCard;
