import React from 'react'
import Layout from './layout.jsx'
import { Input, Heading, Link, FormControl, FormLabel, Flex, Textarea } from '@chakra-ui/react'

export default function AlterarProdutos(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column' h={700}>
        <Heading mb={6}> {props.title} </Heading>

        <form action={`${props.action}`} method='POST'>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Nome</FormLabel>
            <Input name='nome' defaultValue={props.produto ? props.produto.prod_nome : ''} />
          </FormControl>
          <FormControl mb={6} w={'18rem'} isReadOnly>
            <FormLabel>Quantidade</FormLabel>
            <Input type='number' defaultValue={props.produto ? props.produto.prod_quant : 0} border={0} />
          </FormControl>
          <FormControl isRequired mb={6} w={'18rem'}>
            <FormLabel>Descrição</FormLabel>
            <Textarea name='descricao' defaultValue={props.produto ? props.produto.prod_desc : ''} />
          </FormControl>
          <Flex justify='center' align='center' direction='column'>
            <Input mb={6} type='submit' value='Salvar' w={'14rem'} />
            <Link color='red' href={'/listagemprodutos'} textAlign='center' w={'4rem'}>
              Cancelar
            </Link>
          </Flex>
        </form>
      </Flex>
    </Layout>
  )
}
