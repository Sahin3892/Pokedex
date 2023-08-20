let currentPokemon = [];
let offset = 0; 
const limit = 40; // Anzahl der pro Ladung angeforderten Pokémon


async function loadPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
  let response = await fetch(url);
  let data = await response.json();
  currentPokemon = data.results;
  renderPokemonList();
}

async function renderPokemonList() {
  let renderContainer = document.getElementById('renderPokemon');
  renderContainer.innerHTML = ''; // Lösche den vorherigen Inhalt

  for (let i = 0; i < currentPokemon.length; i++) {
    let pokemon = currentPokemon[i];
    let url = pokemon.url;

    let response = await fetch(url);
    let detailedData = await response.json();

    renderContainer.innerHTML += /*html*/ `
      <div>
        <p>${detailedData.name}</p>
        <img src="${detailedData.sprites.front_default}" alt="${detailedData.name}">
      </div>
    `;
  }
}


// Rufe die Funktion zum Laden der Pokémon auf
loadPokemon();

// Funktion zum Laden von 40 weiteren Pokémon
async function loadMorePokemon() {
  offset += limit; // Erhöhe den Offset-Wert um das Limit
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  let data = await response.json();

  if (data.results.length > 0) {
    currentPokemon = currentPokemon.concat(data.results); // Füge die neuen Daten hinzu
    renderPokemonList();
  } else {
    console.log('Keine weiteren Daten verfügbar.');
  }
}