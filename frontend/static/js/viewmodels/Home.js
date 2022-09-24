import utilities from '../functions/utilities.js'
import LayoutGame from '../views/layouts/LayoutGame.js'
import LayoutHome from '../views/layouts/LayoutHome.js'
import AbstractView from './AbstractView.js'

export default class Home extends AbstractView {
    constructor() {
        super()
        this.$wrapper = this.createLayout()
        this.init()
    }

    init() {
        const btnStart = this.$wrapper.querySelector('.btn-start')
        btnStart.addEventListener('click', (e) => {
            const data = localStorage.getItem('mkgame')
            if (!data) {
                e.preventDefault()
                return
            }

            console.log('bouh')
        })

        const buttons = this.$wrapper.querySelectorAll('.btn-difficulty')
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.setStorage(e.target.id)
                console.log(e.target.id)
            })
        })
    }

    setStorage(difficulty) {
        const data = { tagName: 'Noob', difficulty }

        localStorage.setItem('mkgame', JSON.stringify(data))
    }

    createLayout() {
        const html = `
            <div class="home">
                
                <div class="btn-wrapper">
                    <a href="/game" class="btn btn-start">Start game</a>
                </div>
                <div class="difficulty">
                <button class="btn btn-difficulty" id="easy">Easy</button>
                <button class="btn btn-difficulty" id="medium">Medium</button>
                <button class="btn btn-difficulty" id="hard">Hard</button>
                </div>
            </div>
                `

        return utilities.createFragment(html)
    }

    async getHtml() {
        this.insertContent(this.$wrapper)

        return this.layout
    }
}
