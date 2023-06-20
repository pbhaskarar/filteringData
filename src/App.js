import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import axios from "axios";
import "./App.css";

const App = () => {
  const [productData, setProductData] = useState([]);
  const [brand, setBarnd] = useState([]);
  const [category, setCategory] = useState([]);
  const [isRatingFilterActive, setIsRatingFilterActive] = useState(false);
  const [isDiscountFilterActive, setIsDiscountFilterActive] = useState(false);
  const [isStockFilterActive, setIsStockFilterActive] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  // const [isResetClicked, setIsResetClicked] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProductData(response.data.products));
  }, []);

  const handleBrandNames = (e) => {
    setBarnd(e.target.value);
  };

  const handleCategoryNames = (e) => {
    setCategory(e.target.value);
  };
  const handleRatingFilter = () => {
    setIsRatingFilterActive((prevState) => !prevState);
  };

  const handleDiscountFilter = () => {
    setIsDiscountFilterActive((prevState) => !prevState);
  };

  const handleStockFilter = () => {
    setIsStockFilterActive((prevState) => !prevState);
  };

  const handleSortBy = (e) => {
    const { value } = e.target;
    console.log("value==>: ", value);
    setSortBy(value);
  };

  const handleReset = () => {
    // setIsResetClicked(true);
    setBarnd([]);
    setCategory([]);
    setIsRatingFilterActive(false);
    setIsDiscountFilterActive(false);
    setIsStockFilterActive(false);
    setSortBy(null);
  };

  // const handleRatingFilter = () => {
  //   setRatingFilter((prevratingFilter) => {
  //     return !prevratingFilter;
  //   });
  //   // setRatingFilter(!ratingFilter);
  // };

  // const handleDiscountFilter = () => {
  //   setDiscountFilter((prevDiscountFilter) =>{
  //     return !prevDiscountFilter;
  //   });
  // };

  // const handleStockFilter = () => {
  //   setStocksFilter(!stocksFilter);
  // };

  // const result = Math.round((productDataitem.price / productDataitem.discountPercentage) * 100)

  //   const discountedPrice = 539;
  // const discount = 12.9;

  // const discountedPrice = productDataitem.price;
  // const discountPercentage = productDataitem.discountPercentage;
  // const originalPrice = discountedPrice / (1 - discountPercentage / 100)

  // const filteredProducts = productData
  //   .filter(
  //     (productDataitem) =>
  //       brand.length === 0 || brand.includes(productDataitem.brand)
  //   )
  //   .filter(
  //     (productDataitem) =>
  //       category.length === 0 || category.includes(productDataitem.category)
  //   )
  //   .filter(
  //     (productDataitem) =>
  //       !discountFilter || productDataitem.discountPercentage > 10
  //   )
  //   .filter((productDataitem) => !ratingFilter || productDataitem.rating > 4)
  //   .filter((productDataitem) => !stocksFilter || productDataitem.stock <= 100)
  //   .sort((firstItem, secondItem) => {
  //     if(sortBy === 'price_lh') {
  //       const originalPriceKey = sortBy.split('_')[0]
  //       return firstItem[originalPriceKey] - secondItem[originalPriceKey]
  //     }
  //     if(sortBy === 'price_hl') {
  //       const originalPriceKey = sortBy.split('_')[0]
  //       return secondItem[originalPriceKey] - firstItem[originalPriceKey]
  //     }
  //     return firstItem[sortBy] - secondItem[sortBy]
  //   });

  const filteredProducts = productData
    .filter(
      (productDataitem) =>
        brand.length === 0 || brand.includes(productDataitem.brand)
    )
    .filter(
      (productDataitem) =>
        category.length === 0 || category.includes(productDataitem.category)
    )
    .filter(
      (productDataitem) =>
        !isDiscountFilterActive || productDataitem.discountPercentage > 10
    )
    .filter(
      (productDataitem) => !isRatingFilterActive || productDataitem.rating > 4
    )
    .filter(
      (productDataitem) => !isStockFilterActive || productDataitem.stock > 100
    )
    .sort((firstItem, secondItem) => {
      if (sortBy === "price_lh") {
        return firstItem.price - secondItem.price;
      }
      if (sortBy === "price_hl") {
        return secondItem.price - firstItem.price;
      }
      return firstItem.rating - secondItem.rating;
    });

  const FilteredProdutcsLength = filteredProducts.length;
  
  return (
    <>
      <Container>
        <Typography
          variant="h4"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "5rem",
          }}
        >
          filters and sorting on the frontend : {FilteredProdutcsLength}
        </Typography>
        <Grid>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: "2rem",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Button
                variant={isRatingFilterActive ? "contained" : "outlined"}
                color="success"
                onClick={handleRatingFilter}
              >
                Rating
              </Button>

              <Button
                variant={isDiscountFilterActive ? "contained" : "outlined"}
                color="success"
                onClick={handleDiscountFilter}
              >
                Discount
              </Button>

              <Button
                variant={isStockFilterActive ? "contained" : "outlined"}
                color="success"
                onClick={handleStockFilter}
              >
                Stock &gt; 100
              </Button>
            </Stack>
            <Grid>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-name-label">Brand</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={brand}
                  onChange={handleBrandNames}
                >
                  {Array.from(
                    new Set([...productData]?.map((pd) => pd.brand))
                  )?.map((brand, index) => {
                    return (
                      <MenuItem key={`band_${index}`} value={brand}>
                        {brand}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select value={category} onChange={handleCategoryNames}>
                  {Array.from(
                    new Set([...productData]?.map((pd) => pd.category))
                  )?.map((category, index) => (
                    <MenuItem
                      key={`category_${category}_${index}`}
                      value={category}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-simple-select-label">ShortBy</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="category"
                  value={sortBy}
                  onChange={handleSortBy}
                >
                  <MenuItem value="rating">Popularity</MenuItem>
                  <MenuItem value="price_lh">Price Low to High</MenuItem>
                  <MenuItem value="price_hl">Price High to Low</MenuItem>
                  <MenuItem value="discountPercentage">Discount Price</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="reset"
                sx={{ margin: "1rem" }}
                onClick={handleReset}
              >
                RESET
              </Button>
            </Grid>
          </Stack>
        </Grid>
        <Grid container spacing={4}>
          {filteredProducts?.map((productDataitem) => (
            <Grid item key={productDataitem.id} xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ maxWidth: 345, minHeight: 500 }}>
                <Carousel
                  NextIcon={<ArrowForwardIosRoundedIcon />}
                  PrevIcon={<NavigateBeforeRoundedIcon />}
                >
                  {productDataitem.images.map((image, index) => (
                    <CardMedia
                      key={index}
                      sx={{ height: 140 }}
                      image={image}
                      title={`Image ${index}`}
                    />
                  ))}
                </Carousel>

                {/* <CardMedia
                  sx={{ height: 140 }}
                  image={productDataitem.thumbnail}
                  title={productDataitem.title}
                /> */}
                <CardContent sx={{ m: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ m: 1 }}
                  >
                    {productDataitem.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ m: 1 }}
                  >
                    {productDataitem.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ m: 1 }}
                  >
                    {(
                      (productDataitem.price *
                        productDataitem.discountPercentage) /
                      100
                    ).toFixed(2)}{" "}
                    {`Original Price: ${productDataitem.price.toFixed(2)}`}
                   
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ m: 1 }}
                  >
                    {productDataitem.discountPercentage} %off
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={productDataitem.rating}
                      precision={0.5}
                      readOnly
                    />
                    <p>{productDataitem.rating}</p>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">stock: {productDataitem.stock}</Button>
                  {/* <Button size="small">rating: {productDataitem.rating}</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
