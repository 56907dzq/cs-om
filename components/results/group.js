import React, { useEffect } from 'react';
import { Accordion } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedDiv } from 'components/animated.tsx';
import { Tags } from './tags';
import { Result } from './individual';

export const Results = (props) => {
  const {formData, ...rest } = props;
  // Scroll to the top of the page when results load - primarily for mobile.
  const {target, ...params} = formData
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <Tags {...rest} />
      <AnimatedDiv
        p={0}
        my={5}
        w="100%"
        mx="auto"
        rounded="lg"
        textAlign="left"
        borderWidth="1px"
        overflow="hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: 300 }}
        transition={{ duration: 0.3 }}
        animate={{ opacity: 1, y: 0 }}
        maxW={{ base: '100%', md: '83%' }}
      >
        <Accordion allowMultiple allowToggle defaultIndex={[0]}>
          <AnimatePresence key="group">
            {
              target?
              target.map((loc, i) => {
                return (
                  <Result
                    index={i}
                    key={loc.label}
                    host_ip={loc.value}
                    params={params}
                  />
                );
              }):<Result
                  index={0}
                  key='no device'
                  params={params}
                /> 
            }
          </AnimatePresence>
        </Accordion>
      </AnimatedDiv>
    </>
  );
};
