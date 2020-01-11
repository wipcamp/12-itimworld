import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 *{
  font-family: 'Sarabun', sans-serif;
 }
 h1{
  font-family: 'Sarabun', sans-serif;
  text-transform: uppercase;
 }

 @font-face{
    font-family: 'Sarabun';
    src: url('/font/Sarabun-Regular.ttf') format('truetype');
  }
`

export default GlobalStyle
