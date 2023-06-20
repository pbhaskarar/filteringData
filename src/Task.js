// import React, { useEffect, useState } from "react";
// import Container from "@mui/material/Container";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Rating,
//   Select,
//   Stack,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import "./App.css";


// const Task = () => {
//   const [productData, setProductData] = useState([]);
//   const [brand, setBarnd] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [isRatingFilterActive, setIsRatingFilterActive] = useState(false);
//   const [isDiscountFilterActive, setIsDiscountFilterActive] = useState(false);
//   const [isStockFilterActive, setIsStockFilterActive] = useState(false);
//   const [sortBy, setSortBy] = useState(null);
//   const [isResetClicked, setIsResetClicked] = useState(false);

//   useEffect(() => {
//     axios
//       .get("https://dummyjson.com/products")
//       .then((response) => setProductData(response.data.products));
//   }, []);

//   const handleBrandNames = (e) => {
//     setBarnd(e.target.value);
//   };

//   const handleCategoryNames = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleRatingFilter = () => {
//     setIsRatingFilterActive((prevState) => !prevState);
//   };

//   const handleDiscountFilter = () => {
//     setIsDiscountFilterActive((prevState) => !prevState);
//   };

//   const handleStockFilter = () => {
//     setIsStockFilterActive((prevState) => !prevState);
//   };

//   const handleSortBy = (e) => {
//     const { value } = e.target;
//     setSortBy(isResetClicked ? null : value);
//   };

//   const handleReset = () => {
//     setIsResetClicked(true);
//     setBarnd([]);
//     setCategory([]);
//     setIsRatingFilterActive(false);
//     setIsDiscountFilterActive(false);
//     setIsStockFilterActive(false);
//     setSortBy(null);
//   };

//   const filteredProducts = productData
//     .filter(
//       (productDataitem) =>
//         brand.length === 0 || brand.includes(productDataitem.brand)
//     )
//     .filter(
//       (productDataitem) =>
//         category.length === 0 || category.includes(productDataitem.category)
//     )
//     .filter(
//       (productDataitem) =>
//         !isDiscountFilterActive || productDataitem.discountPercentage > 10
//     )
//     .filter(
//       (productDataitem) => !isRatingFilterActive || productDataitem.rating > 4
//     )
//     .filter(
//       (productDataitem) => !isStockFilterActive || productDataitem.stock > 100
//     )
//     .sort((firstItem, secondItem) => {
//       if (sortBy === "price_lh") {
//         return firstItem.price - secondItem.price;
//       }
//       if (sortBy === "price_hl") {
//         return secondItem.price - firstItem.price;
//       }
//       return firstItem.rating - secondItem.rating;
//     });

//   const isAnyFilterActive =
//     brand.length > 0 ||
//     category.length > 0 ||
//     isDiscountFilterActive ||
//     isRatingFilterActive ||
//     isStockFilterActive ||
//     sortBy !== null;

//   useEffect(() => {
//     if (isResetClicked && !isAnyFilterActive) {
//       axios
//         .get("https://dummyjson.com/products")
//         .then((response) => setProductData(response.data.products));
//       setIsResetClicked(false);
//     }
//   }, [isResetClicked, isAnyFilterActive]);

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Brand</InputLabel>
//           <Select
//             multiple
//             value={brand}
//             onChange={handleBrandNames}
//             renderValue={(selected) => selected.join(", ")}
//           >
//             {productData.map((product) => (
//               <MenuItem key={product.id} value={product.brand}>
//                 {product.brand}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Category</InputLabel>
//           <Select
//             multiple
//             value={category}
//             onChange={handleCategoryNames}
//             renderValue={(selected) => selected.join(", ")}
//           >
//             {productData.map((product) => (
//               <MenuItem key={product.id} value={product.category}>
//                 {product.category}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button
//           variant={isRatingFilterActive ? "contained" : "outlined"}
//           onClick={handleRatingFilter}
//         >
//           {`Rating > 4`}
//         </Button>
//         <Button
//           variant={isDiscountFilterActive ? "contained" : "outlined"}
//           onClick={handleDiscountFilter}
//         >
//           {`Discount > 10%`}
//         </Button>
//         <Button
//           variant={isStockFilterActive ? "contained" : "outlined"}
//           onClick={handleStockFilter}
//         >
//           {`Stock > 100`}
//         </Button>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Sort By</InputLabel>
//           <Select value={sortBy} onChange={handleSortBy}>
//             <MenuItem value="price_lh">Price: Low to High</MenuItem>
//             <MenuItem value="price_hl">Price: High to Low</MenuItem>
//             <MenuItem value="rating">Rating</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" onClick={handleReset}>
//           RESET
//         </Button>
//       </Stack>
//       <Grid container spacing={2}>
//         {filteredProducts.map((product) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//             <Card sx={{ maxWidth: 345 }}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={product.image}
//                 alt={product.name}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Brand: {product.brand}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Category: {product.category}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Price: {product.price}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Rating: {product.rating}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Add to Cart</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Task;

import React from 'react'

const Task = () => {
  return (
    <div>Task</div>
  )
}

export default Task