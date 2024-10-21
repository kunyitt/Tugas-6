const fs = require("fs");

async function generateJsonDB() {
try {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
  const pokemonList = await fetch(pokemonApiURL).then((res) => res.json());
  const payload = [];
  for (let index=0; index < pokemonList.results.length; index++){
    const pokemon = pokemonList.results[index];
    const detail = await fetch(pokemon.url).then((res) => res.json());
    const species = await fetch(detail.species.url).then((res) => res.json());
    const evo = await fetch(species.evolution_chain.url).then((res) =>
      res.json()
  );

    const evolutionChains =[evo.chain.species.name];
    let evolveTo = evo.chain.evolves_to[0];
    while (evolveTo){
      evolutionChains.push(evolveTo.species.name);
      evolveTo = evolveTo.evolves_to[0];
    }

    const item = {
      id: detail.id,
      name: pokemon.name, 
      height: detail.height,
      weight: detail.weight,
      cries: detail.cries,
      abilities: detail.abilities.map((ab) => ab.ability.name),
      types: detail.types.map((ab) => ab.type.name),
      evolutionChains,
    };
    payload.push(item);
    console.log(detail);
  }
  fs.writeFileSync("./db.json", JSON.stringify({pokemon:payload}, null, 2), "utf8");
  console.log(payload);
} catch (error) {
  console.log(error);
}
}

generateJsonDB();
