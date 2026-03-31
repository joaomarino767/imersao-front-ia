// Script para alternar entre dark e light mode
// este arquivo controla o tema da página e persiste a escolha no localStorage

document.addEventListener('DOMContentLoaded', () => {
    // Espera o HTML estar totalmente carregado antes de executar o código

    const themeToggle = document.getElementById('theme-toggle');
    // pega o botão que altera o tema pelo id

    const body = document.body;
    // referência para o elemento <body>

    const html = document.documentElement;
    // referência para o elemento <html>

    // Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    // tenta ler a chave 'theme' do armazenamento local do navegador

    if (savedTheme) {
        // apenas aplica classe se houver tema salvo
        body.classList.add(savedTheme);
        // adiciona classe ao <body> (light-mode ou dark-mode)

        html.classList.add(savedTheme);
        // adiciona classe ao <html> para regras de CSS globais

        updateButton(savedTheme);
        // ajusta o texto/ícone do botão para refletir o tema atual
    }

    // event listener para o clique do botão
    themeToggle.addEventListener('click', () => {
        // alterna entre light-mode e dark-mode quando o usuário clica

        if (body.classList.contains('light-mode')) {
            // se estiver em modo claro, troca para escuro
            body.classList.remove('light-mode');
            // remove classe do body

            html.classList.remove('light-mode');
            // remove classe do html

            body.classList.add('dark-mode');
            // define classe dark-mode no body

            html.classList.add('dark-mode');
            // define classe dark-mode no html

            localStorage.setItem('theme', 'dark-mode');
            // salva preferência no localStorage como 'dark-mode'

            updateButton('dark-mode');
            // atualiza o botão para mostrar ícone de lua
        } else {
            // se estiver em modo escuro, troca para claro
            body.classList.remove('dark-mode');
            html.classList.remove('dark-mode');
            body.classList.add('light-mode');
            html.classList.add('light-mode');
            // adiciona classes de modo claro

            localStorage.setItem('theme', 'light-mode');
            // salva preferência no localStorage como 'light-mode'

            updateButton('light-mode');
            // atualiza o botão para mostrar ícone de sol
        }
    });

    // Armazenar perfil ativo no localStorage quando um perfil é clicado
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach(profile => {
        profile.addEventListener('click', (e) => {
            const img = profile.querySelector('img');
            const figcaption = profile.querySelector('figcaption');
            if (img && figcaption) {
                localStorage.setItem('perfilAtivoNome', figcaption.textContent.trim());
                localStorage.setItem('perfilAtivoImagem', img.src);
            }
        });
    });

    // Função para atualizar o ícone do botão e aria-label com base no tema atual
    function updateButton(theme) {
        if (theme === 'light-mode') {
            // se o tema atual for light-mode, o botão deve sugerir modo escuro
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
        } else {
            // se o tema atual for dark-mode, o botão deve sugerir modo claro
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
        }
    }
});