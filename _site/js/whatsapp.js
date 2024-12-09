document.addEventListener("DOMContentLoaded", function () {
  // Detectar si el usuario está en móvil o escritorio
  var isMobile =
    /iPhone|Android|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile|Mobile/i.test(
      navigator.userAgent
    );

  // Obtener la URL actual de la página
  var currentURL = window.location.href;

  // Obtener el idioma de la página
  var pageLanguage = document.documentElement.lang;

  // Definir los mensajes en español e inglés
  var messages = {
    es: "Hola! Me gustaría recibir más información de esta página: ",
    en: "Hello! I would like to receive more information about this page: ",
  };

  // Seleccionar el mensaje según el idioma de la página
  var messageStart = messages[pageLanguage] || messages["en"]; // Default to English if language not found

  // Obtener todos los enlaces de WhatsApp en la página
  var whatsappLinks = document.querySelectorAll("a#lead_whatsapp");

  // Recorrer los enlaces y cambiar el href según el dispositivo y el idioma
  whatsappLinks.forEach(function (link) {
    // Mensaje completo con la URL actual
    var message = messageStart + encodeURIComponent(currentURL);

    // Enlaces de WhatsApp para móvil y escritorio con el mensaje dinámico
    var mobileLink = "https://wa.me/573202492786?text=" + message;
    var desktopLink =
      "https://web.whatsapp.com/send?phone=573202492786&text=" + message;

    // Asignar el enlace adecuado según el dispositivo
    if (isMobile) {
      link.setAttribute("href", mobileLink);
    } else {
      link.setAttribute("href", desktopLink);
    }
  });
});
/*contador*/
function animateCounter(id, end) {
  const obj = document.getElementById(id);
  const duration = 3000;
  const frames = 60;
  let current = 0;
  
  const step = end / frames;
  const interval = duration / frames;
  
  const timer = setInterval(() => {
    current += step;
    obj.innerText = Math.round(current).toLocaleString();
    
    if (current >= end) {
      obj.innerText = end.toLocaleString();
      clearInterval(timer);
    }
  }, interval);
}

document.addEventListener('DOMContentLoaded', () => {
  animateCounter('patients', 4320);
  animateCounter('years', 15);
  animateCounter('professionals', 3);
  animateCounter('procedures', 12000);
});
