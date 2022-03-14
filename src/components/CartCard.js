import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { removeItemFromCart } from '../core/helper/Carthelper';
import { Imghelper } from '../core/helper/Imghelper';
import { CartProductMeta } from './CartProductMeta';
import { PriceTag } from './PriceTag';
const QuantitySelect = (props) => {
  return (
    <Select
      maxW='64px'
      aria-label='Select quantity'
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
    </Select>
  );
};

const CartCard = (props) => {
  const {
    quantity,
    product,
    currency,
    onChangeQuantity,
    removefromCart = false,
    setreload = (f) => f,
    reload = undefined,
  } = props;
  const { name, price, salePrice, rating, description } = product;
  const imageUrl = Imghelper(product);
  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify='space-between'
      align='center'
    >
      <CartProductMeta name={name} description={description} image={imageUrl} />

      {/* Desktop */}
      <Flex
        width='full'
        justify='space-between'
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            removeItemFromCart(product._id);
            setreload(!reload);
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt='4'
        align='center'
        width='full'
        justify='space-between'
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Link fontSize='sm' textDecor='underline'>
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};
export default CartCard;
