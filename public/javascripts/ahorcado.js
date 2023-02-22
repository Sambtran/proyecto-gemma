//declaración de variables
let frase = document.getElementById("frase");
let intentos;
//declaración de la clase
class juego {
    //declaration of class variables 
  estado = "jugando";
  letras = [];
  ya_testadas = [];
  numero = 2;
  intentos = 10;
  intentosgastados;
  aux = [];
  frasedef = "";
  //consturctor for delcaring how many words we want
  constructor(x) {
    this.numero = x;
  }
  // metodo que se invoca al insertar 1 caracter
  intentar(y) {
    //los espacios no cuentan
    if (y == " ") {
      alert("eso era un espacio");
    } else {
      let centinela = false;
      //si ya esta puesta no cuenta para intento
      for (let letra of this.ya_testadas) {
        if (letra == y) {
          centinela = true;
        }
      }
      if (!centinela) {
        let sitios = [];
        //We look at what sites the depicted character is placed
        for (let i = 0; i < this.letras.length; i++) {
          if (this.letras[i] == y) {
            sitios.push(i);
          }
        }
        //in case there is not a single character we rest a try to the user
        if (sitios.length == 0) {
          this.intentos--;
          console.log(this.intentos);
          alert(`te quedan ${this.intentos} intentos`);
          if (this.intentos == 0) {
            this.cambiarestado(2);
          }
        } else {
          this.ya_testadas.push(y);
          //now we recreate the aux array and print it
          for (const posicion of sitios) {
            this.aux[posicion] = y;
          }
          console.log(this.ya_testadas);
          console.log(this.aux);
          frase.innerText = this.aux.join("");
        }
      }
    }
    //interval to see if we winned by putting letter by letter
    setInterval(() => {
      let centinela = false;
      for (const letra of this.aux) {
        if (letra == "-") {
          centinela = true;
        }
      }
      if (!centinela) {
        this.cambiarestado(0);
      }
    }, 500);
  }
  //start method
  iniciar() {
    //we fetch the phrase
    let espsitios = [];
    fetch(`https://puzzle.mead.io/puzzle?wordCount=` + this.numero)
      .then((respuesta) => respuesta.json())
      .then((respuesta2) => {
        let palabra = respuesta2.puzzle;
        palabra = palabra.toLowerCase();
        console.log(palabra);
        //detect the spaces and insert the - character
        for (let i = 0; i < palabra.length; i++) {
          this.letras.push(palabra[i]);
          if (palabra[i] == " ") {
            espsitios.push(i);
          }
        }
        console.log(this.letras);
        for (let i = 0; i < this.letras.length; i++) {
          for (const sitioesp of espsitios) {
            if (sitioesp == i) {
              this.aux.push(" ");
            } else {
              this.aux.push("-");
            }
          }
        }
        console.log(this.aux);
        frase.innerText = this.aux.join("");
        this.frasedef = palabra;
      });
  }
  //a method to abstract the state of the game of us
  cambiarestado(x) {
    switch (x) {
      case 0:
        frase.innerText = "HAS GANADO";
        break;
      case 1:
        frase.innerText = "HAS FALLADO REINICA PARA JUGAR OTRA PARTIDA";
        break;

      case 2:
        frase.innerText = "TE HAS QUEDADO SIN INTENTOS";
        break;
    }
  }
  //if the user tries to guess the phrase we use this method
  torera(x) {
    console.log("torera");
    console.log(this.frasedef);
    console.log(x);
    if (x != this.frasedef) {
      this.cambiarestado(1);
    } else {
      this.cambiarestado(0);
    }
  }
}
//invocation
j1 = new juego(2);
j1.iniciar();
let enviar = document.getElementById("enviar");
let letrah = document.getElementById("letrah");
//event listeners for the buttons
enviar.addEventListener("click", (ev) => {
  if (letrah.value.length > 1) {
    j1.torera(letrah.value);
  } else {
    j1.intentar(letrah.value);
  }
  letrah.value = "";
});
let reiniciar = document.getElementById("reiniciar");
reiniciar.addEventListener("click", () => {
  location.reload();
});
