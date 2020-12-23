import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

/* const xboxGreen = '#0E7A0D' */
const geforceGreen = '#76B900'
let theme = createMuiTheme({
  palette: {
    primary: {
      main: geforceGreen[600],
    },
    secondary: {
      main: '#EC8116'[700]
    },

    type: 'dark'
  }

})

theme = responsiveFontSizes(theme)

export default theme