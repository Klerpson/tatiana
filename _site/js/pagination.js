// Clase principal para manejar la paginación
class BlogPagination {
  constructor(options = {}) {
    // Opciones por defecto
    this.postsPerPage = options.postsPerPage || 9;
    this.containerSelector = options.containerSelector || '#blog-posts';
    this.paginationSelector = options.paginationSelector || '.pagination';
    
    // Elementos del DOM
    this.container = document.querySelector(this.containerSelector);
    this.posts = this.container.querySelectorAll('.card');
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    this.currentPage = 1;
    this.lang = document.documentElement.lang;

    // Botones de navegación
    this.prevButton = document.getElementById('prev-page');
    this.nextButton = document.getElementById('next-page');
    this.pageNumbers = document.getElementById('page-numbers');

    // Inicializar
    this.init();
  }

  init() {
    // Ocultar todos los posts inicialmente
    this.hideAllPosts();
    // Mostrar la primera página
    this.showPage(1);
    // Inicializar lazy loading
    this.initLazyLoading();
    // Vincular eventos
    this.bindEvents();
  }

  hideAllPosts() {
    this.posts.forEach(post => {
      post.style.display = 'none';
      post.classList.remove('visible');
    });
  }

  showPage(page) {
    // Ocultar todos los posts primero
    this.hideAllPosts();
    
    // Calcular qué posts mostrar
    const start = (page - 1) * this.postsPerPage;
    const end = Math.min(start + this.postsPerPage, this.posts.length);

    // Mostrar los posts de la página actual
    for (let i = start; i < end; i++) {
      const post = this.posts[i];
      post.style.display = 'block';
      // Usar requestAnimationFrame para animaciones suaves
      requestAnimationFrame(() => {
        post.classList.add('visible');
      });
    }

    // Actualizar la UI de paginación
    this.updatePagination(page);
    this.currentPage = page;
    
    // Scroll suave al inicio de los posts
    this.container.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  updatePagination(currentPage) {
    // Actualizar estado de los botones
    this.prevButton.disabled = currentPage === 1;
    this.nextButton.disabled = currentPage === this.totalPages;
    
    // Generar números de página
    let html = '';
    
    // Lógica para mostrar los números de página
    for (let i = 1; i <= this.totalPages; i++) {
      if (
        i === 1 || // Primera página
        i === this.totalPages || // Última página
        (i >= currentPage - 1 && i <= currentPage + 1) // Páginas alrededor de la actual
      ) {
        html += `
          <button 
            class="boton ${i === currentPage ? 'current' : ''}" 
            data-page="${i}"
            ${i === currentPage ? 'aria-current="page"' : ''}
          >
            ${i}
          </button>
        `;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        // Agregar elipsis para páginas ocultas
        html += '<span class="pagination-ellipsis">...</span>';
      }
    }
    
    this.pageNumbers.innerHTML = html;
  }

  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });

      // Observar todas las imágenes con data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback para navegadores que no soportan IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  bindEvents() {
    // Evento para botón anterior
    this.prevButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.showPage(this.currentPage - 1);
      }
    });

    // Evento para botón siguiente
    this.nextButton.addEventListener('click', () => {
      if (this.currentPage < this.totalPages) {
        this.showPage(this.currentPage + 1);
      }
    });

    // Evento para números de página
    this.pageNumbers.addEventListener('click', (e) => {
      if (e.target.matches('button[data-page]')) {
        const page = parseInt(e.target.dataset.page);
        if (page !== this.currentPage) {
          this.showPage(page);
        }
      }
    });

    // Soporte para navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && !this.prevButton.disabled) {
        this.showPage(this.currentPage - 1);
      } else if (e.key === 'ArrowRight' && !this.nextButton.disabled) {
        this.showPage(this.currentPage + 1);
      }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const pagination = new BlogPagination({
    postsPerPage: 9,
    containerSelector: '#blog-posts',
    paginationSelector: '.pagination'
  });
});