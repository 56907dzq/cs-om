// import { theme as chakraTheme } from '@chakra-ui/react';

// const defaultBodyFonts = [
//   '-apple-system',
//   'BlinkMacSystemFont',
//   '"Segoe UI"',
//   'Helvetica',
//   'Arial',
//   'sans-serif',
//   '"Apple Color Emoji"',
//   '"Segoe UI Emoji"',
//   '"Segoe UI Symbol"',
// ];

// const defaultMonoFonts = [
//   'SFMono-Regular',
//   'Melno',
//   'Monaco',
//   'Consolas',
//   '"Liberation Mono"',
//   '"Courier New"',
//   'monospace',
// ];


// const formatFont = font => {
//   const fontList = font.split(' ');
//   const fontFmt = fontList.length >= 2 ? `'${fontList.join(' ')}'` : fontList.join(' ');
//   return fontFmt;
// };

// const importFonts = userFonts => {
//   const [body, mono] = [defaultBodyFonts, defaultMonoFonts];
//   const bodyFmt = formatFont(userFonts.body);
//   const monoFmt = formatFont(userFonts.mono);
//   if (userFonts.body && !body.includes(bodyFmt)) {
//     body.unshift(bodyFmt);
//   }
//   if (userFonts.mono && !mono.includes(monoFmt)) {
//     mono.unshift(monoFmt);
//   }
//   return {
//     body: body.join(', '),
//     heading: body.join(', '),
//     mono: mono.join(', '),
//   };
// };

// const importColors = (userColors = {}) => {
//   return {
//     transparent: 'transparent',
//     current: 'currentColor'
//   };
// };

// export const makeTheme = userTheme => ({
//   ...chakraTheme,
//   colors: importColors(userTheme.colors),
//   fonts: importFonts(userTheme.fonts),
// });



// export const opposingColor = (theme, color) => {
//   if (color.match(/^\w+\.\d+$/m)) {
//     const colorParts = color.split('.');
//     if (colorParts.length !== 2) {
//       throw Error(`Color is improperly formatted. Got '${color}'`);
//     }
//     const [colorName, colorOpacity] = colorParts;
//     color = theme.colors[colorName][colorOpacity];
//   }
//   const opposing = isDark(color) ? theme.colors.white : theme.colors.black;
//   return opposing;
// };

// export const googleFontUrl = (fontFamily, weights = [300, 400, 700]) => {
//   const urlWeights = weights.join(',');
//   const fontName = fontFamily
//     .split(/, /)[0]
//     .trim()
//     .replace(/'|"/g, '');
//   const urlFont = fontName.split(/ /).join('+');
//   const urlBase = `https://fonts.googleapis.com/css?family=${urlFont}:${urlWeights}&display=swap`;
//   return urlBase;
// };

// export { theme as defaultTheme } from '@chakra-ui/react';
