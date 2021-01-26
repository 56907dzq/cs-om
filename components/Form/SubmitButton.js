import * as React from 'react';
import { forwardRef } from 'react';
import { Box, useTheme, Button } from '@chakra-ui/react';
import { FiSearch } from "react-icons/fi"

const btnProps = {
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms',
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  lineHeight: '1.2',
  outline: 'none',
  borderRadius: 'md',
  fontWeight: 'semibold',
};

const btnSizeMap = {
  lg: {
    height: 12,
    minWidth: 12,
    fontSize: 'lg',
    px: 6,
  },
  md: {
    height: 10,
    minWidth: 10,
    fontSize: 'md',
    px: 4,
  },
  sm: {
    height: 8,
    minWidth: 8,
    fontSize: 'sm',
    px: 3,
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: 'xs',
    px: 2,
  },
};


const SubmitButton = forwardRef(
  (
    {
      isLoading = false,
      size = 'lg',
    },
    ref,
  ) => {
    const theme = useTheme();
    const btnSize = btnSizeMap[size];
    return (
      <Button 
        ref={ref}
        colorScheme="teal"
        type="submit"
        aria-label="Submit Query"
        _focus={{ boxShadow: theme.shadows.outline }}
        isLoading={isLoading}
        {...btnProps}
        {...btnSize}
        >
        <FiSearch />
      </Button>
    );
  },
);

export default SubmitButton