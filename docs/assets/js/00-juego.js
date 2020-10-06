// Creamos los arreglos para el manejo de cartas.
let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'K', 'Q'];

// Referencias HTML
const btnPedir             = document.querySelector('#btnPedir');
const btnDetener           = document.querySelector('#btnDetener');
const btnNuevo             = document.querySelector('#btnNuevo');
const puntosHTML           = document.querySelectorAll('small');
const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

let puntosJugador     = 0,
    puntosComputadora = 0;

// FUNCIONES

// Creamos la función para crear el Deck.
const crearDeck = () => {
    // Utilizamos del 2 al 10 ya que son los valores nuemricos de las cartas.
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let especial of especiales) {
        for (let tipo of tipos)
            deck.push(especial + tipo);
    }
    // Importamos la libreria UNDERSORE para utilizar la funciòn SHUFFLE que sirve para obtener un arreglo desordenado.
    deck = _.shuffle(deck);

    return deck;
}

crearDeck();

// Función para solicitar la carta al Deck.
const pedirCarta = () => {

    if (deck.length === 0) { throw 'No hay cartas en el deck'; }
    const carta = deck.pop();

    return carta;
}

pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    // let puntos = 0;
    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     // Se multiplica por uno para transformar el valor a numerico.
    //     puntos = valor * 1;
    // }
    return (isNaN(valor)) ?
        ((valor === 'A') ? 11 : 10) :
        valor * 1;
}

const valor = valorCarta(pedirCarta());
console.log({valor});

// // Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
    do{
        const carta   = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if (puntosJugador === puntosComputadora){
            alert('Tablas!!');
        }
        else if (puntosJugador > puntosComputadora && puntosJugador <= 21  || puntosComputadora > 21){
            alert('Ganaste!!!');
        }else if (puntosJugador < puntosComputadora && puntosComputadora <= 21 || puntosJugador > 21){
            alert('Perdiste!!!');
        }
    },200);
}

// // EVENTOS

//Estamos en escucha del boton click y utilizamos el CALLBACK para hacer algo despues de que se haga CLICK.
btnPedir.addEventListener('click',() => {

    const carta   = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){

        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        console.log("Perdiste");
        turnoComputadora(puntosJugador);

    }else if(puntosJugador === 21){
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        console.log("Ganaste");
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click',() => {

    btnDetener.disabled = true;
    btnPedir.disabled   = true;
    turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener('click',() => {

    deck.length                    = 0;
    crearDeck();
    puntosHTML[0].innerText        = 0;
    puntosHTML[1].innerText        = 0;
    puntosComputadora              = 0;
    puntosJugador                  = 0;
    btnDetener.disabled            = false;
    btnPedir.disabled              = false;
    divCartasJugador.innerHTML     = '';
    divCartasComputadora.innerText = '';
    
});

