import * as React from 'react';
import { Input, useColorModeValue } from '@chakra-ui/react';

const IP_Pattern = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
const fqdnPattern = new RegExp(
  /^(?!:\/\/)([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z-]{2,6}?$/im,
);
function validateTarget(value) {
  if (!value) {
    return "Target is required";
  } else if (!(IP_Pattern.test(value)||fqdnPattern.test(value))) {
    return "Jeez! this isn't an Address 😱";
  } else return true;
}

const QueryTarget = (props) => {
  const { name, register, onChange, setValue, placeholder } = props;

  const bg = useColorModeValue('white', 'whiteAlpha.100');
  const color = useColorModeValue('gray.500', 'whiteAlpha.800');
  const border = useColorModeValue('gray.300', 'whiteAlpha.50');
  const placeholderColor = useColorModeValue('gray.400', 'whiteAlpha.600');
  const _hover = useColorModeValue('gray.400', 'cyan.400');

  function handleInputChange(e){
    setValue(e.target.value)
    onChange({ label: 'target', value: e.target.value });
  }
  return (
    <>
      <Input
        size="lg"
        borderRadius="md"
        bg={bg}
        color={color}
        borderColor={border}
        name={name}
        id={name}
        ref={register({ validate: validateTarget })}
        onChange={handleInputChange}
        aria-label={placeholder}
        placeholder={placeholder}
        _hover={{ borderColor: _hover }}
        _placeholder={{ color: placeholderColor }}
      />
  </>
  );
};

export default QueryTarget