import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'


const geforceGreen = '#76B900'
let theme = createMuiTheme({
  palette: {
    primary: {
      main: geforceGreen,
    },
    secondary: {
      main: '#ff9100',
    },
    type: 'dark',
  }

})

theme = responsiveFontSizes(theme)

export default theme