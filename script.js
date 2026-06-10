/**
 * ===== GREENAGRO - SCRIPT PRINCIPAL =====
 * Funcionalidades implementadas:
 * 1. Menu de acessibilidade (aumentar/diminuir fonte, alto contraste)
 * 2. Avaliação de hábitos ambientais com geração de dicas personalizadas
 * 
 * Desenvolvido para o Concurso Agrinho 2026
 */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. CONFIGURAÇÃO DO MENU DE ACESSIBILIDADE =====
    const botaoAcessibilidade = document.getElementById('botaoAcessibilidade');
    const btnAcessibilidade = document.getElementById('btnAcessibilidade');
    const menuAcessibilidade = document.getElementById('menuAcessibilidade');
    
    // Abrir/fechar menu ao clicar no botão
    btnAcessibilidade.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que o clique feche o menu imediatamente
        if (menuAcessibilidade.style.display === 'none' || menuAcessibilidade.style.display === '') {
            menuAcessibilidade.style.display = 'flex';
        } else {
            menuAcessibilidade.style.display = 'none';
        }
    });
    
    // Fechar menu se clicar fora dele
    document.addEventListener('click', function(event) {
        if (!botaoAcessibilidade.contains(event.target)) {
            menuAcessibilidade.style.display = 'none';
        }
    });
    
    // ===== 2. FUNÇÕES DE ACESSIBILIDADE =====
    const body = document.body;
    let tamanhoFonteAtual = 16; // tamanho base em pixels
    
    // Função para aumentar a fonte
    const btnAumentar = document.getElementById('btnAumentarFonte');
    btnAumentar.addEventListener('click', function() {
        tamanhoFonteAtual = tamanhoFonteAtual + 2;
        if (tamanhoFonteAtual > 28) {
            tamanhoFonteAtual = 28; // limite máximo para não quebrar layout
        }
        body.style.fontSize = tamanhoFonteAtual + 'px';
    });
    
    // Função para diminuir a fonte
    const btnDiminuir = document.getElementById('btnDiminuirFonte');
    btnDiminuir.addEventListener('click', function() {
        tamanhoFonteAtual = tamanhoFonteAtual - 2;
        if (tamanhoFonteAtual < 12) {
            tamanhoFonteAtual = 12; // limite mínimo para manter legibilidade
        }
        body.style.fontSize = tamanhoFonteAtual + 'px';
    });
    
    // Função para ativar/desativar alto contraste
    const btnContraste = document.getElementById('btnAltoContraste');
    btnContraste.addEventListener('click', function() {
        body.classList.toggle('alto-contraste');
    });
    
    // ===== 3. FUNCIONALIDADE PRINCIPAL: AVALIAÇÃO DE HÁBITOS E GERADOR DE DICAS =====
    const formAvaliacao = document.getElementById('formAvaliacao');
    const resultadoDiv = document.getElementById('resultadoAvaliacao');
    const mensagemResultado = document.getElementById('mensagemResultado');
    const dicasPersonalizadas = document.getElementById('dicasPersonalizadas');
    const btnRefazer = document.getElementById('btnRefazer');
    
    /**
     * Função que analisa as respostas e gera pontuação + dicas personalizadas
     * @param {object} respostas - Objeto com as respostas do usuário
     * @returns {object} - Objeto contendo pontuação e array de dicas
     */
    function gerarDicas(respostas) {
        let pontuacao = 0;
        let dicas = [];
        
        // Análise da Pergunta 1 - Irrigação
        if (respostas.p1 === '0') {
            dicas.push('💧 DICA PRIORITÁRIA: Troque a irrigação por inundação pelo sistema de gotejamento. Você pode economizar até 60% de água!');
            pontuacao += 0;
        } else if (respostas.p1 === '1') {
            dicas.push('💧 Bom trabalho com a aspersão! Para economizar ainda mais água, considere migrar para o gotejamento aos poucos.');
            pontuacao += 1;
        } else if (respostas.p1 === '2') {
            dicas.push('💧 Excelente! A irrigação por gotejamento é a mais eficiente. Continue assim e compartilhe essa prática com outros agricultores.');
            pontuacao += 2;
        }
        
        // Análise da Pergunta 2 - Agrotóxicos
        if (respostas.p2 === '0') {
            dicas.push('🧪 ATENÇÃO: O uso excessivo de agrotóxicos contamina o solo, a água e sua saúde. Procure assistência técnica para reduzir gradualmente.');
            pontuacao += 0;
        } else if (respostas.p2 === '1') {
            dicas.push('🧪 Ótimo! Seguir o receituário agronômico já é um grande avanço. Busque alternativas como controle biológico de pragas.');
            pontuacao += 1;
        } else if (respostas.p2 === '2') {
            dicas.push('🧪 Parabéns! Controle biológico e produção orgânica são o futuro da agricultura sustentável. Você é referência!');
            pontuacao += 2;
        }
        
        // Análise da Pergunta 3 - Embalagens
        if (respostas.p3 === '0') {
            dicas.push('♻️ PERIGO AMBIENTAL: Nunca descarte embalagens de defensivos no lixo comum ou queime. Faça a tríplice lavagem e leve ao ponto de coleta!');
            pontuacao += 0;
        } else if (respostas.p3 === '1') {
            dicas.push('♻️ Melhore: As embalagens acumuladas podem causar acidentes. Identifique o ponto de coleta mais próximo da sua propriedade.');
            pontuacao += 1;
        } else if (respostas.p3 === '2') {
            dicas.push('♻️ Perfeito! A tríplice lavagem e o descarte correto protegem o solo e os lençóis freáticos. Continue sendo exemplo!');
            pontuacao += 2;
        }
        
        // Análise da Pergunta 4 - Nascentes
        if (respostas.p4 === '0') {
            dicas.push('🌳 URGENTE: O desmatamento de nascentes e matas ciliares é crime ambiental. Recupere essas áreas - elas garantem água para sua produção!');
            pontuacao += 0;
        } else if (respostas.p4 === '1') {
            dicas.push('🌳 Continue ampliando a preservação. Plante mudas nativas nas áreas ainda desprotegidas. Cada árvore faz diferença!');
            pontuacao += 1;
        } else if (respostas.p4 === '2') {
            dicas.push('🌳 Você é um guardião da natureza! Manter APPs e recuperar nascentes garante água de qualidade para as próximas gerações.');
            pontuacao += 2;
        }
        
        // Análise da Pergunta 5 - Energia renovável
        if (respostas.p5 === '0') {
            dicas.push('☀️ Invista em energia solar no campo. Existem linhas de crédito rural (como o Pronaf) para isso. A economia a longo prazo é grande!');
            pontuacao += 0;
        } else if (respostas.p5 === '1') {
            dicas.push('☀️ Excelente intenção! Procure cooperativas ou programas de energia renovável na sua região. Comece com pequenos investimentos.');
            pontuacao += 1;
        } else if (respostas.p5 === '2') {
            dicas.push('☀️ Você está na vanguarda! Energia renovável no campo é sustentabilidade, economia e independência energética.');
            pontuacao += 2;
        }
        
        return { pontuacao, dicas };
    }
    
    /**
     * Função que retorna uma mensagem motivacional baseada na pontuação
     * @param {number} pontuacao - Pontuação total do usuário (0 a 10)
     * @returns {string} - Mensagem personalizada
     */
    function mensagemPorPontuacao(pontuacao) {
        const maxPontos = 10;
        const percentual = (pontuacao / maxPontos) * 100;
        
        if (percentual <= 30) {
            return '⚠️ Você está no início da jornada sustentável. Ainda há muito a melhorar, mas todo passo em direção à sustentabilidade conta!';
        } else if (percentual <= 60) {
            return '🌱 Bom trabalho! Você já adota algumas práticas sustentáveis. Continue evoluindo e implementando as dicas acima.';
        } else if (percentual <= 85) {
            return '🌿 Ótimo! Você tem consciência ambiental e já faz a diferença no campo. Compartilhe seu conhecimento com outros agricultores!';
        } else {
            return '🏆 PARABÉNS! Você é um exemplo de agricultura sustentável. Continue assim e ajude a construir um Agro forte com futuro sustentável!';
        }
    }
    
    // Evento de envio do formulário de avaliação
    formAvaliacao.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página
        
        // Coletar os valores selecionados
        const p1 = document.getElementById('p1').value;
        const p2 = document.getElementById('p2').value;
        const p3 = document.getElementById('p3').value;
        const p4 = document.getElementById('p4').value;
        const p5 = document.getElementById('p5').value;
        
        // Validar se todas as perguntas foram respondidas
        if (!p1 || !p2 || !p3 || !p4 || !p5) {
            alert('⚠️ Por favor, responda todas as perg
