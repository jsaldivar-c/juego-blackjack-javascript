const miModulo = (() => {

    'use strict'

    // Creamos los arreglos para el manejo de cartas.
    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'K', 'Q'];

    // Referencias HTML
    const btnPedir             = document.querySelector('#btnPedir'),
          btnDetener           = document.querySelector('#btnDetener'),
          btnNuevo             = document.querySelector('#btnNuevo');
          
    const puntosHTML           = document.querySelectorAll('span'),
          divCartasJugadores   = document.querySelectorAll('.divCartas');

    let puntosJugadores = [];

    /*
    * FUNCIONES
    */

    const inicializarJuego = ( numJugadores = 2 ) => {

        deck            = crearDeck();
        puntosJugadores = [];

        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        btnDetener.disabled = false;
        btnPedir.disabled   = false;
    }

    // Crear nuevo Deck.
    const crearDeck = () => {

        deck = [];

        for ( let i = 2; i <= 10; i++ ) {
            for ( let tipo of tipos ) {
                deck.push( i + tipo );
            }
        }

        for ( let especial of especiales ) {
            for ( let tipo of tipos )
                deck.push( especial + tipo );
        }
        // Importamos la libreria UNDERSORE para utilizar la funciòn SHUFFLE que sirve para obtener un arreglo desordenado.
        return _.shuffle( deck );
    }

    // Función para solicitar la carta al Deck.
    const pedirCarta = () => {

        if ( deck.length === 0 ) { throw 'No hay cartas en el deck'; } 

        return deck.pop();
    }

    // Función para asignar el valor de la carta.
    const valorCarta = ( carta ) => {

        const valor = carta.substring( 0, carta.length - 1 );

        return ( isNaN(valor) ) ?
            (( valor === 'A' ) ? 11 : 10 ) :
            valor * 1;
    }

    // Turno 0 sera del primer jugador y el ultimo sera de la computadora.
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno]      = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = ( carta,turno ) => {

        const imgCarta = document.createElement( 'img' );
        imgCarta.src   = `assets/cartas/${carta}.png`;

        imgCarta.classList.add( 'carta' );
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if ( puntosMinimos === puntosComputadora ){
                alert('Tablas!!');
            }
            else if ( puntosMinimos > puntosComputadora && puntosMinimos <= 21  || puntosComputadora > 21 ){
                alert('Ganaste!!!');
            }
            else if ( puntosMinimos < puntosComputadora && puntosComputadora <= 21 || puntosMinimos > 21 ){
                alert('Perdiste!!!');
            }
        },100);
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do{
            const carta       = pedirCarta();
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);
            
        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }

    /*
    * EVENTOS
    */

    btnPedir.addEventListener('click',() => {

        const carta         = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta,0);

        if( puntosJugador > 21 ){

            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        }else if( puntosJugador === 21 ){
            
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click',() => {

        btnDetener.disabled = true;
        btnPedir.disabled   = true;
        turnoComputadora(puntosJugadores[0]);

    });

    // btnNuevo.addEventListener('click',() => {
        
    //     inicializarJuego();
    // });

    return {
        nuevoJuego: inicializarJuego
    };
})();