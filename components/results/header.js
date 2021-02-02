import { AccordionIcon, Box, Spinner, HStack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { BiError } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

export const ResultHeader = (props) => {
  const { title, loading, isError } = props;

  const status = useColorModeValue('cyan.500', 'cyan.300');
  const warning = useColorModeValue(`orange.500`, `orange.300`);
  const defaultStatus = useColorModeValue('green.500', 'green.300');

  return (
    <HStack alignItems="center" w="100%">
      <Tooltip
        hasArrow
        placement="top"
        isDisabled={loading}
        label={isError ? "something went wrong" : "success"}
        bg={isError ? warning : defaultStatus}
        color={isError ? defaultStatus : warning }
      >
        <Box boxSize={6}>
          {loading ? (
            <Spinner size="sm" mr={4} color={status} />
          ) : (
            <Box
              as={isError ? BiError : FaCheckCircle}
              color={isError ? warning : defaultStatus}
              mr={4}
              boxSize="100%"
            />
          )}
        </Box>
      </Tooltip>

      <Text fontSize="lg">{title}</Text>
      <AccordionIcon ml="auto" />
    </HStack>
  );
};
