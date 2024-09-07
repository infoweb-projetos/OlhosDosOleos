// Seleciona o elemento da barra de progresso pelo ID
const progresso = document.getElementById('progresso');

// Seleciona todos os elementos das etapas de progresso
const EtapasProgresso = document.querySelectorAll('.etapa-progresso');

// Seleciona todos os elementos das etapas do formulário
const EtapasForms = document.querySelectorAll('.etapa-form');

// Inicializa a etapa atual (começa em 0)
let etapaAtual = 0;

// Adiciona um ouvinte de evento de clique a todos os botões "próximo"
document.querySelectorAll('#proximoBotao').forEach(button => {
  button.addEventListener('click', () => {
    // Verifica se não está na última etapa
    if (etapaAtual < EtapasForms.length - 1) {
      // Incrementa a etapa atual
      etapaAtual++;
      
      // Atualiza a visibilidade das etapas do formulário
      atualizarEtapaForms();
      
      // Atualiza a barra de progresso
      atualizarBarraProgresso();
    }
  });
});

// Adiciona um ouvinte de evento de clique a todos os botões "anterior"
document.querySelectorAll('#anteriorBotao').forEach(button => {
  button.addEventListener('click', () => {
    // Verifica se não está na primeira etapa
    if (etapaAtual > 0) {
      // Decrementa a etapa atual
      etapaAtual--;
      
      // Atualiza a visibilidade das etapas do formulário
      atualizarEtapaForms();
      
      // Atualiza a barra de progresso
      atualizarBarraProgresso();
    }
  });
});

// Função para atualizar a visibilidade das etapas do formulário
function atualizarEtapaForms() {
  EtapasForms.forEach((etapaForm, index) => {
    // Alterna a classe 'active' com base em se é a etapa atual
    etapaForm.classList.toggle('active', index === etapaAtual);
  });
}

// Função para atualizar a barra de progresso
function atualizarBarraProgresso() {
  EtapasProgresso.forEach((etapaProgresso, index) => {
    // Adiciona a classe 'active' às etapas completadas
    if (index <= etapaAtual) {
        etapaProgresso.classList.add('active');
    } else {
        // Remove a classe 'active' das etapas incompletas
        etapaProgresso.classList.remove('active');
    }
  });

  // Calcula a porcentagem de progresso
  const percentualProgresso = (etapaAtual / (EtapasProgresso.length - 1)) * 100;

  // Atualiza a largura da barra de progresso com base na porcentagem
  progresso.style.width = percentualProgresso + '%';
}