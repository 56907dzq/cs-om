import React, { forwardRef } from 'react';
import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { FiRepeat } from "react-icons/fi";

const _RequeryButton = ( props, ref ) => {
  const { requery, ...rest } = props;

  return (
    <Tooltip hasArrow label="Reload Query" placement="top">
      <Button
        mx={1}
        as="a"
        ref={ref}
        size="sm"
        zIndex="1"
        variant="ghost"
        onClick={requery}
        colorScheme="secondary"
        {...rest}
      >
        <Icon as={FiRepeat} boxSize="16px" />
      </Button>
    </Tooltip>
  );
};


export const RequeryButton = forwardRef(_RequeryButton);
