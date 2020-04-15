//gera populacao inicial
function populacaoInicial(
  individuos = 10,
  a1 = -10,
  b1 = 12,
  a2 = -10,
  b2 = 12
) {
  let pop = []
  for (i = 0; i < individuos; i++) {
    let cromossomo = {
      x: a1 + Math.random() * (b1 - a1),
      y: a2 + Math.random() * (b2 - a2),
    }
    pop.push(cromossomo)
  }
  return pop
}

function aptidao(cromossomo) {
  let x = cromossomo.x
  let y = cromossomo.y

  let fit =
    15 +
    (x - 3) ** 2 / 2 +
    (y - 3) ** 2 / 2 -
    2 * (Math.sin(4 * x - 3) + Math.sin(4 * y - 3))

  return fit
}

function operadorCruzamento(casal, probCruzamento, tipoCruzamento) {
  let cruzaOuNao = Math.random()
  if (cruzaOuNao < probCruzamento) {
    let filhos = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
    ]
    let x0 = casal[0].x
    let y0 = casal[0].y
    let x1 = casal[1].x
    let y1 = casal[1].y
    //radcliff
    if (tipoCruzamento == 1) {
      let beta = Math.random()
      filhos[0].x = beta * x0 + (1 - beta) * x1
      filhos[0].y = beta * y0 + (1 - beta) * y1

      filhos[1].x = (1 - beta) * x0 + beta * x1
      filhos[1].y = (1 - beta) * y0 + beta * y1
    }

    // wright
    if (tipoCruzamento == 2) {
      filhos[0].x = 0.5 * x0 + 0.5 * x1
      filhos[0].y = 0.5 * y0 + 0.5 * y1

      filhos[1].x = 1.5 * x0 + 0.5 * x1
      filhos[1].y = 1.5 * y0 + 0.5 * y1

      filhos.push({
        x: 0.5 * x0 + 1.5 * x1,
        y: 0.5 * y0 + 1.5 * y1,
      })

      for (let i = 0; i < filhos.length; i++) {
        if (
          filhos[i].x < -10 ||
          filhos[i].y < -10 ||
          filhos[i].x > 12 ||
          filhos[i].y > 12
        ) {
          filhos.splice(i, 1)
        }
      }
    }
    return filhos
  } else {
    return casal
  }
}

function operadorMutacao(popOld, probMutacao) {
  let mutado = popOld
  for (let i = 0; i < mutado.length; i++) {
    let mutaOuNao = Math.random()
    if (mutaOuNao < probMutacao) {
      qualGene = Math.round(Math.random())
      //corrigir, pode ser que ele vá mutar ambos genes!!!
      mutado[i].genes[j] = Math.round(Math.random())
    }
  }
  return mutado
}

function roleta(popOld, probCruzamento, probMutacao, tipoCruzamento, elite) {
  var sumFit = 0
  var acumulatorProb = 0
  var arrayRoleta = []
  var selected = []
  var tamanhoRetorno = popOld.length - elite.length
  for (let c = 0; c < tamanhoRetorno; c++) {
    sumFit += popOld[c].aptidao
  }

  for (let c = 0; c < tamanhoRetorno; c++) {
    popOld[c].probNow = popOld[c].aptidao / sumFit
    acumulatorProb = popOld[c].probNow + acumulatorProb
    arrayRoleta.push(acumulatorProb)
  }
  for (let i = 0; i < tamanhoRetorno; i++) {
    let rand = Math.random()
    let pos = 0
    while (arrayRoleta[pos] <= rand) {
      pos++
    }

    selected.push(popOld[pos])
  }

  let filhos = []
  while (filhos.length < tamanhoRetorno) {
    let sorteados = [
      Math.floor(Math.random() * selected.length),
      Math.floor(Math.random() * selected.length),
    ]
    while (sorteados[0] == sorteados[1])
      sorteados[1] = Math.floor(Math.random() * selected.length)

    let casal = [selected[sorteados[0]], selected[sorteados[1]]]

    var tam = filhos.push(
      ...operadorCruzamento(casal, probCruzamento, tipoCruzamento)
    )

    while (tam > tamanhoRetorno) {
      filhos.pop()
      tam--
    }
  }

  let mutado = operadorMutacao(filhos, probMutacao)

  mutado.push(...elite)
  return mutado
}

function melhorCasal(individuos, lista) {
  // observe que utilizo os itens da lista, e nao o array de populacao inteiro!
  var maior, segundoMaior
  if (individuos[lista[0]].aptidao > individuos[lista[1]].aptidao) {
    maior = individuos[lista[0]]
    segundoMaior = individuos[lista[1]]
  } else {
    maior = individuos[lista[1]]
    segundoMaior = individuos[lista[0]]
  }

  for (let i = 2; i < lista.length; i++) {
    if (individuos[lista[i]].aptidao > maior.aptidao) {
      segundoMaior = maior
      maior = individuos[lista[i]]
    } else if (individuos[lista[i]] > segundoMaior.aptidao) {
      // isso é no caso de o primeiro for o maior
      segundoMaior = individuos[lista[i]]
    }
  }
  return [maior, segundoMaior]
}

function torneio(
  popOld,
  tamanhoTorneio,
  probCruzamento,
  tipoCruzamento,
  elite
) {
  var filhos = []
  var tamanhoRetorno = popOld.length - elite.length

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

    tam = filhos.push(
      ...operadorCruzamento(casal, probCruzamento, tipoCruzamento)
    )
    while (tam > tamanhoRetorno) {
      filhos.pop()
      tam--
    }
  } while (filhos.length < tamanhoRetorno)

  let mutado = operadorMutacao(filhos, probMutacao)

  mutado.push(...elite)
  return mutado
}

function elitismo(popOld, tamanhoElitismo) {
  var retorno = []
  var escolhidos = []

  for (let i = 0; i < tamanhoElitismo; i++) {
    var maior = popOld[0]
    var indiceMaior = 0
    for (let j = 0; j < popOld.length; j++) {
      if (popOld[j].aptidao > maior.aptidao && !escolhidos.includes(j)) {
        maior = popOld[j]
        indiceMaior = j
      }
    }
    escolhidos.push(indiceMaior)
    retorno.push(maior)
  }
  return retorno
}

function botaoClicado() {
  const tamanhoPop = parseInt(document.getElementById("tamanhoPop").value)
  const probCruzamento =
    parseInt(document.getElementById("probCruzamento").value) / 100
  const tipoCruzamento = parseInt(
    document.getElementById("tipoCruzamento").value
  )
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

  // validacoes
  if (tamanhoTorneio > tamanhoPop) {
    alert("torneio muito grande!")
    document.getElementById("tamanhoTorneio").value = 2
    return
  }
  if (tamanhoElitismo > tamanhoPop) {
    alert("O elitismo não pode ser maior que a população!")
    document.getElementById("tamanhoElitismo").value = 1
    return
  }

  var population = populacaoInicial(tamanhoPop)
  // calcula aptidao
  for (let k = 0; k < population.length; k++) {
    population[k].aptidao = aptidao(population[k]).toFixed(5)
  }
  let add = `Geracao 0, individuos: `
  for (k = 0; k < population.length; k++) {
    add += `
        <span title="${population[k].x}, ${population[k].y}">
          ${population[k].aptidao};   
        </span>  `
  }
  add += `<br />`

  maiorGlobal = 100
  var melhorIndividuo = elitismo(population, 1)[0]
  melhorIndividuo.geracaoEncontrado = 0
  melhorIndividuo.erro = melhorIndividuo.aptidao / maiorGlobal

  acumuladorPlot = []
  acumuladorPlot.push(getData(population, 0))
  plot(acumuladorPlot)

  for (let cont = 1; cont < qtGeracoes; cont++) {
    var best = []

    // elitismo nesta parte!
    var elite = elitismo(population, tamanhoElitismo)
    var melhorAgora = elitismo(population, 1)[0]

    if (melhorAgora.aptidao > melhorIndividuo.aptidao) {
      melhorIndividuo = melhorAgora
      melhorIndividuo.geracaoEncontrado = cont
      melhorIndividuo.erro = melhorIndividuo.aptidao / maiorGlobal
    }
    if (tipo == 1) {
      // seleciona melhores por roleta
      best = roleta(
        population,
        probCruzamento,
        probMutacao,
        tipoCruzamento,
        elite
      )
    }
    if (tipo == 2) {
      // faz torneio
      best = torneio(
        population,
        tamanhoTorneio,
        probCruzamento,
        tipoCruzamento,
        elite
      )
    }
    population = best

    // calcula aptidao
    for (let k = 0; k < population.length; k++) {
      var apt = aptidao(population[k])
      population[k].aptidao = aptidao(population[k]).toFixed(5)
    }

    acumuladorPlot.push(getData(population, cont))

    // poe na view
    add += `Geracao ${cont}, individuos: `
    for (k = 0; k < population.length; k++) {
      add += `
          <span title="${population[k].x}, ${population[k].y}">
            ${population[k].aptidao};   
          </span>  `
    }
    add += `<br />`
  }
  plot(acumuladorPlot)
  add += `populacao resultante: <br />`
  for (let k = 0; k < population.length; k++) {
    add += `${population[k].x}, ${population[k].y} -> ${population[k].aptidao} <br/>`
  }
  document.getElementById("log").innerHTML = add

  alert(`Aptidao: ${melhorIndividuo.aptidao}, 
    x = ${melhorIndividuo.x}, 
    y = ${melhorIndividuo.y}, 
    erro = ${(melhorIndividuo.erro * 100).toFixed(2)}%,
    geração encontrada = ${melhorIndividuo.geracaoEncontrado}`)
}

// plota no grafico
function plot(acumuladorPlot) {
  var data = []
  for (var a = 0; a < acumuladorPlot.length; a++) {
    data.push({
      opacity: 0.5,
      type: "scatter3d",
      name: `Geracao ${acumuladorPlot[a].geracao}`,
      x: acumuladorPlot[a].dados[0],
      y: acumuladorPlot[a].dados[1],
      z: acumuladorPlot[a].dados[2],
      mode: "markers",
    })
  }
  var layout = {
    scene: {
      xaxis: { range: [-10, 12] },
      yaxis: { range: [-10, 12] },
      zaxis: { range: [0, 300] },
    },
    height: 750,
  }

  Plotly.newPlot("chart", data, layout)

  // // trecho comentado para melhor UX
  // setTimeout(() => {
  // Plotly.newPlot("chart", data, layout)
  // }, 1000*geracao);
}

function getData(populacao, ger) {
  var arr = {
    geracao: ger,
    dados: [[], [], []],
  }
  for (let i = 0; i < 10; i++) {
    arr.dados[0].push(populacao[i].x)
    arr.dados[1].push(populacao[i].y)
    arr.dados[2].push(populacao[i].aptidao)
  }
  return arr
}
