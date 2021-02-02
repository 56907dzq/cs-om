import { useEffect, useMemo } from 'react';
import { Accordion } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedDiv } from 'components/animated.tsx';
import { Tags } from './tags';
import { Result } from './individual';

function computedValue(a,b){
  if(a){
    return a.value
  }else if(b){
    return b.value
  }else{
    return ""
  }
}
export const Results = (props) => {
  const {formData, peValue, ceValue, ...rest } = props;
  // Scroll to the top of the page when results load - primarily for mobile.

  const value = useMemo(() => computedValue(peValue, ceValue), [peValue, ceValue]);
  
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
        <Accordion allowToggle defaultIndex={0}>
          <AnimatePresence key="group">
            <Result index={0} isExpanded value={value} formData={formData} />
          </AnimatePresence>
        </Accordion>
      </AnimatedDiv>
    </>
  );
};
