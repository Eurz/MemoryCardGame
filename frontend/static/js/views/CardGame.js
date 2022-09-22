// import MatchCardSubject from '../observers/MatchCardSubject.js'

export default class CardGame {
    /**
     *
     * @param {String} classFront  - className for the front card
     * @param {String} name - className for the back card
     */
    constructor(name /*, MatchCardSubject*/) {
        this.name = name
        // this._matchCardSubject = MatchCardSubject

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('card')
    }

    flipCard = () => {
        this.$wrapper.classList.add('flip')
        // this._matchCardSubject.fire(this.$wrapper, this)
    }

    setCorrect() {
        // this.$wrapper.removeEventListener('click', this.flipCard)
        this.$wrapper.classList.add('good')
    }
    hide() {
        this.$wrapper.classList.add('hide')
    }
    setWrong() {
        this.$wrapper.classList.remove('flip')
    }

    /**
     *
     * @returns {HTMLElement} - Card to play
     */
    getHtml() {
        const card = `<div class="card-item">
        <div class="card-front card-logo"></div>
        <div class="card-back ${this.name}"></div>
    </div>`
        this.$wrapper.innerHTML = card

        return this.$wrapper
    }
}
