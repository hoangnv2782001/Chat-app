// ----------------------------------------------------------------------

export default function CssBaseline() {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        // css scrollbar
        body: {
          width: '100%',
          height: '100%',
          scrollbarColor: "#6b6b6b #fff",
          "&::-webkit-scrollbar, &*::-webkit-scrollbar": {
            width:0,
            height : 0,
          },
          // "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
          //   borderRadius: 8,
          //   backgroundColor: "#6b6b6b",
          //   minHeight: 24,
          //   border: "3px solid #2b2b2b",
          // },
          // "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
           
          // },
          // "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
          //   backgroundColor: "#959595",
          // },
          // "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
          //   backgroundColor: "#959595",
          //   borderRadius: 8,
          //   // backgroundColor: "#6b6b6b",
          //   minHeight: 24,
          //   border: "3px solid #2b2b2b",
          // },
          
        }
      },
    },
  };
}
