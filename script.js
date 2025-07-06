// =========================================
// JavaScript para o Carrossel (Automático e Manual)
// =========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
let carouselInterval; // Variável para armazenar o ID do intervalo do setTimeout

// Função para exibir o slide atual e iniciar o timer para o próximo
function showSlides() {
    slides.forEach(slide => slide.classList.remove('active')); // Remove a classe 'active' de todos os slides
    
    // Incrementa o índice para o próximo slide
    slideIndex++; 
    
    // Lógica para "enrolar" o carrossel: Se ultrapassar o último slide, volta para o primeiro (0)
    if (slideIndex >= slides.length) {
        slideIndex = 0; 
    }
    
    slides[slideIndex].classList.add('active'); // Adiciona a classe 'active' ao slide atual
    
    // Define um novo timer para a próxima transição automática
    carouselInterval = setTimeout(showSlides, 5000); // # TEMPO DE TRANSIÇÃO AUTOMÁTICA (em milissegundos). Ajuste conforme preferir.
}

// Função para mudar o slide manualmente (usada pelas setas de navegação)
function changeSlide(n) {
    clearTimeout(carouselInterval); // Limpa o timer automático para evitar pular slides durante a navegação manual

    // Ajusta o índice do slide baseado no valor de 'n' (+1 para próximo, -1 para anterior)
    slideIndex += n; 

    // Lógica para "enrolar" o carrossel:
    // Se o índice for menor que 0 (indo para trás do primeiro slide), vai para o último slide
    if (slideIndex < 0) { 
        slideIndex = slides.length - 1; // Vai para o último slide
    } 
    // Se o índice for maior ou igual ao número total de slides (indo para frente do último), vai para o primeiro slide
    else if (slideIndex >= slides.length) { 
        slideIndex = 0; 
    }
    
    slides.forEach(slide => slide.classList.remove('active')); // Remove 'active' de todos os slides
    slides[slideIndex].classList.add('active'); // Adiciona 'active' ao slide selecionado

    // Reinicia o timer para a transição automática após a mudança manual
    carouselInterval = setTimeout(showSlides, 5000); // # TEMPO DE TRANSIÇÃO AUTOMÁTICA APÓS INTERAÇÃO MANUAL.
}

// =========================================
// JavaScript para o Pop-up do WhatsApp e Alternância de Consultoras
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o carrossel se houver slides
    if (slides.length > 0) {
        // Inicializa o primeiro slide como ativo. A função showSlides já fará a primeira transição automática.
        slides[0].classList.add('active'); 
        carouselInterval = setTimeout(showSlides, 5000); // Inicia o ciclo de transição automática
    }

    // Lógica de Alternância de Nomes no Botão WhatsApp
    const consultoras = ["OI TUDO BOM? ME CHAMO AGATHA", "Agatha| OI TUDO BEM? ESTOU ONLINE"];
    let consultoraIndex = 0;
    const consultorOnlineText = document.getElementById('consultorOnlineText');

    if (consultorOnlineText) {
        function alternarConsultora() {
            consultorOnlineText.innerText = consultoras[consultoraIndex % consultoras.length];
            consultoraIndex++;
        }
        alternarConsultora(); // Exibe o primeiro nome imediatamente
        setInterval(alternarConsultora, 10000); // Altera o nome a cada 10 segundos
    }


    // Seleciona os elementos do pop-up
    const openWhatsappPopupBtn = document.getElementById('openWhatsappPopup');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closeWhatsappPopupBtn = document.getElementById('closeWhatsappPopup');

    // Verifica se os elementos do pop-up existem antes de adicionar event listeners
    if (openWhatsappPopupBtn && whatsappPopup && closeWhatsappPopupBtn) {
        // FUNÇÃO PARA ABRIR O POP-UP
        const showPopup = () => {
            whatsappPopup.style.display = 'flex'; // Torna o overlay visível (usando flex para centralizar)
            // Adiciona a classe 'active' após uma pequena pausa para permitir a transição CSS
            setTimeout(() => {
                whatsappPopup.classList.add('active');
            }, 10);
        };

        // Event listener para abrir o pop-up AO CLICAR NO BOTÃO FLUTUANTE
        openWhatsappPopupBtn.addEventListener('click', showPopup);

        // # ABRIR O POP-UP AUTOMATICAMENTE QUANDO O SITE CARREGAR
        // Você pode ajustar o tempo (em milissegundos) ou remover o setTimeout para abrir instantaneamente.
        setTimeout(() => {
            showPopup();
        }, 1000); // # TEMPO PARA ABRIR O POP-UP AUTOMATICAMENTE (1000ms = 1 segundo). Altere ou defina como 0 para abrir instantaneamente.

        // Event listener para fechar o pop-up clicando no 'X'
        closeWhatsappPopupBtn.addEventListener('click', () => {
            whatsappPopup.classList.remove('active'); // Remove a classe 'active' para iniciar a transição de saída
            // Esconde o elemento 'display: none' apenas após a transição CSS ter ocorrido
            setTimeout(() => {
                whatsappPopup.style.display = 'none';
            }, 300); // O tempo aqui deve corresponder ao tempo da transição 'opacity' e 'visibility' no CSS do '.whatsapp-popup-overlay'
        });

        // Event listener para fechar o pop-up clicando fora da caixa de conteúdo
        whatsappPopup.addEventListener('click', (event) => {
            // Verifica se o clique foi diretamente no overlay (fundo escurecido), não nos elementos dentro do pop-up-content
            if (event.target === whatsappPopup) {
                whatsappPopup.classList.remove('active');
                setTimeout(() => {
                    whatsappPopup.style.display = 'none';
                }, 300); // O tempo aqui deve corresponder ao tempo da transição CSS
            }
        });
    }

    // --- Início do Código para o Novo Formulário de WhatsApp ---

    // Pega o formulário pelo ID específico que definimos no HTML
    const formCotacao = document.getElementById('whatsappFormCotacao');

    // Verifica se o formulário de cotação existe na página para evitar erros em outras páginas
    if (formCotacao) {
        formCotacao.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página ou enviaria para o Formspree)

            // 1. Coleta os valores dos campos do formulário
            const nome = document.getElementById('nomeCotacao').value;
            const whatsapp = document.getElementById('whatsappCliente').value;
            const tipoCotacao = document.getElementById('tipoCotacao').value;

            // 2. Define o seu número de WhatsApp para onde as mensagens serão enviadas
            // *** IMPORTANTE: Mude este número para o seu número real do WhatsApp (com 55 e DDD, sem espaços/símbolos)! ***
            const seuNumeroWhatsApp = '55 11 99323-3019'; // Exemplo: '5511993233019'

            // 3. Monta a mensagem que será pré-preenchida no WhatsApp
            // Usamos encodeURIComponent para garantir que a mensagem seja formatada corretamente para a URL.
            // O '\n' cria uma quebra de linha na mensagem dentro do WhatsApp.
            const mensagemWhatsApp = encodeURIComponent(
                `Olá, Exception Seguros!\n\n` +
                `Meu nome é: ${nome}\n` +
                `Meu WhatsApp é: ${whatsapp}\n` +
                `Gostaria de cotar: ${tipoCotacao}\n\n` +
                `Por favor, entre em contato para prosseguirmos com a cotação.`
            );

            // 4. Cria o link completo para o WhatsApp
            const linkWhatsApp = `https://api.whatsapp.com/send?phone=${seuNumeroWhatsApp}&text=${mensagemWhatsApp}`;

            // 5. Redireciona o usuário para o link do WhatsApp (abre em uma nova aba/janela)
            window.open(linkWhatsApp, '_blank');

            // Opcional: Limpar o formulário após o redirecionamento, para que o cliente possa fazer uma nova cotação
            formCotacao.reset();
        });
    }
});

// --- Fim do Código para o Novo Formulário de WhatsApp ---
