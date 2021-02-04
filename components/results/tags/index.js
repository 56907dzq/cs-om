import { Box, Stack, useToken, useBreakpointValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Label } from './label';

const transition = { duration: 0.3, delay: 0.5 };

function computedValue(a,b){
  if(a){
    return a.value
  }else if(b!={}){
    return b.value
  }else{
    return ""
  }
}
export const Tags = (props) => {
  const { peValue, ceValue, mgmValue, commandValue } =props
  const value = computedValue(peValue, ceValue)
  const mgmBg = useToken('colors', 'cyan.600');
  const commandBg = useToken('colors', 'green.600');
  const targetBg = useToken('colors', 'purple.600');
  const animateLeft = useBreakpointValue({
    base: { opacity: 1, x: 0 },
    md: { opacity: 1, x: 0 },
    lg: { opacity: 1, x: 0 },
    xl: { opacity: 1, x: 0 },
  });
  const animateCenter = useBreakpointValue({
    base: { opacity: 1 },
    md: { opacity: 1 },
    lg: { opacity: 1 },
    xl: { opacity: 1 },
  });

  const animateRight = useBreakpointValue({
    base: { opacity: 1, x: 0 },
    md: { opacity: 1, x: 0 },
    lg: { opacity: 1, x: 0 },
    xl: { opacity: 1, x: 0 },
  });

  const initialLeft = useBreakpointValue({
    base: { opacity: 0, x: '-100%' },
    md: { opacity: 0, x: '-100%' },
    lg: { opacity: 0, x: '-100%' },
    xl: { opacity: 0, x: '-100%' },
  });

  const initialCenter = useBreakpointValue({
    base: { opacity: 0 },
    md: { opacity: 0 },
    lg: { opacity: 0 },
    xl: { opacity: 0 },
  });

  const initialRight = useBreakpointValue({
    base: { opacity: 0, x: '100%' },
    md: { opacity: 0, x: '100%' },
    lg: { opacity: 0, x: '100%' },
    xl: { opacity: 0, x: '100%' },
  });

  return <>
    <Box
      p={0}
      my={4}
      w="100%"
      mx="auto"
      textAlign="left"
      maxW={{ base: '100%', lg: '75%', xl: '70%' }}
    >
      <Stack isInline align="center" justify="center" flexWrap="wrap">
        <AnimatePresence key="tags">
          <motion.div
            initial={initialLeft}
            animate={animateLeft}
            exit={{ opacity: 0, x: '-100%' }}
            transition={transition}
            key="pe"
          >
            <Label
              {...mgmValue}
              bg={mgmBg}
              fontSize={{ base: 'xs', md: 'sm' }}
            />
          </motion.div>
          <motion.div
            key="command"
            initial={initialCenter}
            animate={animateCenter}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={transition}
          >
            <Label
              {...commandValue}
              bg={commandBg}
              fontSize={{ base: 'xs', md: 'sm' }}
            />
          </motion.div>
          <motion.div
            key="device"
            initial={initialRight}
            animate={animateRight}
            exit={{ opacity: 0, x: '100%' }}
            transition={transition}
          >
            <Label
              label="device"
              value={value?value:"no device"}
              bg={targetBg}
              fontSize={{ base: 'xs', md: 'sm' }}
            />
          </motion.div>
        </AnimatePresence>
      </Stack>
    </Box>
    </>
};
