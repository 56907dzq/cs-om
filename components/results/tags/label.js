import { forwardRef } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

const _Label = (props, ref) => {
  const { value, label, bg, ...rest } = props;
  const defaultLabelColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');

  return (
      <Flex
        my={2}
        ref={ref}
        flexWrap="nowrap"
        alignItems="center"
        mx={{ base: 1, md: 2 }}
        justifyContent="flex-start"
        {...rest}
      >
        <Flex
          mb={2}
          mr={0}
          bg={bg}
          lineHeight="1.5"
          fontWeight="bold"
          whiteSpace="nowrap"
          display="inline-flex"
          px={{ base: 1, md: 3 }}
          justifyContent="center"
          borderTopLeftRadius={4}
          borderTopRightRadius={0}
          borderBottomLeftRadius={4}
          borderBottomRightRadius={0}
          fontSize={{ base: 'xs', md: 'sm' }}
          color='white'
        >
          {value}
        </Flex>
        <Flex
          px={3}
          mb={2}
          ml={0}
          mr={0}
          lineHeight="1.5"
          whiteSpace="nowrap"
          display="inline-flex"
          justifyContent="center"
          borderTopLeftRadius={0}
          borderTopRightRadius={4}
          borderBottomLeftRadius={0}
          borderBottomRightRadius={4}
          fontSize={{ base: 'xs', md: 'sm' }}
          color={defaultLabelColor}
          boxShadow={`inset 0px 0px 0px 1px ${bg}`}
        >
          {label}
        </Flex>
      </Flex>
  )
};

export const Label = forwardRef(_Label);
