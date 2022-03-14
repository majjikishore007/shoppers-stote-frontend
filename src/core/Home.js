import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductGrid } from '../components/ProductGrid';
import Base from './Base.js';
import { getAllProducts } from './helper/coreapicalls';
import Spinner from '../components/Spinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        seterror(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      loadAllProducts();
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Base title='ShoppersStop' description='The buyers shop'>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <Box m={'auto'} py={'8'} maxW={'90%'}>
            <ProductGrid>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </ProductGrid>
          </Box>
        )}
      </Base>
    </>
  );
};

export default Home;
