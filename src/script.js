let currentPokemon = []; // Die geladenen Pokémon zu speichern
let offset = 0; // Der Startwert für den Offset zum Laden der Pokémon
const limit = 40; // Die Anzahl der pro Ladung angeforderten Pokémon

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

    // Hier erhältst du das Array der Typen
    let types = detailedData.types;
    // Extrahiere den Namen des ersten Typs, falls vorhanden
    let typeText = types.length > 0 ? types[0].type.name : "Unknown";

    // Finde die passende Hintergrundfarbe basierend auf dem Typ
    let backgroundColor = getBackgroundColorByType(typeText);

    console.log(detailedData);
    // Füge Name, Typ und Bild jedes Pokémon zur Anzeige hinzu
    renderContainer.innerHTML += /*html*/ `
      <div class="cards" style="background-color: ${backgroundColor}">
        <p>${detailedData.name}</p>
        <p>${typeText}</p>
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

// Funktion, um die Hintergrundfarbe basierend auf dem Typ zu erhalten
function getBackgroundColorByType(type) {
  switch (type) {
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "electric":
      return "#F7D02C";
    case "grass":
      return "#7AC74C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#705746";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
    default:
      return "transparent"; // Standardfarbe, falls der Typ nicht erkannt wird
  }
}
