import { UI } from "./ui.js";
import { Play } from "./play.js";
import { Sound } from "./sound.js";

const ui = new UI();
const sound = new Sound();

localStorage.setItem("presupuesto", 70);
localStorage.setItem("balance", 120);
localStorage.setItem("apuesta", 10);

const presupuesto = Number(localStorage.getItem("presupuesto"))
const balance = Number(localStorage.getItem("balance"))
const apuesta = Number(localStorage.getItem("apuesta"))

const jugador = new Play(presupuesto, balance, apuesta);

localStorage.setItem("gameBy","");

const rondas = (nCantidad) => {
    if(nCantidad < 10){
        nCantidad = ++nCantidad;
        const isSelectCard = document.querySelector("select").selectedIndex;
        const isCard = isSelectCard > 0 ? 'rey': 'caballo';

        const isPresupueto = ui.$id('ss-presupuesto');
        const isFinalidad = ui.$id('ss-finalidad');

        const presupuesto = Number(isPresupueto.value);
        const finalidad = Number(isFinalidad.value);

        const apuesta = 10;
        playing(presupuesto, finalidad, apuesta, isCard);
        return rondas(nCantidad)
    }
    let partidasGanadas = localStorage.getItem('win')
    console.log(partidasGanadas);
    ui.showSimulation('Tu probabilidad de ganar es de '+ partidasGanadas/10);
    return console.log('termino.');
}
const playing = (presupuesto, finalidad, apuesta, preferido, rondas)=> {
    const jugadorSimulado = new Play(presupuesto, finalidad, apuesta, preferido)
    jugadorSimulado.play();
    if(jugadorSimulado.presupuesto >= jugadorSimulado.finalidad){
        const result = '--- Ganaste  esta partida --- tu presupuesto ' + jugadorSimulado.presupuesto;
        const win = 1 + Number(localStorage.getItem('win'));
        localStorage.setItem('win',win);
        return ui.showSimulation(result)
    }else if(jugadorSimulado.presupuesto <= 0){
        const result = '--- Perdiste  esta partida --- tu presupuesto ' + jugadorSimulado.presupuesto;
        return ui.showSimulation(result)
    }
    playing(jugadorSimulado.presupuesto, jugadorSimulado.finalidad, jugadorSimulado.apuesta, jugadorSimulado.preferido);
}


const appClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    if(id === 'btn-sound-play'){
        ui.$id('modal').remove();
        
            sound.gameSound()
            setInterval(() => {
                sound.gameSound()
            }, 29000);
       
    }
    else if (id === "btn-play") {
        let isGameBy = localStorage.getItem('gameBy');
        if(!isGameBy)
            return ui.message('¡Debes selecionar caballo o rey!')

        if (jugador.presupuesto <= 0)
            return ui.message("¡Has quedado sin presupuesto!");
        if(jugador.presupuesto < jugador.apuesta && jugador.presupuesto > 0){
            jugador.apuesta = jugador.presupuesto
        }
            const select = "card-" + localStorage.getItem("gameBy");
            const $card = ui.$id(select);
            ui.showAnimationCards();
            setTimeout(() => {
                const isWiner = jugador.play();
                ui.readValues(jugador.presupuesto, jugador.apuesta);
                if (!isWiner) {
                    ui.loserCard($card);
                    ui.message("Perdiste con el " + localStorage.getItem("gameBy"));
                    if (jugador.presupuesto <= 0) {
                        const msg =
                        "¡Perdiste con el " +
                        localStorage.getItem("gameBy") +
                        " has quedado sin presupuesto!";
                        return ui.showModal(msg, "btn-reset", "Reiniciar Juego");
                    }
                    
                } else {
                    ui.activeCard($card);
                    ui.message("¡Ganaste con el " + localStorage.getItem("gameBy") + "!");
                    if (jugador.presupuesto >= jugador.finalidad)  
                    {
                        const msg =
                        "¡Ganaste con el " +
                        localStorage.getItem("gameBy") +
                        " has logrado tu meta!";
                        ui.showModal(msg, "btn-rest", "Reiniciar Juego");
                    }
                }
        }, 5120);
    } else if (id === 'btn-reset') {
        jugador.presupuesto = 70;
        jugador.finalidad = 120;
        jugador.apuesta = 10;
        ui.readValues(jugador.presupuesto, jugador.apuesta);
        localStorage.setItem("gameBy","");
        ui.$id('modal').remove()
    }
    else if (id === "card-caballo") {
        ui.message("¡Suerte!");
        ui.activeCard(e.target);
        ui.showLetter("¡Has selecionado caballo!");
        localStorage.setItem("gameBy", "caballo");
    } else if (id === "card-rey") {
        ui.message("¡Suerte!");
        ui.activeCard(e.target);
        ui.showLetter("¡Has selecionado rey!");
        localStorage.setItem("gameBy", "rey");
    }else if(id === 'btn-simular'){
        localStorage.setItem('win', 0);
        rondas(0);
    }
};

ui.showModal('Hacemos uso de musica para este juego.', 'btn-sound-play', 'Aceptar Sonidos');
document.querySelector('body').addEventListener("click", (e) => appClick(e));

