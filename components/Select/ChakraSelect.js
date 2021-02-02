import * as React from 'react';
import { Text, useColorMode, useTheme } from '@chakra-ui/react';
import Select from 'react-select';

export const ChakraSelect = React.forwardRef(
  ({ size, name:label, children, ...props }, ref) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    //大小
    const sizeMap = {
      lg: { height: theme.space[12] },
      md: { height: theme.space[10] },
      sm: { height: theme.space[8] },
    };
    const { height } = sizeMap[size];
    //placeholder
    const placeholderColor = {
      dark: theme.colors.whiteAlpha[600],
      light: theme.colors.gray[400],
    };
    //downicon
    const downIcon = {
      dark: theme.colors.cyan[600],
      light: theme.colors.gray[500],
    };
    //背景&边框&颜色
    const bg = {
      dark: theme.colors.whiteAlpha[100],
      light: theme.colors.white,
    };
    const color = {
      dark: theme.colors.whiteAlpha[800],
      light: theme.colors.black,
    };
    const inputColor = {
      dark: theme.colors.whiteAlpha[800],
      light: theme.colors.gray[500],
    };
    const borderFocused =  {
      dark: theme.colors.blue[300],
      light: theme.colors.blue[500]
    };
    const border = {
      dark: theme.colors.whiteAlpha[50],
      light: theme.colors.gray[300],
    };
    const hoverColor = {
      dark: theme.colors.cyan[400],
      light: theme.colors.gray[400],
    };
    const borderRadius = theme.space[1];
    //menu
    const menuBg = {
      dark: theme.colors.gray[700],
      light: theme.colors.white,
    };
    //option
    const selectedDisabled = theme.colors.whiteAlpha[400];
    const optionSelectedBg = {
      dark: theme.colors.whiteAlpha[400],
      light: theme.colors.blackAlpha[400],
    };
    const optionHover = {
      dark: theme.colors.teal[300],
      light: theme.colors.teal[500],
    };
    const optionColor = {
      dark: theme.colors.white[500],
      light: theme.colors.blackAlpha[800],
    };

    const optionBgActive = {
      dark: theme.colors.teal[400],
      light: theme.colors.teal[600],
    };
    

    //scrollbar
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
            borderColor: state.isFocused
              ? borderFocused[colorMode]
              : border[colorMode],
            borderRadius: borderRadius,
            color: color[colorMode],
            '&:hover': {
              borderColor: hoverColor[colorMode],
            },
          }),
          clearIndicator: base => ({
            ...base,
            color: placeholderColor[colorMode],
            '&:hover': {
              color: downIcon[colorMode]
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
              color: downIcon[colorMode]
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
          singleValue: base => ({
            ...base,
            color: color[colorMode],
            fontSize: theme.fontSizes[size],
          }),
          input: base => ({
            ...base,
            color: inputColor[colorMode],
            fontSize: theme.fontSizes[size]
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isDisabled
              ? selectedDisabled
              : state.isSelected
              ? optionSelectedBg[colorMode]
              : state.isFocused
              ? optionHover[colorMode]
              : 'transparent',
            color: optionColor[colorMode],
            fontSize: theme.fontSizes[size],
            '&:active': {
              backgroundColor: optionBgActive[colorMode],
              color: 'transparent',
            },
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
