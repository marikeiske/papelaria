import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Link } from '@chakra-ui/react'

export default function HelloMessage() {
  return (
    <Layout>
      <Flex justify='center' align='center' direction='column' height={700}>
        <Heading my={6}>Para recuperar sua senha ou usuario contate o admin</Heading>

        <Link href={'/'}>Voltar</Link>
      </Flex>
    </Layout>
  )
}
