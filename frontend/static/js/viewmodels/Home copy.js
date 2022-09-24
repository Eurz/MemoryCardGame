import LayoutHome from '../views/layouts/LayoutHome.js'
import AbstractView from './AbstractView.js'
import Game from './Game.js'

export default class Home extends AbstractView {
    constructor() {
        super()
    }

    async getHtml() {
        const btnStart = document.querySelector('.btn-start')
        btnStart.addEventListener('click', () => {
            const newGame = new Game()
        })
        const layout = new LayoutHome()
        return layout.createLayout()
    }
}
