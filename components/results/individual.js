import { forwardRef, useEffect} from 'react';
import {
  Box,
  Flex,
  chakra,
  Alert,
  HStack,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ResultHeader } from './header';
import { RequeryButton, CopyButton } from './Button';
import { TextOutput } from './output'
import { FormattedError } from './error.tsx';
import { useQuerySWR } from 'util/requests'

const AnimatedAccordionItem = motion.custom(AccordionItem);

const AccordionHeaderWrapper = chakra('div', {
  baseStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    _hover: { bg: 'blackAlpha.50' },
    _focus: { boxShadow: 'outline' },
  },
});

const _Result = ({formData,value}, ref) => {
  const { data:result, error, isValidating:isLoading, mutate } = useQuerySWR(formData)
  let copyValue = result? result.result:"no result";
  let status = result? result.icon: "";
  
  const scrollbar = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
  const scrollbarHover = useColorModeValue('blackAlpha.400', 'whiteAlpha.400');
  const scrollbarBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');

  useEffect(() => {
      if(!isLoading){
        console.log(result)
      }
  }, [isLoading]);

  return (
    <AnimatedAccordionItem
      id={value}
      ref={ref}
      isDisabled={isLoading}
      exit={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 300 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      css={{
        '&:first-of-type': { borderTop: 'none' },
        '&:last-of-type': { borderBottom: 'none' },
      }}
      >
        <AccordionHeaderWrapper>
          <AccordionButton py={2} w="unset" _hover={{}} _focus={{}} flex="1 0 auto">
            <ResultHeader    
              loading={isLoading}
              title={value}
              isError={false}
            />
          </AccordionButton>
          <HStack py={2} spacing={1}>
            <CopyButton copyValue={copyValue} isDisabled={isLoading} />
            <RequeryButton requery={mutate} isDisabled={isLoading} />
          </HStack>
        </AccordionHeaderWrapper>
        <AccordionPanel
          pb={4}
          overflowX="auto"
          css={{
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': { height: '5px' },
            '&::-webkit-scrollbar-track': {
              backgroundColor: scrollbarBg,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: scrollbar,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: scrollbarHover,
            },

            '-ms-overflow-style': { display: 'none' },
          }}
          >
          <Box>
            <Flex direction="column" flex="1 0 auto">
            { !isLoading ?  (
                <>
                {result && status === 'success'  ? (
                  <TextOutput>{copyValue}</TextOutput>
                ) : result && status !== 'success' ? (
                  <Alert rounded="lg" my={2} py={4} status="warning">
                      <FormattedError message={copyValue} keywords={[]} />
                    </Alert>
                ) : (
                  <Alert rounded="lg" my={2} py={4} status="warning">
                    <FormattedError message={"没有result,输出见控制台"} keywords={[]} />
                  </Alert>
                )}
                </>
              ) : (
                <Alert rounded="lg" my={2} py={4} status="warning">
                  <FormattedError message={copyValue} keywords={[]} />
                </Alert>
              )}
            </Flex>
          </Box>
        </AccordionPanel>
    </AnimatedAccordionItem>
  );
};

export const Result = forwardRef(_Result);
