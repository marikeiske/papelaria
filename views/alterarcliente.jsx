import React from 'react'
import Layout from './layout.jsx'
import { Input, Heading, Link, FormControl, FormLabel, Flex } from '@chakra-ui/react'

export default function AlterarCliente(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column' h={700}>
        <Heading mb={6}> {props.title} </Heading>

        <form action={`${props.action}`} method='POST'>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Nome</FormLabel>
            <Input name='cli_nome' defaultValue={props.cliente ? props.cliente.cli_nome : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Telefone</FormLabel>
            <Input name='cli_tel' type='number' defaultValue={props.cliente ? props.cliente.cli_tel : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>CEP</FormLabel>
            <Input name='cli_cep' type='number' defaultValue={props.cliente ? props.cliente.cli_cep : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Numero</FormLabel>
            <Input name='cli_num' type='number' defaultValue={props.cliente ? props.cliente.cli_num : ''} />
          </FormControl>
          <Flex justify='center' align='center' direction='column'>
            <Input mb={6} type='submit' value='Salvar' w={'14rem'} />
            <Link color='red' href={'/listagemclientes'} textAlign='center' w={'4rem'}>
              Cancelar
            </Link>
          </Flex>
        </form>
      </Flex>
    </Layout>
  )
}
