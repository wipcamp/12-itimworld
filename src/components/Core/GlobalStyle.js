import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 *{
  font-family: 'Sarabun', sans-serif;
 }
 h1{
  font-family: 'Sarabun', sans-serif;
  text-transform: uppercase;
 }
 h2{
  font-family: 'Sarabun', sans-serif;
  font-style: normal;
  font-weight: bold;
 }

 @font-face{
    font-family: 'Sarabun';
    src: url('/font/Sarabun-Regular.ttf') format('truetype');
  }
`

export default GlobalStyle
