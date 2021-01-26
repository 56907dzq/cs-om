import * as React from 'react';
import { Input, useColorModeValue } from '@chakra-ui/react';

const IP_Pattern = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/

function validateTarget(value) {
  if (!value) {
    return "Target is required";
  } else if (!IP_Pattern.test(value)) {
    return "Jeez! this isn't an ip 😱";
  } else return true;
}

const QueryTarget = (props) => {
  const { name, register, onChange, placeholder } = props;

  const bg = useColorModeValue('white', 'whiteAlpha.100');
  const color = useColorModeValue('gray.400', 'whiteAlpha.800');
  const border = useColorModeValue('gray.100', 'whiteAlpha.50');
  const placeholderColor = useColorModeValue('gray.600', 'whiteAlpha.700');

  function handleInputChange(e){
    onChange({ field: 'target', value: e.target.value });
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
        ref={register({ validate: validateTarget })}
        onChange={handleInputChange}
        aria-label={placeholder}
        placeholder={placeholder}
        _placeholder={{ color: placeholderColor }}
      />
  </>
  );
};

export default QueryTarget