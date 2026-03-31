// Conjunto de utilitários compartilhados entre componentes

export function getYouTubeId(url) {
    // Retorna o ID do vídeo do YouTube a partir da URL
    // Se URL for inválida, retorna um ID padrão
    if (!url) return "7RUA0IOfar8";

    if (url.includes('v=')) {
        // URL no formato watch?v=ID
        return url.split('v=')[1].split('&')[0];
    }

    // URL no formato curto /<id>
    return url.split('/').pop();
}

export function getRandomMatchScore() {
    // Gera uma pontuação aleatória entre 80 e 99
    return Math.floor(Math.random() * 20 + 80);
}

export function getRandomDuration(hasProgress) {
    // Se houver progresso, mostra '10 temporadas'; caso contrário duração entre 2h00 e 2h58
    return hasProgress ? '10 temporadas' : '2h ' + Math.floor(Math.random() * 59) + 'm';
}

export function getRandomAgeBadge() {
    // Gera um badge de idade alternando entre A16 e 16
    return Math.random() > 0.5 ? { text: 'A16', class: 'red-accent' } : { text: '16', class: '' };
}
