import styled from '@emotion/styled';

import Box, { BoxProps } from './Box';

const Row = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'row',
});

export default Row;
