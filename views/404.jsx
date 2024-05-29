import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Text, Link } from '@chakra-ui/react'

export default function HelloMessage() {
  return (
    <Layout>
      <Flex>
        <Heading>404</Heading>
        <Text>Página não encontrada ou sem permissão para visualizar</Text>
        <Text>
          Clique <Link href='/'>aqui</Link> para entrar no sistema.
        </Text>
      </Flex>
    </Layout>
  )
}
