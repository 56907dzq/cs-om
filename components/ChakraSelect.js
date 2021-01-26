import * as React from 'react';
import { Text, useColorMode, useTheme } from '@chakra-ui/react';
import Select from 'react-select';

export const ChakraSelect = React.forwardRef(
  ({ size, name:label, children, ...props }, ref) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const sizeMap = {
      lg: { height: theme.space[12] },
      md: { height: theme.space[10] },
      sm: { height: theme.space[8] },
    };
    const colorSetPrimaryBg = {
      dark: theme.colors.cyan[300],
      light: theme.colors.cyan[500],
    };

    const bg = {
      dark: theme.colors.whiteAlpha[100],
      light: theme.colors.white,
    };
    const color = {
      dark: theme.colors.whiteAlpha[800],
      light: theme.colors.black,
    };
    const borderFocused = theme.colors.blue[500];
    const borderDisabled = theme.colors.whiteAlpha[100];
    const border = {
      dark: theme.colors.whiteAlpha[50],
      light: theme.colors.gray[100],
    };
    const borderRadius = theme.space[1];
    const hoverColor = {
      dark: theme.colors.whiteAlpha[200],
      light: theme.colors.gray[300],
    };
    const { height } = sizeMap[size];
    const optionBgActive = {
      dark: theme.colors.cyan[400],
      light: theme.colors.cyan[600],
    };
    const optionSelectedBg = {
      dark: theme.colors.whiteAlpha[400],
      light: theme.colors.blackAlpha[400],
    };
    const selectedDisabled = theme.colors.whiteAlpha[400];
    const placeholderColor = {
      dark: theme.colors.whiteAlpha[700],
      light: theme.colors.gray[600],
    };
    const menuBg = {
      dark: theme.colors.black[800],
      light: theme.colors.white[50],
    };
    const menuColor = {
      dark: theme.colors.white,
      light: theme.colors.blackAlpha[800],
    };
    const scrollbar = {
      dark: theme.colors.whiteAlpha[300],
      light: theme.colors.blackAlpha[300],
    };
    const scrollbarHover = {
      dark: theme.colors.whiteAlpha[400],
      light: theme.colors.blackAlpha[400],
    };
    const scrollbarBg = {
      dark: theme.colors.whiteAlpha[50],
      light: theme.colors.blackAlpha[50],
    };
    return (
      <Select
        ref={ref}
        styles={{
          container: base => ({
            ...base,
            minHeight: height,
            borderRadius: borderRadius,
            width: '100%',
          }),
          control: (base, state) => ({
            ...base,
            minHeight: height,
            backgroundColor: bg[colorMode],
            color: color[colorMode],
            borderColor: state.isDisabled
              ? borderDisabled
              : state.isFocused
              ? borderFocused
              : border[colorMode],
            borderRadius: borderRadius,
            '&:hover': {
              borderColor: hoverColor[colorMode],
            },
          }),
          menu: base => ({
            ...base,
            backgroundColor: menuBg[colorMode],
            borderRadius: borderRadius,
          }),
          menuList: base => ({
            ...base,
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-track': {
              backgroundColor: scrollbarBg[colorMode],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: scrollbar[colorMode],
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: scrollbarHover[colorMode],
            },

            '-ms-overflow-style': { display: 'none' },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isDisabled
              ? selectedDisabled
              : state.isSelected
              ? optionSelectedBg[colorMode]
              : state.isFocused
              ? colorSetPrimaryBg[colorMode]
              : 'transparent',
            color: menuColor[colorMode],
            fontSize: theme.fontSizes[size],
            '&:active': {
              backgroundColor: optionBgActive[colorMode],
              color: 'transparent',
            },
          }),
          indicatorSeparator: base => ({
            ...base,
            backgroundColor: placeholderColor[colorMode],
          }),
          dropdownIndicator: base => ({
            ...base,
            color: placeholderColor[colorMode],
            '&:hover': {
              color: color[colorMode],
            },
          }),
          valueContainer: base => ({
            ...base,
            paddingLeft: theme.space[4],
            paddingRight: theme.space[4],
          }),
          multiValue: base => ({
            ...base,
            backgroundColor: colorSetPrimaryBg[colorMode],
          }),
          singleValue: base => ({
            ...base,
            color: color[colorMode],
            fontSize: theme.fontSizes[size],
          }),
        }}
        id={label}
        name={label}
        aria-label={label}
        placeholder={
          <Text color={placeholderColor[colorMode]} fontSize={size}>
            Select...
          </Text>
        }
        {...props}>
        {children}
      </Select>
    );
  },
);
