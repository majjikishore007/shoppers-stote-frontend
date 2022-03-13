import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base.js';
import Card from './Card';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { getAllProducts } from './helper/coreapicalls';
import { Box } from '@chakra-ui/react';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, seterror] = useState(false);

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
    loadAllProducts();
  }, []);

  return (
    <Base title='ShoppersStop' description='The buyers shop'>
      <div className='row text-center '>
        <Box m={'auto'} maxW={'90%'}>
          <ProductGrid>
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </ProductGrid>
        </Box>
      </div>
    </Base>
  );
};

export default Home;
