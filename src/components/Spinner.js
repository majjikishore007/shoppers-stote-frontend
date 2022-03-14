import { Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <div className='sweet-loading'>
        <ScaleLoader
          color={'#51E1ED'}
          loading={true}
          css={override}
          size={200}
        />
      </div>
    </Flex>
  );
};

export default Spinner;
