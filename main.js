const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");
const pokemonInfo = document.getElementById("pokemonInfo");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let query="";
async function fetchpokemonData(pokemonId){
    let endpoint="https://pokeapi.co/api/v2/pokemon/"+ pokemonId;
    const response = await fetch(endpoint);
    const pokemon = await response.json();
    return pokemon;

}
// funcion que muestra la info del pokemon
function displaypokemon(pokemon){
    //console.log(pokemon)//verificadon que la informacion llega 
    const pokemonCard = document.createElement("div");// para crear un elemento
    pokemonCard.classList.add("pokemonCard")// agregando una clase
    //Bloque de codigo que me busca los tipos
    let pokemonTypes =""
    for(let i=0; i<pokemon.types.length; i++){
        //console.log(pokemon.types[i])
    pokemonTypes =pokemonTypes + pokemon.types[i].type.name +""
       
    }
    
    //creamos el contenido de la tarjeta
    pokemonCard.innerHTML =`
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idNumber">${pokemon.id}</h2>
    <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
    <h3>Tipos del pokemon</h3>
    <p>${pokemonTypes}</p>
    `
    //agregamos la funcionalidad de click para mostar la vista especifica
    pokemonCard.addEventListener("click",()=>{
        console.log("click");
        showpokemonDetail(pokemon);
    })
    pokemonList.appendChild(pokemonCard);

}
function showpokemonDetail(pokemon){
    pokemonList.style.display = "none";
    pokemonDetail.style.display = "block";
    console.log(pokemon.stats[0])// verificando que la informacion llegue
    let pokemonStats =""
    for(let i=0; i<pokemon.stats.length; i++){
        pokemonStats = pokemonStats 
        +` <li>${pokemon.stats[i].stat.name}
        :${pokemon.stats[i].base_stat} </li>`
        //console.log(pokemonStats)
    }
    let pokemonTypes ="";
    for(let i=0; i<pokemon.types.length; i++){
        pokemonTypes =pokemonTypes + pokemon.types[i].type.name +""
        //console.log(pokemonTypes)
       
    }
   pokemonInfo.innerHTML =`
   <h2>Detalle de pokemon</h2>
   <h3 class="name">${pokemon.name}</h3>
   <h2 class="idNumber">${pokemon.id}</h2>
   <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
   <h3>Tipos del pokemon</h3>
   ${pokemonTypes}
   <h3>pokemon stats</h3>
   <ul>
   ${pokemonStats}
   </ul>   
   `
    
    

}


backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "block"
    
 })
 searchInput.addEventListener("input",(Event)=>{
    query = Event.target.value;
    
 })
 async function searchpokemon() {
    try {
        const pokemon = await fetchpokemonData(query);
        showpokemonDetail(pokemon)
    } catch (error) {
        alert("pokemon no se encuentra,intente de nuevamente");
    }
    
 }
searchBtn.addEventListener("click",()=>searchpokemon())
async function loadpokedex(){
    for(let i=1;i<2;i++){
    const pokemon = await fetchpokemonData(i);
   displaypokemon(pokemon);
  // console.log(150)
}
}


loadpokedex()