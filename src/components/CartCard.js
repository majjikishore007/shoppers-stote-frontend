import { CloseButton, Flex, Link } from '@chakra-ui/react';
import * as React from 'react';
import { removeItemFromCart } from '../core/helper/Carthelper';
import { Imghelper } from '../core/helper/Imghelper';
import { CartProductMeta } from './CartProductMeta';
import { PriceTag } from './PriceTag';

const CartCard = (props) => {
  const { product, setreload = (f) => f, reload = undefined } = props;
  const { name, price, description } = product;
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
        <PriceTag price={price} />
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
        <PriceTag price={price} />
      </Flex>
    </Flex>
  );
};
export default CartCard;
