import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Table, Th, Td, Tr, Thead, Tbody, Link, Input, FormControl, FormLabel } from '@chakra-ui/react'

export default function ProdutosRecebidos(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column'>
        <Flex w={'80%'} justify='space-between' mt={10}>
          <Link href='/'>Principal</Link>
          <Heading>Produtos Recebidos</Heading>
          <Link href='/logout'>Logout</Link>
        </Flex>
        <form method='POST'>
          <Flex my={10} w={1000} justify='center' align='center'>
            <FormControl isRequired w={48}>
              <FormLabel>Data inicial</FormLabel>
              <Input
                type='date'
                name='dataInicial'
                defaultValue={props.dataInicial ? props.dataInicial.toISOString().substr(0, 10) : null}
              />
            </FormControl>
            <FormControl isRequired mx={5} w={48}>
              <FormLabel>Data final</FormLabel>
              <Input type='date' name='dataFinal' defaultValue={props.dataFinal ? props.dataFinal.toISOString().substr(0, 10) : null} />
            </FormControl>
            <Input type='submit' value='Salvar' w={20} />
          </Flex>
        </form>
        <Table w={'80%'} variant='simple'>
          <Thead w={'100%'}>
            <Tr>
              <Th w={'20%'}>Produto</Th>
              <Th w={'15%'} isNumeric>
                Quantidade
              </Th>
              <Th w={'30%'}>Fornecedor</Th>
              <Th w={'10%'}>Data</Th>
            </Tr>
          </Thead>
          <Tbody w={'100%'}>
            {props.transacoesFiltradas.map((transacao, index) => (
              <Tr key={index}>
                <Td w={'5%'}>
                  {(() => {
                    for (let i = 0; i < props.produtos.length; i++) {
                      if (props.produtos[i].prod_id == transacao['id_prod']) {
                        return transacao['id_prod'] + ': ' + props.produtos[i].prod_nome
                      }
                    }
                    return transacao['id_prod']
                  })()}
                </Td>
                <Td w={'15%'} isNumeric>
                  {transacao['quant_adic']}
                </Td>
                <Td w={'20%'}>
                  {(() => {
                    for (let i = 0; i < props.fornecedores.length; i++) {
                      if (props.fornecedores[i].for_id == transacao['id_for']) {
                        return transacao['id_for'] + ': ' + props.fornecedores[i].for_nome
                      }
                    }
                    return transacao['id_for']
                  })()}
                </Td>
                <Td w={'15%'}>{transacao['data'].toLocaleDateString('pt-BR')}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Layout>
  )
}
