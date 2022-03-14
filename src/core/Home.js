import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductGrid } from '../components/ProductGrid';
import Base from './Base.js';
import { getAllProducts } from './helper/coreapicalls';
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
