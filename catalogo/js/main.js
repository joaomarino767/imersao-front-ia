// Importa dados de categoria e a função de criação de carrossel
import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

// Aguarda o documento estar pronto antes de manipular o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Busca informações do perfil ativo no localStorage
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        // Atualiza o texto e a imagem do perfil na página
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil; // define nome do perfil
        if (profileIcon) profileIcon.src = imagemPerfil; // define URL da foto do perfil
    }

    // Pega o container principal onde os carrosséis serão inseridos
    const container = document.getElementById('main-content');
    
    if (container) {
        // Para cada categoria, cria um carrossel e adiciona ao container
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
