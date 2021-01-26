import * as React from 'react';
import { Flex } from '@chakra-ui/react';

const FormRow = ({ children, ...props }) => (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      w="100%"
      justifyContent={['center', 'center', 'space-between', 'space-between']}
      {...props}>
      {children}
    </Flex>
  );

export default FormRow