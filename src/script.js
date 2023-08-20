let currentPokemon = []; // Die geladenen Pokémon zu speichern
let offset = 0; // Der Startwert für den Offset zum Laden der Pokémon
const limit = 40; // Die Anzahl der pro Ladung angeforderten Pokémon

// Rufe die Funktion zum Laden der Pokémon auf, wenn die Seite geladen wird
loadPokemon();

// Funktion zum Laden der ersten 40 Pokémon
async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();
  currentPokemon = data.results; // Speichere die geladenen Pokémon in der aktuellen Liste
  renderPokemonList(); // Rufe die Funktion zum Rendern der Pokémon-Liste auf
}

// Funktion zum Rendern der Pokémon-Liste
async function renderPokemonList() {
  let renderContainer = document.getElementById("renderPokemon");
  renderContainer.innerHTML = ""; // Lösche den vorherigen Inhalt des Containers

  // Durchlaufe die Liste der geladenen Pokémon
  for (let i = 0; i < currentPokemon.length; i++) {
    let pokemon = currentPokemon[i];
    let url = pokemon.url;

    // Lade detaillierte Daten für jedes Pokémon
    let response = await fetch(url);
    let detailedData = await response.json();

    // Füge Name und Bild jedes Pokémon zur Anzeige hinzu
    renderContainer.innerHTML += /*html*/ `
      <div class="cards">
        <p>${detailedData.name}</p>
        <img src="${detailedData.sprites.front_default}" alt="${detailedData.name}">
      </div>
    `;
  }
}

// Funktion zum Laden von 40 weiteren Pokémon
async function loadMorePokemon() {
  offset += limit; // Erhöhe den Offset-Wert, um das nächste Set von Pokémon zu laden
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();

  // Überprüfe, ob weitere Pokémon geladen wurden
  if (data.results.length > 0) {
    currentPokemon = currentPokemon.concat(data.results); // Füge die neuen Daten zur aktuellen Liste hinzu
    renderPokemonList(); // Rufe die Funktion zum Rendern der Pokémon-Liste auf
  } else {
    console.log("Keine weiteren Daten verfügbar.");
  }
}
