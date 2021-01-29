import { useMemo } from 'react';
import { getColor, isLight } from '@chakra-ui/theme-tools';
import { useTheme } from '@chakra-ui/react';

/**
 * Parse the color string to determine if it's a Chakra UI theme key, and determine if the
 * opposing color should be black or white.
 */
export function useIsDark(color: string): boolean {
  const theme = useTheme();
  if (typeof color === 'string' && color.match(/[a-zA-Z]+\.[a-zA-Z0-9]+/g)) {
    color = getColor(theme, color, color);
  }
  let opposingShouldBeDark = true;
  try {
    opposingShouldBeDark = isLight(color)(theme);
  } catch (err) {
    console.error(err);
  }
  return opposingShouldBeDark;
}

/**
 * Determine if the foreground color for `color` should be white or black.
 */
const useOpposingColor = (color, options?) => {
  const isBlack = useIsDark(color);

  return useMemo(() => {
    if (isBlack) {
      return options?.dark ?? 'black';
    } else {
      return options?.light ?? 'white';
    }
  }, [color]);
}

export default useOpposingColor