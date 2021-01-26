import * as React from 'react';
import { 
  Flex,
  useColorMode,
  FormControl, FormLabel, FormErrorMessage
} from "@chakra-ui/react"

const labelColor = { dark: 'whiteAlpha.700', light: 'blackAlpha.700' };

const FormField = ({
  label,
  htmlFor,
  error,
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl
      as={Flex}
      flexDirection="column"
      flex={['1 0 100%', '1 0 100%', '1 0 33.33%', '1 0 33.33%']}
      w="100%"
      maxW="100%"
      mx={2}
      my={[2, 2, 4, 4]}
      isInvalid={error}
      {...props}>
      <FormLabel
        htmlFor={htmlFor}
        color={labelColor[colorMode]}
        pl={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pr={0}>
        {label}
      </FormLabel>
      {children}
      <FormErrorMessage>
        {error && error.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormField