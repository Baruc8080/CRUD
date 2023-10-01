document.addEventListener("DOMContentLoaded", function () {
  //#region Observador de imágenes IntersectionObserver
  // Configuración del observador de intersección para cargar imágenes
  const imgOptions = {};
  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return; // Si la imagen no está en la vista del usuario, no hacer nada
      const img = entry.target;
      var dataImage = img.getAttribute("data-image");
      img.src = dataImage; // Cargar la imagen
      imgObserver.unobserve(img); // Dejar de observar la imagen después de cargarla
    });
  }, imgOptions);
  //#endregion

  //#region Consumo de API con Fetch
  // Función para obtener datos de especies de Pokémon a través de la API
  const fetchPokemons = async (endpoint) => {
    let data;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await response.json();
    } catch (error) {
      console.log(error);
    }
    return data.pokemon_species; // Devolver datos de especies de Pokémon
  };
  //#endregion

  //#region Ordenar números de Pokémon
  // Función para extraer y ordenar números de Pokémon desde una URL
  function orderNumber(str) {
    var mySubstring = str.substring(
      str.lastIndexOf("s/") + 2,
      str.lastIndexOf("/")
    );
    return mySubstring;
  }
  //#endregion

  //#region Agregar Pokémon al HTML
  // Función para cargar y mostrar Pokémon en el HTML
  async function getPokemons(numero, toggle) {
    let endpoint = `https://pokeapi.co/api/v2/generation/${numero}/`;
    var container = document.getElementById("container");
    container.innerHTML = "";
    let pokemons = [];
    pokemons = await fetchPokemons(endpoint);

    // Ordenar los Pokémon por número
    for (let j = 0; j < pokemons.length; j++) {
      pokemons[j].nr = orderNumber(pokemons[j].url);
    }
    pokemons.sort((a, b) => a.nr - b.nr);

    pokemons.forEach((item) => {
      let numero3decimales = orderNumber(item.url);
      if (numero3decimales < 10) {
        numero3decimales = "0" + numero3decimales;
      }
      if (numero3decimales < 100) {
        numero3decimales = "0" + numero3decimales;
      }

      let divitem = document.createElement("li");
      divitem.classList.add("item");
      var img = new Image();
      const toggleurl = toggle
        ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
        : "https://www.serebii.net/pokemongo/pokemon/";
      img.src =
        "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";
      const urlImage = `${toggleurl}${numero3decimales}.png`;
      img.setAttribute("data-image", urlImage);
      img.setAttribute("class", "pokeimage");
      img.setAttribute("alt", item.name);

      divitem.innerHTML = `<div> ${orderNumber(item.url)}-${item.name}</div>`;
      divitem.appendChild(img);
      container.appendChild(divitem);

      // Observar la imagen para cargarla cuando sea visible
      imgObserver.observe(img);
    });
  }
  //#endregion

  //#region Agregar generaciones
  // Inicializar con la generación 1
  var numero = 1;
  getPokemons(numero);
  var toggle = false;

  // Crear botones de radio para seleccionar generaciones
  var geners = [
    "generation-1",
    "generation-2",
    "generation-3",
    "generation-4",
    "generation-5",
    "generation-6",
    "generation-7",
  ];
  var filters = document.getElementById("filters");
  var gen = "";
  for (let i = 0; i < geners.length; i++) {
    gen += ` <input class="radio-gens" type="radio" id=${geners[i]} value=${
      i + 1
    }
    name="generation" checked>
    <label for=${geners[i]} class="label-gens">${geners[i]}</label>`;
  }
  filters.innerHTML = gen;

  // Controlar el cambio de generación al hacer clic en un botón de radio
  filters.addEventListener("click", function (f) {
    let targ = f.target.type;
    if (targ == "radio") {
      getPokemons(f.target.value, toggle);
      title.innerHTML = "Pokemon " + f.target.id;
    }
  });
  //#endregion
});
