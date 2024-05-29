import React from 'react'
import Layout from './layout.jsx'
import { Input, Heading, Link, FormControl, FormLabel, Flex, Textarea } from '@chakra-ui/react'

export default function AlterarFornecedor(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column' h={700}>
        <Heading mb={6}> {props.title} </Heading>

        <form action={`${props.action}`} method='POST'>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Nome</FormLabel>
            <Input name='for_nome' defaultValue={props.fornecedor ? props.fornecedor.for_nome : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Telefone</FormLabel>
            <Input name='for_tel' type='number' defaultValue={props.fornecedor ? props.fornecedor.for_tel : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Descrição</FormLabel>
            <Textarea name='for_desc' defaultValue={props.fornecedor ? props.fornecedor.for_desc : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>CEP</FormLabel>
            <Input name='for_cep' type='number' defaultValue={props.fornecedor ? props.fornecedor.for_cep : ''} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Numero</FormLabel>
            <Input name='for_num' type='number' defaultValue={props.fornecedor ? props.fornecedor.for_num : ''} />
          </FormControl>
          <Flex justify='center' align='center' direction='column'>
            <Input mb={6} type='submit' value='Salvar' w={'14rem'} />
            <Link color='red' href={'/listagemfornecedores'} textAlign='center' w={'4rem'}>
              Cancelar
            </Link>
          </Flex>
        </form>
      </Flex>
    </Layout>
  )
}
