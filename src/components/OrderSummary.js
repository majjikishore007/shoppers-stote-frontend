import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import PaymentB from '../core/paymentBraintree';
const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify='space-between' fontSize='sm'>
      <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight='medium'>{value}</Text> : children}
    </Flex>
  );
};
export const CartOrderSummary = (props) => {
  const { products, setreload, reload } = props;
  const [checkout, setCheckout] = useState(false);
  const handlePayment = () => {
    setCheckout(true);
  };
  const tax = 50;
  const subTotal = () => {
    let total = 0;
    products.map((item) => {
      total += item.price;
    });
    return total;
  };
  let body = null;
  if (!checkout) {
    body = (
      <Stack
        spacing='8'
        borderWidth='1px'
        rounded='lg'
        padding='8'
        width='full'
      >
        <Heading size='md'>Order Summary</Heading>

        <Stack spacing='6'>
          <OrderSummaryItem label='Subtotal' value={` $ ${subTotal()}`} />
          <OrderSummaryItem label='Shipping + Tax'>
            <p>${tax}</p>
          </OrderSummaryItem>
          .
          <Flex justify='space-between'>
            <Text fontSize='lg' fontWeight='semibold'>
              Total
            </Text>
            <Text fontSize='xl' fontWeight='extrabold'>
              ${subTotal() + tax}
            </Text>
          </Flex>
        </Stack>
        <Button
          onClick={handlePayment}
          colorScheme='green'
          size='lg'
          fontSize='md'
          rightIcon={<FaArrowRight />}
        >
          Checkout
        </Button>
      </Stack>
    );
  } else {
    body = (
      <PaymentB
        products={products}
        setreload={setreload}
        reload={reload}
        totalAmount={subTotal() + tax}
      />
    );
  }
  return <>{body}</>;
};
