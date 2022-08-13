class Play {
    constructor(presupuesto, finalidad, apuesta, preferido) {
        this.presupuesto = presupuesto,
        this.finalidad = finalidad,
        this.apuesta = apuesta,
        this.preferido = preferido
    }


    play = () => {
        const valueWinner = Math.random()
        const gameBy = localStorage.getItem('gameBy') || this.preferido;
        if(valueWinner >= 0.5){
            if(gameBy === 'rey'){
                // console.log('Salio rey y ganaste');
                return this.winner()
            }else {
                // console.log('Salio rey y perdiste');
                return this.loser()
            }
        }else {
            if(gameBy === 'caballo'){
                // console.log('Salio caballo y ganaste');
                return this.winner()
            }else {
                // console.log('Salio caballo y perdiste');
                return this.loser()
            }
        }
    }

    winner = () => {
        this.presupuesto = this.presupuesto + this.apuesta
        this.apuesta = Number(localStorage.getItem('apuesta'))
        return true
    }

    loser = () => {
        this.presupuesto = this.presupuesto - this.apuesta;
        this.apuesta = this.presupuesto > 0 ? this.apuesta * 2 : this.apuesta = 0;
        return false
    }
}

export {Play}