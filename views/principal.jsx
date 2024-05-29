import React from 'react'
import Layout from './layout.jsx'
import { Flex, Link, Heading, Table, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react'

export default function HelloMessage(props) {
  return (
    <Layout>
      <Flex justify='center' align='center' direction='column'>
        <Flex w={'80%'} justify='space-between' my={10}>
          <Link href='/'>Principal</Link>
          <Link href='/logout'>Logout</Link>
        </Flex>
        <Flex w={'80%'} justify='space-around' my={10}>
          <Link href='/listagemclientes'>Clientes</Link>
          <Link href='/listagemprodutos'>Produtos</Link>
          <Link href='/listagemfornecedores'>Fornecedores</Link>
          <Link href='/produtosrecebidos'>Recebidos</Link>
          <Link href='/produtosvendidos'>Vendidos</Link>
          <Link href='/chegada'>Chegada</Link>
          <Link href='/saida'>Saída</Link>
        </Flex>
        <Flex w={'80%'} direction='column' justify='center' align='center'>
          <Heading>{'Produtos quase em falta ( <100 )'}</Heading>
          {props.produtosAcabando.length >= 1 ? (
            <Table w={'80%'} variant='simple' my={10}>
              <Thead w={'100%'}>
                <Tr>
                  <Th w={'25%'}>Codigo</Th>
                  <Th w={'25%'}>Nome</Th>
                  <Th w={'25%'}>Quantidade</Th>
                  <Th w={'25%'}>Descrição</Th>
                </Tr>
              </Thead>
              <Tbody w={'100%'}>
                {props.produtosAcabando.map((produto, index) => (
                  <Tr key={index}>
                    <Td w={'25%'}>{produto['prod_id']}</Td>
                    <Td w={'25%'}>{produto['prod_nome']}</Td>
                    <Td w={'25%'}>{produto['prod_quant']}</Td>
                    <Td w={'25%'}>{produto['prod_desc']}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text my={6}>Não há produtos quase acabando</Text>
          )}
        </Flex>
      </Flex>
    </Layout>
  )
}
