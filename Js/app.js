document.getElementById("name-search-button").addEventListener("click", () => {
    const name_search = document.getElementById("search").value;
    const spinner = document.getElementById("spinner");
    const pokemon = document.getElementById("pokemon");
    const pokelist = document.getElementById("pokemon-list");

    pokelist.innerHTML = ``;
    pokemon.innerHTML = '';

    spinner.style.display = 'block';

    if (document.getElementById("search").value === "") {
        alert("No se ha ingresado datos");
        spinner.style.display = "none";
    } else if(!isNaN(name_search)){
        alert("Se ha ingresado un número");
        spinner.style.display = "none";

    }else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name_search}`)
        .then((res) => {
            if (!res.ok) {
                spinner.style.display = "none";
                throw new Error("Pokemon no encontrado");
            }
            return res.json();
        })
        .then((data) => {

            setTimeout(()=>{
    
                pokemon.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>Altura: ${data.height / 10} cm <p>
                    <p>Peso: ${data.weight / 10} kg <p>`;
                document.getElementById("search").value = data.name;
                spinner.style.display = 'none';
            }, 2000);
        })
        .catch(error => {
            const pokemon = document.getElementById("pokemon");
            pokemon.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
});

document.getElementById("clean-button").addEventListener("click", () => {
    document.getElementById("search").value = "";
    const pokelist = document.getElementById("pokemon-list");
    const pokemon = document.getElementById("pokemon");
    pokemon.innerHTML = ``;
    pokelist.innerHTML= ``;
    // pokemon.innerHTML = `<ul></ul>`;
});

document.getElementById("random-search-button").addEventListener("click", () => {
    const random_search = Math.ceil(Math.random() * 1025) + 1;
    const spinner = document.getElementById("spinner");
    const pokemon = document.getElementById("pokemon");
    const pokelist = document.getElementById("pokemon-list");

    pokelist.innerHTML = ``;
    pokemon.innerHTML = '';

    document.getElementById("search").value = '';

    fetch(`https://pokeapi.co/api/v2/pokemon/${random_search}`)
    .then((response) => response.json())
    .then((data) => {
        
        spinner.style.display = 'block';

        setTimeout(()=> {
            pokemon.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height} cm <p>
                <p>Peso: ${data.weight} <p>`;
            document.getElementById("search").value = `${data.name}`;
            spinner.style.display = 'none';
        }, 2000);

    });
});

document.getElementById("id-search-button").addEventListener("click", () => {
    const id_search = document.getElementById('search').value.trim();
    const spinner = document.getElementById("spinner");
    const pokelist = document.getElementById("pokemon-list");
    const pokemon = document.getElementById("pokemon");
    
    pokelist.innerHTML = ``;
    pokemon.innerHTML = '';
    
    spinner.style.display = "block";
    

    if(document.getElementById('search').value === ''){
        spinner.style.display = "none";
        alert("No se han ingresado datos")
        }else if(isNaN(id_search)){
            spinner.style.display = "none";
            alert("Se ha ingresado una nombre");
            }else{
                fetch(`https://pokeapi.co/api/v2/pokemon/${id_search}`)
                .then((response) => {
                    if(!response.ok){
                        pokelist.innerHTML = '';
                        spinner.style.display = 'none';
                throw new Error('Pokemon no encontrado')
            }
            return response.json()
        })
        .then((data) => {

            setTimeout(()=> {
                
                pokemon.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>Altura: ${data.height / 10} cm<p>
                    <p>Peso: ${data.weight / 10} <p>`;
                
                spinner.style.display = 'none';
            },2000);

        })
        .catch(error => {
            const pokemon = document.getElementById("pokemon");
            pokemon.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
});

document.getElementById('kind-search-select').addEventListener('change', () => {
    const kind_search = document.getElementById('kind-search-select').value;
    document.getElementById("search").value = "";
    const spinner = document.getElementById("spinner");

    spinner.style.display = "block";

    fetch(`https://pokeapi.co/api/v2/type/${kind_search}`, {cache: 'no-store'})
    .then((response) => {
        if(!response.ok){
            spinner.style.display = "none";
            throw new Error("Tipo no encontrado");
        }
        return response.json();
    })
    .then((data) => {

        const pokemonList = data.pokemon;
        const pokeList = document.getElementById('pokemon-list');
        const name = document.getElementById("pokemon");
        pokeList.innerHTML = '';
        name.innerHTML = '';
            
        pokemonList.forEach(p => {
            fetch(p.pokemon.url)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Pokemon no encontrado')
                }
                return response.json()
            })
            .then((pokeData) => {

                setTimeout(() => {
                    const pokemonItem = document.createElement('li')
                    name.innerHTML = `<h2>${data.names[5].name}<h2>`;
                    pokemonItem.innerHTML = `
                    <h2>${pokeData.name}</h2>
                    <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                    <p>Altura: ${pokeData.height / 10} m</p>
                    <p>Peso: ${pokeData.weight / 10} kg</p>`;
                    pokeList.appendChild(pokemonItem);
                    spinner.style.display = "none"
                }, 2000);

            })

            .catch((error) => {
                console.error(error);
                const errorItem = document.createElement('li');
                errorItem.textContent = `Error al obtener los datos del Pokémon ${p.pokemon.name}`;
                pokeList.appendChild(errorItem);
            })
        });
    })
    .catch((error) => {
        const pokemon = document.getElementById("pokemon");
        pokemon.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

document.getElementById('ability-search-button').addEventListener('click', () => {
    const ability_search = document.getElementById('search').value.trim();
    const spinner = document.getElementById("spinner");
    const pokeList = document.getElementById('pokemon-list');
    const name = document.getElementById("pokemon");            


    name.innerHTML = "";

    spinner.style.display = 'block';

    pokeList.innerHTML = '';


    if(document.getElementById('search').value === ''){
        spinner.style.display = 'none';
        alert("No se han ingresado datos")
    }else{
        fetch(`https://pokeapi.co/api/v2/ability/${ability_search}`)
        .then((response) => {
            if(!response.ok){
                spinner.style.display = "none"
                throw new Error('Habilidad no encontrada')
            }
            return response.json()
        })
        .then((data) => {
            const pokemonList = data.pokemon;

            pokemonList.forEach(p => {
                fetch(p.pokemon.url)
                .then((response) => {
                    if(!response.ok){
                        throw new Error('Pokemon no encontrado')
                    }
                    return response.json()
                })
                .then((pokeData) => {

                    setTimeout(()=>{
                        const pokemonItem = document.createElement('li');
                        document.getElementById('search').value = data.names[5].name;
                        name.innerHTML = `<h2> Habilidad: ${data.names[5].name}</h2>`
                        
                        pokemonItem.innerHTML = `
                        <h2>${pokeData.name}</h2>
                        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                        <p>Altura: ${pokeData.height / 10} m</p>
                        <p>Peso: ${pokeData.weight / 10} kg</p>`;
                        pokeList.appendChild(pokemonItem);

                        spinner.style.display = 'none';
                    },2000);
                })
                .catch((error) => {
                    console.error(error);
                    const errorItem = document.createElement('li');
                    errorItem.textContent = `Error al obtener los datos del Pokémon ${p.pokemon.name}`;
                    pokeList.appendChild(errorItem);
                })
            });
        })
        .catch((error) => {
            const pokemon = document.getElementById("pokemon");
            pokemon.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
});
