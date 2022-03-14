import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

export const ProductGrid = (props) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(
      React.isValidElement
    ).length;
    return {
      base: Math.min(1, count),
      md: Math.min(2, count),
      lg: Math.min(3, count),
      xl: Math.min(4, count),
    };
  }, [props.children]);
  return (
    <SimpleGrid
      columns={columns}
      columnGap={{
        base: '4',
        md: '8',
      }}
      rowGap={{
        base: '8',
        md: '12',
        sm: '6',
      }}
      {...props}
    />
  );
};
