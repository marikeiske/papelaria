import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Input, Link, Text } from '@chakra-ui/react'

export default function HelloMessage(props) {
  return (
    <Layout>
      <Flex justify='center' align='center' direction='column' h={700}>
        <Heading my={6}>Login</Heading>
        <form name='frmLogin' method='POST'>
          <Text>Usuário</Text>
          <Input type='text' name='usuario' />
          <Text mt={4}>Senha</Text>
          <Input type='password' name='senha' />
          <Flex justify='center' align='center'>
            <Input w={100} type='submit' value='Entrar' mt={6} />
          </Flex>
        </form>
        {props.error && (
          <Flex color={'red'} mt={6}>
            {props.error}
          </Flex>
        )}
        <Link href={'/esqueci'} my={6}>
          Esqueci minha senha
        </Link>
      </Flex>
    </Layout>
  )
}
