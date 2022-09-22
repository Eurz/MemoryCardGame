import PopModal from '../views/PopModal.js'
import Sounds from '../librairies/Sounds.js'

export default class MatchCard {
    constructor() {
        this.cardOne = null
        this.cardTwo = null
        this.cardsFound = 0
        this.strokes = 0
        this.isMatching = false
        this.soundEffect = new Sounds()
    }

    notify(card, obj) {
        if (this.cardOne === null) {
            this.cardOne = card
            this.obj1 = obj
            return
        }
        this.obj2 = obj
        this.cardTwo = card

        this.matchCards(this.cardOne, this.cardTwo)
    }

    matchCards(card1, card2) {
        if (
            card1.querySelector('.card-back').className ===
            card2.querySelector('.card-back').className
        ) {
            this.soundEffect.play('good')
            card1.removeEventListener('click', this.obj1.flipCard)
            card2.removeEventListener('click', this.obj2.flipCard)

            card1.classList.add('good')
            card2.classList.add('good')
            this.isMatching = false
            this.cardsFound += 1
        } else {
            card1.classList.add('wrong')
            card2.classList.add('wrong')

            setTimeout(() => {
                this.soundEffect.play('wrong')
                card1.classList.remove('wrong')
                card2.classList.remove('wrong')
                card1.classList.remove('flip')
                card2.classList.remove('flip')
                this.isMatching = false
            }, 1000)
        }

        this.strokes++
        this.cardOne = this.cardTwo = null
        this.obj1 = this.obj2 = null
        this.updateScore()
        this.winningGame()
    }

    updateScore() {
        const strokes = document.querySelector('.strokes span')
        strokes.textContent = `${this.strokes}`
        const pairs = document.querySelector('.pairs span')
        pairs.textContent = `${this.cardsFound} / 4 `
    }

    winningGame() {
        if (this.cardsFound === 4) {
            const modal = new PopModal('Vous avez gagné')
            modal.render()
            this.soundEffect.play('victory')
            console.log('Vous avez gagné')
        }
    }
}
