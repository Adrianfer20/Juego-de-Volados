
class UI {
    $id = select => document.getElementById(select)
    $inputs = () => document.querySelectorAll("input[name='card']")

    activeCard = $card => {
        const $cardDisabled = document.querySelector("div[data-status]")
        $cardDisabled.className = 'w-5/12 h-72 flex items-center justify-center bg-center bg-no-repeat bg-contain border hover:border-green-600 hover:bg-green-200 rounded shadow-md cursor-pointer p-4';
        $cardDisabled.removeAttribute('data-status')


        $card.className = 'w-5/12 h-72 flex items-center justify-center bg-center bg-no-repeat bg-contain border border-green-600 bg-green-200 rounded shadow-md cursor-pointer p-4'
        $card.setAttribute('data-status','')
    }

    message = message => {
        const $message = this.$id('message');
        $message.textContent = message;
    }

    loserCard = $card => {
        const $cardDisabled = document.querySelector("div[data-status]")
        $cardDisabled.className = 'w-5/12 h-72 flex items-center justify-center bg-center bg-no-repeat bg-contain border hover:border-green-600 hover:bg-green-200 rounded shadow-md cursor-pointer p-4';
        $cardDisabled.removeAttribute('data-status')


        $card.className = 'w-5/12 h-72 flex items-center justify-center bg-center bg-no-repeat bg-contain border border-red-600 bg-red-200 rounded shadow-md cursor-pointer p-4'
        $card.setAttribute('data-status','')
    }

    showAnimationCards = () => {
        let count = 0
        const timeAnimation = setInterval(() => {
            count = 1 + count
            if (count <= 29 || (count % 2) === 0) {
                const $card = document.querySelector("div[data-status]")
                if($card.id != 'card-caballo'){
                    this.activeCard(this.$id('card-caballo'))
                }else {
                    this.activeCard(this.$id('card-rey'))
                }
            }
            if(count >= 40){
                clearInterval(timeAnimation)
            }
        }, 128);
    }

    showLetter = message => {
        const $letter = this.$id('letter')
        $letter.textContent = message
    }

    readValues = (presupuesto, apuesta) => { 
        this.$id('presupuesto').textContent = "$"+presupuesto
        this.$id('apuesta').textContent = "$"+apuesta
    }

    showModal = (message, idButton, textButton) => {
        const $modal = this.creatModal();
        document.querySelector('body').appendChild($modal)
        const $message = this.creatMessage(message);
        if(idButton){
            const $wrapper = document.createElement('div');
            $wrapper.className = 'flex flex-col items-center justify-center';
            const $button = this.creatButtonModal(idButton, textButton);

            $wrapper.appendChild($message);
            $wrapper.appendChild($button);
            return $modal.append($wrapper);
        }
        $modal.appendChild($message);
    }

    creatModal = () => {
        const $modal = document.createElement('div');
        $modal.id = 'modal';
        $modal.className = 'fixed top-0 left-0 bottom-0 right-0 h-screen w-full flex items-center justify-center bg-slate-900/70 z-40';
        return $modal
    }
    creatMessage = message => {
        const $h4 = document.createElement('h4');
        $h4.className = 'max-w-md text-4xl text-center font-medium text-slate-100 uppercase p-4 mb-6';
        $h4.textContent = message;
        return $h4;
    }
    creatButtonModal = (id, textButton) =>{
        const $button = document.createElement('button');
        $button.id = id;
        $button.className = 'bg-green-200 text-green-600 rounded shadow px-6 py-4';
        $button.textContent = textButton;
        return $button
    }

    showSimulation = message => {
        const $p = this.creatSimulation(message);
        this.$id('show-simulation').appendChild($p); 
    }

    creatSimulation = message => {
        const $p = document.createElement('p');
        $p.className = 'text-base text-center leading-6 mb-2';
        $p.textContent = message;
        return $p;
    }
}

export {UI}