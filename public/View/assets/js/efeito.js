ScrollReveal().reveal('.bottom-animado', {
    duration: 2000,  // Duração da animação em milissegundos
    origin: 'bottom',  // Origem da animação (pode ser 'top', 'bottom', 'left' ou 'right')
    distance: '50px',  // Distância de deslocamento do elemento durante a animação
    easing: 'ease-in-out',  // Tipo de easing da animação (opcional)
    mobile: true  // Ativar animação em dispositivos móveis (opcional)
  });



  ScrollReveal().reveal('.left-animado', {
    duration: 1000,  // Duração da animação em milissegundos
    origin: 'left',  // Origem da animação (nesse caso, vindo da esquerda)
    distance: '50px',  // Distância de deslocamento do elemento durante a animação
    easing: 'ease-in-out',  // Tipo de easing da animação (opcional)
    mobile: true  // Ativar animação em dispositivos móveis (opcional)
  });


  ScrollReveal().reveal('.right-animado', {
    duration: 1000,  // Duração da animação em milissegundos
    origin: 'right',  // Origem da animação (nesse caso, vindo da direita)
    distance: '50px',  // Distância de deslocamento do elemento durante a animação
    easing: 'ease-in-out',  // Tipo de easing da animação (opcional)
    mobile: true  // Ativar animação em dispositivos móveis (opcional)
  });


  ScrollReveal().reveal('.top-animado', {
    duration: 1000,  // Duração da animação em milissegundos
    origin: 'top',  // Origem da animação (nesse caso, vindo do topo)
    distance: '50px',  // Distância de deslocamento do elemento durante a animação
    easing: 'ease-in-out',  // Tipo de easing da animação (opcional)
    mobile: true  // Ativar animação em dispositivos móveis (opcional)
  });


  ScrollReveal().reveal('.titulo-animado', {
    duration: 1000,  // Duração da animação em milissegundos
    delay: 300,       // Atraso antes da animação começar
    origin: 'left',   // Origem da animação
    distance: '50px', // Distância de deslocamento do elemento durante a animação
    easing: 'ease-in-out', // Tipo de easing da animação (opcional)
    mobile: true,     // Ativar animação em dispositivos móveis (opcional)
    afterReveal: function(el) {
      el.classList.add('revelado');
    }
  });

  