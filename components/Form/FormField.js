import * as React from 'react';
import { 
  Flex,
  useColorModeValue,
  FormControl, FormLabel, FormErrorMessage
} from "@chakra-ui/react"


const FormField = ({
  label,
  htmlFor,
  error,
  children,
  ...props
}) => {
  const labelColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');
  const errorColor = useColorModeValue('red.500', 'red.300');
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
        color={error ? errorColor : labelColor}
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