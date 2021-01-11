import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'


const geforceGreen = '#76B900'
export const playstationBlue = '#006FCD'
export const xboxGreen = '#0E7A0D'
export const cyberpunkYellow = '#FDF800'
export const nintendoRed = '#E4000F'
export const androidGreen = '#3DDC84'
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