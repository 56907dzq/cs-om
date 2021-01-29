import { Box, useColorModeValue } from '@chakra-ui/react';

export const TextOutput = (props) => {
  const { children, ...rest } = props;

  const bg = useColorModeValue('blackAlpha.100', 'gray.800');
  const color = useColorModeValue('black', 'white');
  const selectionBg = useColorModeValue('black', 'white');
  const selectionColor = useColorModeValue('white', 'black');

  return (
    <Box
      p={3}
      mt={5}
      mx={2}
      bg={bg}
      as="pre"
      border="1px"
      rounded="md"
      color={color}
      fontSize="sm"
      fontFamily="mono"
      borderColor="inherit"
      whiteSpace="pre-wrap"
      css={{
        '&::selection': {
          backgroundColor: selectionBg,
          color: selectionColor,
        },
      }}
      {...rest}
    >
      {children.split('\\n').join('\n').replace(/\n\n/g, '\n')}
    </Box>
  );
};
