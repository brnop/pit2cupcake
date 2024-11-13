document.addEventListener("DOMContentLoaded", function() {
    const headerDiv = document.getElementById('header');
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        headerDiv.innerHTML = this.responseText;
      }
    };
    // O caminho para "header.html" a partir de "components.js" na pasta assets
    xhttp.open("GET", "/public/View/componentes/header.html", true);
    xhttp.send();
  });