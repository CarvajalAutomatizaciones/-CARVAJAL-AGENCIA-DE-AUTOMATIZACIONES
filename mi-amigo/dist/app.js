/* Selector local: no red, cookies, almacenamiento ni HTML dinámico. */
(() => {
  "use strict";
  const suggestions = Object.freeze({
    cocina: {text: "Tu compañero puede ser Chef: ideas para cocinar y una guía paso a paso. Revisa siempre ingredientes, alérgenos y cocción.", target: "#chef"},
    ingles: {text: "Tu compañero puede ser Inglés: práctica escrita y explicaciones adaptadas a tu nivel. Avanza a tu ritmo.", target: "#ingles"},
    gimnasio: {text: "Tu compañero puede ser Gimnasio: movimiento progresivo según tu experiencia, equipo y objetivos. No sustituye una valoración profesional.", target: "#movimiento"}
  });
  const result = document.getElementById("recommendation");
  const link = document.getElementById("recommend-link");
  const choices = document.querySelectorAll("button[data-interest]");
  choices.forEach(button => {
    button.addEventListener("click", () => {
      const suggestion = suggestions[button.dataset.interest];
      if (!suggestion || !result || !link) return;
      choices.forEach(choice => choice.setAttribute("aria-pressed", String(choice === button)));
      result.textContent = suggestion.text;
      link.setAttribute("href", suggestion.target);
      link.hidden = false;
    });
  });
})();
