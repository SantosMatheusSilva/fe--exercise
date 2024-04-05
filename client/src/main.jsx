import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    600: '#3f78b4'
  },
  brand2:{
    orange: '#E36C14',
    yellow: '#E89611',
    gray: '#8B8B8C'
  }
}

const fonts = {
  body: "system-ui, sans-serif",
  heading: "monospace",
  mono: "Menlo, monospace",
}

const textStyles = {
  h1: {
    fontSize: ['48px', '72px'],
    fontWeight: 'bold',
    lineHeight: '110%',
    letterSpacing: '-2%',
  },
  h2: {
    fontSize: ['36px', '48px'],
    fontWeight: 'semibold',
    lineHeight: '110%',
    letterSpacing: '-1%',
  },
}

const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme({ colors, fonts, textStyles, breakpoints })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <Router>
    <App />
    </Router>
    </ChakraProvider>
  </React.StrictMode>
)
