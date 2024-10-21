let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { className: "bg-blue-100 shadow-lg rounded-lg p-4 m-4 w-64 transition hover:scale-105" },
    React.createElement("img", {
      className: "mx-auto",
      src: props.image,
      alt: props.name
    }),
    React.createElement("h2", {className: "text-lg font-bold text-center"}, props.name),
    React.createElement("p", {className: "text-center"}, `Type: ${props.types}`)
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-100" },
    React.createElement(
      "header",
      { className: "bg-blue-900 p-6 mb-6" },
      React.createElement(
        "h1",
        { className: "text-4xl text-center font-bold text-white" },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
