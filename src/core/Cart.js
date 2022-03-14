import { Box, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CartCard from '../components/CartCard.js';
import { CartOrderSummary } from '../components/OrderSummary.js';
import Base from './Base.js';
import { loadCart } from './helper/Carthelper';
const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);

  return (
    <Base title='Cart page' description=''>
      <Box
        maxW={{
          base: '3xl',
          lg: '7xl',
        }}
        mx='auto'
        px={{
          base: '4',
          md: '8',
          lg: '12',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
      >
        <Stack
          direction={{
            base: 'column',
            lg: 'row',
          }}
          align={{
            lg: 'flex-start',
          }}
          spacing={{
            base: '8',
            md: '16',
          }}
        >
          <Stack
            spacing={{
              base: '8',
              md: '10',
            }}
            flex='2'
          >
            <Heading fontSize='2xl' fontWeight='extrabold'>
              Shopping Cart {products.length}
            </Heading>

            <Stack spacing='6'>
              {products.map((product, index) => {
                return (
                  <CartCard
                    key={index}
                    product={product}
                    addtoCart={false}
                    removefromCart={true}
                    setreload={setreload}
                    reload={reload}
                  />
                );
              })}
            </Stack>
          </Stack>

          <Flex direction='column' align='center' flex='1'>
            <CartOrderSummary
              products={products}
              setreload={setreload}
              reload={reload}
            />
            <HStack mt='6' fontWeight='semibold'>
              <p>or</p>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </Base>
  );
};

export default Cart;
/**
 * <div className='row text-center'>
        <div className='col-6'>
          {products ? loadAllProducts(products) : <h3>Cart is Empty</h3>}
        </div>
        <div className='col-6'>
          <PaymentB products={products} setreload={setreload} reload={reload} />
        </div>
      </div>
 */
