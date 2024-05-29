import {
  atualizarCliente,
  atualizarProduto,
  buscarUsuario,
  criarProduto,
  criarCliente,
  atualizarFornecedor,
  criarFornecedor,
  listarFornecedores,
  salvarChegada,
  listarProdutos,
  recuperarProduto,
  atualizarProdutoQuantidade,
  listarClientes,
  salvarSaida,
  listarChegada,
  listarSaida
} from './banco.js'

export async function postLogin(req, res) {
  const usuario = req.body.usuario
  const senha = req.body.senha

  const linhas = await buscarUsuario(usuario, senha)
  let achou = false
  if (linhas && linhas.length > 0) achou = true

  if (achou) {
    req.session.usuario = usuario
    res.redirect('/')
  } else {
    res.render('login', { error: 'Usuario e/ou senha incorretos, caso tenha esquecido contate o administrador' })
  }
}

// Produto
export async function postAlterarProduto(req, res) {
  if (req.session.usuario) {
    const codigo = parseInt(req.params.codigo)
    const nome = req.body.nome
    /* const quantidade = req.body.quantidade */
    const descricao = req.body.descricao

    await atualizarProduto(nome, /* quantidade, */ descricao, codigo)
    res.redirect('/listagemprodutos')
  } else {
    res.redirect('/login')
  }
}

export async function postCriarProduto(req, res) {
  if (req.session.usuario) {
    const nome = req.body.nome
    const descricao = req.body.descricao

    await criarProduto(nome, descricao)
    res.redirect('/listagemprodutos')
  } else {
    res.redirect('/login')
  }
}

// Cliente
export async function postAlterarCliente(req, res) {
  if (req.session.usuario) {
    const codigo = parseInt(req.params.codigo)
    const cli_nome = req.body.cli_nome
    const cli_tel = req.body.cli_tel
    const cli_cep = req.body.cli_cep
    const cli_num = req.body.cli_num

    console.log(codigo)

    await atualizarCliente(cli_nome, cli_tel, cli_cep, cli_num, codigo)
    res.redirect('/listagemclientes')
  } else {
    res.redirect('/login')
  }
}

export async function postCriarCliente(req, res) {
  if (req.session.usuario) {
    const cli_nome = req.body.cli_nome
    const cli_tel = req.body.cli_tel
    const cli_cep = req.body.cli_cep
    const cli_num = req.body.cli_num

    await criarCliente(cli_nome, cli_tel, cli_cep, cli_num)
    res.redirect('/listagemclientes')
  } else {
    res.redirect('/login')
  }
}

// Fornecedor
export async function postAlterarFornecedor(req, res) {
  if (req.session.usuario) {
    const codigo = parseInt(req.params.codigo)
    const for_nome = req.body.for_nome
    const for_tel = req.body.for_tel
    const for_desc = req.body.for_desc
    const for_cep = req.body.for_cep
    const for_num = req.body.for_num

    console.log(codigo) //for_nome, for_tel, for_desc, for_cep, for_num,

    await atualizarFornecedor(for_nome, for_tel, for_desc, for_cep, for_num, codigo)
    res.redirect('/listagemfornecedores')
  } else {
    res.redirect('/login')
  }
}

export async function postCriarFornecedor(req, res) {
  if (req.session.usuario) {
    const for_nome = req.body.for_nome
    const for_tel = req.body.for_tel
    const for_desc = req.body.for_desc
    const for_cep = req.body.for_cep
    const for_num = req.body.for_num

    await criarFornecedor(for_nome, for_tel, for_desc, for_cep, for_num)
    res.redirect('/listagemfornecedores')
  } else {
    res.redirect('/login')
  }
}

export async function postChegada(req, res) {
  if (req.session.usuario) {
    const rows = []
    const fornecedores = await listarFornecedores()
    const produtos = await listarProdutos()
    if (Array.isArray(req.body.codigo)) {
      for (let index = 0; index < req.body.codigo.length; index++) {
        const testObject = {}
        testObject.codigo = req.body.codigo[index]
        testObject.quantidade = req.body.quantidade[index]
        testObject.fornecedor = Array.isArray(req.body.fornecedor) ? req.body.fornecedor[0] : req.body.fornecedor
        testObject.horario = Array.isArray(req.body.horario) ? req.body.horario[0] : req.body.horario
        rows.push(testObject)
      }
    } else {
      const codigo = req.body.codigo
      const quantidade = req.body.quantidade
      const fornecedor = req.body.fornecedor
      const horario = req.body.horario

      rows.push({ codigo, quantidade, fornecedor, horario })
    }
    if (req.body.buttonAction === 'Adicionar') {
      if (!req.body.codigo[0] || !req.body.quantidade[0] || !req.body.fornecedor || !req.body.horario) {
        rows.shift()
        if (!rows || rows.length < 1) {
          res.render('chegada', { fornecedores, produtos, error: 'Campos vazios!' })
        } else {
          res.render('chegada', { fornecedores, produtos, rows, error: 'Campos vazios!' })
        }
      } else {
        res.render('chegada', { fornecedores, produtos, rows })
      }
    } else {
      const rowsArray = []

      rows.shift()

      if (!rows || rows.length < 1) {
        res.render('chegada', { fornecedores, produtos, error: 'Sem linhas!' })
      } else {
        for (const row of rows) {
          const test = []
          test[0] = Number(row.codigo)
          test[1] = Number(row.quantidade)
          test[2] = Number(row.fornecedor)
          test[3] = row.horario
          rowsArray.push(test)
          const produto = await recuperarProduto(row.codigo)
          await atualizarProdutoQuantidade(Number(produto['prod_quant']) + Number(row.quantidade), row.codigo)
        }
        await salvarChegada(rowsArray)

        res.redirect('/chegada')
      }
    }
  } else {
    res.redirect('/login')
  }
}

export async function postSaida(req, res) {
  if (req.session.usuario) {
    const rows = []
    const clientes = await listarClientes()
    const produtos = await listarProdutos()
    if (Array.isArray(req.body.codigo)) {
      for (let index = 0; index < req.body.codigo.length; index++) {
        const testObject = {}
        testObject.codigo = req.body.codigo[index]
        testObject.quantidade = req.body.quantidade[index]
        testObject.cliente = Array.isArray(req.body.cliente) ? req.body.cliente[0] : req.body.cliente
        testObject.horario = Array.isArray(req.body.horario) ? req.body.horario[0] : req.body.horario
        rows.push(testObject)
      }
    } else {
      const codigo = req.body.codigo
      const quantidade = req.body.quantidade
      const cliente = req.body.cliente
      const horario = req.body.horario

      rows.push({ codigo, quantidade, cliente, horario })
    }
    if (req.body.buttonAction === 'Adicionar') {
      if (!req.body.codigo[0] || !req.body.quantidade[0] || !req.body.cliente || !req.body.horario) {
        rows.shift()
        if (!rows || rows.length < 1) {
          res.render('saida', { clientes, produtos, error: 'Campos vazios!' })
        } else {
          res.render('saida', { clientes, produtos, rows, error: 'Campos vazios!' })
        }
      } else {
        res.render('saida', { clientes, produtos, rows })
      }
    } else {
      const rowsArray = []

      rows.shift()

      if (!rows || rows.length < 1) {
        res.render('saida', { clientes, produtos, error: 'Sem linhas!' })
      } else {
        for (const row of rows) {
          const test = []
          test[0] = Number(row.codigo)
          test[1] = Number(row.quantidade)
          test[2] = Number(row.cliente)
          test[3] = row.horario
          rowsArray.push(test)
          const produto = await recuperarProduto(row.codigo)
          await atualizarProdutoQuantidade(Number(produto['prod_quant']) - Number(row.quantidade), row.codigo)
        }
        await salvarSaida(rowsArray)

        res.redirect('/saida')
      }
    }
  } else {
    res.redirect('/login')
  }
}

export async function postProdutosRecebidos(req, res) {
  if (req.session.usuario) {
    const transacoes = await listarChegada()
    const produtos = await listarProdutos()
    const fornecedores = await listarFornecedores()
    const dataInicial = new Date(req.body.dataInicial)
    const dataFinal = new Date(req.body.dataFinal)

    const transacoesFiltradas = []
    for (const transacao of transacoes) {
      if (new Date(transacao['data']) > dataInicial && new Date(transacao['data']) <= dataFinal) {
        transacoesFiltradas.push(transacao)
      }
    }

    res.render('produtosrecebidos', { transacoesFiltradas, produtos, fornecedores, dataInicial, dataFinal })
  } else {
    res.redirect('/login')
  }
}

export async function postProdutosVendidos(req, res) {
  if (req.session.usuario) {
    const transacoes = await listarSaida()
    const produtos = await listarProdutos()
    const clientes = await listarClientes()
    const dataInicial = new Date(req.body.dataInicial)
    const dataFinal = new Date(req.body.dataFinal)

    const transacoesFiltradas = []
    for (const transacao of transacoes) {
      if (new Date(transacao['data']) > dataInicial && new Date(transacao['data']) <= dataFinal) {
        transacoesFiltradas.push(transacao)
      }
    }

    res.render('produtosvendidos', { transacoesFiltradas, produtos, clientes, dataInicial, dataFinal })
  } else {
    res.redirect('/login')
  }
}
