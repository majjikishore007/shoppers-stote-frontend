import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { Rating } from './Rating';
import { FavouriteButton } from './FavouriteButton';
import { PriceTag } from './PriceTag';
import { Imghelper } from '../core/helper/Imghelper';

export const ProductCard = (props) => {
  const { product, rootProps } = props;
  const { name, price, salePrice, rating } = product;
  const imageUrl = Imghelper(product);
  return (
    <Stack
      spacing={useBreakpointValue({
        base: '4',
        md: '5',
      })}
      {...rootProps}
    >
      <Box position='relative'>
        <AspectRatio ratio={5 / 4}>
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
        <Flex alignItems={'start'}>
          <Button colorScheme='blue' isFullWidth>
            Add to cart
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};
