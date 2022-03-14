import { Box, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CartCard from '../components/CartCard.js';
import { CartOrderSummary } from '../components/OrderSummary.js';
import Base from './Base.js';
import { loadCart } from './helper/Carthelper';
const Cart = () => {
  const [values, setValues] = useState({
    totalPrice: 0,
    totalQuantity: 0,
  });
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
              Your Shopping Cart{' '}
              {products.length === 0
                ? 'isEmpty'
                : ` has ${products.length} items`}
            </Heading>

            <Stack spacing='6'>
              {products.map((product, index) => {
                return (
                  <CartCard
                    key={index}
                    product={product}
                    values={values}
                    setValues={setValues}
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
            {products.length > 0 && (
              <CartOrderSummary
                products={products}
                setreload={setreload}
                reload={reload}
                values={values}
                setValues={setValues}
              />
            )}
          </Flex>
        </Stack>
      </Box>
    </Base>
  );
};

export default Cart;
