import express from 'express'
import session from 'express-session'
import { createEngine } from 'express-react-views'
/* import http from 'http' */
import { config } from 'dotenv'
import {
  getAlterarProduto,
  getChegada,
  getClientes,
  getEsqueci,
  getFornecedores,
  getListagemProdutos,
  getLogin,
  getLogout,
  getPrincipal,
  getProdutosRecebidos,
  getProdutosVendidos,
  getSaida,
  getAlterarCliente,
  getCriarProduto,
  getCriarCliente,
  getAlterarFornecedor,
  getCriarFornecedor
} from './getMiddlewares.js'
import {
  postAlterarProduto,
  postLogin,
  postAlterarCliente,
  postCriarProduto,
  postCriarCliente,
  postCriarFornecedor,
  postAlterarFornecedor,
  postChegada,
  postSaida,
  postProdutosRecebidos,
  postProdutosVendidos
} from './postMiddlewares.js'
config()
// TO DO remover body-parser

const app = express()

app.use(session({ secret: 'SessionSecret: uhterere', resave: true, saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))
// Debug
/* app.use((req, res, next) => {
  req.session.usuario = true
  next()
}) */
app.engine('jsx', createEngine())
app.set('view engine', 'jsx')
app.set('views', './views')
app.set('port', process.env.porta)

// Função para entrada com usuario
// User input function
app.get('/', getPrincipal)

app.get('/login', getLogin)

// Função que verifica o nome e senha do usuario
// Function that checks user name and password
app.post('/login', postLogin)

// Função que pega os produtos
// Function that picks up the products
app.get('/listagemprodutos', getListagemProdutos)

app.get('/produtosrecebidos', getProdutosRecebidos)

app.post('/produtosrecebidos', postProdutosRecebidos)

app.get('/produtosvendidos', getProdutosVendidos)

app.post('/produtosvendidos', postProdutosVendidos)

app.get('/listagemfornecedores', getFornecedores)

app.get('/listagemclientes', getClientes)

app.get('/chegada', getChegada)

app.post('/chegada', postChegada)

app.get('/saida', getSaida)

app.post('/saida', postSaida)

app.get('/logout', getLogout)

app.get('/esqueci', getEsqueci)

// Cliente
app.get('/alterarcliente/:codigo', getAlterarCliente)

app.post('/alterarcliente/:codigo', postAlterarCliente)

app.get('/criarcliente', getCriarCliente)

app.post('/criarcliente', postCriarCliente)

// Produto
app.get('/alterarproduto/:codigo', getAlterarProduto)

app.get('/criarproduto', getCriarProduto)

app.post('/criarproduto', postCriarProduto)

app.post('/alterarproduto/:codigo', postAlterarProduto)

// Fornecedor
app.get('/alterarfornecedor/:codigo', getAlterarFornecedor)

app.get('/criarfornecedor', getCriarFornecedor)

app.post('/criarfornecedor', postCriarFornecedor)

app.post('/alterarfornecedor/:codigo', postAlterarFornecedor)

/* app.listen(porta) */
/* http.createServer(app) */ app.listen(app.get('port'), () => {
  console.log('Express server listening on port http://localhost:' + app.get('port') + '/')
})
