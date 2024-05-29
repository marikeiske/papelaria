import {
  listarProdutos,
  recuperarProduto,
  listarClientes,
  recuperarCliente,
  recuperarFornecedor,
  listarFornecedores,
  listarChegada,
  listarSaida
} from './banco.js'

export async function getPrincipal(req, res) {
  if (req.session.usuario) {
    const produtos = await listarProdutos()
    let produtosAcabando = []
    if (produtos) {
      produtosAcabando = produtos.filter(produto => produto['prod_quant'] < 100)
    }
    res.render('principal', { produtosAcabando })
  } else {
    res.redirect('/login')
  }
}

export function getLogin(req, res) {
  if (req.session.usuario) {
    res.redirect('/')
  } else {
    res.render('login')
  }
}

export async function getListagemProdutos(req, res) {
  if (req.session.usuario) {
    const produtos = await listarProdutos()
    res.render('listagemprodutos', { produtos })
  } else {
    res.redirect('/login')
  }
}

export async function getFornecedores(req, res) {
  if (req.session.usuario) {
    const fornecedores = await listarFornecedores()
    res.render('listagemfornecedores', { fornecedores })
  } else {
    res.redirect('/login')
  }
}

export async function getClientes(req, res) {
  if (req.session.usuario) {
    const clientes = await listarClientes()
    res.render('listagemclientes', { clientes })
  } else {
    res.redirect('/login')
  }
}

export async function getChegada(req, res) {
  if (req.session.usuario) {
    const fornecedores = await listarFornecedores()
    const produtos = await listarProdutos()

    res.render('chegada', { fornecedores, produtos })
  } else {
    res.redirect('/login')
  }
}

export async function getSaida(req, res) {
  if (req.session.usuario) {
    const clientes = await listarClientes()
    const produtos = await listarProdutos()

    res.render('saida', { clientes, produtos })
  } else {
    res.redirect('/login')
  }
}

export async function getProdutosRecebidos(req, res) {
  if (req.session.usuario) {
    const transacoes = await listarChegada()
    const produtos = await listarProdutos()
    const fornecedores = await listarFornecedores()
    const transacoesFiltradas = transacoes
    res.render('produtosrecebidos', { transacoesFiltradas, produtos, fornecedores })
  } else {
    res.redirect('/login')
  }
}

export async function getProdutosVendidos(req, res) {
  if (req.session.usuario) {
    const transacoes = await listarSaida()
    const produtos = await listarProdutos()
    const clientes = await listarClientes()
    const transacoesFiltradas = transacoes
    res.render('produtosvendidos', { transacoesFiltradas, produtos, clientes })
  } else {
    res.redirect('/login')
  }
}

export function getLogout(req, res) {
  if (req.session.usuario) {
    req.session.usuario = null
  }
  res.redirect('/login')
}

export function getEsqueci(req, res) {
  if (req.session.usuario) {
    res.redirect('/principal')
  } else {
    res.render('esqueci')
  }
}

// Produto
export async function getAlterarProduto(req, res) {
  if (req.session.usuario) {
    const codigo = parseInt(req.params.codigo)

    const produto = await recuperarProduto(codigo)
    if (produto == {}) {
      res.render('erro', { mensagem: 'Produto inexistente', link: '/listagemprodutos' })
    } else {
      res.render('alterarproduto', {
        title: 'Alteração do Produto',
        produto,
        action: '/alterarproduto/' + codigo
      })
    }
  } else {
    res.redirect('/login')
  }
}

export async function getCriarProduto(req, res) {
  if (req.session.usuario) {
    res.render('alterarproduto', {
      title: 'Criação de Produto',
      action: '/criarproduto'
    })
  } else {
    res.redirect('/login')
  }
}

// Cliente
export async function getCriarCliente(req, res) {
  if (req.session.usuario) {
    res.render('alterarcliente', {
      title: 'Criação de Cliente',
      action: '/criarcliente'
    })
  } else {
    res.redirect('/login')
  }
}

export async function getAlterarCliente(req, res) {
  if (req.session.usuario) {
    const codigo = parseInt(req.params.codigo)

    const cliente = await recuperarCliente(codigo)
    if (cliente == {}) {
      res.render('erro', { mensagem: 'Clientes inexistente', link: '/clientes' })
    } else {
      res.render('alterarcliente', {
        title: 'Alteração do Cliente',
        cliente,
        action: '/alterarcliente/' + codigo
      })
    }
  } else {
    res.redirect('/login')
  }
}

// Fornecedor
export async function getCriarFornecedor(req, res) {
  if (req.session.usuario) {
    res.render('alterarfornecedor', {
      title: 'Criação de Fornecedor',
      action: '/criarfornecedor'
    })
  } else {
    res.redirect('/login')
  }
}

export async function getAlterarFornecedor(req, res) {
  if (req.session.usuario) {
    const codigo = parseInt(req.params.codigo)

    const fornecedor = await recuperarFornecedor(codigo)
    if (fornecedor == {}) {
      res.render('erro', { mensagem: 'Fornecedor inexistente', link: '/listagemfornecedores' })
    } else {
      res.render('alterarfornecedor', {
        title: 'Alteração do Fornecedor',
        fornecedor,
        action: '/alterarfornecedor/' + codigo
      })
    }
  } else {
    res.redirect('/login')
  }
}
