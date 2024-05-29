import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Table, Th, Tr, Td, Thead, Button, Tbody, Link } from '@chakra-ui/react'

export default function ListagemProdutos(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column'>
        <Flex w={'90%'} justify='space-between' my={10}>
          <Link href='/'>Principal</Link>
          <Heading>Fornecedores</Heading>
          <Link href='/logout'>Logout</Link>
        </Flex>
        <Link href='/criarfornecedor'>
          <Button mb={4}>Adicionar fornecedor</Button>
        </Link>
        <Table w={'90%'} variant='simple'>
          <Thead w={'100%'}>
            <Tr>
              <Th w={'5%'} isNumeric>
                Codigo
              </Th>
              <Th w={'20%'}>Nome</Th>
              <Th w={'20%'} isNumeric>
                Telefone
              </Th>
              <Th w={'20%'}>Descrição</Th>
              <Th w={'30%'} isNumeric>
                CEP
              </Th>
              <Th w={'30%'} isNumeric>
                Numero
              </Th>
              <Th w={'10%'}>Alterar</Th>
            </Tr>
          </Thead>
          <Tbody w={'100%'}>
            {props.fornecedores.map((fornecedor, index) => (
              <Tr key={index}>
                <Td w={'5%'} isNumeric>
                  {fornecedor['for_id']}
                </Td>
                <Td w={'20%'}>{fornecedor['for_nome']}</Td>
                <Td w={'10%'} isNumeric>
                  {fornecedor['for_tel']}
                </Td>
                <Td w={'30%'} isNumeric>
                  {fornecedor['for_desc']}
                </Td>
                <Td w={'30%'} isNumeric>
                  {fornecedor['for_cep']}
                </Td>
                <Td w={'5%'} isNumeric>
                  {fornecedor['for_num']}
                </Td>
                <Td w={'10%'}>
                  <Link color='red' href={`/alterarfornecedor/${fornecedor['for_id']}`}>
                    Alterar
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Layout>
  )
}
