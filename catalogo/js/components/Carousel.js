import { createCard } from './Card.js';

// Cria um carrossel de cards para uma categoria de filmes/séries
export function createCarousel(category) {
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Cabeçalho do carrossel com título e indicadores
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title; // define o título da categoria

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators'; // indicadores visuais (não populados aqui)

    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Linha que contém os cards
    const row = document.createElement('div');
    row.className = 'movie-row';

    category.items.forEach(item => {
        // para cada item de categoria, cria um card e adiciona
        const card = createCard(item);
        row.appendChild(card);
    });

    section.appendChild(row);
    return section; // devolve o carrossel completo
}
