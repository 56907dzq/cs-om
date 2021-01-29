// import { extendTheme } from '@chakra-ui/react';
// import { mode } from '@chakra-ui/theme-tools';


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

// function formatFont(font) {
//   const fontList = font.split(' ');
//   const fontFmt = fontList.length >= 2 ? `'${fontList.join(' ')}'` : fontList.join(' ');
//   return fontFmt;
// }
  
// function importFonts(userFonts){
//   const [body, mono] = [defaultBodyFonts, defaultMonoFonts];
//   const { body: userBody, mono: userMono, ...fontWeights } = userFonts;
//   const bodyFmt = formatFont(userBody);
//   const monoFmt = formatFont(userMono);
//   if (userFonts.body && !body.includes(bodyFmt)) {
//     body.unshift(bodyFmt);
//   }
//   if (userFonts.mono && !mono.includes(monoFmt)) {
//     mono.unshift(monoFmt);
//   }
//   return [
//     {
//       body: body.join(', '),
//       heading: body.join(', '),
//       mono: mono.join(', '),
//     },
//     fontWeights,
//   ];
// }
  
//   const defaultTheme = extendTheme({
//     fonts,
//     styles: {
//       global: props => ({
//         html: { scrollBehavior: 'smooth', height: '-webkit-fill-available' }
//       }),
//     },
//   });

// export function googleFontUrl(fontFamily: string, weights: number[] = [300, 400, 700]): string {
//   const urlWeights = weights.join(',');
//   const fontName = fontFamily.split(/, /)[0].trim().replace(/'|"/g, '');
//   const urlFont = fontName.split(/ /).join('+');
//   return `https://fonts.googleapis.com/css?family=${urlFont}:${urlWeights}&display=swap`;
// }

// export { theme as defaultTheme } from '@chakra-ui/react';
  