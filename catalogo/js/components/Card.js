import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

// Gera um card de filme/série com hover que carrega trailer/gif a partir do YouTube
export function createCard(item) {
    // cria <div class="movie-card"> para todo o elemento
    const card = document.createElement('div');
    card.className = 'movie-card';

    // se o item possuir propriedade progress, adiciona classe para barra de progresso
    if (item.progress) {
        card.classList.add('has-progress');
    }

    // cria imagem de capa
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Movie cover`;

    // cria iframe que receberá embed do YouTube on hover
    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';

    // extrai ID do vídeo do YouTube para montar URL do embed
    const videoId = getYouTubeId(item.youtube);

    card.appendChild(iframe); // iframe fica atrás da imagem
    card.appendChild(img); // imagem de capa por cima

    // badge de idade aleatório (A16 ou 16)
    const ageBadge = getRandomAgeBadge();

    // cria seção de detalhes com botões e informações extras
    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);

    // Se houver progresso, adiciona barra de progresso no card
    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`; // largura igual ao valor de progresso
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    // timeout para iniciar o vídeo apenas após breve hover
    let playTimeout;
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // ajusta origem da animação se o card estiver na borda da tela
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout); // cancela se sair antes de 600ms
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = ''; // para o vídeo
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    return card; // retorna o card completo pro carrossel
}
