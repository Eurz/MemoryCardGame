export default class MatchCardSubject {
    constructor() {
        this.strokes = 0
        this.pairs = 8
        this._observers = []
    }

    subscribe(observer) {
        this._observers.push(observer)
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter((obs) => obs !== observer)
    }

    /**
     *
     * @param {HTMLElement} card - Html of this card game
     * @param {Object} obj - CardGame object
     */
    fire(card, obj) {
        this._observers.forEach((observer) => {
            return observer.notify(card, obj)
        })
    }
}
