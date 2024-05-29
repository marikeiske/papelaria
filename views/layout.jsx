import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

export default function Layout(props) {
  return (
    <ChakraProvider>
      <html>
        <head>
          <title>{'Dammmajo'}</title>
        </head>
        <body>{props.children}</body>
      </html>
    </ChakraProvider>
  )
}
