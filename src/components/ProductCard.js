import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../core/helper/Carthelper';
import { Imghelper } from '../core/helper/Imghelper';
import { FavouriteButton } from './FavouriteButton';
import { PriceTag } from './PriceTag';
import { Rating } from './Rating';

export const ProductCard = (props) => {
  const {
    product,
    rootProps,
    addtoCart = true,
    removefromCart = false,
    setreload = (f) => f,
    reload = undefined,
  } = props;
  const { name, price, salePrice, rating } = product;
  const imageUrl = Imghelper(product);

  const [redirect, setredirect] = useState(false);
  const additemToCart = () => {
    addItemToCart(product, () => setredirect(true));
  };
  const getaRedirect = () => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  return (
    <Stack
      spacing={useBreakpointValue({
        base: '4',
        md: '5',
      })}
      {...rootProps}
    >
      <Box position='relative'>
        {getaRedirect(redirect)}
        <AspectRatio ratio={3 / 4}>
          <Image
            src={imageUrl}
            alt={name}
            draggable='false'
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({
              base: 'md',
              md: 'xl',
            })}
          />
        </AspectRatio>
        <FavouriteButton
          position='absolute'
          top='4'
          right='4'
          aria-label={`Add ${name} to your favourites`}
        />
      </Box>
      <Stack>
        <Stack spacing='1'>
          <Text
            fontWeight='medium'
            color={useColorModeValue('gray.700', 'gray.400')}
          >
            {name}
          </Text>
          <PriceTag price={price} salePrice={salePrice} currency='USD' />
        </Stack>
        <HStack>
          <Rating defaultValue={rating} size='sm' />
          <Text fontSize='sm' color={useColorModeValue('gray.600', 'gray.400')}>
            12 Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack>
        <Flex alignItems={'center'} justifyContent={'start'}>
          {addtoCart && (
            <Button onClick={additemToCart} colorScheme='blue'>
              Add to cart
            </Button>
          )}
          {removefromCart && (
            <Button
              colorScheme='red'
              onClick={() => {
                removeItemFromCart(product._id);
                setreload(!reload);
              }}
            >
              remove from cart
            </Button>
          )}
        </Flex>
      </Stack>
    </Stack>
  );
};
