import LayoutGame from '../views/layouts/LayoutGame.js'

export default class AbstractView {
    constructor() {
        const layout = new LayoutGame()

        this.layout = layout.createLayout()
        this.main = this.layout.querySelector('.main')
    }

    insertContent(html) {
        this.main.appendChild(html)
    }
}
