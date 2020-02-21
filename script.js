function converteReal(lista, sup = 100, inf = 0) {
  var baseDez = 0
  for (i = 0; i < lista.length; i++) {
    if (lista[i]) baseDez += 2 ** i
  }
  return inf + ((sup - inf) / (2 ** lista.length - 1)) * baseDez
}

//gera populacao inicial
function populacaoInicial(individuos = 10, genes = 8) {
  var pop = []
  for (i = 0; i < individuos; i++) {
    var cromossomo = {
      genes: []
    }
    for (j = 0; j < genes; j++) {
      cromossomo.genes.push(Math.round(Math.random()))
    }
    pop.push(cromossomo)
  }
  return pop
}

function aptidao(cromossomo) {
  let pedaco1 = cromossomo.genes.slice(0, cromossomo.genes.length / 2)
  let pedaco2 = cromossomo.genes.slice(
    cromossomo.genes.length / 2,
    cromossomo.genes.length
  )

  let x1 = converteReal(pedaco1, -3.1, 12.1)
  let x2 = converteReal(pedaco2, 4.1, 5.8)

  return (
    21.5 + x1 * Math.sin(4 * Math.PI * x1) + x2 * Math.sin(20 * Math.PI * x2)
  )
}

function sorteio(arrayRoleta) {
  let rand = Math.random()
  let c = 0
  while (arrayRoleta[c] <= rand) {
    c++
  }
  return c
}

function operadorCruzamento(casal, probCruzamento) {
  cruzaOuNao = Math.random()
  if (cruzaOuNao < probCruzamento) {
    pontoCruzamento = Math.round(Math.random() * casal[0].genes.length)
    filhos = [{ genes: [] }, { genes: [] }]
    for (var index = 0; index < pontoCruzamento; index++) {
      filhos[0].genes[index] = casal[0].genes[index]
      filhos[1].genes[index] = casal[1].genes[index]
    }
    for (var index = pontoCruzamento; index < casal[0].genes.length; index++) {
      filhos[1].genes[index] = casal[1].genes[index]
      filhos[0].genes[index] = casal[0].genes[index]
    }
  } else {
    // só passa para frente
    filhos = casal
  }
  return filhos
}

function operadorMutacao(popOld, probMutacao) {
  let mutado = popOld
  console.log(mutado)
  for (let i = 0; i < mutado.length; i++) {
    for (let j = 0; j < mutado[i].genes.length; j++) {
      mutaOuNao = Math.random()
      if (mutaOuNao < probMutacao) {
        mutado[i].genes[j] = Math.round(Math.random())
      }
    }
  }
  return mutado
}

function roleta(popOld, probCruzamento, probMutacao) {
  var sumFit = 0
  var acumulatorProb = 0
  var arrayRoleta = []
  var selected = []

  for (let c = 0; c < popOld.length; c++) {
    sumFit += popOld[c].aptidao
  }

  for (let c = 0; c < popOld.length; c++) {
    popOld[c].probNow = popOld[c].aptidao / sumFit
    acumulatorProb = popOld[c].probNow + acumulatorProb
    arrayRoleta.push(acumulatorProb)
  }
  for (let i = 0; i < popOld.length; i++) {
    let pos = sorteio(arrayRoleta)

    selected.push(popOld[pos])
  }

  let filhos = []
  for (let i = 0; i < popOld.length / 2; i++) {
    sorteados = [
      Math.floor(Math.random() * popOld.length),
      Math.floor(Math.random() * popOld.length)
    ]
    while (sorteados[0] == sorteados[1])
      sorteados[1] = Math.floor(Math.random() * popOld.length)
    casal = [popOld[sorteados[0]], popOld[sorteados[1]]]

    filhos.push(...operadorCruzamento(casal, probCruzamento))
  }

  let mutado = operadorMutacao(filhos, probMutacao)
  return mutado
}

function melhorCasal(individuos, lista) {
  // observe que utilizo os itens da lista, e nao o array de populacao inteiro!
  var maior = individuos[lista[0]],
    segundoMaior
  for (let i = 1; i < lista.length; i++) {
    if (individuos[lista[i]].aptidao > maior.aptidao) {
      segundoMaior = maior
      maior = individuos[lista[i]]
    }
  }
  console.log(maior, segundoMaior, lista)
  return [maior, segundoMaior]
}

function torneio(popOld, tamanhoTorneio, probCruzamento) {
  var filhos = []
  do {
    // sorteia x valores na pop
    var sorteados = []
    for (let i = 0; i < tamanhoTorneio; i++) {
      var sorteio = Math.round(Math.random() * (popOld.length - 1))
      while (sorteados.includes(sorteio))
        sorteio = Math.round(Math.random() * (popOld.length - 1))
      sorteados.push(sorteio)
    }
    //selecionar casal
    var casal = melhorCasal(popOld, sorteados)

    filhos.push(...operadorCruzamento(casal, probCruzamento))
  } while (filhos.length < popOld.length)
}

function botaoClicado() {
  const tamanhoC = parseInt(document.getElementById("tamanhoC").value)
  const tamanhoPop = parseInt(document.getElementById("tamanhoPop").value)
  const probCruzamento =
    parseInt(document.getElementById("probCruzamento").value) / 100
  const probMutacao =
    parseInt(document.getElementById("probMutacao").value) / 100
  const qtGeracoes = parseInt(document.getElementById("qtGeracoes").value)
  const tipo = document.getElementById("tipo").value
  const tamanhoTorneio = parseInt(
    document.getElementById("tamanhoTorneio").value
  )
  const tamanhoElitismo = parseInt(
    document.getElementById("tamanhoElitismo").value
  )
  var population = populacaoInicial(tamanhoPop, tamanhoC)
  // calcula aptidao
  for (let k = 0; k < population.length; k++) {
    population[k].aptidao = parseFloat(aptidao(population[k]).toFixed(2))
  }
  var add = ""

  for (let cont = 0; cont < qtGeracoes; cont++) {
    var best = []
    if (tipo == 1) {
      // seleciona melhores por roleta
      best = roleta(population, probCruzamento, probMutacao)
    }
    if (tipo == 2) {
      // faz torneio
      if (tamanhoTorneio < tamanhoPop) {
        best = torneio(population, tamanhoTorneio, probCruzamento)
        return
      } else {
        alert("torneio muito grande!")
      }
    }
    population = best

    // calcula aptidao
    for (let k = 0; k < population.length; k++) {
      population[k].aptidao = parseFloat(aptidao(population[k]).toFixed(2))
    }

    add += `Geracao ${cont}, individuos: `
    for (k = 0; k < population.length; k++) {
      add += `
          <span title="${population[k].genes}">
            ${population[k].aptidao};   
          </span>  `
    }
    add += `<br />`
  }

  add += `populacao resultante: <br />`
  for (k = 0; k < population.length; k++) {
    add += `${population[k].genes} -> ${population[k].aptidao} <br/>`
  }
  document.getElementById("log").innerHTML = add
}

//--------------------------------------------------------
