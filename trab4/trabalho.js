//a tabela é assim, linhas e colunas: 
// Uberaba,Uberlândia,Araxá,Patos de Minas,Patrocínio,Monte Carmelo,Araguari,Ituiutaba,Prata,Frutal,Conceição das Alagoas,Campo Florido,Perdizes,Santa Juliana,Nova Ponte,Delta,Água Comprida,Sacramento,Conquista,Comendador Gomes
const tabelaDistancias = [
	[0  ,108,117,251,180,150,141,245,149,131,65 ,73 ,126,100,76 ,34 ,47 ,80 ,61 ,138],
	[108,0  ,177,221,150,108,39 ,137,87 ,182,166,174,135,110,74 ,141,148,158,168,150],
	[117,177,0  ,161,107,185,210,313,263,251,178,187,56 ,91 ,110,142,160,86 ,116,252],
	[251,221,161,0  ,75 ,153,219,357,312,405,332,341,139,188,180,296,314,251,272,375],
	[180,150,107,75 ,0  ,82 ,148,286,241,328,256,264,63 ,111,109,220,238,151,172,304],
	[150,108,185,153,82 ,0  ,100,245,199,290,218,227,140,118,72 ,182,200,165,186,262],
	[141,39 ,210,219,148,100,0  ,171,125,220,198,206,167,142,116,173,180,218,200,188],
	[245,137,313,357,286,245,171,0  ,103,199,209,175,270,245,209,277,284,293,304,151],
	[149,87 ,263,312,241,199,125,103,0  ,101,111,77 ,225,200,164,177,184,222,204,69 ],
	[131,182,251,405,328,290,220,199,101,0  ,75 ,76 ,266,227,216,165,122,210,192,52 ],
	[65 ,166,178,332,256,218,198,209,111,75 ,0  ,35 ,193,168,144,93 ,50 ,141,120,100],
	[73 ,174,187,341,264,227,206,175,77 ,76 ,35 ,0  ,202,177,152,101,108,150,128,66 ],
	[126,135,56 ,139,63 ,140,167,270,225,266,193,202,0  ,49 ,68 ,158,175,89 ,110,267],
	[100,110,91 ,188,111,118,142,245,200,227,168,177,49 ,0  ,43 ,119,137,72 ,93 ,229],
	[76 ,74 ,110,180,109,72 ,116,209,164,216,144,152,68 ,43 ,0  ,107,125,91 ,112,217],
	[34 ,141,142,296,220,182,173,277,177,165,93 ,101,158,119,107,0  ,74 ,51 ,33 ,166],
	[47 ,148,160,314,238,200,180,284,184,122,50 ,108,175,137,125,74 ,0  ,123,101,170],
	[80 ,158,86 ,251,151,165,218,293,222,210,141,150,89 ,72 ,91 ,51 ,123,0  ,24 ,211],
	[61 ,168,116,272,172,186,200,304,204,192,120,128,110,93 ,112,33 ,101,24 ,0  ,193],
	[138,150,252,375,304,262,188,151,69 ,52 ,100,66 ,267,229,217,166,170,211,193,0  ],
]

//gera populacao inicial
function populacaoInicial(individuos = 10, genes = 20) {
  var pop = [];
  for (i = 0; i < individuos; i++) {
    var cromossomo = {
      genes: [0]
    };
    // popula cada cromossomo com 20 genes de 1 a 19
    for (j = 1; j < genes; j++) {
	  do {
	  	var escolhido = Math.floor(Math.random() * (genes-1) + 1) // escolhe de 1 a 20
	  } while(cromossomo.genes.includes(escolhido))
      cromossomo.genes.push(escolhido);
    }
	cromossomo.genes.push(0)

    pop.push(cromossomo);
  }

  return pop;
}

// faz a funcão de aptidao que calcula a aptidao de certo individuo
function aptidao(genes) {
  //aplicar regras de aptidao aqui!!
  var aptidao = 5000;

  for (let z = 0; z < genes.length-1; z++) {
    aptidao -= tabelaDistancias[genes[z]][genes[z+1]]
  }
  return aptidao;
}

function operadorCruzamento(casal, probCruzamento) {
  var filhos = [{ genes: [] }, { genes: [] }];

  var cruzaOuNao = Math.random();
  if (cruzaOuNao < probCruzamento) {
	
	// cruzamento pmx
    var ponto1 = Math.floor(Math.random() * (casal[0].genes.length-2)+1);
    var ponto2 = Math.round(Math.random() * (casal[0].genes.length-2)+1);
    while (ponto1 == ponto2)
      ponto2 = Math.round(Math.random() * (casal[0].genes.length-2)+1);

    if (ponto1 > ponto2) {
      let aux = ponto2;
      ponto2 = ponto1;
      ponto1 = aux;
    }
    
    // console.log("Ocorreu Cruzamento, corte = " + ponto1)
    for (var index = 0; index < ponto1; index++) {
      filhos[1].genes.push(casal[1].genes[index]);
      filhos[0].genes.push(casal[0].genes[index]);
    }
    for (var index = ponto1; index < ponto2; index++) {
      filhos[1].genes.push(casal[0].genes[index]);
      filhos[0].genes.push(casal[1].genes[index]);
    }
    for (var index = ponto2; index < casal[0].genes.length; index++) {
      filhos[1].genes.push(casal[1].genes[index]);
      filhos[0].genes.push(casal[0].genes[index]);
    }

	for(let i = 1; i<filhos[0].genes.length-1; i++){
	  for(let j = i; j<filhos[0].genes.length-1; j++){
		if(filhos[0].genes[i] == filhos[0].genes[j]){ // se entra aqui, quer dizer que repetiu algum
		  for(let k = 1; k<filhos[0].genes.length-1; k++){
			if(!filhos[0].genes.includes(k)){ // quer dizer que este é o que foi excluido pelo cruzamento
			  filhos[0].genes[i] = k
			}
		  }
		}
	  }
	}
    // console.log("casal: ", casal)
    // console.log("filhos: ", filhos)
    return filhos;
  } else {
    return casal;
  }
}

function operadorMutacao(popOld, probMutacao) {
  let mutado = popOld;
  for (let i = 0; i < mutado.length; i++) { // para cada individuo
    for (let j = 1; j < mutado[i].genes.length - 1; j++) { // para cada gene
      let mutaOuNao = Math.random();
      if (mutaOuNao < probMutacao) {

		indMutar = Math.floor(Math.random() * 19 + 1)
		let aux = mutado[i].genes[j]
		mutado[i].genes[j] = mutado[i].genes[indMutar]
		mutado[i].genes[indMutar] = aux
      }
    }
  }
  return mutado;
}

function roleta(popOld, probCruzamento, probMutacao, elite) {
  var sumFit = 0;
  var acumulatorProb = 0;
  var arrayRoleta = [];
  var selected = [];
  var tamanhoRetorno = popOld.length - elite.length;
  for (let c = 0; c < tamanhoRetorno; c++) {
    sumFit += popOld[c].aptidao;
  }

  for (let c = 0; c < tamanhoRetorno; c++) {
    popOld[c].probNow = popOld[c].aptidao / sumFit;
    acumulatorProb = popOld[c].probNow + acumulatorProb;
    arrayRoleta.push(acumulatorProb);
  }
  for (let i = 0; i < tamanhoRetorno; i++) {
    let rand = Math.random();
    let pos = 0;
    while (arrayRoleta[pos] <= rand) {
      pos++;
    }

    selected.push(popOld[pos]);
  }

  let filhos = [];
  while (filhos.length < tamanhoRetorno) {
    let sorteados = [
      Math.floor(Math.random() * selected.length),
      Math.floor(Math.random() * selected.length)
    ];
    while (sorteados[0] == sorteados[1])
      sorteados[1] = Math.floor(Math.random() * selected.length);

    let casal = [selected[sorteados[0]], selected[sorteados[1]]];

    var tam = filhos.push(
      ...operadorCruzamento(casal, probCruzamento)
    );

    while (tam > tamanhoRetorno) {
      filhos.pop();
      tam--;
    }
  }

  let mutado = operadorMutacao(filhos, probMutacao);

  mutado.push(...elite);
  return mutado;
}

function melhorCasal(individuos, lista) {
  // observe que utilizo os itens da lista, e nao o array de populacao inteiro!
  var maior, segundoMaior;
  if (individuos[lista[0]].aptidao > individuos[lista[1]].aptidao) {
    maior = individuos[lista[0]];
    segundoMaior = individuos[lista[1]];
  } else {
    maior = individuos[lista[1]];
    segundoMaior = individuos[lista[0]];
  }

  for (let i = 2; i < lista.length; i++) {
    if (individuos[lista[i]].aptidao > maior.aptidao) {
      segundoMaior = maior;
      maior = individuos[lista[i]];
    } else if (individuos[lista[i]] > segundoMaior.aptidao) {
      // isso é no caso de o primeiro for o maior
      segundoMaior = individuos[lista[i]];
    }
  }
  return [maior, segundoMaior];
}

function torneio(popOld, tamanhoTorneio, probCruzamento, elite) {
  var filhos = [];
  var tamanhoRetorno = popOld.length - elite.length;

  do {
    // sorteia x valores na pop
    var sorteados = [];
    for (let i = 0; i < tamanhoTorneio; i++) {
      var sorteio = Math.round(Math.random() * (popOld.length - 1));
      while (sorteados.includes(sorteio))
        sorteio = Math.round(Math.random() * (popOld.length - 1));
      sorteados.push(sorteio);
    }
    //selecionar casal
    var casal = melhorCasal(popOld, sorteados);

    tam = filhos.push(...operadorCruzamento(casal, probCruzamento));
    while (tam > tamanhoRetorno) {
      filhos.pop();
      tam--;
    }
  } while (filhos.length < tamanhoRetorno);

  let mutado = operadorMutacao(filhos, probMutacao);

  mutado.push(...elite);
  return mutado;
}

function elitismo(popOld, tamanhoElitismo) {
  var retorno = [];
  var escolhidos = [];

  for (let i = 0; i < tamanhoElitismo; i++) {
    var maior = popOld[0];
    var indiceMaior = 0;
    for (let j = 0; j < popOld.length; j++) {
      if (popOld[j].aptidao > maior.aptidao && !escolhidos.includes(j)) {
        maior = popOld[j];
        indiceMaior = j;
      }
    }
    escolhidos.push(indiceMaior);
    retorno.push(maior);
  }
  return retorno;
}

function botaoClicado() {
  const tempo0 = Date.now();
  const geracoesLimite =
    parseInt(document.getElementById("geracoesLimite").value);
  const tempoLimite =
    parseInt(document.getElementById("tempoLimite").value) * 1000;
  const tamanhoPop = parseInt(document.getElementById("tamanhoPop").value);
  const probCruzamento =
    parseInt(document.getElementById("probCruzamento").value) / 100;

  const probMutacao =
    parseInt(document.getElementById("probMutacao").value) / 100;
  const tipo = document.getElementById("tipo").value;
  const tamanhoTorneio = parseInt(
    document.getElementById("tamanhoTorneio").value
  );
  const tamanhoElitismo = parseInt(
    document.getElementById("tamanhoElitismo").value
  );

  // validacoes
  if (tamanhoTorneio > tamanhoPop) {
    alert("torneio muito grande!");
    document.getElementById("tamanhoTorneio").value = 2;
    return;
  }
  if (tamanhoElitismo > tamanhoPop) {
    alert("O elitismo não pode ser maior que a população!");
    document.getElementById("tamanhoElitismo").value = 1;
    return;
  }

  var population = populacaoInicial(tamanhoPop);
  var geracao = 0;

  // calcula aptidao
  for (let k = 0; k < population.length; k++) {
    population[k].aptidao = aptidao(population[k].genes);
  }
  console.log(population)

  var add = `Geracao 0, individuos: `;
  for (k = 0; k < population.length; k++) {
    add += `
        <span title="${population[k].genes}">
          ${population[k].aptidao};   
        </span>  `;
  }
  add += `<br />`;

  var melhorIndividuo = elitismo(population, 1)[0];
  melhorIndividuo.geracaoEncontrado = 0;

  var acumuladorMelhor = [];
  acumuladorMelhor.push(melhorIndividuo);

  do {
    var best = [];

    // elitismo nesta parte!
    var elite = elitismo(population, tamanhoElitismo);

    if (tipo == 1) {
      // seleciona melhores por roleta
      best = roleta(population, probCruzamento, probMutacao, elite);
    }
    if (tipo == 2) {
      // faz torneio
      best = torneio(
        population,
        tamanhoTorneio,
        probCruzamento,
        elite
      );
    }
    population = best;
    geracao++;
    // calcula aptidao
    for (let k = 0; k < population.length; k++) {

      population[k].aptidao = aptidao(population[k].genes);

      if (population[k].aptidao > melhorIndividuo.aptidao) {
        melhorIndividuo = population[k];
        melhorIndividuo.geracaoEncontrado = geracao;
      }
    }
    acumuladorMelhor.push(melhorIndividuo);

    // // poe na view
    add += `Geracao ${geracao}, individuos: `;
    for (k = 0; k < population.length; k++) {
      add += `
          <span title="${population[k].genes}">
            ${population[k].aptidao};
          </span>  `;
    }
    add += `<br />`;

    if (Date.now() - tempo0 > tempoLimite) {
      alert("Chegou no tempo limite, algoritmo parado!");
      return;
    }
  } while (geracao < geracoesLimite)
  add += `populacao resultante: <br />`;
  for (k = 0; k < population.length; k++) {
    add += `${population[k].genes} -> ${population[k].aptidao} <br/>`;
  }
  document.getElementById("log").innerHTML = add;

  alert(`Achado o individuo perfeito!
    Aptidao: ${melhorIndividuo.aptidao}, 
    Geração encontrada = ${melhorIndividuo.geracaoEncontrado}
    Tempo: ${(Date.now() - tempo0) / 1000} s`);
}
