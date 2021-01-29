import * as React from 'react';
import { Flex, useColorMode } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResetButton } from './resetButton';

const headerTransition = {
  type: 'spring',
  ease: 'anticipate',
  damping: 15,
  stiffness: 100,
};

export const AnimatedResetButton = ({ onClick }) => {
  const AnimatedFlex = motion.custom(Flex);
  const AnimatedResetButton = motion.custom(ResetButton);

  return <>
        <AnimatePresence key="resetButton">
          <AnimatedFlex
            layouttransition={headerTransition}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, width: 'unset' }}
            exit={{ opacity: 0, x: -50 }}
            alignItems="center"
            mb={[null, 'auto']}
            // display={isSubmitting ? 'flex' : 'none'}
            >
            <AnimatedResetButton onClick={onClick} />
          </AnimatedFlex>
        </AnimatePresence>   
      </>
};
