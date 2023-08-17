let currentPokemon = [];

async function loadPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  let response = await fetch(url);
  let data = await response.json();
  currentPokemon = data.results;
  renderPokemonList();
}

function renderPokemonList() {
    let renderContainer = document.getElementById('renderPokemon');

    for(let i = 0; i < 20 && i < currentPokemon.length; i++) {
        let pokemon = currentPokemon[i];
        renderContainer.innerHTML += /*html*/`
        <div>
        <p>${pokemon.name}</p>
        <img>
        </div>
        `;
      };
    }

function loadPokemonImage() {
    
}

// Rufe die Funktion zum Laden der Pokémon auf
loadPokemon();
