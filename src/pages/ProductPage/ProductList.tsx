import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActionArea,
  IconButton,
  Pagination,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../Home/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface ProductPageProps {
  wishlist: Product[];
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
}
interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image_base64: string[];
  category: string;
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

const CustomCardMedia = styled(CardMedia)({
  height: 260,
  transition: "0.3s",
  "&:hover": {
    opacity: 0.8,
  },
});

const ProductNameTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const ProductPage: React.FC<ProductPageProps> = ({ wishlist, setWishlist }) => {
  const [likedProducts, setLikedProducts] = useState<boolean[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const productsPerPage = 16;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleCardClick = (productId: number) => {
    navigate("/single", { state: { productId } });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category") || "";
        const brand = queryParams.get("brand") || "";
        const response = await axios.get(`http://127.0.0.1:8000/products/`, {
          params: {
            category,
            brand,
          },
        });
        const productsArray: Product[] = Object.values(response.data);
        setProducts(productsArray);
        setLikedProducts(Array(productsArray.length).fill(false));
        setTotalPages(Math.ceil(productsArray.length / productsPerPage));

        const savedLikes = JSON.parse(
          localStorage.getItem("likedProducts") || "{}"
        );
        setLikedProducts(savedLikes);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to the top
  };

  const currentProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const toggleLike = (productId: number) => {
    setLikedProducts((prevLikedProducts) => {
      const newLikedProducts = {
        ...prevLikedProducts,
        [productId]: !prevLikedProducts[productId],
      };
      localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));
      return newLikedProducts;
    });
  };

  const handleAddToCart = (selectedProduct: Product) => {
    const isProductInCart = wishlist.some(
      (item) =>
        item.product_id === selectedProduct.product_id &&
        // item.product_type === selectedProduct.product_type &&
        item.image_base64 === selectedProduct.image_base64
    );

    if (!isProductInCart) {
      setWishlist((prevCart: Product[]) => [...prevCart, selectedProduct]);
      console.log("Added product to wishlist:", selectedProduct);
    } else {
      alert("This product is already in the wishlist.");
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          {currentProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
              <CustomCard>
                <CardActionArea onClick={() => handleCardClick(product.product_id)}>
                 
                  <CardMedia
                    component="img"
                    src={`data:image/jpeg;base64,${product.image_base64}`}
                    alt={product.product_type}
                  />
                  <Box position="absolute" top={0} right={0} zIndex={1} p={1}>
                    <IconButton
                      color={likedProducts[index] ? "primary" : "default"}
                      onClick={() => toggleLike(index)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
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

                  {/* </Link> */}
                </CardActionArea>
                <Box mt={2} textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to wishlist
                  </Button>
                </Box>
              </CustomCard>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
