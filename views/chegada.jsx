import React from 'react'
import Layout from './layout.jsx'
import { Flex, Heading, Table, Th, Tr, Thead, Tbody, Link, FormControl, FormLabel, Input, Td, Select } from '@chakra-ui/react'

export default function chegada(props) {
  return (
    <Layout>
      <Flex align='center' justify='center' direction='column'>
        <Flex w={'80%'} justify='space-between' my={10}>
          <Link href='/'>Principal</Link>
          <Heading>Chegada de Produtos</Heading>
          <Link href='/logout'>Logout</Link>
        </Flex>
        <form method='POST'>
          <Flex justify='center' align='center' direction='column'>
            <Flex justify='space-between' align='center' direction='row' mt={6}>
              <FormControl mb={6} w={'10rem'} mx={4}>
                <FormLabel>Produto</FormLabel>
                <Select name='codigo'>
                  {props.produtos.map((produto, index) => {
                    return (
                      <option value={produto['prod_id']} key={index}>
                        {produto['prod_id'] + ': ' + produto['prod_nome']}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>

              <FormControl mb={6} w={'7rem'} mx={4}>
                <FormLabel>Quantidade</FormLabel>
                <Input type='number' name='quantidade' />
              </FormControl>

              {!props.rows && (
                <FormControl mb={6} w={'14rem'} mx={4}>
                  <FormLabel>Fornecedor</FormLabel>
                  <Select name='fornecedor'>
                    {props.fornecedores.map((fornecedor, index) => {
                      return (
                        <option value={fornecedor['for_id']} key={index}>
                          {fornecedor['for_id'] + ': ' + fornecedor['for_nome']}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              )}

              {!props.rows && (
                <FormControl mb={6} w={'12rem'} mx={4}>
                  <FormLabel>Horário</FormLabel>
                  <Input type='date' name='horario' />
                </FormControl>
              )}
            </Flex>
            <Flex justify='center' align='center'>
              <Input w={100} type='submit' value='Adicionar' name='buttonAction' />
              <Link color='red' href={'/'} textAlign='center' w={'4rem'} mx={5}>
                Cancelar
              </Link>
              <Input w={100} type='submit' value='Salvar' name='buttonAction' />
            </Flex>
            {props.error && (
              <Flex color={'red'} mt={6}>
                {props.error}
              </Flex>
            )}
            <Table variant='simple' my={10} w={1100}>
              <Thead>
                <Tr>
                  <Th w={'25%'}>Produto</Th>
                  <Th w={'25%'}>Quantidade</Th>
                  <Th w={'25%'}>Fornecedor</Th>
                  <Th w={'25%'}>Horário</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.rows &&
                  props.rows.map((row, index) => (
                    <Tr key={index}>
                      <Td w={'25%'}>
                        {(() => {
                          for (let i = 0; i < props.produtos.length; i++) {
                            if (props.produtos[i].prod_id == row['codigo']) {
                              return row['codigo'] + ': ' + props.produtos[i].prod_nome
                            }
                          }
                          return row['codigo']
                        })()}
                      </Td>
                      <Td w={'25%'}>{row['quantidade']}</Td>
                      <Td w={'25%'}>
                        {(() => {
                          for (let i = 0; i < props.fornecedores.length; i++) {
                            if (props.fornecedores[i].for_id == row['fornecedor']) {
                              return row['fornecedor'] + ': ' + props.fornecedores[i].for_nome
                            }
                          }
                          return row['fornecedor']
                        })()}
                      </Td>
                      <Td w={'25%'}>{row['horario']}</Td>
                      <Input display={'none'} name='codigo' defaultValue={row['codigo']} />
                      <Input display={'none'} name='quantidade' defaultValue={row['quantidade']} />
                      <Input display={'none'} name='fornecedor' defaultValue={row['fornecedor']} />
                      <Input display={'none'} name='horario' defaultValue={row['horario']} />
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Flex>
        </form>
      </Flex>
    </Layout>
  )
}
