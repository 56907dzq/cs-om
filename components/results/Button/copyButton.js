import { Button, Icon, Tooltip, useClipboard } from '@chakra-ui/react';
import { FiCopy, FiCheck } from "react-icons/fi"

export const CopyButton = (props) => {
  const { copyValue, ...rest } = props;
  const { onCopy, hasCopied } = useClipboard(copyValue);
  return (
      <Tooltip hasArrow label="Copy Output" placement="top">
        <Button
          as="a"
          mx={1}
          size="sm"
          variant="ghost"
          onClick={onCopy}
          colorScheme="secondary"
          {...rest}
        >
          <Icon as={hasCopied ? FiCheck : FiCopy} boxSize="16px" />
        </Button>
      </Tooltip>
  )
};
