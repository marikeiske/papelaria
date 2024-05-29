import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Table, Th, Td, Tr, Thead, Tbody, Link, Button } from '@chakra-ui/react'

export default function ListagemProdutos(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column'>
        <Flex w={'80%'} justify='space-between' my={10}>
          <Link href='/'>Principal</Link>
          <Heading>Listagem de Produtos</Heading>
          <Link href='/logout'>Logout</Link>
        </Flex>
        <Link href='/criarproduto'>
          <Button mb={4}>Criar Produto</Button>
        </Link>
        <Table w={'80%'} variant='simple'>
          <Thead w={'100%'}>
            <Tr>
              <Th w={'5%'} isNumeric>
                Codigo
              </Th>
              <Th w={'20%'}>Nome</Th>
              <Th w={'10%'} isNumeric>
                Quantidade
              </Th>
              <Th w={'45%'}>Descrição</Th>
              <Th w={'10%'}>Alterar</Th>
              {/* <Th w={'10%'}>Excluir</Th> */}
            </Tr>
          </Thead>
          <Tbody w={'100%'}>
            {props.produtos.map((produto, index) => (
              <Tr key={index}>
                <Td w={'5%'} isNumeric>
                  {produto['prod_id']}
                </Td>
                <Td w={'20%'}>{produto['prod_nome']}</Td>
                <Td w={'10%'} isNumeric>
                  {produto['prod_quant']}
                </Td>
                <Td w={'45%'}>{produto['prod_desc']}</Td>
                <Td w={'10%'}>
                  <Link color='red' href={`/alterarproduto/${produto['prod_id']}`}>
                    Alterar
                  </Link>
                </Td>
                {/* <Td w={'10%'}>
                  <Link color='red' href={`/excluirproduto/${produto['prod_id']}`}>
                    Excluir
                  </Link>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Layout>
  )
}
